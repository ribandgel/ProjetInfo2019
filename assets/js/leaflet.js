let L=require('leaflet');
const $ = require('jquery');

// line 132 no need for for loop probably needs to take care of hat first then we can count more easily
// the issue is cpt can be > 3 and only have one winery associated with it. ex moulis so how can we really count ? line 343

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
let bigmapheight = 500;
let smallmapheight = 370;
let mapbreakwidth = 460;
let highzoom = 5.75;
let mediumZoom = 5;
// let lowzoom = 3;
let initzoom;
let wineriesMap = document.getElementById("domaines");
let designationsMap = document.getElementById("appellations");
let varietiesMap = document.getElementById("cepages");
let searchResMap = document.getElementById("searchResMap");
let searchDiv = document.getElementById("search"); //div that contains the search form
let searchOpt = document.getElementById("searchOpt"); // button "Rechercher sur la carte"
let closeSearch = document.getElementById("closeSearch"); // button to close search
let radioOptSearch = document.getElementById("radioOptSearch"); // radio buttons
let radioOpt = document.getElementsByName("searchOption"); //le radio bt chosen by user to filter by
let resNotFound = document.getElementById("notFound"); //div to display error message
// let mobile;
let markerArr = [];
//-------- end variables --------//

//-------- functions --------//
function sizeMap(idMap) {
    if ($("#"+idMap).width() > mapbreakwidth) {
        initzoom = highzoom;
        $("#"+idMap).height(bigmapheight);
    } else {
        initzoom = mediumZoom;
        $("#"+idMap).height(smallmapheight);
    };
}

function mapResponsiveSize(mapName, idMap) {
    window.addEventListener('resize', function(event) {
        sizeMap(idMap);
        // if(isMobileDevice()) {
        //     console.log("MOBILE FUNCTION");
        //     mymap.setView([46.0986268, 2.2346064], 4.5);
        // }
        if ($("#"+idMap).width() > mapbreakwidth) {
            mapName.setView([46.8527171, 2.5889735], initzoom);
        }
        else {
            mapName.setView([46.8527171, 2.5889735], initzoom);
        };
    });
}
function displayWineriesMap() {
    $.get("http://127.0.0.1:8000/api/producers", function (data, status) {
        sizeMap("mapid");
        if(status == "success") {
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
        } else { //code below displays map without markers + error message
            document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous n'avons pas pu trouver les données sur les domaines";
            mymap = L.map('mapid', {minZoom: 4, maxZoom: 8, zoomSnap: 0, zoomDelta: 0.25}).setView([46.8527171, 2.5889735], initzoom);
            L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap);
        }
        if(isMobileDevice()) {
            mymap.setView([46.0986268, 2.2346064], 4.5);
        }
        mapResponsiveSize(mymap, "mapid");
    });
}

function changeMapsTabs(link1, link2, link3) {
    document.getElementById(link1).style.color = "black";
    document.getElementById(link1).style.background = "#EADFC1";
    document.getElementById(link2).style.color = "#444340"
    document.getElementById(link2).style.background = "white";
    document.getElementById(link3).style.color = "#444340";
    document.getElementById(link3).style.background = "white";
}

function gatherSearchRes(obj, search) {
    let arr = [];
    markerArr = [];
    let p = {
        name: obj.producer.name,
        lat: obj.producer.latitude,
        long: obj.producer.longitude,
        website: obj.producer.website
    }
    arr.push(p);
    marker = L.marker([arr[0].lat, arr[0].long]).addTo(layerGroup);
    if (arr[0].website != "") {
        marker.bindPopup("<a target=\"_blank\" href=" + arr[0].website + "><b>Domaine</b><br>" + arr[0].name + "</a><br>" + search);
    } else {
        marker.bindPopup("<b>Domaine</b><br>" + arr[0].name);
    }
    markerArr.push(marker);
    return arr;
}

function radioBtEvent() {/* code below controls the placeholder of the search bar when picking different filtering options through the radio buttons */
    let prev = null;
    for (let i = 0; i < radioOpt.length; i++) {
        radioOpt[i].addEventListener('change', function() {
            if (this !== prev) { prev = this; }
            for (let i = 0, length = radioOpt.length; i < length; i++) {
                if(radioOpt[i].checked) {
                    if(radioOpt[i].value === "appellation") {
                        document.getElementById("searchQuery").value = "";
                        document.getElementById("searchQuery").placeholder = 'Entrez un nom d\'appellation';
                    } else if(radioOpt[i].value === "cepage") {
                        document.getElementById("searchQuery").value = "";
                        document.getElementById("searchQuery").placeholder = 'Entrez un nom de cépage';
                    }
                }
            }
        });
    }
}

function isMobileDevice() {
    return (window.innerWidth <= 800 && window.innerHeight <= 600);
};
//-------- end functions --------//

document.getElementById("nav-map").setAttribute("class", "active");
designationsMap.style.display = "none";
varietiesMap.style.display = "none";
searchDiv.style.display = "none";
searchResMap.style.display = "none";

$(document).ready(function () {

    // mobile = isMobileDevice();
    displayWineriesMap();

    document.getElementById('map1Link').addEventListener("click", function (event) {
        if(mymap != undefined) {
            mymap.off();
            mymap.remove();
        }
        changeMapsTabs("map1Link", "map2Link", "map3Link");
        wineriesMap.style.display = "block";
        designationsMap.style.display = "none";
        varietiesMap.style.display = "none";
        displayWineriesMap();
    });

    document.getElementById('map2Link').addEventListener("click", function (event) {
        if(mymap1 != undefined) {
            mymap1.off();
            mymap1.remove();
        }
        changeMapsTabs("map2Link", "map1Link", "map3Link");
        wineriesMap.style.display = "none";
        designationsMap.style.display = "block";
        varietiesMap.style.display = "none";
        $.get("http://127.0.0.1:8000/api/wines", function (data, status) {
            sizeMap("mapid1");
            if(status == "success") {
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
            } else { //code below displays map without markers + error message
                document.getElementById('errorMsgApiNotWorking1').innerText = "Désolé nous n'avons pas pu trouver les données sur les appellations";

                mymap1 = L.map('mapid1', {minZoom: 3, maxZoom: 8, zoomSnap: 0, zoomDelta: 0.25}).setView([46.8527171, 2.5889735], initzoom);
                L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap1);
            }
            if(isMobileDevice()) {
                mymap1.setView([46.0986268, 2.2346064], 4.5);
            }
            mapResponsiveSize(mymap1, "mapid1");
        });
    });

    document.getElementById('map3Link').addEventListener("click", function (event) {
        if(mymap2 != undefined) {
            mymap2.off();
            mymap2.remove();
        }
        changeMapsTabs("map3Link", "map2Link", "map1Link");
        wineriesMap.style.display = "none";
        designationsMap.style.display = "none";
        varietiesMap.style.display = "block";
        $.get("http://127.0.0.1:8000/api/wines", function (data, status) {
            sizeMap("mapid2");
            if(status == "success") {
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
            } else { //code below displays map without markers + error message
                document.getElementById('errorMsgApiNotWorking2').innerText = "Désolé nous n'avons pas pu trouver les données sur les cépages";

                mymap2 = L.map('mapid2', {minZoom: 3, maxZoom: 8, zoomSnap: 0, zoomDelta: 0.25}).setView([46.8527171, 2.5889735], initzoom);
                L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap2);
            }
            if(isMobileDevice()) {
                mymap2.setView([46.0986268, 2.2346064], 4.5);
            }
            mapResponsiveSize(mymap2, "mapid2");
        });
    });

    /*----------------- CODE TO FILTER SEARCH ON MAP----------------*/
    searchOpt.addEventListener("click", function () {
        searchDiv.style.display = "inline";
        searchOpt.style.display = "none";
        radioOptSearch.style.display = "none";
    });

    closeSearch.addEventListener("click", function () {
        searchDiv.style.display = "none";
        searchOpt.style.display = "inline";
        document.getElementById("mapsAndMenu").style.display = "block";
        searchResMap.style.display = "none";
        resNotFound.innerText = "";
        document.getElementById("searchForm").reset();
    });

    radioBtEvent();

    // when we click on the search button :
    document.getElementById("searchBt").addEventListener("click", function () {
        let search = document.getElementById("searchQuery").value.toLowerCase().trim();
        if(search == "") {
            resNotFound.style.display = "block";
            resNotFound.innerText = "Veuillez entrez un mot."
        } else {
            if(mymapS != undefined) {
                mymapS.off();
                mymapS.remove();
            }
            document.getElementById("mapsAndMenu").style.display = "none";
            if(layerGroup != undefined) {
                layerGroup.clearLayers();
            }
            document.getElementById("searchResMap").style.display = "block";
            let resArr = [];
            let cpt = 0;
                    $.get("http://127.0.0.1:8000/api/wines", function (data) {
                        sizeMap("searchResMap");
                        mymapS = L.map('searchResMap', {minZoom: 3, maxZoom: 8, zoomSnap: 0, zoomDelta: 0.25}).setView([46.8527171, 2.5889735], initzoom);
                        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
                            maxZoom: 19, attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        }).addTo(mymapS);

                        mapResponsiveSize(mymapS, "searchResMap");
                        layerGroup = L.layerGroup().addTo(mymapS);

                        if (document.getElementById("designationRadio").checked) {
                            for (let i = 0; i < data.length; i++) {
                                if(search == data[i].designation.name.toLowerCase().trim()) {
                                    markerArr = [];
                                    if(resArr.length == 0) {
                                        console.log("hello 1");
                                        let p = {
                                            name: data[i].producer.name,
                                            lat: data[i].producer.latitude,
                                            long: data[i].producer.longitude,
                                            website: data[i].producer.website
                                        }
                                        resArr.push(p);
                                        cpt = cpt+1;
                                    } else if (resArr[resArr.length-1].name != data[i].producer.name) {
                                        let p = {
                                            name: data[i].producer.name,
                                            lat: data[i].producer.latitude,
                                            long: data[i].producer.longitude,
                                            website: data[i].producer.website
                                        }
                                        resArr.push(p);
                                        cpt = cpt+1;
                                    }
                                    // console.log("total cpt = " + cpt);
                                    for (let i = 0; i < resArr.length; i++) {
                                        marker = L.marker([resArr[i].lat, resArr[i].long]).addTo(layerGroup);
                                        if (resArr[i].website != "") {
                                            marker.bindPopup("<a target=\"_blank\" href=" + resArr[i].website + "><b>Domaine</b><br>" + resArr[i].name + "</a><br>" + search);
                                        } else {
                                            marker.bindPopup("<b>Domaine</b><br>" + resArr[i].name);
                                        }
                                        markerArr.push(marker);
                                    }
                                    // resArr = gatherSearchRes(data[i], search);
                                }
                            }

                            if(resArr.length == 0) {
                                resNotFound.style.display = "block";
                                resNotFound.innerText = "Aucun resultat trouvé pour " + search + ".";
                            } else if(cpt < 3) {
                                let group = new L.featureGroup(markerArr);
                                mymapS.fitBounds(group.getBounds());
                            }
                        }

                        if (document.getElementById("varietyRadio").checked) {
                            for (let i = 0; i < data.length; i++) {
                                if (search == data[i].variety.name.toLowerCase().trim()) {
                                    markerArr = [];
                                    if (resArr.length == 0) {
                                        // console.log("hello 1");
                                        let p = {
                                            name: data[i].producer.name,
                                            lat: data[i].producer.latitude,
                                            long: data[i].producer.longitude,
                                            website: data[i].producer.website
                                        }
                                        resArr.push(p);
                                        cpt = cpt + 1;
                                    } else if (resArr[resArr.length - 1].name != data[i].producer.name) {
                                        // console.log("hello 2");
                                        let p = {
                                            name: data[i].producer.name,
                                            lat: data[i].producer.latitude,
                                            long: data[i].producer.longitude,
                                            website: data[i].producer.website
                                        };
                                        resArr.push(p);
                                        cpt = cpt + 1;
                                    }
                                    // console.log("total cpt = " + cpt);
                                    for (let i = 0; i < resArr.length; i++) {
                                        marker = L.marker([resArr[i].lat, resArr[i].long]).addTo(layerGroup);
                                        if (resArr[i].website != "") {
                                            marker.bindPopup("<a target=\"_blank\" href=" + resArr[i].website + "><b>Domaine</b><br>" + resArr[i].name + "</a><br>" + search);
                                        } else {
                                            marker.bindPopup("<b>Domaine</b><br>" + resArr[i].name);
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
                        }
                        if(isMobileDevice() && cpt > 3) {
                            console.log("MOBILE SEARCH");
                            mymapS.setView([46.0986268, 2.2346064], 4.5);
                        }
                    });
            resNotFound.innerText = "";
        }
    });
});
