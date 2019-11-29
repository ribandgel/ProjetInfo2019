let L=require('leaflet');
let $ = require('jquery');

//this fixes a leaflet bug that does not import the marker images if we don't add those lines
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

let producers = [];
let producer = {};
let mymap;
let layerGroup;
let marker;

$(document).ready(function () {
    $.get("http://127.0.0.1:8000/api/producers", function (data) {
        for (let i = 0; i < data.length; i++) {
            let obj = data[i];
            let name = obj.name;
            let lat = obj.latitude;
            let long = obj.longitude;
            let producer = {
                name: obj.name,
                lat: obj.latitude,
                long: obj.longitude
            };
            producers.push(producer);
        }
        mymap = L.map('mapid').setView([46.227638, 2.213749], 6);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

        layerGroup = L.layerGroup().addTo(mymap);
        for (let i = 0; i < producers.length; i++) {
            marker = L.marker([producers[i].lat, producers[i].long]).addTo(layerGroup);
            marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + producers[i].name + "</a>");
        }
    });

    let searchDiv = document.getElementById("search");
    searchDiv.style.display = "none";
    let searchOpt = document.getElementById("searchOpt");

    searchOpt.addEventListener("click", function () {
        searchDiv.hidden = false;
    });

    let dropDwnContent = document.getElementById("dropdown-content");

    searchOpt.addEventListener("click", function () {
        searchDiv.style.display = "inline";
        searchOpt.style.display = "none";
        dropDwnContent.style.display = "none";
    });

    /*----------------------------STUFFS TO FILTER SEARCH ON MAP-------------------------------*/
    let searchBt = document.getElementById("searchBt"); //le boutton rechercher
    let radioOpt = document.getElementsByName('searchOption'); //le radio bt chosen by user to filter by
    let resNotDFound = document.getElementById('notFound');

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
            layerGroup.clearLayers();
            let ps = [];
            let p = {};
            let search = document.getElementById("searchQuery").value; //ce qu'a ecrit l'utilisateur dans la barre de recherche
            for (let i = 0; i < radioOpt.length; i++) {
                if (radioOpt[i].checked) {
                    $.get("http://127.0.0.1:8000/api/wines", function (data) {
                        if (radioOpt[i].value === "appellation") {
                            for (let i = 0; i < data.length; i++) {
                                let obj = data[i];
                                console.log("DATA[i] = " + data[i]);
                                let name = obj.designation.name;
                                //console.log("NAME = " + name);
                                if(search == name) {
                                    p.name = obj.producer.name;
                                    //console.log("name found = " + p.name);
                                    p.lat = obj.producer.latitude;
                                    //console.log("name found = " + p.lat);
                                    p.long = obj.producer.longitude;
                                    //console.log("name found = " + p.long);
                                    ps.push(p);
                                    for (let i = 0; i < ps.length; i++) {
                                        marker = L.marker([ps[i].lat, ps[i].long]).addTo(layerGroup);
                                        marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + ps[i].name + "</a>");
                                    }
                                }
                            }
                            if(ps.length == 0) {
                                resNotDFound.innerText = "Pas de résultats."
                            }
                        }
                        if (radioOpt[i].value === "couleur") {
                            for (let i = 0; i < data.length; i++) {
                                let obj = data[i];
                                let color = obj.color.color;
                                //console.log("COLOR = " + color);
                                if(search == color) {
                                    p.name = obj.producer.name;
                                    //console.log("name found = " + p.name);
                                    p.lat = obj.producer.latitude;
                                    //console.log("name found = " + p.lat);
                                    p.long = obj.producer.longitude;
                                    //console.log("name found = " + p.long);
                                    ps.push(p);
                                    for (let i = 0; i < ps.length; i++) {
                                        marker = L.marker([ps[i].lat, ps[i].long]).addTo(layerGroup);
                                        marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + ps[i].name + "</a>");
                                    }
                                }
                            }
                        }
                        if (radioOpt[i].value === "cepage") {
                            for (let i = 0; i < data.length; i++) {
                                let obj = data[i];
                                let variety = obj.variety.name;
                                if(search == variety) {
                                    p.name = obj.producer.name;
                                    //console.log("name found = " + p.name);
                                    p.lat = obj.producer.latitude;
                                    //console.log("name found = " + p.lat);
                                    p.long = obj.producer.longitude;
                                    //console.log("name found = " + p.long);
                                    ps.push(p);
                                    for (let i = 0; i < ps.length; i++) {
                                        marker = L.marker([ps[i].lat, ps[i].long]).addTo(layerGroup);
                                        marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + ps[i].name + "</a>");
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });
    });


