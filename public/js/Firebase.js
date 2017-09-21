var Database = (function(){

    var init = function(){
        var config = {
            apiKey: "AIzaSyDOnAmW6BXMeGzNB-41eW40ad7j2KWEukg",    
            authDomain: "noti-87b86.firebaseapp.com",
            databaseURL: "https://noti-87b86.firebaseio.com",
            projectId: "noti-87b86",
            storageBucket: "noti-87b86.appspot.com",
            messagingSenderId: "964345566724"
        };
        firebase.initializeApp(config);
        console.info("se inicio");
        changeBuses();
    };

    var changeBuses = function(){
        var buses = firebase.database().ref("buses");
        buses.on('value', function(snapshot) {            
            console.log(snapshot.val());
            autobuses = snapshot.val();            
            for(var bus in autobuses){
                changePasajeros(autobuses[bus]);
                changeTrackingBus(autobuses[bus]);                
            }
        });
    }    

    var changeTrackingBus = function(_bus){
        var _fecha = new Date();
        console.log(formatdate(_fecha));        
        var url = "ruta/" + formatdate(_fecha) + "/" +  _bus.identifier; 
        console.log(_bus);
        console.log(url);
        MapsBus.clearMap()
        var tracking = firebase.database().ref(url + "/tracking");
        tracking.on('value', function(snapshot) {            
            var position = snapshot.val();
            if(position !== undefined){
                MapsBus.addMarcador(
                    {
                        "autobus": _bus, 
                        "position": {
                            lat: position.latitud, 
                            lng: position.longitud
                        },
                        "url": url
                    });
            }       
        });
    };

    var formatdate = function(_date){
        if(_date === undefined)
            _date = new Date();
        
        console.log(_date.getDay());

        var dia = _date.getDate();
        var mes = _date.getMonth() + 1;
        var anio = _date.getFullYear();

        if(dia < 10)
            dia = "0" + dia;
        if(mes < 10)
            mes = "0" + mes;        
        
        return "" + dia + "-" + mes + "-" + anio;
    };

    var changePasajeros = function(_bus){
        var _fecha = new Date();
        var url = "ruta/" + formatdate(_fecha) + "/" + _bus.identifier + "/info";
        console.log(url);
        var info = firebase.database().ref(url);        
        info.on('value', function(snapshot){                 
            var pasSnap = snapshot.val();
            console.log("info pasajeros");  
            console.log(pasSnap);  
            var pasajeros = [];
            var id = _bus.identifier;            
            if(pasSnap != undefined){
                for(var pasajero in pasSnap){
                    pasajeros.push(pasSnap[pasajero]);
                }
            }
            MapsBus.pasajerosOnBus({
                "bus": _bus,
                "pasajeros": pasajeros
            });
        });

    };

    return {
        "init": init
    };
})();