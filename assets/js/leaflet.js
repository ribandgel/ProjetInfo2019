require('../css/map.css');

let L=require('leaflet');
let $ = require('jquery');

let wineries = [];
let winery = {};
var marker;
var searchDiv = document.getElementById("search")

$(document).ready(function () {
    $.get("http://127.0.0.1:8000/api/wineries", function(data) {
        //console.log(data);
        for(let i=0; i<data.length; i++) {
            let obj = data[i];
            let name = obj.name;
            let lat = obj.latitude;
            let long = obj.longitude;
            let winery = {
                name: obj.name,
                lat: obj.latitude,
                long: obj.longitude
                };
            wineries.push(winery);
            //console.log("HERE IS THE lat " + lat);
            //console.log("HERE IS THE long " + long);
        }
        let mymap = L.map('mapid').setView([46.227638, 2.213749], 6);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

        for(let i=0; i<wineries.length; i++) {
            marker = L.marker([wineries[i].lat, wineries[i].long]).addTo(mymap);
            //marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + wineries[i].name + "</a>").openPopup();
        }
    });

    var searchOpt = document.getElementById("searchOpt");

    // searchOpt.addEventListener("hover", function () {
    //     searchDiv.hidden = false;
    // });
    //
    // searchOpt.addEventListener("click", function () {
    //     searchDiv.hidden = false;
    // });

    // searchOpt.hover(function(){
    //     searchDiv.style.display = "inline";
    // }, function(){
    //     searchDiv.style.display = "none";
    // });

    var dropDwnContent = document.getElementById("dropdown-content");

    searchOpt.addEventListener("click", function () {
        searchDiv.style.display = "inline";
        searchOpt.style.display = "none";
        dropDwnContent.style.display = "none";
    });

    let filterBt = document.getElementById("filterBt");

    filterBt.addEventListener("click", function () {
        dropDwnContent.style.display = "block";
    })

    /*----------------------------STUFFS TO FILTER SEARCH ON MAP-------------------------------*/
    let searchBt = document.getElementById("searchBt"); //le boutton rechercher
    let search = document.getElementById("searchQuery"); //ce qu'a ecrit l'utilisateur dans la barre de recherche
    let radioOpt = document.getElementsByName('searchOption'); //le radio bt chosen by user to filter by
    //let p = document.getElementById("result");// this is just a test

    searchBt.addEventListener("click", function() {
        for(let i = 0; i < radioOpt.length; i++) {
            if(radioOpt[i].checked) {
                //p.innerHTML = search.value + radioOpt[i].value;
                $.get("http://127.0.0.1:8000/api/wineries", function(data) {
                    if(radioOpt[i].value === "Appellation") {
                        for (let i = 0; i < data.length; i++) {
                            let obj = data[i];
                            let name = obj.name;
                            // let lat = obj.latitude;
                            // let long = obj.longitude;
                            // let winery = {
                            //     name: obj.name,
                            //     lat: obj.latitude,
                            //     long: obj.longitude
                            // };
                        }
                    }
                    if(radioOpt[i].value === "Couleur") {}
                    if(radioOpt[i].value === "Région") {}
                    if(radioOpt[i].value === "Cépage") {}
                });
            }
        }
    });

    // marker.addEventListener("click", function () {
    //     map.on('draw:created', function (e) {
    //         var type = e.layerType,
    //             layer = e.layer;
    //         map.addLayer(layer);
    //         if (type === 'marker') {
    //             layer.bindPopup('LatLng: ' + layer.getLatLng()).openPopup();
    //         }
    //     });
    //     //marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + wineries[i].name + "</a>").openPopup();
    // });

    /*for(let i=0; i<wineries.length; i++) {
        console.log("HERE IS THE name " + wineries[i].name);
        console.log("HERE IS THE lat " + wineries[i].lat);
        console.log("HERE IS THE long " + wineries[i].long);
    }
    let mymap = L.map('mapid').setView([46.227638, 2.213749], 6);
    L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);*/
    //var marker = L.marker(wineries[0].latitude, wineries[0].longitude).addTo(mymap);
    //marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + wineries[0].name + "</a>").openPopup();
    /*for(let i=0; i<wineries.length; i++) {
        console.log("IN FOR LOOP FOR MARKERS");
        var marker = L.marker(wineries[i].latitude, wineries[i].longitude).addTo(mymap);
        marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + wineries[i].name + "</a>").openPopup();
    }*/
});


// let mymap = L.map('mapid').setView([51.505, -0.09], 13);
//
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'your.mapbox.access.token'
// }).addTo(mymap);

//let mymap = L.map('mapid').setView([46.227638, 2.213749], 8);
//let mymap = L.map('mapid').setView([LATITUDE, LONGITUDE], ZOOM LEVEL);
//ZOOM LEVEL plus il est petit moins la map est zoomee, et plus il est grand plus la map est zoomee

/*L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=bjlerWscnvlz8qiBizFW', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
}).addTo(mymap);*/

/*L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);*/

//var marker1 = L.marker(domaine1).addTo(mymap);
//marker1.bindPopup("<a href='/info_winery'><b>Domaine</b><br>Château Le Bosq.</a>").openPopup();
