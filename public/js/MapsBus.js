var MapsBus = (function(){
    
    var map;
    var mBuses = [];
    var info = {};

    var init = function(){
        var centro = {lat: 17.06, lng: -96.72}
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: centro
        });
        console.info("mapa");
        Database.init();
    };

    var addMBues = function(_params){

        var id = _params.autobus.id;
        var _info = info[id];
        var npasajeros = 0;
        var lista = "";

        for(var i = 0; i < _info.pasajeros.length; i++){
            console.log(_info.pasajeros[i].usuario);    
            var usuario = _info.pasajeros[i].usuario;   
            if( _info.pasajeros[i] !== undefined){
                npasajeros += 1;
                if (usuario !== undefined){
                    lista += "<li>" + usuario.nombre + "</li>";                    
                }
            }
        };

        var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Autobus No. ' + _params.autobus.id + '</h1>'+
        '<div id="bodyContent">'+
        '<p>No. de pasajeros ' + npasajeros +'</p>'+
        '<ul>' + lista + '</ul>'
        '</div>'+
        '</div>';
        
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
          position: _params.position,
          map: map,
          idBus: id
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        var band = false;
        for(var i = 0; i < mBuses.length; i++){
            if(mBuses[i].idBus === id){
                mBuses[i] = marker;    
                console.log("entre");
                console.log(mBuses[i]);
                band = true;            
                break;               
            }            
        }
        console.log(i);
        if(band === false){
            mBuses.push(marker); 
            console.log("entre bandera");
            console.log(mBuses);         
        }
        clearMarkers();
        setMapOnAll(map);          
    };
    
    var clearMarkers = function() {
        setMapOnAll(null);
    };

    var setMapOnAll = function(map) {
        for (var i = 0; i < mBuses.length; i++) {
            mBuses[i].setMap(map);
        }
    };

    var deleteMarkers = function() {
        clearMarkers();
        mBuses = [];
    };

    var pasajerosOnBus = function(_params){
        console.log(_params) 
        console.log("info:");    
        var id = _params.bus.id;
        info[id] = _params;                 
        console.log(info);     
    };

    return{
        "init": init,
        "addMarcador": addMBues,
        "clearMap": clearMarkers,
        "pasajerosOnBus": pasajerosOnBus,
    };

})();