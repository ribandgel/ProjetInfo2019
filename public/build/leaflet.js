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
        document.getElementById('errorMsgApiNotWorking1').innerText = "Désolé nous n'avons pas pu trouver les données sur les appellations";

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
        document.getElementById('errorMsgApiNotWorking2').innerText = "Désolé nous n'avons pas pu trouver les données sur les cépages";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbGVhZmxldC5qcyJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIiQiLCJJY29uIiwiRGVmYXVsdCIsInByb3RvdHlwZSIsIl9nZXRJY29uVXJsIiwibWVyZ2VPcHRpb25zIiwiaWNvblJldGluYVVybCIsImljb25VcmwiLCJzaGFkb3dVcmwiLCJwcm9kdWNlcnMiLCJkZXNUYWIiLCJ2YXJpZXR5VGFiIiwibXltYXAiLCJteW1hcDEiLCJteW1hcDIiLCJteW1hcFMiLCJsYXllckdyb3VwIiwibWFya2VyIiwiYmlnbWFwaGVpZ2h0Iiwic21hbGxtYXBoZWlnaHQiLCJtYXBicmVha3dpZHRoIiwiaGlnaHpvb20iLCJsb3d6b29tIiwiaW5pdHpvb20iLCJ3aW5lcmllc01hcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkZXNpZ25hdGlvbnNNYXAiLCJ2YXJpZXRpZXNNYXAiLCJzZXRBdHRyaWJ1dGUiLCJyZWFkeSIsInN0eWxlIiwiZGlzcGxheSIsImdldCIsImRhdGEiLCJzdGF0dXMiLCJpIiwibGVuZ3RoIiwib2JqIiwicHJvZHVjZXIiLCJuYW1lIiwibGF0IiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ3ZWJzaXRlIiwicHVzaCIsIndpZHRoIiwiaGVpZ2h0IiwibWFwIiwibWluWm9vbSIsIm1heFpvb20iLCJzZXRWaWV3IiwidGlsZUxheWVyIiwiYXR0cmlidXRpb24iLCJhZGRUbyIsImJpbmRQb3B1cCIsImlubmVyVGV4dCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInVuZGVmaW5lZCIsIm9mZiIsInJlbW92ZSIsImNvbG9yIiwiYmFja2dyb3VuZCIsImRlcyIsImFwcGVsbGF0aW9uIiwiZGVzaWduYXRpb24iLCJjZXBhZ2UiLCJ2YXJpZXR5Iiwic2VhcmNoRGl2Iiwic2VhcmNoT3B0IiwiY2xvc2VTZWFyY2giLCJoaWRkZW4iLCJyYWRpb09wdFNlYXJjaCIsInNlYXJjaEJ0IiwicmFkaW9PcHQiLCJnZXRFbGVtZW50c0J5TmFtZSIsInJlc05vdERGb3VuZCIsInJlc2V0IiwicHJldiIsImNoZWNrZWQiLCJ2YWx1ZSIsInBsYWNlaG9sZGVyIiwiY2xlYXJMYXllcnMiLCJwcyIsInAiLCJzZWFyY2giLCJ0b0xvd2VyQ2FzZSIsInRyaW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLENBQUMsR0FBQ0MsbUJBQU8sQ0FBQywyREFBRCxDQUFiOztBQUNBLElBQUlDLENBQUMsR0FBR0QsbUJBQU8sQ0FBQyxvREFBRCxDQUFmO0FBRUE7Ozs7O0FBR0EsT0FBT0QsQ0FBQyxDQUFDRyxJQUFGLENBQU9DLE9BQVAsQ0FBZUMsU0FBZixDQUF5QkMsV0FBaEM7QUFDQU4sQ0FBQyxDQUFDRyxJQUFGLENBQU9DLE9BQVAsQ0FBZUcsWUFBZixDQUE0QjtBQUN4QkMsZUFBYSxFQUFFUCxtQkFBTyxDQUFDLHFHQUFELENBREU7QUFFeEJRLFNBQU8sRUFBRVIsbUJBQU8sQ0FBQywrRkFBRCxDQUZRO0FBR3hCUyxXQUFTLEVBQUVULG1CQUFPLENBQUMsbUdBQUQ7QUFITSxDQUE1QjtBQUtBOztBQUVBLElBQUlVLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLE1BQU0sR0FBRyxFQUFiO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0EsSUFBSUMsS0FBSjtBQUNBLElBQUlDLE1BQUo7QUFDQSxJQUFJQyxNQUFKO0FBQ0EsSUFBSUMsTUFBSjtBQUNBLElBQUlDLFVBQUo7QUFDQSxJQUFJQyxNQUFKO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEdBQW5CO0FBQ0EsSUFBSUMsY0FBYyxHQUFHLEdBQXJCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLEdBQXBCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxPQUFPLEdBQUcsQ0FBZDtBQUNBLElBQUlDLFFBQUo7QUFDQSxJQUFJQyxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixVQUF4QixDQUFsQjtBQUNB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QixFQUFxQ0QsR0FBQyxFQUF0QyxFQUEwQztBQUFBLFlBQWpDQSxHQUFpQztBQXdHekM7O0FBQ0QwQyxnQkFBWSxDQUFDdEIsU0FBYixHQUF5QixFQUF6QjtBQUNBL0IsWUFBUSxDQUFDQyxjQUFULENBQXdCLFlBQXhCLEVBQXNDcUQsS0FBdEM7QUFDSCxHQXhIRDtBQXlISCxDQWhkTCxFLENBa2RBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJIiwiZmlsZSI6ImxlYWZsZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgTD1yZXF1aXJlKCdsZWFmbGV0Jyk7XHJcbmxldCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG4vKiAtLS0tLS0tLS0tLS0tXHJcbiogdGhpcyBmaXhlcyBhIGxlYWZsZXQgYnVnIHRoYXQgZG9lcyBub3QgaW1wb3J0IHRoZSBtYXJrZXIgaW1hZ2VzIGlmIHdlIGRvbid0IGFkZCB0aG9zZSBsaW5lc1xyXG4qL1xyXG5kZWxldGUgTC5JY29uLkRlZmF1bHQucHJvdG90eXBlLl9nZXRJY29uVXJsO1xyXG5MLkljb24uRGVmYXVsdC5tZXJnZU9wdGlvbnMoe1xyXG4gICAgaWNvblJldGluYVVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi0yeC5wbmcnKSxcclxuICAgIGljb25Vcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24ucG5nJyksXHJcbiAgICBzaGFkb3dVcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLXNoYWRvdy5wbmcnKSxcclxufSk7XHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxubGV0IHByb2R1Y2VycyA9IFtdO1xyXG5sZXQgZGVzVGFiID0gW107XHJcbmxldCB2YXJpZXR5VGFiID0gW107XHJcbmxldCBteW1hcDtcclxubGV0IG15bWFwMTtcclxubGV0IG15bWFwMjtcclxubGV0IG15bWFwUztcclxubGV0IGxheWVyR3JvdXA7XHJcbmxldCBtYXJrZXI7XHJcbmxldCBiaWdtYXBoZWlnaHQgPSA1MDA7XHJcbmxldCBzbWFsbG1hcGhlaWdodCA9IDMwMDtcclxubGV0IG1hcGJyZWFrd2lkdGggPSA3MjA7XHJcbmxldCBoaWdoem9vbSA9IDY7XHJcbmxldCBsb3d6b29tID0gNDtcclxubGV0IGluaXR6b29tO1xyXG5sZXQgd2luZXJpZXNNYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbWFpbmVzXCIpO1xyXG5sZXQgZGVzaWduYXRpb25zTWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBlbGxhdGlvbnNcIik7XHJcbmxldCB2YXJpZXRpZXNNYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlcGFnZXNcIik7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1tYXBcIikuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFJlc01hcFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvcHJvZHVjZXJzXCIsIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICBpZihzdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9kdWNlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBvYmoubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IG9iai5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICBsb25nOiBvYmoubG9uZ2l0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYnNpdGU6IG9iai53ZWJzaXRlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjZXJzLnB1c2gocHJvZHVjZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBteW1hcCA9IEwubWFwKCdtYXBpZCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICB9KS5hZGRUbyhteW1hcCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2R1Y2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3Byb2R1Y2Vyc1tpXS5sYXQsIHByb2R1Y2Vyc1tpXS5sb25nXSkuYWRkVG8obXltYXApLmFkZFRvKG15bWFwKTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9kdWNlcnNbaV0ud2Vic2l0ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVwiICsgcHJvZHVjZXJzW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHByb2R1Y2Vyc1tpXS5uYW1lICsgXCI8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXkgbWFwIHdpdGhvdXQgbWFya2VycyArIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Vycm9yTXNnQXBpTm90V29ya2luZycpLmlubmVyVGV4dCA9IFwiRMOpc29sw6kgbm91cyBuJ2F2b25zIHBhcyBwdSB0cm91dmVyIGxlcyBkb25uw6llcyBzdXIgbGVzIGRvbWFpbmVzXCI7XHJcbiAgICAgICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIG15bWFwID0gTC5tYXAoJ21hcGlkJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgZGVzaWduYXRpb25zTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIHZhcmlldGllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG4gICAgLy8gbGlzdGVuIGZvciBzY3JlZW4gcmVzaXplIGV2ZW50cyBhbmQgY2hhbmdlcyBtYXAgc2l6ZSBhbmQgem9vbSBhY2NvcmRpbmdseVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCQoXCIjbWFwaWRcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgbXltYXAuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgbXltYXAuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tICk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBpZihteW1hcCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbXltYXAub2ZmKCk7XHJcbiAgICAgICAgICAgIG15bWFwLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMUxpbmsnKS5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMUxpbmsnKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjRUFERkMxXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuY29sb3IgPSBcIiM0NDQzNDBcIlxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAyTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuc3R5bGUuY29sb3IgPSBcIiM0NDQzNDBcIlxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgd2luZXJpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICBkZXNpZ25hdGlvbnNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHZhcmlldGllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgJC5nZXQoXCJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3Byb2R1Y2Vyc1wiLCBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGlmKHN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y2VyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBvYmoubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBvYmoubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmc6IG9iai5sb25naXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYnNpdGU6IG9iai53ZWJzaXRlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9kdWNlcnMucHVzaChwcm9kdWNlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBteW1hcCA9IEwubWFwKCdtYXBpZCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXApO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3Byb2R1Y2Vyc1tpXS5sYXQsIHByb2R1Y2Vyc1tpXS5sb25nXSkuYWRkVG8obXltYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWNlcnNbaV0ud2Vic2l0ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHByb2R1Y2Vyc1tpXS53ZWJzaXRlICsgXCI+PGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSArIFwiPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9kaXNwbGF5IG1hcCB3aXRob3V0IG1hcmtlcnMgKyBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JNc2dBcGlOb3RXb3JraW5nJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgZG9tYWluZXNcIjtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG15bWFwID0gTC5tYXAoJ21hcGlkJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUbyhteW1hcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAyTGluaycpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBpZihteW1hcDEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG15bWFwMS5vZmYoKTtcclxuICAgICAgICAgICAgbXltYXAxLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjRUFERkMxXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuc3R5bGUuY29sb3IgPSBcIiM0NDQzNDBcIlxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuc3R5bGUuY29sb3IgPSBcIiM0NDQzNDBcIlxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgd2luZXJpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGRlc2lnbmF0aW9uc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIHZhcmlldGllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgJC5nZXQoXCJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3dpbmVzXCIsIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgaWYoc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbGxhdGlvbjogb2JqLmRlc2lnbmF0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogb2JqLnByb2R1Y2VyLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nOiBvYmoucHJvZHVjZXIubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBkZXNUYWIucHVzaChkZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjbWFwaWQxXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkMVwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQxXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbXltYXAxID0gTC5tYXAoJ21hcGlkMScsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXAxKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVzVGFiLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW2Rlc1RhYltpXS5sYXQsIGRlc1RhYltpXS5sb25nXSkuYWRkVG8obXltYXAxKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKGRlc1RhYltpXS5hcHBlbGxhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2Rpc3BsYXkgbWFwIHdpdGhvdXQgbWFya2VycyArIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvck1zZ0FwaU5vdFdvcmtpbmcxJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgYXBwZWxsYXRpb25zXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZDFcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQxXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDFcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBteW1hcDEgPSBMLm1hcCgnbWFwaWQxJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUbyhteW1hcDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjbWFwaWQxXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkMVwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICBteW1hcDEuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDFcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICBteW1hcDEuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tICk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBpZihteW1hcDIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG15bWFwMi5vZmYoKTtcclxuICAgICAgICAgICAgbXltYXAyLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjRUFERkMxXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuY29sb3IgPSBcIiM0NDQzNDBcIlxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAyTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuc3R5bGUuY29sb3IgPSBcIiM0NDQzNDBcIlxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgd2luZXJpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGRlc2lnbmF0aW9uc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgdmFyaWV0aWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgJC5nZXQoXCJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3dpbmVzXCIsIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgaWYoc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2VwYWdlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpZXR5OiBvYmoudmFyaWV0eS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IG9iai5wcm9kdWNlci5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZzogb2JqLnByb2R1Y2VyLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyaWV0eVRhYi5wdXNoKGNlcGFnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZDJcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQyXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDJcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBteW1hcDIgPSBMLm1hcCgnbWFwaWQyJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUbyhteW1hcDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFyaWV0eVRhYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKFt2YXJpZXR5VGFiW2ldLmxhdCwgdmFyaWV0eVRhYltpXS5sb25nXSkuYWRkVG8obXltYXAyKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKHZhcmlldHlUYWJbaV0udmFyaWV0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2Rpc3BsYXkgbWFwIHdpdGhvdXQgbWFya2VycyArIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvck1zZ0FwaU5vdFdvcmtpbmcyJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgY8OpcGFnZXNcIjtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkMlwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDJcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkMlwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG15bWFwMiA9IEwubWFwKCdtYXBpZDInLCB7bWluWm9vbTogNSwgbWF4Wm9vbTogOH0pLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZDJcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQyXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG15bWFwMi5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkMlwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG15bWFwMi5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20gKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHNlYXJjaERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpO1xyXG4gICAgc2VhcmNoRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGxldCBzZWFyY2hPcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaE9wdFwiKTtcclxuICAgIGxldCBjbG9zZVNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VTZWFyY2hcIik7XHJcblxyXG4gICAgc2VhcmNoT3B0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VhcmNoRGl2LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHJhZGlvT3B0U2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb09wdFNlYXJjaFwiKTtcclxuXHJcbiAgICBzZWFyY2hPcHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgICAgICAgc2VhcmNoT3B0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICByYWRpb09wdFNlYXJjaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TVFVGRlMgVE8gRklMVEVSIFNFQVJDSCBPTiBNQVAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIGxldCBzZWFyY2hCdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoQnRcIik7IC8vbGUgYm91dHRvbiByZWNoZXJjaGVyXHJcbiAgICBsZXQgcmFkaW9PcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnc2VhcmNoT3B0aW9uJyk7IC8vbGUgcmFkaW8gYnQgY2hvc2VuIGJ5IHVzZXIgdG8gZmlsdGVyIGJ5XHJcbiAgICBsZXQgcmVzTm90REZvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vdEZvdW5kJyk7XHJcblxyXG5cclxuICAgIGNsb3NlU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VhcmNoRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBzZWFyY2hPcHQuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBzQW5kTWVudVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUmVzTWFwXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEZvcm1cIikucmVzZXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qLi4uLmNvbnRyb2xzIHRoZSBwbGFjZWhvbGRlciBvZiB0aGUgc2VhcmNoIGJhciB3aGVuIHBpY2tpbmcgZGlmZmVyZW50IGZpbHRlcmluZyBvcHRpb25zIGZyb20gdGhlIHJhZGlvIGJ1dHRvbnMgLi4uLiovXHJcbiAgICBsZXQgcHJldiA9IG51bGw7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvT3B0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcmFkaW9PcHRbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vKHByZXYpID8gY29uc29sZS5sb2cocHJldi52YWx1ZSk6IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzICE9PSBwcmV2KSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2ID0gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gcmFkaW9PcHQubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicmFkaW8gY2hlY2tlZCA9IFwiICsgcmFkaW9PcHRbaV0udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImFwcGVsbGF0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hRdWVyeVwiKS5wbGFjZWhvbGRlciA9ICdFbnRyZXogdW4gbm9tIGRcXCdhcHBlbGxhdGlvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImNvdWxldXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFF1ZXJ5XCIpLnBsYWNlaG9sZGVyID0gJ0VudHJleiB1bmUgY291bGV1cic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImNlcGFnZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikucGxhY2Vob2xkZXIgPSAnRW50cmV6IHVuIG5vbSBkZSBjw6lwYWdlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy52YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xyXG5cclxuICAgICAgICBzZWFyY2hCdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZihteW1hcFMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBteW1hcFMub2ZmKCk7XHJcbiAgICAgICAgICAgICAgICBteW1hcFMucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBzQW5kTWVudVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUmVzTWFwXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgIGlmKGxheWVyR3JvdXAgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsYXllckdyb3VwLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBzID0gW107XHJcbiAgICAgICAgICAgIGxldCBwID0ge307XHJcbiAgICAgICAgICAgIGxldCBzZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFF1ZXJ5XCIpLnZhbHVlOyAvL3VzZXIgaW5wdXQgaW4gc2VhcmNoIGJhclxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvT3B0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFkaW9PcHRbaV0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS93aW5lc1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIjc2VhcmNoUmVzTWFwXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNzZWFyY2hSZXNNYXBcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI3NlYXJjaFJlc01hcFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbXltYXBTID0gTC5tYXAoJ3NlYXJjaFJlc01hcCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hZGRUbyhteW1hcFMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXJHcm91cCA9IEwubGF5ZXJHcm91cCgpLmFkZFRvKG15bWFwUyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiYXBwZWxsYXRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJEQVRBW2ldID0gXCIgKyBkYXRhW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IG9iai5kZXNpZ25hdGlvbi5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlYXJjaC50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PSBuYW1lLnRvTG93ZXJDYXNlKCkudHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubmFtZSA9IG9iai5wcm9kdWNlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxhdCA9IG9iai5wcm9kdWNlci5sYXRpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5sb25nID0gb2JqLnByb2R1Y2VyLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC53ZWJzaXRlID0gb2JqLnByb2R1Y2VyLndlYnNpdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBzLnB1c2gocCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKFtwc1tpXS5sYXQsIHBzW2ldLmxvbmddKS5hZGRUbyhsYXllckdyb3VwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwc1tpXS53ZWJzaXRlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XCIgKyBwc1tpXS53ZWJzaXRlICsgXCI+PGI+RG9tYWluZTwvYj48YnI+XCIgKyBwc1tpXS5uYW1lICsgXCI8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGI+RG9tYWluZTwvYj48YnI+XCIgKyBwc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlYXJjaCA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzTm90REZvdW5kLmlubmVyVGV4dCA9IFwiVmV1aWxsZXogZW50cmV6IHVuIG1vdC5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoICE9IFwiXCIgJiYgcHMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJBdWN1biByZXN1bHRhdCB0cm91dmUgcG91ciBcIiArIHNlYXJjaCArIFwiLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJjb3VsZXVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IG9iai5jb2xvci5jb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2gudG9Mb3dlckNhc2UoKS50cmltKCkgPT0gY29sb3IudG9Mb3dlckNhc2UoKS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uYW1lID0gb2JqLnByb2R1Y2VyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubGF0ID0gb2JqLnByb2R1Y2VyLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxvbmcgPSBvYmoucHJvZHVjZXIubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLndlYnNpdGUgPSBvYmoucHJvZHVjZXIud2Vic2l0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3BzW2ldLmxhdCwgcHNbaV0ubG9uZ10pLmFkZFRvKGxheWVyR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBzW2ldLndlYnNpdGUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHBzW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUgKyBcIjwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJWZXVpbGxleiBlbnRyZXogdW4gbW90LlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2ggIT0gXCJcIiAmJiBwcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIkF1Y3VuIHJlc3VsdGF0IHRyb3V2ZSBwb3VyIFwiICsgc2VhcmNoICsgXCIuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImNlcGFnZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyaWV0eSA9IG9iai52YXJpZXR5Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoLnRvTG93ZXJDYXNlKCkudHJpbSgpID09IHZhcmlldHkudG9Mb3dlckNhc2UoKS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uYW1lID0gb2JqLnByb2R1Y2VyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubGF0ID0gb2JqLnByb2R1Y2VyLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxvbmcgPSBvYmoucHJvZHVjZXIubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLndlYnNpdGUgPSBvYmoucHJvZHVjZXIud2Vic2l0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3BzW2ldLmxhdCwgcHNbaV0ubG9uZ10pLmFkZFRvKGxheWVyR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBzW2ldLndlYnNpdGUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHBzW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUgKyBcIjwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJWZXVpbGxleiBlbnRyZXogdW4gbW90LlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2ggIT0gXCJcIiAmJiBwcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIkF1Y3VuIHJlc3VsdGF0IHRyb3V2ZSBwb3VyIFwiICsgc2VhcmNoICsgXCIuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hGb3JtXCIpLnJlc2V0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vIFRoZSBMZWFmbGV0IEwuTWFwIGNsYXNzIHByb3ZpZGVzIHRoZSBmaXRCb3VuZHMgbWV0aG9kIHRvIHpvb20gYSBtYXAgdG8gY29udGFpbiBhIHJlY3Rhbmd1bGFyIGJvdW5kaW5nIGJveC5cclxuLy8gVGhlIEwubGF0TG5nQm91bmRzIHV0aWxpdHkgZnVuY3Rpb24gY3JlYXRlcyBhIGJvdW5kaW5nIGJveCBvYmplY3QgZnJvbSBhbiBhcnJheSBvZiBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIGNvb3JkaW5hdGVzLlxyXG4vLyBXaXRoIGEgc2luZ2xlIG1hcmtlciwgaG93ZXZlciwgd2Ugb25seSBoYXZlIG9uZSBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIGNvb3JkaW5hdGUgZnJvbSB3aGljaCB0byBjcmVhdGUgdGhlIGJvdW5kaW5nIGJveC5cclxuLy8gVGhlIHNvbHV0aW9uIGlzIHRvIGNyZWF0ZSBhIHNpbmdsZS1lbGVtZW50IGFycmF5IGNvbnRhaW5pbmcgdGhlIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgY29vcmRpbmF0ZSBvZiB0aGUgbWFya2VyLlxyXG5cclxuLy8gVGhlIGZvbGxvd2luZyBmdW5jdGlvbiBjZW50ZXJzIGFuZCB6b29tcyBhIGxlYWZsZXQgbWFwIG9uIGEgc2luZ2xlIG1hcmtlci4gTGluZSAyIGNyZWF0ZXMgdGhlIHNpbmdsZS1lbGVtZW50IGFycmF5IGNvbnRhaW5pbmdcclxuLy8gdGhlIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgY29vcmRpbmF0ZSBvZiB0aGUgbWFya2VyLiBMaW5lIDMgY3JlYXRlcyB0aGUgYm91bmRpbmcgYm94IHRoYXQgZW5jbG9zZXMgdGhlIG1hcmtlcuKAmXMgbG9jYXRpb24uIEZpbmFsbHksXHJcbi8vIGxpbmUgNCB6b29tcyB0aGUgbWFwIHRvIGVuY2xvc2UgdGhlIGJvdW5kaW5nIGJveC5cclxuXHJcbi8vIGZ1bmN0aW9uIGNlbnRlckxlYWZsZXRNYXBPbk1hcmtlcihtYXAsIG1hcmtlcikge1xyXG4vLyAgICAgdmFyIGxhdExuZ3MgPSBbIG1hcmtlci5nZXRMYXRMbmcoKSBdO1xyXG4vLyAgICAgdmFyIG1hcmtlckJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGxhdExuZ3MpO1xyXG4vLyAgICAgbWFwLmZpdEJvdW5kcyhtYXJrZXJCb3VuZHMpO1xyXG4vLyB9XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=