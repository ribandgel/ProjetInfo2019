let L=require('leaflet');
let $ = require('jquery');

/* -------------
* this fixes a leaflet bug that does not import the marker images if we don't add those lines
*/
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
/* ----------------------------*/

let producers = [];
let desTab = [];
let varietyTab = [];
let mymap;
let mymap1;
let mymap2;
let mymapS;
let layerGroup;
let marker;
let bigmapheight = 500;
let smallmapheight = 300;
let mapbreakwidth = 720;
let highzoom = 6;
let lowzoom = 4;
let initzoom;
let wineriesMap = document.getElementById("domaines");
let designationsMap = document.getElementById("appellations");
let varietiesMap = document.getElementById("cepages");

function resetSearch() {
    document.getElementById("notFound").innerText = "";
    $("#designationRadio").prop("checked", true);
}

document.getElementById("nav-map").setAttribute("class", "active");

$(document).ready(function () {
    document.getElementById("searchResMap").style.display = "none";
    $.get("http://127.0.0.1:8000/api/producers", function (data, status) {
        if(status == "success") {
            for (let i = 0; i < data.length; i++) {
                let obj = data[i];
                let producer = {
                    name: obj.name,
                    lat: obj.latitude,
                    long: obj.longitude,
                    website: obj.website
                };
                producers.push(producer);
            }

            if ($("#mapid").width() > mapbreakwidth) {
                initzoom = highzoom;
                $("#mapid").height(bigmapheight);
            } else {
                initzoom = lowzoom;
                $("#mapid").height(smallmapheight);
            };

            mymap = L.map('mapid', {minZoom: 5, maxZoom: 8}).setView([46.227638, 2.213749], initzoom);
            L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap);

            for (let i = 0; i < producers.length; i++) {
                marker = L.marker([producers[i].lat, producers[i].long]).addTo(mymap).addTo(mymap);
                if (producers[i].website != "") {
                    marker.bindPopup("<a target=\"_blank\" href=" + producers[i].website + "><b>Domaine</b><br>" + producers[i].name + "</a>");
                } else {
                    marker.bindPopup("<b>Domaine</b><br>" + producers[i].name);
                }
            }
        } else {
            //display map without markers + error message
            document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous n'avons pas pu trouver les données sur les domaines";
            if ($("#mapid").width() > mapbreakwidth) {
                initzoom = highzoom;
                $("#mapid").height(bigmapheight);
            } else {
                initzoom = lowzoom;
                $("#mapid").height(smallmapheight);
            };

            mymap = L.map('mapid', {minZoom: 5, maxZoom: 8}).setView([46.227638, 2.213749], initzoom);
            L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap);
        }
        });

    designationsMap.style.display = "none";
    varietiesMap.style.display = "none";

    // listen for screen resize events and changes map size and zoom accordingly
    //check first for which map is active
    //if ...
    window.addEventListener('resize', function(event) {
        if ($("#mapid").width() > mapbreakwidth) {
            initzoom = highzoom;
            $("#mapid").height(bigmapheight);
            mymap.setView([46.227638, 2.213749], initzoom );
        }
        else {
            initzoom = lowzoom;
            $("#mapid").height(smallmapheight);
            mymap.setView([46.227638, 2.213749], initzoom );
        };
    });

    document.getElementById('map1Link').addEventListener("click", function (event) {
        document.getElementById('map1Link').style.color = "black";
        document.getElementById('map1Link').style.background = "#EADFC1";
        document.getElementById('map2Link').style.color = "#444340"
        document.getElementById('map2Link').style.background = "white";
        document.getElementById('map3Link').style.color = "#444340"
        document.getElementById('map3Link').style.background = "white";
        wineriesMap.style.display = "block";
        designationsMap.style.display = "none";
        varietiesMap.style.display = "none";
        $.get("http://127.0.0.1:8000/api/producers", function (data, status) {
            if(status == "success") {
                for (let i = 0; i < data.length; i++) {
                    let obj = data[i];
                    let producer = {
                        name: obj.name,
                        lat: obj.latitude,
                        long: obj.longitude,
                        website: obj.website
                    };
                    producers.push(producer);
                }

                if ($("#mapid").width() > mapbreakwidth) {
                    initzoom = highzoom;
                    $("#mapid").height(bigmapheight);
                } else {
                    initzoom = lowzoom;
                    $("#mapid").height(smallmapheight);
                };

                mymap = L.map('mapid', {minZoom: 5, maxZoom: 8}).setView([46.227638, 2.213749], initzoom);
                L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap);

                for (let i = 0; i < producers.length; i++) {
                    marker = L.marker([producers[i].lat, producers[i].long]).addTo(mymap);
                    if (producers[i].website != "") {
                        marker.bindPopup("<a target=\"_blank\" href=" + producers[i].website + "><b>Domaine</b><br>" + producers[i].name + "</a>");
                    } else {
                        marker.bindPopup("<b>Domaine</b><br>" + producers[i].name);
                    }
                }
            } else {
                //display map without markers + error message
                document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous n'avons pas pu trouver les données sur les domaines";
                if ($("#mapid").width() > mapbreakwidth) {
                    initzoom = highzoom;
                    $("#mapid").height(bigmapheight);
                } else {
                    initzoom = lowzoom;
                    $("#mapid").height(smallmapheight);
                };

                mymap = L.map('mapid', {minZoom: 5, maxZoom: 8}).setView([46.227638, 2.213749], initzoom);
                L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap);
            }
        });
    });

    document.getElementById('map2Link').addEventListener("click", function (event) {
        document.getElementById('map2Link').style.color = "black";
        document.getElementById('map2Link').style.background = "#EADFC1";
        document.getElementById('map1Link').style.color = "#444340"
        document.getElementById('map1Link').style.background = "white";
        document.getElementById('map3Link').style.color = "#444340"
        document.getElementById('map3Link').style.background = "white";
        wineriesMap.style.display = "none";
        designationsMap.style.display = "block";
        varietiesMap.style.display = "none";
        $.get("http://127.0.0.1:8000/api/wines", function (data, status) {
            if(status == "success") {
                for (let i = 0; i < data.length; i++) {
                    let obj = data[i];
                    let des = {
                        appellation: obj.designation.name,
                        lat: obj.producer.latitude,
                        long: obj.producer.longitude
                    };
                    desTab.push(des);
                }

                if ($("#mapid1").width() > mapbreakwidth) {
                    initzoom = highzoom;
                    $("#mapid1").height(bigmapheight);
                } else {
                    initzoom = lowzoom;
                    $("#mapid1").height(smallmapheight);
                };

                mymap1 = L.map('mapid1', {minZoom: 5, maxZoom: 8}).setView([46.227638, 2.213749], initzoom);
                L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap1);

                for (let i = 0; i < desTab.length; i++) {
                    marker = L.marker([desTab[i].lat, desTab[i].long]).addTo(mymap1);
                    marker.bindPopup(desTab[i].appellation);
                }
            } else {
                //display map without markers + error message
                document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous n'avons pas pu trouver les données sur les appellations";
                if ($("#mapid").width() > mapbreakwidth) {
                    initzoom = highzoom;
                    $("#mapid").height(bigmapheight);
                } else {
                    initzoom = lowzoom;
                    $("#mapid").height(smallmapheight);
                };

                mymap = L.map('mapid', {minZoom: 5, maxZoom: 8}).setView([46.227638, 2.213749], initzoom);
                L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap);
            }
        });
    });

    document.getElementById('map3Link').addEventListener("click", function (event) {
        document.getElementById('map3Link').style.color = "black";
        document.getElementById('map3Link').style.background = "#EADFC1";
        document.getElementById('map2Link').style.color = "#444340"
        document.getElementById('map2Link').style.background = "white";
        document.getElementById('map1Link').style.color = "#444340"
        document.getElementById('map1Link').style.background = "white";
        wineriesMap.style.display = "none";
        designationsMap.style.display = "none";
        varietiesMap.style.display = "block";
        $.get("http://127.0.0.1:8000/api/wines", function (data, status) {
            if(status == "success") {
                for (let i = 0; i < data.length; i++) {
                    let obj = data[i];
                    let cepage = {
                        variety: obj.variety.name,
                        lat: obj.producer.latitude,
                        long: obj.producer.longitude
                    };
                    varietyTab.push(cepage);
                }

                if ($("#mapid2").width() > mapbreakwidth) {
                    initzoom = highzoom;
                    $("#mapid2").height(bigmapheight);
                } else {
                    initzoom = lowzoom;
                    $("#mapid2").height(smallmapheight);
                };

                mymap2 = L.map('mapid2', {minZoom: 5, maxZoom: 8}).setView([46.227638, 2.213749], initzoom);
                L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap2);

                for (let i = 0; i < varietyTab.length; i++) {
                    marker = L.marker([varietyTab[i].lat, varietyTab[i].long]).addTo(mymap2);
                    marker.bindPopup(varietyTab[i].variety);
                }
            } else {
                //display map without markers + error message
                document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous n'avons pas pu trouver les données sur les cépages";
                if ($("#mapid").width() > mapbreakwidth) {
                    initzoom = highzoom;
                    $("#mapid").height(bigmapheight);
                } else {
                    initzoom = lowzoom;
                    $("#mapid").height(smallmapheight);
                };

                mymap = L.map('mapid', {minZoom: 5, maxZoom: 8}).setView([46.227638, 2.213749], initzoom);
                L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap);
            }
        });
    });

    let searchDiv = document.getElementById("search");
    searchDiv.style.display = "none";
    let searchOpt = document.getElementById("searchOpt");
    let closeSearch = document.getElementById("closeSearch");

    searchOpt.addEventListener("click", function () {
        searchDiv.hidden = false;
    });

    let radioOptSearch = document.getElementById("radioOptSearch");

    searchOpt.addEventListener("click", function () {
        searchDiv.style.display = "inline";
        searchOpt.style.display = "none";
        radioOptSearch.style.display = "none";
    });

    /*----------------------------STUFFS TO FILTER SEARCH ON MAP-------------------------------*/
    let searchBt = document.getElementById("searchBt"); //le boutton rechercher
    let radioOpt = document.getElementsByName('searchOption'); //le radio bt chosen by user to filter by
    let resNotDFound = document.getElementById('notFound');


    closeSearch.addEventListener("click", function () {
        searchDiv.style.display = "none";
        searchOpt.style.display = "inline";
        document.getElementById("mapsAndMenu").style.display = "block";
        document.getElementById("searchResMap").style.display = "none";
        resNotDFound.innerText = "";
        document.getElementById("searchForm").reset();
    });

    /*....controls the placeholder of the search bar when picking different filtering options from the radio buttons ....*/
    let prev = null;
    for (let i = 0; i < radioOpt.length; i++) {
        radioOpt[i].addEventListener('change', function() {
            //(prev) ? console.log(prev.value): null;
            if (this !== prev) {
                prev = this;
            }
            for (let i = 0, length = radioOpt.length; i < length; i++) {
                if(radioOpt[i].checked) {
                    //console.log("radio checked = " + radioOpt[i].value);
                    if(radioOpt[i].value === "appellation") {
                        document.getElementById("searchQuery").placeholder = 'Entrez un nom d\'appellation';
                    }
                    if(radioOpt[i].value === "couleur") {
                        document.getElementById("searchQuery").placeholder = 'Entrez une couleur';
                    }
                    if(radioOpt[i].value === "cepage") {
                        document.getElementById("searchQuery").placeholder = 'Entrez un nom de cépage';
                    }
                }
            //console.log(this.value)
        }
        });
    }
    /*.............................................................................................................*/

        searchBt.addEventListener("click", function () {
            if(mymapS != undefined) {
                mymapS.off();
                mymapS.remove();
            }
            document.getElementById("mapsAndMenu").style.display = "none";
            document.getElementById("searchResMap").style.display = "block";
            if(layerGroup != undefined) {
                layerGroup.clearLayers();
            }
            let ps = [];
            let p = {};
            let search = document.getElementById("searchQuery").value; //user input in search bar
            for (let i = 0; i < radioOpt.length; i++) {
                if (radioOpt[i].checked) {
                    $.get("http://127.0.0.1:8000/api/wines", function (data) {

                        if ($("#searchResMap").width() > mapbreakwidth) {
                            initzoom = highzoom;
                            $("#searchResMap").height(bigmapheight);
                        } else {
                            initzoom = lowzoom;
                            $("#searchResMap").height(smallmapheight);
                        };

                        mymapS = L.map('searchResMap', {minZoom: 5, maxZoom: 8}).setView([46.227638, 2.213749], initzoom);
                        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                            maxZoom: 19,
                            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        }).addTo(mymapS);

                        layerGroup = L.layerGroup().addTo(mymapS);

                        if (radioOpt[i].value === "appellation") {
                            for (let i = 0; i < data.length; i++) {
                                let obj = data[i];
                                // console.log("DATA[i] = " + data[i]);
                                let name = obj.designation.name;
                                if(search.toLowerCase().trim() == name.toLowerCase().trim()) {
                                    p.name = obj.producer.name;
                                    p.lat = obj.producer.latitude;
                                    p.long = obj.producer.longitude;
                                    p.website = obj.producer.website;
                                    ps.push(p);
                                    for (let i = 0; i < ps.length; i++) {
                                        marker = L.marker([ps[i].lat, ps[i].long]).addTo(layerGroup);
                                        if (ps[i].website != "") {
                                            marker.bindPopup("<a target=\"_blank\" href=" + ps[i].website + "><b>Domaine</b><br>" + ps[i].name + "</a>");
                                        } else {
                                            marker.bindPopup("<b>Domaine</b><br>" + ps[i].name);
                                        }
                                    }
                                }
                            }
                            if(search == "") {
                                resNotDFound.innerText = "Veuillez entrez un mot."
                            }
                            if(search != "" && ps.length == 0) {
                                resNotDFound.innerText = "Aucun resultat trouve pour " + search + ".";
                            }
                        }
                        if (radioOpt[i].value === "couleur") {
                            for (let i = 0; i < data.length; i++) {
                                let obj = data[i];
                                let color = obj.color.color;
                                if(search.toLowerCase().trim() == color.toLowerCase().trim()) {
                                    p.name = obj.producer.name;
                                    p.lat = obj.producer.latitude;
                                    p.long = obj.producer.longitude;
                                    p.website = obj.producer.website;
                                    ps.push(p);
                                    for (let i = 0; i < ps.length; i++) {
                                        marker = L.marker([ps[i].lat, ps[i].long]).addTo(layerGroup);
                                        if (ps[i].website != "") {
                                            marker.bindPopup("<a target=\"_blank\" href=" + ps[i].website + "><b>Domaine</b><br>" + ps[i].name + "</a>");
                                        } else {
                                            marker.bindPopup("<b>Domaine</b><br>" + ps[i].name);
                                        }
                                    }
                                }
                            }
                            if(search == "") {
                                resNotDFound.innerText = "Veuillez entrez un mot."
                            }
                            if(search != "" && ps.length == 0) {
                                resNotDFound.innerText = "Aucun resultat trouve pour " + search + ".";
                            }
                        }
                        if (radioOpt[i].value === "cepage") {
                            for (let i = 0; i < data.length; i++) {
                                let obj = data[i];
                                let variety = obj.variety.name;
                                if(search.toLowerCase().trim() == variety.toLowerCase().trim()) {
                                    p.name = obj.producer.name;
                                    p.lat = obj.producer.latitude;
                                    p.long = obj.producer.longitude;
                                    p.website = obj.producer.website;
                                    ps.push(p);
                                    for (let i = 0; i < ps.length; i++) {
                                        marker = L.marker([ps[i].lat, ps[i].long]).addTo(layerGroup);
                                        if (ps[i].website != "") {
                                            marker.bindPopup("<a target=\"_blank\" href=" + ps[i].website + "><b>Domaine</b><br>" + ps[i].name + "</a>");
                                        } else {
                                            marker.bindPopup("<b>Domaine</b><br>" + ps[i].name);
                                        }
                                    }
                                }
                            }
                            if(search == "") {
                                resNotDFound.innerText = "Veuillez entrez un mot."
                            }
                            if(search != "" && ps.length == 0) {
                                resNotDFound.innerText = "Aucun resultat trouve pour " + search + ".";
                            }
                        }
                    });
                }
            }
            resNotDFound.innerText = "";
            document.getElementById("searchForm").reset();
        });
    });

// The Leaflet L.Map class provides the fitBounds method to zoom a map to contain a rectangular bounding box.
// The L.latLngBounds utility function creates a bounding box object from an array of latitude and longitude coordinates.
// With a single marker, however, we only have one latitude and longitude coordinate from which to create the bounding box.
// The solution is to create a single-element array containing the latitude and longitude coordinate of the marker.

// The following function centers and zooms a leaflet map on a single marker. Line 2 creates the single-element array containing
// the latitude and longitude coordinate of the marker. Line 3 creates the bounding box that encloses the marker’s location. Finally,
// line 4 zooms the map to enclose the bounding box.

// function centerLeafletMapOnMarker(map, marker) {
//     var latLngs = [ marker.getLatLng() ];
//     var markerBounds = L.latLngBounds(latLngs);
//     map.fitBounds(markerBounds);
// }
