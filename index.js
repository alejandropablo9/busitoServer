var express = require("express");
var firebase = require('firebase');
var bodyParser = require("body-parser"); 

var app = express();
app.use("/", express.static('public'));
app.use(express.static('server'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "jade");

var config = {
    apiKey: "AIzaSyDOnAmW6BXMeGzNB-41eW40ad7j2KWEukg",    
    authDomain: "noti-87b86.firebaseapp.com",
    databaseURL: "https://noti-87b86.firebaseio.com",
    projectId: "noti-87b86",
    storageBucket: "noti-87b86.appspot.com",
    messagingSenderId: "964345566724"
  };

firebase.initializeApp(config);
var ref = firebase.database().ref('BusITO')

app.get("/", function(request, response){
    response.render("index");
});

app.get("/login", function(request, response){
    response.render("login");
});

app.post("/buses/nuevo", function(request, response){  
    var bus = {
            id: Number(request.body.bus),
            origen:{
                    latitud: Number(request.body.origenLat),
                    longitud: Number(request.body.origenLng)
                },
            destino:{
                    latitud: Number(request.body.destinoLat),
                    longitud: Number(request.body.destinoLng)
                },        
            identifier: request.body.beacon   
    }    
    
    firebase.database().ref("buses/" + request.body.bus)
    .set(bus);
    console.log(bus);   
    response.send("Escrito en la base de datos");  
    
});

app.get("/buses/nuevo", function(request, response){    
    firebase.database().ref('beacons').once('value').then(function(snapshot) {
        var beacons = snapshot.val();  
        console.log("uno");
        console.log(beacons);   
        response.render("form_bus", {beacons: beacons});   
    });    
});

app.post("/conductor/nuevo", function(request, response){  

    var email = request.body.email;
    var password = request.body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(){
            var user = firebase.auth().currentUser;
            firebase.database().ref("usuarios/" + user.uid)
            .set({
                email: request.body.email,
                nombre: request.body.nombre,
                roll: request.body.roll,
                tutor: " ",
                numero_emergencia: request.body.phone
            });
            console.log({
                email: request.body.email,
                nombre: request.body.nombre,
                roll: request.body.roll,
                tutor: " ",
                numero_emergencia: request.body.phone
            });            
            response.render("index");
            
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
         });    
        
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }, function(error) {
            // An error happened.
        });
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR");
        console.log(errorCode, errorMessage);
    }); 
});

app.get("/conductor/nuevo", function(request, response){         
   response.render("form_conductor");
});

app.post("/beacon/nuevo", function(request, response){   
    var beacon = {    
        identifier: request.body.identifier,    
        idbeacon: request.body.idbeacon,
        major: Number(request.body.major),
        minor: Number(request.body.minor),
        color: request.body.color
    }    
    firebase.database().ref("beacons/" + beacon.identifier)
    .set(beacon);
    console.log(beacon);   
    response.render("index");
});

app.get("/beacon/nuevo", function(request, response){
    response.render("form_beacon");
});

app.listen(8080);

