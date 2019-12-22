(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["leaflet"],{

/***/ "./assets/js/leaflet.js":
/*!******************************!*\
  !*** ./assets/js/leaflet.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.string.trim */ "./node_modules/core-js/modules/es.string.trim.js");

var L = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");

var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* -------------
* this fixes a leaflet bug that does not import the marker images if we don't add those lines
*/


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon-2x.png */ "./node_modules/leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon.png */ "./node_modules/leaflet/dist/images/marker-icon.png"),
  shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "./node_modules/leaflet/dist/images/marker-shadow.png")
});
/* ----------------------------*/

var producers = [];
var desTab = [];
var varietyTab = [];
var mymap;
var mymap1;
var mymap2;
var mymapS;
var layerGroup;
var marker;
var bigmapheight = 500;
var smallmapheight = 300;
var mapbreakwidth = 720;
var highzoom = 6;
var lowzoom = 4;
var initzoom;
var wineriesMap = document.getElementById("domaines");
var designationsMap = document.getElementById("appellations");
var varietiesMap = document.getElementById("cepages");

function resetSearch() {
  document.getElementById("notFound").innerText = "";
  $("#designationRadio").prop("checked", true);
}

document.getElementById("nav-map").setAttribute("class", "active");
$(document).ready(function () {
  document.getElementById("searchResMap").style.display = "none";
  $.get("http://127.0.0.1:8000/api/producers", function (data, status) {
    if (status == "success") {
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var producer = {
          name: obj.name,
          lat: obj.latitude,
          "long": obj.longitude,
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
      }

      ;
      mymap = L.map('mapid', {
        minZoom: 5,
        maxZoom: 8
      }).setView([46.227638, 2.213749], initzoom);
      L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mymap);

      for (var _i = 0; _i < producers.length; _i++) {
        marker = L.marker([producers[_i].lat, producers[_i]["long"]]).addTo(mymap).addTo(mymap);

        if (producers[_i].website != "") {
          marker.bindPopup("<a target=\"_blank\" href=" + producers[_i].website + "><b>Domaine</b><br>" + producers[_i].name + "</a>");
        } else {
          marker.bindPopup("<b>Domaine</b><br>" + producers[_i].name);
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
      }

      ;
      mymap = L.map('mapid', {
        minZoom: 5,
        maxZoom: 8
      }).setView([46.227638, 2.213749], initzoom);
      L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mymap);
    }
  });
  designationsMap.style.display = "none";
  varietiesMap.style.display = "none"; // listen for screen resize events and changes map size and zoom accordingly

  window.addEventListener('resize', function (event) {
    if ($("#mapid").width() > mapbreakwidth) {
      initzoom = highzoom;
      $("#mapid").height(bigmapheight);
      mymap.setView([46.227638, 2.213749], initzoom);
    } else {
      initzoom = lowzoom;
      $("#mapid").height(smallmapheight);
      mymap.setView([46.227638, 2.213749], initzoom);
    }

    ;
  });
  document.getElementById('map1Link').addEventListener("click", function (event) {
    if (mymap != undefined) {
      mymap.off();
      mymap.remove();
    }

    document.getElementById('map1Link').style.color = "black";
    document.getElementById('map1Link').style.background = "#EADFC1";
    document.getElementById('map2Link').style.color = "#444340";
    document.getElementById('map2Link').style.background = "white";
    document.getElementById('map3Link').style.color = "#444340";
    document.getElementById('map3Link').style.background = "white";
    wineriesMap.style.display = "block";
    designationsMap.style.display = "none";
    varietiesMap.style.display = "none";
    $.get("http://127.0.0.1:8000/api/producers", function (data, status) {
      if (status == "success") {
        for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          var producer = {
            name: obj.name,
            lat: obj.latitude,
            "long": obj.longitude,
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
        }

        ;
        mymap = L.map('mapid', {
          minZoom: 5,
          maxZoom: 8
        }).setView([46.227638, 2.213749], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

        for (var _i2 = 0; _i2 < producers.length; _i2++) {
          marker = L.marker([producers[_i2].lat, producers[_i2]["long"]]).addTo(mymap);

          if (producers[_i2].website != "") {
            marker.bindPopup("<a target=\"_blank\" href=" + producers[_i2].website + "><b>Domaine</b><br>" + producers[_i2].name + "</a>");
          } else {
            marker.bindPopup("<b>Domaine</b><br>" + producers[_i2].name);
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
        }

        ;
        mymap = L.map('mapid', {
          minZoom: 5,
          maxZoom: 8
        }).setView([46.227638, 2.213749], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
      }
    });
  });
  document.getElementById('map2Link').addEventListener("click", function (event) {
    if (mymap1 != undefined) {
      mymap1.off();
      mymap1.remove();
    }

    document.getElementById('map2Link').style.color = "black";
    document.getElementById('map2Link').style.background = "#EADFC1";
    document.getElementById('map1Link').style.color = "#444340";
    document.getElementById('map1Link').style.background = "white";
    document.getElementById('map3Link').style.color = "#444340";
    document.getElementById('map3Link').style.background = "white";
    wineriesMap.style.display = "none";
    designationsMap.style.display = "block";
    varietiesMap.style.display = "none";
    $.get("http://127.0.0.1:8000/api/wines", function (data, status) {
      if (status == "success") {
        for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          var des = {
            appellation: obj.designation.name,
            lat: obj.producer.latitude,
            "long": obj.producer.longitude
          };
          desTab.push(des);
        }

        if ($("#mapid1").width() > mapbreakwidth) {
          initzoom = highzoom;
          $("#mapid1").height(bigmapheight);
        } else {
          initzoom = lowzoom;
          $("#mapid1").height(smallmapheight);
        }

        ;
        mymap1 = L.map('mapid1', {
          minZoom: 5,
          maxZoom: 8
        }).setView([46.227638, 2.213749], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap1);

        for (var _i3 = 0; _i3 < desTab.length; _i3++) {
          marker = L.marker([desTab[_i3].lat, desTab[_i3]["long"]]).addTo(mymap1);
          marker.bindPopup(desTab[_i3].appellation);
        }
      } else {
        //display map without markers + error message
        document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous n'avons pas pu trouver les données sur les appellations";

        if ($("#mapid1").width() > mapbreakwidth) {
          initzoom = highzoom;
          $("#mapid1").height(bigmapheight);
        } else {
          initzoom = lowzoom;
          $("#mapid1").height(smallmapheight);
        }

        ;
        mymap1 = L.map('mapid1', {
          minZoom: 5,
          maxZoom: 8
        }).setView([46.227638, 2.213749], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap1);
      }

      window.addEventListener('resize', function (event) {
        if ($("#mapid1").width() > mapbreakwidth) {
          initzoom = highzoom;
          $("#mapid1").height(bigmapheight);
          mymap1.setView([46.227638, 2.213749], initzoom);
        } else {
          initzoom = lowzoom;
          $("#mapid1").height(smallmapheight);
          mymap1.setView([46.227638, 2.213749], initzoom);
        }

        ;
      });
    });
  });
  document.getElementById('map3Link').addEventListener("click", function (event) {
    if (mymap2 != undefined) {
      mymap2.off();
      mymap2.remove();
    }

    document.getElementById('map3Link').style.color = "black";
    document.getElementById('map3Link').style.background = "#EADFC1";
    document.getElementById('map2Link').style.color = "#444340";
    document.getElementById('map2Link').style.background = "white";
    document.getElementById('map1Link').style.color = "#444340";
    document.getElementById('map1Link').style.background = "white";
    wineriesMap.style.display = "none";
    designationsMap.style.display = "none";
    varietiesMap.style.display = "block";
    $.get("http://127.0.0.1:8000/api/wines", function (data, status) {
      if (status == "success") {
        for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          var cepage = {
            variety: obj.variety.name,
            lat: obj.producer.latitude,
            "long": obj.producer.longitude
          };
          varietyTab.push(cepage);
        }

        if ($("#mapid2").width() > mapbreakwidth) {
          initzoom = highzoom;
          $("#mapid2").height(bigmapheight);
        } else {
          initzoom = lowzoom;
          $("#mapid2").height(smallmapheight);
        }

        ;
        mymap2 = L.map('mapid2', {
          minZoom: 5,
          maxZoom: 8
        }).setView([46.227638, 2.213749], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap2);

        for (var _i4 = 0; _i4 < varietyTab.length; _i4++) {
          marker = L.marker([varietyTab[_i4].lat, varietyTab[_i4]["long"]]).addTo(mymap2);
          marker.bindPopup(varietyTab[_i4].variety);
        }
      } else {
        //display map without markers + error message
        document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous n'avons pas pu trouver les données sur les cépages";

        if ($("#mapid2").width() > mapbreakwidth) {
          initzoom = highzoom;
          $("#mapid2").height(bigmapheight);
        } else {
          initzoom = lowzoom;
          $("#mapid2").height(smallmapheight);
        }

        ;
        mymap2 = L.map('mapid2', {
          minZoom: 5,
          maxZoom: 8
        }).setView([46.227638, 2.213749], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap2);
      }

      window.addEventListener('resize', function (event) {
        if ($("#mapid2").width() > mapbreakwidth) {
          initzoom = highzoom;
          $("#mapid2").height(bigmapheight);
          mymap2.setView([46.227638, 2.213749], initzoom);
        } else {
          initzoom = lowzoom;
          $("#mapid2").height(smallmapheight);
          mymap2.setView([46.227638, 2.213749], initzoom);
        }

        ;
      });
    });
  });
  var searchDiv = document.getElementById("search");
  searchDiv.style.display = "none";
  var searchOpt = document.getElementById("searchOpt");
  var closeSearch = document.getElementById("closeSearch");
  searchOpt.addEventListener("click", function () {
    searchDiv.hidden = false;
  });
  var radioOptSearch = document.getElementById("radioOptSearch");
  searchOpt.addEventListener("click", function () {
    searchDiv.style.display = "inline";
    searchOpt.style.display = "none";
    radioOptSearch.style.display = "none";
  });
  /*----------------------------STUFFS TO FILTER SEARCH ON MAP-------------------------------*/

  var searchBt = document.getElementById("searchBt"); //le boutton rechercher

  var radioOpt = document.getElementsByName('searchOption'); //le radio bt chosen by user to filter by

  var resNotDFound = document.getElementById('notFound');
  closeSearch.addEventListener("click", function () {
    searchDiv.style.display = "none";
    searchOpt.style.display = "inline";
    document.getElementById("mapsAndMenu").style.display = "block";
    document.getElementById("searchResMap").style.display = "none";
    resNotDFound.innerText = "";
    document.getElementById("searchForm").reset();
  });
  /*....controls the placeholder of the search bar when picking different filtering options from the radio buttons ....*/

  var prev = null;

  for (var i = 0; i < radioOpt.length; i++) {
    radioOpt[i].addEventListener('change', function () {
      //(prev) ? console.log(prev.value): null;
      if (this !== prev) {
        prev = this;
      }

      for (var _i5 = 0, length = radioOpt.length; _i5 < length; _i5++) {
        if (radioOpt[_i5].checked) {
          //console.log("radio checked = " + radioOpt[i].value);
          if (radioOpt[_i5].value === "appellation") {
            document.getElementById("searchQuery").placeholder = 'Entrez un nom d\'appellation';
          }

          if (radioOpt[_i5].value === "couleur") {
            document.getElementById("searchQuery").placeholder = 'Entrez une couleur';
          }

          if (radioOpt[_i5].value === "cepage") {
            document.getElementById("searchQuery").placeholder = 'Entrez un nom de cépage';
          }
        } //console.log(this.value)

      }
    });
  }
  /*.............................................................................................................*/


  searchBt.addEventListener("click", function () {
    if (mymapS != undefined) {
      mymapS.off();
      mymapS.remove();
    }

    document.getElementById("mapsAndMenu").style.display = "none";
    document.getElementById("searchResMap").style.display = "block";

    if (layerGroup != undefined) {
      layerGroup.clearLayers();
    }

    var ps = [];
    var p = {};
    var search = document.getElementById("searchQuery").value; //user input in search bar

    var _loop = function _loop(_i6) {
      if (radioOpt[_i6].checked) {
        $.get("http://127.0.0.1:8000/api/wines", function (data) {
          if ($("#searchResMap").width() > mapbreakwidth) {
            initzoom = highzoom;
            $("#searchResMap").height(bigmapheight);
          } else {
            initzoom = lowzoom;
            $("#searchResMap").height(smallmapheight);
          }

          ;
          mymapS = L.map('searchResMap', {
            minZoom: 5,
            maxZoom: 8
          }).setView([46.227638, 2.213749], initzoom);
          L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(mymapS);
          layerGroup = L.layerGroup().addTo(mymapS);

          if (radioOpt[_i6].value === "appellation") {
            for (var _i7 = 0; _i7 < data.length; _i7++) {
              var obj = data[_i7]; // console.log("DATA[i] = " + data[i]);

              var name = obj.designation.name;

              if (search.toLowerCase().trim() == name.toLowerCase().trim()) {
                p.name = obj.producer.name;
                p.lat = obj.producer.latitude;
                p["long"] = obj.producer.longitude;
                p.website = obj.producer.website;
                ps.push(p);

                for (var _i8 = 0; _i8 < ps.length; _i8++) {
                  marker = L.marker([ps[_i8].lat, ps[_i8]["long"]]).addTo(layerGroup);

                  if (ps[_i8].website != "") {
                    marker.bindPopup("<a target=\"_blank\" href=" + ps[_i8].website + "><b>Domaine</b><br>" + ps[_i8].name + "</a>");
                  } else {
                    marker.bindPopup("<b>Domaine</b><br>" + ps[_i8].name);
                  }
                }
              }
            }

            if (search == "") {
              resNotDFound.innerText = "Veuillez entrez un mot.";
            }

            if (search != "" && ps.length == 0) {
              resNotDFound.innerText = "Aucun resultat trouve pour " + search + ".";
            }
          }

          if (radioOpt[_i6].value === "couleur") {
            for (var _i9 = 0; _i9 < data.length; _i9++) {
              var _obj = data[_i9];
              var color = _obj.color.color;

              if (search.toLowerCase().trim() == color.toLowerCase().trim()) {
                p.name = _obj.producer.name;
                p.lat = _obj.producer.latitude;
                p["long"] = _obj.producer.longitude;
                p.website = _obj.producer.website;
                ps.push(p);

                for (var _i10 = 0; _i10 < ps.length; _i10++) {
                  marker = L.marker([ps[_i10].lat, ps[_i10]["long"]]).addTo(layerGroup);

                  if (ps[_i10].website != "") {
                    marker.bindPopup("<a target=\"_blank\" href=" + ps[_i10].website + "><b>Domaine</b><br>" + ps[_i10].name + "</a>");
                  } else {
                    marker.bindPopup("<b>Domaine</b><br>" + ps[_i10].name);
                  }
                }
              }
            }

            if (search == "") {
              resNotDFound.innerText = "Veuillez entrez un mot.";
            }

            if (search != "" && ps.length == 0) {
              resNotDFound.innerText = "Aucun resultat trouve pour " + search + ".";
            }
          }

          if (radioOpt[_i6].value === "cepage") {
            for (var _i11 = 0; _i11 < data.length; _i11++) {
              var _obj2 = data[_i11];
              var variety = _obj2.variety.name;

              if (search.toLowerCase().trim() == variety.toLowerCase().trim()) {
                p.name = _obj2.producer.name;
                p.lat = _obj2.producer.latitude;
                p["long"] = _obj2.producer.longitude;
                p.website = _obj2.producer.website;
                ps.push(p);

                for (var _i12 = 0; _i12 < ps.length; _i12++) {
                  marker = L.marker([ps[_i12].lat, ps[_i12]["long"]]).addTo(layerGroup);

                  if (ps[_i12].website != "") {
                    marker.bindPopup("<a target=\"_blank\" href=" + ps[_i12].website + "><b>Domaine</b><br>" + ps[_i12].name + "</a>");
                  } else {
                    marker.bindPopup("<b>Domaine</b><br>" + ps[_i12].name);
                  }
                }
              }
            }

            if (search == "") {
              resNotDFound.innerText = "Veuillez entrez un mot.";
            }

            if (search != "" && ps.length == 0) {
              resNotDFound.innerText = "Aucun resultat trouve pour " + search + ".";
            }
          }
        });
      }
    };

    for (var _i6 = 0; _i6 < radioOpt.length; _i6++) {
      _loop(_i6);
    }

    resNotDFound.innerText = "";
    document.getElementById("searchForm").reset();
  });
}); // The Leaflet L.Map class provides the fitBounds method to zoom a map to contain a rectangular bounding box.
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

/***/ })

},[["./assets/js/leaflet.js","runtime","vendors~app~leaflet","vendors~leaflet"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbGVhZmxldC5qcyJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIiQiLCJJY29uIiwiRGVmYXVsdCIsInByb3RvdHlwZSIsIl9nZXRJY29uVXJsIiwibWVyZ2VPcHRpb25zIiwiaWNvblJldGluYVVybCIsImljb25VcmwiLCJzaGFkb3dVcmwiLCJwcm9kdWNlcnMiLCJkZXNUYWIiLCJ2YXJpZXR5VGFiIiwibXltYXAiLCJteW1hcDEiLCJteW1hcDIiLCJteW1hcFMiLCJsYXllckdyb3VwIiwibWFya2VyIiwiYmlnbWFwaGVpZ2h0Iiwic21hbGxtYXBoZWlnaHQiLCJtYXBicmVha3dpZHRoIiwiaGlnaHpvb20iLCJsb3d6b29tIiwiaW5pdHpvb20iLCJ3aW5lcmllc01hcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkZXNpZ25hdGlvbnNNYXAiLCJ2YXJpZXRpZXNNYXAiLCJyZXNldFNlYXJjaCIsImlubmVyVGV4dCIsInByb3AiLCJzZXRBdHRyaWJ1dGUiLCJyZWFkeSIsInN0eWxlIiwiZGlzcGxheSIsImdldCIsImRhdGEiLCJzdGF0dXMiLCJpIiwibGVuZ3RoIiwib2JqIiwicHJvZHVjZXIiLCJuYW1lIiwibGF0IiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ3ZWJzaXRlIiwicHVzaCIsIndpZHRoIiwiaGVpZ2h0IiwibWFwIiwibWluWm9vbSIsIm1heFpvb20iLCJzZXRWaWV3IiwidGlsZUxheWVyIiwiYXR0cmlidXRpb24iLCJhZGRUbyIsImJpbmRQb3B1cCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInVuZGVmaW5lZCIsIm9mZiIsInJlbW92ZSIsImNvbG9yIiwiYmFja2dyb3VuZCIsImRlcyIsImFwcGVsbGF0aW9uIiwiZGVzaWduYXRpb24iLCJjZXBhZ2UiLCJ2YXJpZXR5Iiwic2VhcmNoRGl2Iiwic2VhcmNoT3B0IiwiY2xvc2VTZWFyY2giLCJoaWRkZW4iLCJyYWRpb09wdFNlYXJjaCIsInNlYXJjaEJ0IiwicmFkaW9PcHQiLCJnZXRFbGVtZW50c0J5TmFtZSIsInJlc05vdERGb3VuZCIsInJlc2V0IiwicHJldiIsImNoZWNrZWQiLCJ2YWx1ZSIsInBsYWNlaG9sZGVyIiwiY2xlYXJMYXllcnMiLCJwcyIsInAiLCJzZWFyY2giLCJ0b0xvd2VyQ2FzZSIsInRyaW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLENBQUMsR0FBQ0MsbUJBQU8sQ0FBQywyREFBRCxDQUFiOztBQUNBLElBQUlDLENBQUMsR0FBR0QsbUJBQU8sQ0FBQyxvREFBRCxDQUFmO0FBRUE7Ozs7O0FBR0EsT0FBT0QsQ0FBQyxDQUFDRyxJQUFGLENBQU9DLE9BQVAsQ0FBZUMsU0FBZixDQUF5QkMsV0FBaEM7QUFDQU4sQ0FBQyxDQUFDRyxJQUFGLENBQU9DLE9BQVAsQ0FBZUcsWUFBZixDQUE0QjtBQUN4QkMsZUFBYSxFQUFFUCxtQkFBTyxDQUFDLHFHQUFELENBREU7QUFFeEJRLFNBQU8sRUFBRVIsbUJBQU8sQ0FBQywrRkFBRCxDQUZRO0FBR3hCUyxXQUFTLEVBQUVULG1CQUFPLENBQUMsbUdBQUQ7QUFITSxDQUE1QjtBQUtBOztBQUVBLElBQUlVLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLE1BQU0sR0FBRyxFQUFiO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0EsSUFBSUMsS0FBSjtBQUNBLElBQUlDLE1BQUo7QUFDQSxJQUFJQyxNQUFKO0FBQ0EsSUFBSUMsTUFBSjtBQUNBLElBQUlDLFVBQUo7QUFDQSxJQUFJQyxNQUFKO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEdBQW5CO0FBQ0EsSUFBSUMsY0FBYyxHQUFHLEdBQXJCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLEdBQXBCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxPQUFPLEdBQUcsQ0FBZDtBQUNBLElBQUlDLFFBQUo7QUFDQSxJQUFJQyxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxD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QUFoQyxFQUFtQztBQUMvQndDLDBCQUFZLENBQUNsRCxTQUFiLEdBQXlCLGdDQUFnQzJELE1BQWhDLEdBQXlDLEdBQWxFO0FBQ0g7QUFDSjtBQUNKLFNBcEdEO0FBcUdIO0FBcEhzQzs7QUFhM0MsU0FBSyxJQUFJbEQsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR3VDLFFBQVEsQ0FBQ3RDLE1BQTdCLEVBQXFDRCxHQUFDLEVBQXRDLEVBQTBDO0FBQUEsWUFBakNBLEdBQWlDO0FBd0d6Qzs7QUFDRHlDLGdCQUFZLENBQUNsRCxTQUFiLEdBQXlCLEVBQXpCO0FBQ0FMLFlBQVEsQ0FBQ0MsY0FBVCxDQUF3QixZQUF4QixFQUFzQ3VELEtBQXRDO0FBQ0gsR0F4SEQ7QUF5SEgsQ0FoZEwsRSxDQWtkQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSSIsImZpbGUiOiJsZWFmbGV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEw9cmVxdWlyZSgnbGVhZmxldCcpO1xyXG5sZXQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuLyogLS0tLS0tLS0tLS0tLVxyXG4qIHRoaXMgZml4ZXMgYSBsZWFmbGV0IGJ1ZyB0aGF0IGRvZXMgbm90IGltcG9ydCB0aGUgbWFya2VyIGltYWdlcyBpZiB3ZSBkb24ndCBhZGQgdGhvc2UgbGluZXNcclxuKi9cclxuZGVsZXRlIEwuSWNvbi5EZWZhdWx0LnByb3RvdHlwZS5fZ2V0SWNvblVybDtcclxuTC5JY29uLkRlZmF1bHQubWVyZ2VPcHRpb25zKHtcclxuICAgIGljb25SZXRpbmFVcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24tMngucG5nJyksXHJcbiAgICBpY29uVXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1pY29uLnBuZycpLFxyXG4gICAgc2hhZG93VXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1zaGFkb3cucG5nJyksXHJcbn0pO1xyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbmxldCBwcm9kdWNlcnMgPSBbXTtcclxubGV0IGRlc1RhYiA9IFtdO1xyXG5sZXQgdmFyaWV0eVRhYiA9IFtdO1xyXG5sZXQgbXltYXA7XHJcbmxldCBteW1hcDE7XHJcbmxldCBteW1hcDI7XHJcbmxldCBteW1hcFM7XHJcbmxldCBsYXllckdyb3VwO1xyXG5sZXQgbWFya2VyO1xyXG5sZXQgYmlnbWFwaGVpZ2h0ID0gNTAwO1xyXG5sZXQgc21hbGxtYXBoZWlnaHQgPSAzMDA7XHJcbmxldCBtYXBicmVha3dpZHRoID0gNzIwO1xyXG5sZXQgaGlnaHpvb20gPSA2O1xyXG5sZXQgbG93em9vbSA9IDQ7XHJcbmxldCBpbml0em9vbTtcclxubGV0IHdpbmVyaWVzTWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21haW5lc1wiKTtcclxubGV0IGRlc2lnbmF0aW9uc01hcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwZWxsYXRpb25zXCIpO1xyXG5sZXQgdmFyaWV0aWVzTWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZXBhZ2VzXCIpO1xyXG5cclxuZnVuY3Rpb24gcmVzZXRTZWFyY2goKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdEZvdW5kXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICAkKFwiI2Rlc2lnbmF0aW9uUmFkaW9cIikucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LW1hcFwiKS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUmVzTWFwXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS9wcm9kdWNlcnNcIiwgZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgIGlmKHN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb2R1Y2VyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG9iai5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogb2JqLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvbmc6IG9iai5sb25naXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgd2Vic2l0ZTogb2JqLndlYnNpdGVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBwcm9kdWNlcnMucHVzaChwcm9kdWNlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIG15bWFwID0gTC5tYXAoJ21hcGlkJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcHJvZHVjZXJzW2ldLmxhdCwgcHJvZHVjZXJzW2ldLmxvbmddKS5hZGRUbyhteW1hcCkuYWRkVG8obXltYXApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y2Vyc1tpXS53ZWJzaXRlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XCIgKyBwcm9kdWNlcnNbaV0ud2Vic2l0ZSArIFwiPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHJvZHVjZXJzW2ldLm5hbWUgKyBcIjwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHByb2R1Y2Vyc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vZGlzcGxheSBtYXAgd2l0aG91dCBtYXJrZXJzICsgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JNc2dBcGlOb3RXb3JraW5nJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgZG9tYWluZXNcIjtcclxuICAgICAgICAgICAgaWYgKCQoXCIjbWFwaWRcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbXltYXAgPSBMLm1hcCgnbWFwaWQnLCB7bWluWm9vbTogNSwgbWF4Wm9vbTogOH0pLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgfSkuYWRkVG8obXltYXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICBkZXNpZ25hdGlvbnNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgdmFyaWV0aWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICAvLyBsaXN0ZW4gZm9yIHNjcmVlbiByZXNpemUgZXZlbnRzIGFuZCBjaGFuZ2VzIG1hcCBzaXplIGFuZCB6b29tIGFjY29yZGluZ2x5XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICBteW1hcC5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICBteW1hcC5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20gKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmKG15bWFwICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBteW1hcC5vZmYoKTtcclxuICAgICAgICAgICAgbXltYXAucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIiNFQURGQzFcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICB3aW5lcmllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGRlc2lnbmF0aW9uc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgdmFyaWV0aWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvcHJvZHVjZXJzXCIsIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgaWYoc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZHVjZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG9iai5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IG9iai5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZzogb2JqLmxvbmdpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2Vic2l0ZTogb2JqLndlYnNpdGVcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y2Vycy5wdXNoKHByb2R1Y2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG15bWFwID0gTC5tYXAoJ21hcGlkJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUbyhteW1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kdWNlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcHJvZHVjZXJzW2ldLmxhdCwgcHJvZHVjZXJzW2ldLmxvbmddKS5hZGRUbyhteW1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2R1Y2Vyc1tpXS53ZWJzaXRlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVwiICsgcHJvZHVjZXJzW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHByb2R1Y2Vyc1tpXS5uYW1lICsgXCI8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHByb2R1Y2Vyc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2Rpc3BsYXkgbWFwIHdpdGhvdXQgbWFya2VycyArIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvck1zZ0FwaU5vdFdvcmtpbmcnKS5pbm5lclRleHQgPSBcIkTDqXNvbMOpIG5vdXMgbidhdm9ucyBwYXMgcHUgdHJvdXZlciBsZXMgZG9ubsOpZXMgc3VyIGxlcyBkb21haW5lc1wiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjbWFwaWRcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbXltYXAgPSBMLm1hcCgnbWFwaWQnLCB7bWluWm9vbTogNSwgbWF4Wm9vbTogOH0pLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmKG15bWFwMSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbXltYXAxLm9mZigpO1xyXG4gICAgICAgICAgICBteW1hcDEucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAyTGluaycpLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAyTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIiNFQURGQzFcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMUxpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICB3aW5lcmllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZGVzaWduYXRpb25zTWFwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgdmFyaWV0aWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvd2luZXNcIiwgZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICBpZihzdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVsbGF0aW9uOiBvYmouZGVzaWduYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBvYmoucHJvZHVjZXIubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmc6IG9iai5wcm9kdWNlci5sb25naXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc1RhYi5wdXNoKGRlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZDFcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQxXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDFcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBteW1hcDEgPSBMLm1hcCgnbWFwaWQxJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUbyhteW1hcDEpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNUYWIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbZGVzVGFiW2ldLmxhdCwgZGVzVGFiW2ldLmxvbmddKS5hZGRUbyhteW1hcDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoZGVzVGFiW2ldLmFwcGVsbGF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vZGlzcGxheSBtYXAgd2l0aG91dCBtYXJrZXJzICsgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Vycm9yTXNnQXBpTm90V29ya2luZycpLmlubmVyVGV4dCA9IFwiRMOpc29sw6kgbm91cyBuJ2F2b25zIHBhcyBwdSB0cm91dmVyIGxlcyBkb25uw6llcyBzdXIgbGVzIGFwcGVsbGF0aW9uc1wiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjbWFwaWQxXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkMVwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQxXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbXltYXAxID0gTC5tYXAoJ21hcGlkMScsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkMVwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDFcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbXltYXAxLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQxXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbXltYXAxLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSApO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgaWYobXltYXAyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBteW1hcDIub2ZmKCk7XHJcbiAgICAgICAgICAgIG15bWFwMi5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwiI0VBREZDMVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAyTGluaycpLnN0eWxlLmNvbG9yID0gXCIjNDQ0MzQwXCJcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLnN0eWxlLmNvbG9yID0gXCIjNDQ0MzQwXCJcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMUxpbmsnKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHdpbmVyaWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBkZXNpZ25hdGlvbnNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHZhcmlldGllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS93aW5lc1wiLCBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGlmKHN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlcGFnZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWV0eTogb2JqLnZhcmlldHkubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBvYmoucHJvZHVjZXIubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmc6IG9iai5wcm9kdWNlci5sb25naXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlldHlUYWIucHVzaChjZXBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjbWFwaWQyXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkMlwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQyXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbXltYXAyID0gTC5tYXAoJ21hcGlkMicsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhcmlldHlUYWIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbdmFyaWV0eVRhYltpXS5sYXQsIHZhcmlldHlUYWJbaV0ubG9uZ10pLmFkZFRvKG15bWFwMik7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cCh2YXJpZXR5VGFiW2ldLnZhcmlldHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9kaXNwbGF5IG1hcCB3aXRob3V0IG1hcmtlcnMgKyBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JNc2dBcGlOb3RXb3JraW5nJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgY8OpcGFnZXNcIjtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkMlwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDJcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkMlwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG15bWFwMiA9IEwubWFwKCdtYXBpZDInLCB7bWluWm9vbTogNSwgbWF4Wm9vbTogOH0pLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZDJcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQyXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG15bWFwMi5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkMlwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG15bWFwMi5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20gKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHNlYXJjaERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpO1xyXG4gICAgc2VhcmNoRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGxldCBzZWFyY2hPcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaE9wdFwiKTtcclxuICAgIGxldCBjbG9zZVNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VTZWFyY2hcIik7XHJcblxyXG4gICAgc2VhcmNoT3B0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VhcmNoRGl2LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHJhZGlvT3B0U2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb09wdFNlYXJjaFwiKTtcclxuXHJcbiAgICBzZWFyY2hPcHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgICAgICAgc2VhcmNoT3B0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICByYWRpb09wdFNlYXJjaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TVFVGRlMgVE8gRklMVEVSIFNFQVJDSCBPTiBNQVAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIGxldCBzZWFyY2hCdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoQnRcIik7IC8vbGUgYm91dHRvbiByZWNoZXJjaGVyXHJcbiAgICBsZXQgcmFkaW9PcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnc2VhcmNoT3B0aW9uJyk7IC8vbGUgcmFkaW8gYnQgY2hvc2VuIGJ5IHVzZXIgdG8gZmlsdGVyIGJ5XHJcbiAgICBsZXQgcmVzTm90REZvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vdEZvdW5kJyk7XHJcblxyXG5cclxuICAgIGNsb3NlU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VhcmNoRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBzZWFyY2hPcHQuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBzQW5kTWVudVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUmVzTWFwXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEZvcm1cIikucmVzZXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qLi4uLmNvbnRyb2xzIHRoZSBwbGFjZWhvbGRlciBvZiB0aGUgc2VhcmNoIGJhciB3aGVuIHBpY2tpbmcgZGlmZmVyZW50IGZpbHRlcmluZyBvcHRpb25zIGZyb20gdGhlIHJhZGlvIGJ1dHRvbnMgLi4uLiovXHJcbiAgICBsZXQgcHJldiA9IG51bGw7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvT3B0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcmFkaW9PcHRbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vKHByZXYpID8gY29uc29sZS5sb2cocHJldi52YWx1ZSk6IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzICE9PSBwcmV2KSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2ID0gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gcmFkaW9PcHQubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicmFkaW8gY2hlY2tlZCA9IFwiICsgcmFkaW9PcHRbaV0udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImFwcGVsbGF0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hRdWVyeVwiKS5wbGFjZWhvbGRlciA9ICdFbnRyZXogdW4gbm9tIGRcXCdhcHBlbGxhdGlvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImNvdWxldXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFF1ZXJ5XCIpLnBsYWNlaG9sZGVyID0gJ0VudHJleiB1bmUgY291bGV1cic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImNlcGFnZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikucGxhY2Vob2xkZXIgPSAnRW50cmV6IHVuIG5vbSBkZSBjw6lwYWdlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy52YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xyXG5cclxuICAgICAgICBzZWFyY2hCdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZihteW1hcFMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBteW1hcFMub2ZmKCk7XHJcbiAgICAgICAgICAgICAgICBteW1hcFMucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBzQW5kTWVudVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUmVzTWFwXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgIGlmKGxheWVyR3JvdXAgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsYXllckdyb3VwLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBzID0gW107XHJcbiAgICAgICAgICAgIGxldCBwID0ge307XHJcbiAgICAgICAgICAgIGxldCBzZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFF1ZXJ5XCIpLnZhbHVlOyAvL3VzZXIgaW5wdXQgaW4gc2VhcmNoIGJhclxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvT3B0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFkaW9PcHRbaV0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS93aW5lc1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIjc2VhcmNoUmVzTWFwXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNzZWFyY2hSZXNNYXBcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI3NlYXJjaFJlc01hcFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbXltYXBTID0gTC5tYXAoJ3NlYXJjaFJlc01hcCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hZGRUbyhteW1hcFMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXJHcm91cCA9IEwubGF5ZXJHcm91cCgpLmFkZFRvKG15bWFwUyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiYXBwZWxsYXRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJEQVRBW2ldID0gXCIgKyBkYXRhW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IG9iai5kZXNpZ25hdGlvbi5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlYXJjaC50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PSBuYW1lLnRvTG93ZXJDYXNlKCkudHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubmFtZSA9IG9iai5wcm9kdWNlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxhdCA9IG9iai5wcm9kdWNlci5sYXRpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5sb25nID0gb2JqLnByb2R1Y2VyLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC53ZWJzaXRlID0gb2JqLnByb2R1Y2VyLndlYnNpdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBzLnB1c2gocCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKFtwc1tpXS5sYXQsIHBzW2ldLmxvbmddKS5hZGRUbyhsYXllckdyb3VwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwc1tpXS53ZWJzaXRlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XCIgKyBwc1tpXS53ZWJzaXRlICsgXCI+PGI+RG9tYWluZTwvYj48YnI+XCIgKyBwc1tpXS5uYW1lICsgXCI8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGI+RG9tYWluZTwvYj48YnI+XCIgKyBwc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlYXJjaCA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzTm90REZvdW5kLmlubmVyVGV4dCA9IFwiVmV1aWxsZXogZW50cmV6IHVuIG1vdC5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoICE9IFwiXCIgJiYgcHMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJBdWN1biByZXN1bHRhdCB0cm91dmUgcG91ciBcIiArIHNlYXJjaCArIFwiLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJjb3VsZXVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IG9iai5jb2xvci5jb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2gudG9Mb3dlckNhc2UoKS50cmltKCkgPT0gY29sb3IudG9Mb3dlckNhc2UoKS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uYW1lID0gb2JqLnByb2R1Y2VyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubGF0ID0gb2JqLnByb2R1Y2VyLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxvbmcgPSBvYmoucHJvZHVjZXIubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLndlYnNpdGUgPSBvYmoucHJvZHVjZXIud2Vic2l0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3BzW2ldLmxhdCwgcHNbaV0ubG9uZ10pLmFkZFRvKGxheWVyR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBzW2ldLndlYnNpdGUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHBzW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUgKyBcIjwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJWZXVpbGxleiBlbnRyZXogdW4gbW90LlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2ggIT0gXCJcIiAmJiBwcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIkF1Y3VuIHJlc3VsdGF0IHRyb3V2ZSBwb3VyIFwiICsgc2VhcmNoICsgXCIuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImNlcGFnZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyaWV0eSA9IG9iai52YXJpZXR5Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoLnRvTG93ZXJDYXNlKCkudHJpbSgpID09IHZhcmlldHkudG9Mb3dlckNhc2UoKS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uYW1lID0gb2JqLnByb2R1Y2VyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubGF0ID0gb2JqLnByb2R1Y2VyLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxvbmcgPSBvYmoucHJvZHVjZXIubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLndlYnNpdGUgPSBvYmoucHJvZHVjZXIud2Vic2l0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3BzW2ldLmxhdCwgcHNbaV0ubG9uZ10pLmFkZFRvKGxheWVyR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBzW2ldLndlYnNpdGUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHBzW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUgKyBcIjwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJWZXVpbGxleiBlbnRyZXogdW4gbW90LlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2ggIT0gXCJcIiAmJiBwcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIkF1Y3VuIHJlc3VsdGF0IHRyb3V2ZSBwb3VyIFwiICsgc2VhcmNoICsgXCIuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hGb3JtXCIpLnJlc2V0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vIFRoZSBMZWFmbGV0IEwuTWFwIGNsYXNzIHByb3ZpZGVzIHRoZSBmaXRCb3VuZHMgbWV0aG9kIHRvIHpvb20gYSBtYXAgdG8gY29udGFpbiBhIHJlY3Rhbmd1bGFyIGJvdW5kaW5nIGJveC5cclxuLy8gVGhlIEwubGF0TG5nQm91bmRzIHV0aWxpdHkgZnVuY3Rpb24gY3JlYXRlcyBhIGJvdW5kaW5nIGJveCBvYmplY3QgZnJvbSBhbiBhcnJheSBvZiBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIGNvb3JkaW5hdGVzLlxyXG4vLyBXaXRoIGEgc2luZ2xlIG1hcmtlciwgaG93ZXZlciwgd2Ugb25seSBoYXZlIG9uZSBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIGNvb3JkaW5hdGUgZnJvbSB3aGljaCB0byBjcmVhdGUgdGhlIGJvdW5kaW5nIGJveC5cclxuLy8gVGhlIHNvbHV0aW9uIGlzIHRvIGNyZWF0ZSBhIHNpbmdsZS1lbGVtZW50IGFycmF5IGNvbnRhaW5pbmcgdGhlIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgY29vcmRpbmF0ZSBvZiB0aGUgbWFya2VyLlxyXG5cclxuLy8gVGhlIGZvbGxvd2luZyBmdW5jdGlvbiBjZW50ZXJzIGFuZCB6b29tcyBhIGxlYWZsZXQgbWFwIG9uIGEgc2luZ2xlIG1hcmtlci4gTGluZSAyIGNyZWF0ZXMgdGhlIHNpbmdsZS1lbGVtZW50IGFycmF5IGNvbnRhaW5pbmdcclxuLy8gdGhlIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgY29vcmRpbmF0ZSBvZiB0aGUgbWFya2VyLiBMaW5lIDMgY3JlYXRlcyB0aGUgYm91bmRpbmcgYm94IHRoYXQgZW5jbG9zZXMgdGhlIG1hcmtlcuKAmXMgbG9jYXRpb24uIEZpbmFsbHksXHJcbi8vIGxpbmUgNCB6b29tcyB0aGUgbWFwIHRvIGVuY2xvc2UgdGhlIGJvdW5kaW5nIGJveC5cclxuXHJcbi8vIGZ1bmN0aW9uIGNlbnRlckxlYWZsZXRNYXBPbk1hcmtlcihtYXAsIG1hcmtlcikge1xyXG4vLyAgICAgdmFyIGxhdExuZ3MgPSBbIG1hcmtlci5nZXRMYXRMbmcoKSBdO1xyXG4vLyAgICAgdmFyIG1hcmtlckJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGxhdExuZ3MpO1xyXG4vLyAgICAgbWFwLmZpdEJvdW5kcyhtYXJrZXJCb3VuZHMpO1xyXG4vLyB9XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=