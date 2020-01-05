let L=require('leaflet');
const $ = require('jquery');

// the code below fixes a leaflet bug that does not import the marker images
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

//-------- variables --------//
let producers = [];
let desTab = [];
let varietyTab = [];
let mymap;
let mymap1;
let mymap2;
let mymapS;
let layerGroup;
let marker;
let initzoom;
let wineriesMap = document.getElementById("domaines");
let designationsMap = document.getElementById("appellations");
let varietiesMap = document.getElementById("cepages");
let searchResMap = document.getElementById("searchResMap");
let searchDiv = document.getElementById("search"); //div that contains the search form
let searchOpt = document.getElementById("searchOpt"); // button "Rechercher sur la carte"
let closeSearch = document.getElementById("closeSearch"); // button to close search
let resNotFound = document.getElementById("notFound"); //div to display error message
let markerArr = [];
//-------- end variables --------//

//-------- functions --------//
function sizeMap(idMap) {
    if ($("#"+idMap).width() > 460) {
        initzoom = 5.75;
        $("#"+idMap).height(500);
    } else {
        initzoom = 5;
        $("#"+idMap).height(370);
    };
}

function mapResponsiveSize(mapName, idMap) {
    window.addEventListener('resize', function(event) {
        sizeMap(idMap);
        if ($("#"+idMap).width() > 460) {
            mapName.setView([46.8527171, 2.5889735], initzoom);
        }
        else {
            mapName.setView([46.8527171, 2.5889735], initzoom);
        };
    });
}

function displayWineriesMap() {
    let response = $.get("http://127.0.0.1:8000/api/producers", function (data) {
        sizeMap("mapid");
        for (let i = 0; i < data.length; i++) {
            let producer = {
                name: data[i].name,
                lat: data[i].latitude,
                long: data[i].longitude,
                website: data[i].website
            };
            producers.push(producer);
        }
        mymap = L.map('mapid', {minZoom: 3, maxZoom: 8, zoomSnap: 0, zoomDelta: 0.25}).setView([46.8527171, 2.5889735], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
            maxZoom: 19, attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

        for (let i = 0; i < producers.length; i++) {
            marker = L.marker([producers[i].lat, producers[i].long]).addTo(mymap).addTo(mymap);
            if (producers[i].website != "") {
                marker.bindPopup("<a target=\"_blank\" href=" + producers[i].website + "><b>Domaine</b><br>" + producers[i].name + "</a>");
            } else {
                marker.bindPopup("<b>Domaine</b><br>" + producers[i].name);
            }
        }
        if(isMobileDevice()) {
            mymap.setView([46.0986268, 2.2346064], 4.5);
        }
        mapResponsiveSize(mymap, "mapid");
    })
    response.fail(function() { //code below displays map without markers + error message
        document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous avons quelques problèmes pour afficher les données, veuillez réessayer plus tard";
    });
}

function getSearchRes(data, type, search) {
    let resArr = [];
    let cpt = 0;
    markerArr = [];
    for (let i = 0; i < data.length; i++) {
        let name;
        if(type == "designation") name = data[i].designation.name.toLowerCase().trim();
        else name = data[i].variety.name.toLowerCase().trim();
        if (search == name) {
            if (resArr.length == 0) {
                let p = {
                    name: data[i].producer.name,
                    lat: data[i].producer.latitude,
                    long: data[i].producer.longitude,
                    website: data[i].producer.website
                }
                resArr.push(p);
                cpt++;
            } else if (resArr[resArr.length - 1].name != data[i].producer.name) {
                let p = {
                    name: data[i].producer.name,
                    lat: data[i].producer.latitude,
                    long: data[i].producer.longitude,
                    website: data[i].producer.website
                };
                resArr.push(p);
                cpt++;
            }
            for (let i = 0; i < resArr.length; i++) {
                marker = L.marker([resArr[i].lat, resArr[i].long]).addTo(layerGroup);
                if (resArr[i].website != "") {
                    marker.bindPopup("<a target=\"_blank\" href=" + resArr[i].website + "><b>Domaine</b><br>" + resArr[i].name + "</a><br>" + search);
                } else {
                    marker.bindPopup("<b>Domaine</b><br>" + resArr[i].name + "</a><br>" + search);
                }
                markerArr.push(marker);
            }
        }
    }
    if (resArr.length == 0) {
        resNotFound.style.display = "block";
        resNotFound.innerText = "Aucun resultat trouvé pour " + search + ".";
    } else if(cpt < 3) {
        let group = new L.featureGroup(markerArr);
        mymapS.fitBounds(group.getBounds());
    }
    if(isMobileDevice() && cpt > 3) {
        mymapS.setView([46.0986268, 2.2346064], 4.5);
    }
}

function changeMapsTabs(link1, link2, link3) {
    document.getElementById(link1).style.color = "black";
    document.getElementById(link1).style.background = "#EADFC1";
    document.getElementById(link2).style.color = "#444340"
    document.getElementById(link2).style.background = "white";
    document.getElementById(link3).style.color = "#444340";
    document.getElementById(link3).style.background = "white";
}

function radioBtEvent() {
    document.getElementById("designationRadio").addEventListener('change', function() {
        if(document.getElementById("designationRadio").checked) {
            document.getElementById("searchQuery").value = "";
            document.getElementById("searchQuery").placeholder = 'Entrez un nom d\'appellation';
        }
    });
    document.getElementById("varietyRadio").addEventListener('change', function() {
        if(document.getElementById("varietyRadio").checked) {
            document.getElementById("searchQuery").value = "";
            document.getElementById("searchQuery").placeholder = 'Entrez un nom de cépage';
        }
    });
}

function removeMap(mapName) {
    if(mapName != undefined) {
        mapName.off();
        mapName.remove();
    }
}

function isMobileDevice() {
    return (window.innerWidth <= 800 && window.innerHeight <= 600);
}
//-------- end functions --------//

document.getElementById("nav-map").setAttribute("class", "active");
designationsMap.style.display = "none";
varietiesMap.style.display = "none";
searchDiv.style.display = "none";
searchResMap.style.display = "none";

$(document).ready(function () {

    displayWineriesMap();

    document.getElementById('map1Link').addEventListener("click", function (event) {
        removeMap(mymap);
        changeMapsTabs("map1Link", "map2Link", "map3Link");
        wineriesMap.style.display = "block";
        designationsMap.style.display = "none";
        varietiesMap.style.display = "none";
        displayWineriesMap();
    });

    document.getElementById('map2Link').addEventListener("click", function (event) {
        removeMap(mymap1);
        changeMapsTabs("map2Link", "map1Link", "map3Link");
        wineriesMap.style.display = "none";
        designationsMap.style.display = "block";
        varietiesMap.style.display = "none";
        let response1 = $.get("http://127.0.0.1:8000/api/wines", function (data) {
            sizeMap("mapid1");
            for (let i = 0; i < data.length; i++) {
                if(i === 0) {
                    let des = {
                        appellation: data[i].designation.name,
                        lat: data[i].producer.latitude,
                        long: data[i].producer.longitude
                    };
                    desTab.push(des);
                } else if (desTab[desTab.length-1].lat != data[i].producer.latitude && desTab[desTab.length-1].long != data[i].producer.longitude) {
                    let des = {
                        appellation: data[i].designation.name,
                        lat: data[i].producer.latitude,
                        long: data[i].producer.longitude
                    };
                    desTab.push(des);
                }
            }
            mymap1 = L.map('mapid1', {minZoom: 3, maxZoom: 8, zoomSnap: 0, zoomDelta: 0.25}).setView([46.8527171, 2.5889735], initzoom);
            L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                maxZoom: 19, attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap1);

            for (let i = 0; i < desTab.length; i++) {
                marker = L.marker([desTab[i].lat, desTab[i].long]).addTo(mymap1);
                marker.bindPopup(desTab[i].appellation);
            }
            if(isMobileDevice()) {
                mymap1.setView([46.0986268, 2.2346064], 4.5);
            }
            mapResponsiveSize(mymap1, "mapid1");
        })
        response1.fail(function() {
            document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous avons quelques problèmes pour afficher les données, veuillez réessayer plus tard";
        });
    });

    document.getElementById('map3Link').addEventListener("click", function (event) {
        removeMap(mymap2);
        changeMapsTabs("map3Link", "map2Link", "map1Link");
        wineriesMap.style.display = "none";
        designationsMap.style.display = "none";
        varietiesMap.style.display = "block";
        let response2 = $.get("http://127.0.0.1:8000/api/wines", function (data) {
            sizeMap("mapid2");
            for (let i = 0; i < data.length; i++) {
                if(i === 0) {
                    let cepage = {
                        variety: data[i].variety.name,
                        lat: data[i].producer.latitude,
                        long: data[i].producer.longitude
                    };
                    varietyTab.push(cepage);
                } else if (varietyTab[varietyTab.length-1].lat != data[i].producer.latitude && varietyTab[varietyTab.length-1].long != data[i].producer.longitude) {
                    let cepage = {
                        variety: data[i].variety.name,
                        lat: data[i].producer.latitude,
                        long: data[i].producer.longitude
                    };
                    varietyTab.push(cepage);
                }
            }
            mymap2 = L.map('mapid2', {minZoom: 3, maxZoom: 8, zoomSnap: 0, zoomDelta: 0.25}).setView([46.8527171, 2.5889735], initzoom);
            L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                maxZoom: 19, attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap2);

            for (let i = 0; i < varietyTab.length; i++) {
                marker = L.marker([varietyTab[i].lat, varietyTab[i].long]).addTo(mymap2);
                marker.bindPopup(varietyTab[i].variety);
            }
            if(isMobileDevice()) {
                mymap2.setView([46.0986268, 2.2346064], 4.5);
            }
            mapResponsiveSize(mymap2, "mapid2");
        })
        response2.fail(function() {
            document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous avons quelques problèmes pour afficher les données, veuillez réessayer plus tard";
        })
    });

    /*----------------- CODE TO SEARCH ON MAP----------------*/
    radioBtEvent();

    searchOpt.addEventListener("click", function () {
        searchDiv.style.display = "inline";
        searchOpt.style.display = "none";
        document.getElementById("radioOptSearch").style.display = "none";
    });

    closeSearch.addEventListener("click", function () {
        searchDiv.style.display = "none";
        searchOpt.style.display = "inline";
        document.getElementById("mapsAndMenu").style.display = "block";
        searchResMap.style.display = "none";
        resNotFound.innerText = "";
        document.getElementById("searchQuery").placeholder = 'Entrez un nom d\'appellation';
        document.getElementById("searchForm").reset();
    });

    // when we click on the search button :
    document.getElementById("searchBt").addEventListener("click", function () {
        let search = document.getElementById("searchQuery").value.toLowerCase().trim();
        if(search == "") {
            resNotFound.style.display = "block";
            resNotFound.innerText = "Veuillez entrez un mot."
        } else {
            removeMap(mymapS);
            document.getElementById("mapsAndMenu").style.display = "none";
            if(layerGroup != undefined) {
                layerGroup.clearLayers();
            }
            document.getElementById("searchResMap").style.display = "block";
            let response = $.get("http://127.0.0.1:8000/api/wines", function (data) {
                sizeMap("searchResMap");
                mymapS = L.map('searchResMap', {minZoom: 3, maxZoom: 8, zoomSnap: 0, zoomDelta: 0.25}).setView([46.8527171, 2.5889735], initzoom);
                L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                    maxZoom: 19, attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymapS);

                mapResponsiveSize(mymapS, "searchResMap");
                layerGroup = L.layerGroup().addTo(mymapS);

                if (document.getElementById("designationRadio").checked) {
                    getSearchRes(data, "designation", search);
                }
                if (document.getElementById("varietyRadio").checked) {
                    getSearchRes(data, "variety", search);
                }
            })
            response.fail(function() {
                document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous avons quelques problèmes pour afficher les données, veuillez réessayer plus tard";
            });
            resNotFound.innerText = "";
        }
    });
});