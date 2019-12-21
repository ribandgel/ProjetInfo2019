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
  //check first for which map is active
  //if ...

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
  document.getElementById('map3Link').addEventListener("click", function (event) {
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

},[["./assets/js/leaflet.js","runtime","vendors~leaflet"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbGVhZmxldC5qcyJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIiQiLCJJY29uIiwiRGVmYXVsdCIsInByb3RvdHlwZSIsIl9nZXRJY29uVXJsIiwibWVyZ2VPcHRpb25zIiwiaWNvblJldGluYVVybCIsImljb25VcmwiLCJzaGFkb3dVcmwiLCJwcm9kdWNlcnMiLCJkZXNUYWIiLCJ2YXJpZXR5VGFiIiwibXltYXAiLCJteW1hcDEiLCJteW1hcDIiLCJteW1hcFMiLCJsYXllckdyb3VwIiwibWFya2VyIiwiYmlnbWFwaGVpZ2h0Iiwic21hbGxtYXBoZWlnaHQiLCJtYXBicmVha3dpZHRoIiwiaGlnaHpvb20iLCJsb3d6b29tIiwiaW5pdHpvb20iLCJ3aW5lcmllc01hcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkZXNpZ25hdGlvbnNNYXAiLCJ2YXJpZXRpZXNNYXAiLCJyZXNldFNlYXJjaCIsImlubmVyVGV4dCIsInByb3AiLCJzZXRBdHRyaWJ1dGUiLCJyZWFkeSIsInN0eWxlIiwiZGlzcGxheSIsImdldCIsImRhdGEiLCJzdGF0dXMiLCJpIiwibGVuZ3RoIiwib2JqIiwicHJvZHVjZXIiLCJuYW1lIiwibGF0IiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ3ZWJzaXRlIiwicHVzaCIsIndpZHRoIiwiaGVpZ2h0IiwibWFwIiwibWluWm9vbSIsIm1heFpvb20iLCJzZXRWaWV3IiwidGlsZUxheWVyIiwiYXR0cmlidXRpb24iLCJhZGRUbyIsImJpbmRQb3B1cCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNvbG9yIiwiYmFja2dyb3VuZCIsImRlcyIsImFwcGVsbGF0aW9uIiwiZGVzaWduYXRpb24iLCJjZXBhZ2UiLCJ2YXJpZXR5Iiwic2VhcmNoRGl2Iiwic2VhcmNoT3B0IiwiY2xvc2VTZWFyY2giLCJoaWRkZW4iLCJyYWRpb09wdFNlYXJjaCIsInNlYXJjaEJ0IiwicmFkaW9PcHQiLCJnZXRFbGVtZW50c0J5TmFtZSIsInJlc05vdERGb3VuZCIsInJlc2V0IiwicHJldiIsImNoZWNrZWQiLCJ2YWx1ZSIsInBsYWNlaG9sZGVyIiwidW5kZWZpbmVkIiwib2ZmIiwicmVtb3ZlIiwiY2xlYXJMYXllcnMiLCJwcyIsInAiLCJzZWFyY2giLCJ0b0xvd2VyQ2FzZSIsInRyaW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLENBQUMsR0FBQ0MsbUJBQU8sQ0FBQywyREFBRCxDQUFiOztBQUNBLElBQUlDLENBQUMsR0FBR0QsbUJBQU8sQ0FBQyxvREFBRCxDQUFmO0FBRUE7Ozs7O0FBR0EsT0FBT0QsQ0FBQyxDQUFDRyxJQUFGLENBQU9DLE9BQVAsQ0FBZUMsU0FBZixDQUF5QkMsV0FBaEM7QUFDQU4sQ0FBQyxDQUFDRyxJQUFGLENBQU9DLE9BQVAsQ0FBZUcsWUFBZixDQUE0QjtBQUN4QkMsZUFBYSxFQUFFUCxtQkFBTyxDQUFDLHFHQUFELENBREU7QUFFeEJRLFNBQU8sRUFBRVIsbUJBQU8sQ0FBQywrRkFBRCxDQUZRO0FBR3hCUyxXQUFTLEVBQUVULG1CQUFPLENBQUMsbUdBQUQ7QUFITSxDQUE1QjtBQUtBOztBQUVBLElBQUlVLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLE1BQU0sR0FBRyxFQUFiO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0EsSUFBSUMsS0FBSjtBQUNBLElBQUlDLE1BQUo7QUFDQSxJQUFJQyxNQUFKO0FBQ0EsSUFBSUMsTUFBSjtBQUNBLElBQUlDLFVBQUo7QUFDQSxJQUFJQyxNQUFKO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEdBQW5CO0FBQ0EsSUFBSUMsY0FBYyxHQUFHLEdBQXJCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLEdBQXBCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxPQUFPLEdBQUcsQ0FBZDtBQUNBLElBQUlDLFFBQUo7QUFDQSxJQUFJQyxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxD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TCxZQUFRLENBQUNDLGNBQVQsQ0FBd0IsWUFBeEIsRUFBc0NvRCxLQUF0QztBQUNILEdBeEhEO0FBeUhILENBeGJMLEUsQ0EwYkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJmaWxlIjoibGVhZmxldC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBMPXJlcXVpcmUoJ2xlYWZsZXQnKTtcclxubGV0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbi8qIC0tLS0tLS0tLS0tLS1cclxuKiB0aGlzIGZpeGVzIGEgbGVhZmxldCBidWcgdGhhdCBkb2VzIG5vdCBpbXBvcnQgdGhlIG1hcmtlciBpbWFnZXMgaWYgd2UgZG9uJ3QgYWRkIHRob3NlIGxpbmVzXHJcbiovXHJcbmRlbGV0ZSBMLkljb24uRGVmYXVsdC5wcm90b3R5cGUuX2dldEljb25Vcmw7XHJcbkwuSWNvbi5EZWZhdWx0Lm1lcmdlT3B0aW9ucyh7XHJcbiAgICBpY29uUmV0aW5hVXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1pY29uLTJ4LnBuZycpLFxyXG4gICAgaWNvblVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi5wbmcnKSxcclxuICAgIHNoYWRvd1VybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItc2hhZG93LnBuZycpLFxyXG59KTtcclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5sZXQgcHJvZHVjZXJzID0gW107XHJcbmxldCBkZXNUYWIgPSBbXTtcclxubGV0IHZhcmlldHlUYWIgPSBbXTtcclxubGV0IG15bWFwO1xyXG5sZXQgbXltYXAxO1xyXG5sZXQgbXltYXAyO1xyXG5sZXQgbXltYXBTO1xyXG5sZXQgbGF5ZXJHcm91cDtcclxubGV0IG1hcmtlcjtcclxubGV0IGJpZ21hcGhlaWdodCA9IDUwMDtcclxubGV0IHNtYWxsbWFwaGVpZ2h0ID0gMzAwO1xyXG5sZXQgbWFwYnJlYWt3aWR0aCA9IDcyMDtcclxubGV0IGhpZ2h6b29tID0gNjtcclxubGV0IGxvd3pvb20gPSA0O1xyXG5sZXQgaW5pdHpvb207XHJcbmxldCB3aW5lcmllc01hcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tYWluZXNcIik7XHJcbmxldCBkZXNpZ25hdGlvbnNNYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcGVsbGF0aW9uc1wiKTtcclxubGV0IHZhcmlldGllc01hcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VwYWdlc1wiKTtcclxuXHJcbmZ1bmN0aW9uIHJlc2V0U2VhcmNoKCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub3RGb3VuZFwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgJChcIiNkZXNpZ25hdGlvblJhZGlvXCIpLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1tYXBcIikuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFJlc01hcFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvcHJvZHVjZXJzXCIsIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICBpZihzdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9kdWNlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBvYmoubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IG9iai5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICBsb25nOiBvYmoubG9uZ2l0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYnNpdGU6IG9iai53ZWJzaXRlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjZXJzLnB1c2gocHJvZHVjZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBteW1hcCA9IEwubWFwKCdtYXBpZCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICB9KS5hZGRUbyhteW1hcCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2R1Y2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3Byb2R1Y2Vyc1tpXS5sYXQsIHByb2R1Y2Vyc1tpXS5sb25nXSkuYWRkVG8obXltYXApLmFkZFRvKG15bWFwKTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9kdWNlcnNbaV0ud2Vic2l0ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVwiICsgcHJvZHVjZXJzW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHByb2R1Y2Vyc1tpXS5uYW1lICsgXCI8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXkgbWFwIHdpdGhvdXQgbWFya2VycyArIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Vycm9yTXNnQXBpTm90V29ya2luZycpLmlubmVyVGV4dCA9IFwiRMOpc29sw6kgbm91cyBuJ2F2b25zIHBhcyBwdSB0cm91dmVyIGxlcyBkb25uw6llcyBzdXIgbGVzIGRvbWFpbmVzXCI7XHJcbiAgICAgICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIG15bWFwID0gTC5tYXAoJ21hcGlkJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgZGVzaWduYXRpb25zTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIHZhcmlldGllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG4gICAgLy8gbGlzdGVuIGZvciBzY3JlZW4gcmVzaXplIGV2ZW50cyBhbmQgY2hhbmdlcyBtYXAgc2l6ZSBhbmQgem9vbSBhY2NvcmRpbmdseVxyXG4gICAgLy9jaGVjayBmaXJzdCBmb3Igd2hpY2ggbWFwIGlzIGFjdGl2ZVxyXG4gICAgLy9pZiAuLi5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgIG15bWFwLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgIG15bWFwLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSApO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMUxpbmsnKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwiI0VBREZDMVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAyTGluaycpLnN0eWxlLmNvbG9yID0gXCIjNDQ0MzQwXCJcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLnN0eWxlLmNvbG9yID0gXCIjNDQ0MzQwXCJcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHdpbmVyaWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgZGVzaWduYXRpb25zTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB2YXJpZXRpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS9wcm9kdWNlcnNcIiwgZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICBpZihzdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9kdWNlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogb2JqLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogb2JqLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nOiBvYmoubG9uZ2l0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJzaXRlOiBvYmoud2Vic2l0ZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjZXJzLnB1c2gocHJvZHVjZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBteW1hcCA9IEwubWFwKCdtYXBpZCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXApO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3Byb2R1Y2Vyc1tpXS5sYXQsIHByb2R1Y2Vyc1tpXS5sb25nXSkuYWRkVG8obXltYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWNlcnNbaV0ud2Vic2l0ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHByb2R1Y2Vyc1tpXS53ZWJzaXRlICsgXCI+PGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSArIFwiPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9kaXNwbGF5IG1hcCB3aXRob3V0IG1hcmtlcnMgKyBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JNc2dBcGlOb3RXb3JraW5nJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgZG9tYWluZXNcIjtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBteW1hcCA9IEwubWFwKCdtYXBpZCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwiI0VBREZDMVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLnN0eWxlLmNvbG9yID0gXCIjNDQ0MzQwXCJcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMUxpbmsnKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLnN0eWxlLmNvbG9yID0gXCIjNDQ0MzQwXCJcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHdpbmVyaWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBkZXNpZ25hdGlvbnNNYXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB2YXJpZXRpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS93aW5lc1wiLCBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGlmKHN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZWxsYXRpb246IG9iai5kZXNpZ25hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IG9iai5wcm9kdWNlci5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZzogb2JqLnByb2R1Y2VyLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzVGFiLnB1c2goZGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZDFcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQxXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDFcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbXltYXAxID0gTC5tYXAoJ21hcGlkMScsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlc1RhYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKFtkZXNUYWJbaV0ubGF0LCBkZXNUYWJbaV0ubG9uZ10pLmFkZFRvKG15bWFwMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChkZXNUYWJbaV0uYXBwZWxsYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9kaXNwbGF5IG1hcCB3aXRob3V0IG1hcmtlcnMgKyBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JNc2dBcGlOb3RXb3JraW5nJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgYXBwZWxsYXRpb25zXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbXltYXAgPSBMLm1hcCgnbWFwaWQnLCB7bWluWm9vbTogNSwgbWF4Wm9vbTogOH0pLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIiNFQURGQzFcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMUxpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICB3aW5lcmllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZGVzaWduYXRpb25zTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB2YXJpZXRpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvd2luZXNcIiwgZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICBpZihzdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjZXBhZ2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlldHk6IG9iai52YXJpZXR5Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogb2JqLnByb2R1Y2VyLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nOiBvYmoucHJvZHVjZXIubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB2YXJpZXR5VGFiLnB1c2goY2VwYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZDJcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQyXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDJcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbXltYXAyID0gTC5tYXAoJ21hcGlkMicsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhcmlldHlUYWIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbdmFyaWV0eVRhYltpXS5sYXQsIHZhcmlldHlUYWJbaV0ubG9uZ10pLmFkZFRvKG15bWFwMik7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cCh2YXJpZXR5VGFiW2ldLnZhcmlldHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9kaXNwbGF5IG1hcCB3aXRob3V0IG1hcmtlcnMgKyBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JNc2dBcGlOb3RXb3JraW5nJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgY8OpcGFnZXNcIjtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBteW1hcCA9IEwubWFwKCdtYXBpZCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgc2VhcmNoRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XHJcbiAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgbGV0IHNlYXJjaE9wdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoT3B0XCIpO1xyXG4gICAgbGV0IGNsb3NlU2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZVNlYXJjaFwiKTtcclxuXHJcbiAgICBzZWFyY2hPcHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWFyY2hEaXYuaGlkZGVuID0gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgcmFkaW9PcHRTZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvT3B0U2VhcmNoXCIpO1xyXG5cclxuICAgIHNlYXJjaE9wdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlYXJjaERpdi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICBzZWFyY2hPcHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHJhZGlvT3B0U2VhcmNoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVNUVUZGUyBUTyBGSUxURVIgU0VBUkNIIE9OIE1BUC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4gICAgbGV0IHNlYXJjaEJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hCdFwiKTsgLy9sZSBib3V0dG9uIHJlY2hlcmNoZXJcclxuICAgIGxldCByYWRpb09wdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdzZWFyY2hPcHRpb24nKTsgLy9sZSByYWRpbyBidCBjaG9zZW4gYnkgdXNlciB0byBmaWx0ZXIgYnlcclxuICAgIGxldCByZXNOb3RERm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm90Rm91bmQnKTtcclxuXHJcblxyXG4gICAgY2xvc2VTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHNlYXJjaE9wdC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcHNBbmRNZW51XCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hSZXNNYXBcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoRm9ybVwiKS5yZXNldCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyouLi4uY29udHJvbHMgdGhlIHBsYWNlaG9sZGVyIG9mIHRoZSBzZWFyY2ggYmFyIHdoZW4gcGlja2luZyBkaWZmZXJlbnQgZmlsdGVyaW5nIG9wdGlvbnMgZnJvbSB0aGUgcmFkaW8gYnV0dG9ucyAuLi4uKi9cclxuICAgIGxldCBwcmV2ID0gbnVsbDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFkaW9PcHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICByYWRpb09wdFtpXS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8ocHJldikgPyBjb25zb2xlLmxvZyhwcmV2LnZhbHVlKTogbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMgIT09IHByZXYpIHtcclxuICAgICAgICAgICAgICAgIHByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSByYWRpb09wdC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyYWRpbyBjaGVja2VkID0gXCIgKyByYWRpb09wdFtpXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiYXBwZWxsYXRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFF1ZXJ5XCIpLnBsYWNlaG9sZGVyID0gJ0VudHJleiB1biBub20gZFxcJ2FwcGVsbGF0aW9uJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiY291bGV1clwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikucGxhY2Vob2xkZXIgPSAnRW50cmV6IHVuZSBjb3VsZXVyJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiY2VwYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hRdWVyeVwiKS5wbGFjZWhvbGRlciA9ICdFbnRyZXogdW4gbm9tIGRlIGPDqXBhZ2UnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXHJcblxyXG4gICAgICAgIHNlYXJjaEJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKG15bWFwUyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG15bWFwUy5vZmYoKTtcclxuICAgICAgICAgICAgICAgIG15bWFwUy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcHNBbmRNZW51XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hSZXNNYXBcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgaWYobGF5ZXJHcm91cCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxheWVyR3JvdXAuY2xlYXJMYXllcnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHAgPSB7fTtcclxuICAgICAgICAgICAgbGV0IHNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikudmFsdWU7IC8vdXNlciBpbnB1dCBpbiBzZWFyY2ggYmFyXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFkaW9PcHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChyYWRpb09wdFtpXS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5nZXQoXCJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3dpbmVzXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiNzZWFyY2hSZXNNYXBcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI3NlYXJjaFJlc01hcFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjc2VhcmNoUmVzTWFwXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBteW1hcFMgPSBMLm1hcCgnc2VhcmNoUmVzTWFwJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwUyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllckdyb3VwID0gTC5sYXllckdyb3VwKCkuYWRkVG8obXltYXBTKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJhcHBlbGxhdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRBVEFbaV0gPSBcIiArIGRhdGFbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gb2JqLmRlc2lnbmF0aW9uLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoLnRvTG93ZXJDYXNlKCkudHJpbSgpID09IG5hbWUudG9Mb3dlckNhc2UoKS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uYW1lID0gb2JqLnByb2R1Y2VyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubGF0ID0gb2JqLnByb2R1Y2VyLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxvbmcgPSBvYmoucHJvZHVjZXIubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLndlYnNpdGUgPSBvYmoucHJvZHVjZXIud2Vic2l0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3BzW2ldLmxhdCwgcHNbaV0ubG9uZ10pLmFkZFRvKGxheWVyR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBzW2ldLndlYnNpdGUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHBzW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUgKyBcIjwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJWZXVpbGxleiBlbnRyZXogdW4gbW90LlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2ggIT0gXCJcIiAmJiBwcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIkF1Y3VuIHJlc3VsdGF0IHRyb3V2ZSBwb3VyIFwiICsgc2VhcmNoICsgXCIuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImNvdWxldXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gb2JqLmNvbG9yLmNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlYXJjaC50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PSBjb2xvci50b0xvd2VyQ2FzZSgpLnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5hbWUgPSBvYmoucHJvZHVjZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5sYXQgPSBvYmoucHJvZHVjZXIubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubG9uZyA9IG9iai5wcm9kdWNlci5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAud2Vic2l0ZSA9IG9iai5wcm9kdWNlci53ZWJzaXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcy5wdXNoKHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcHNbaV0ubGF0LCBwc1tpXS5sb25nXSkuYWRkVG8obGF5ZXJHcm91cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHNbaV0ud2Vic2l0ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVwiICsgcHNbaV0ud2Vic2l0ZSArIFwiPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHNbaV0ubmFtZSArIFwiPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2ggPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIlZldWlsbGV6IGVudHJleiB1biBtb3QuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlYXJjaCAhPSBcIlwiICYmIHBzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzTm90REZvdW5kLmlubmVyVGV4dCA9IFwiQXVjdW4gcmVzdWx0YXQgdHJvdXZlIHBvdXIgXCIgKyBzZWFyY2ggKyBcIi5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiY2VwYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJpZXR5ID0gb2JqLnZhcmlldHkubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2gudG9Mb3dlckNhc2UoKS50cmltKCkgPT0gdmFyaWV0eS50b0xvd2VyQ2FzZSgpLnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5hbWUgPSBvYmoucHJvZHVjZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5sYXQgPSBvYmoucHJvZHVjZXIubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubG9uZyA9IG9iai5wcm9kdWNlci5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAud2Vic2l0ZSA9IG9iai5wcm9kdWNlci53ZWJzaXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcy5wdXNoKHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcHNbaV0ubGF0LCBwc1tpXS5sb25nXSkuYWRkVG8obGF5ZXJHcm91cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHNbaV0ud2Vic2l0ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVwiICsgcHNbaV0ud2Vic2l0ZSArIFwiPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHNbaV0ubmFtZSArIFwiPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2ggPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIlZldWlsbGV6IGVudHJleiB1biBtb3QuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlYXJjaCAhPSBcIlwiICYmIHBzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzTm90REZvdW5kLmlubmVyVGV4dCA9IFwiQXVjdW4gcmVzdWx0YXQgdHJvdXZlIHBvdXIgXCIgKyBzZWFyY2ggKyBcIi5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEZvcm1cIikucmVzZXQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy8gVGhlIExlYWZsZXQgTC5NYXAgY2xhc3MgcHJvdmlkZXMgdGhlIGZpdEJvdW5kcyBtZXRob2QgdG8gem9vbSBhIG1hcCB0byBjb250YWluIGEgcmVjdGFuZ3VsYXIgYm91bmRpbmcgYm94LlxyXG4vLyBUaGUgTC5sYXRMbmdCb3VuZHMgdXRpbGl0eSBmdW5jdGlvbiBjcmVhdGVzIGEgYm91bmRpbmcgYm94IG9iamVjdCBmcm9tIGFuIGFycmF5IG9mIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgY29vcmRpbmF0ZXMuXHJcbi8vIFdpdGggYSBzaW5nbGUgbWFya2VyLCBob3dldmVyLCB3ZSBvbmx5IGhhdmUgb25lIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgY29vcmRpbmF0ZSBmcm9tIHdoaWNoIHRvIGNyZWF0ZSB0aGUgYm91bmRpbmcgYm94LlxyXG4vLyBUaGUgc29sdXRpb24gaXMgdG8gY3JlYXRlIGEgc2luZ2xlLWVsZW1lbnQgYXJyYXkgY29udGFpbmluZyB0aGUgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBjb29yZGluYXRlIG9mIHRoZSBtYXJrZXIuXHJcblxyXG4vLyBUaGUgZm9sbG93aW5nIGZ1bmN0aW9uIGNlbnRlcnMgYW5kIHpvb21zIGEgbGVhZmxldCBtYXAgb24gYSBzaW5nbGUgbWFya2VyLiBMaW5lIDIgY3JlYXRlcyB0aGUgc2luZ2xlLWVsZW1lbnQgYXJyYXkgY29udGFpbmluZ1xyXG4vLyB0aGUgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBjb29yZGluYXRlIG9mIHRoZSBtYXJrZXIuIExpbmUgMyBjcmVhdGVzIHRoZSBib3VuZGluZyBib3ggdGhhdCBlbmNsb3NlcyB0aGUgbWFya2Vy4oCZcyBsb2NhdGlvbi4gRmluYWxseSxcclxuLy8gbGluZSA0IHpvb21zIHRoZSBtYXAgdG8gZW5jbG9zZSB0aGUgYm91bmRpbmcgYm94LlxyXG5cclxuLy8gZnVuY3Rpb24gY2VudGVyTGVhZmxldE1hcE9uTWFya2VyKG1hcCwgbWFya2VyKSB7XHJcbi8vICAgICB2YXIgbGF0TG5ncyA9IFsgbWFya2VyLmdldExhdExuZygpIF07XHJcbi8vICAgICB2YXIgbWFya2VyQm91bmRzID0gTC5sYXRMbmdCb3VuZHMobGF0TG5ncyk7XHJcbi8vICAgICBtYXAuZml0Qm91bmRzKG1hcmtlckJvdW5kcyk7XHJcbi8vIH1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==