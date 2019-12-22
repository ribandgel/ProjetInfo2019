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

var L = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js"); //let $ = require('jquery');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbGVhZmxldC5qcyJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIkljb24iLCJEZWZhdWx0IiwicHJvdG90eXBlIiwiX2dldEljb25VcmwiLCJtZXJnZU9wdGlvbnMiLCJpY29uUmV0aW5hVXJsIiwiaWNvblVybCIsInNoYWRvd1VybCIsInByb2R1Y2VycyIsImRlc1RhYiIsInZhcmlldHlUYWIiLCJteW1hcCIsIm15bWFwMSIsIm15bWFwMiIsIm15bWFwUyIsImxheWVyR3JvdXAiLCJtYXJrZXIiLCJiaWdtYXBoZWlnaHQiLCJzbWFsbG1hcGhlaWdodCIsIm1hcGJyZWFrd2lkdGgiLCJoaWdoem9vbSIsImxvd3pvb20iLCJpbml0em9vbSIsIndpbmVyaWVzTWFwIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImRlc2lnbmF0aW9uc01hcCIsInZhcmlldGllc01hcCIsInJlc2V0U2VhcmNoIiwiaW5uZXJUZXh0IiwiJCIsInByb3AiLCJzZXRBdHRyaWJ1dGUiLCJyZWFkeSIsInN0eWxlIiwiZGlzcGxheSIsImdldCIsImRhdGEiLCJzdGF0dXMiLCJpIiwibGVuZ3RoIiwib2JqIiwicHJvZHVjZXIiLCJuYW1lIiwibGF0IiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ3ZWJzaXRlIiwicHVzaCIsIndpZHRoIiwiaGVpZ2h0IiwibWFwIiwibWluWm9vbSIsIm1heFpvb20iLCJzZXRWaWV3IiwidGlsZUxheWVyIiwiYXR0cmlidXRpb24iLCJhZGRUbyIsImJpbmRQb3B1cCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNvbG9yIiwiYmFja2dyb3VuZCIsImRlcyIsImFwcGVsbGF0aW9uIiwiZGVzaWduYXRpb24iLCJjZXBhZ2UiLCJ2YXJpZXR5Iiwic2VhcmNoRGl2Iiwic2VhcmNoT3B0IiwiY2xvc2VTZWFyY2giLCJoaWRkZW4iLCJyYWRpb09wdFNlYXJjaCIsInNlYXJjaEJ0IiwicmFkaW9PcHQiLCJnZXRFbGVtZW50c0J5TmFtZSIsInJlc05vdERGb3VuZCIsInJlc2V0IiwicHJldiIsImNoZWNrZWQiLCJ2YWx1ZSIsInBsYWNlaG9sZGVyIiwidW5kZWZpbmVkIiwib2ZmIiwicmVtb3ZlIiwiY2xlYXJMYXllcnMiLCJwcyIsInAiLCJzZWFyY2giLCJ0b0xvd2VyQ2FzZSIsInRyaW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLENBQUMsR0FBQ0MsbUJBQU8sQ0FBQywyREFBRCxDQUFiLEMsQ0FDQTs7QUFFQTs7Ozs7QUFHQSxPQUFPRCxDQUFDLENBQUNFLElBQUYsQ0FBT0MsT0FBUCxDQUFlQyxTQUFmLENBQXlCQyxXQUFoQztBQUNBTCxDQUFDLENBQUNFLElBQUYsQ0FBT0MsT0FBUCxDQUFlRyxZQUFmLENBQTRCO0FBQ3hCQyxlQUFhLEVBQUVOLG1CQUFPLENBQUMscUdBQUQsQ0FERTtBQUV4Qk8sU0FBTyxFQUFFUCxtQkFBTyxDQUFDLCtGQUFELENBRlE7QUFHeEJRLFdBQVMsRUFBRVIsbUJBQU8sQ0FBQyxtR0FBRDtBQUhNLENBQTVCO0FBS0E7O0FBRUEsSUFBSVMsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsSUFBSUMsTUFBTSxHQUFHLEVBQWI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxJQUFJQyxLQUFKO0FBQ0EsSUFBSUMsTUFBSjtBQUNBLElBQUlDLE1BQUo7QUFDQSxJQUFJQyxNQUFKO0FBQ0EsSUFBSUMsVUFBSjtBQUNBLElBQUlDLE1BQUo7QUFDQSxJQUFJQyxZQUFZLEdBQUcsR0FBbkI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsR0FBckI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsR0FBcEI7QUFDQSxJQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUNBLElBQUlDLE9BQU8sR0FBRyxDQUFkO0FBQ0EsSUFBSUMsUUFBSjtBQUNBLElBQUlDLFdBQVcsR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFVBQXhCLENBQWxCO0FBQ0EsSUFBSUMsZUFBZSxHQUFH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O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJmaWxlIjoibGVhZmxldC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBMPXJlcXVpcmUoJ2xlYWZsZXQnKTtcclxuLy9sZXQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuLyogLS0tLS0tLS0tLS0tLVxyXG4qIHRoaXMgZml4ZXMgYSBsZWFmbGV0IGJ1ZyB0aGF0IGRvZXMgbm90IGltcG9ydCB0aGUgbWFya2VyIGltYWdlcyBpZiB3ZSBkb24ndCBhZGQgdGhvc2UgbGluZXNcclxuKi9cclxuZGVsZXRlIEwuSWNvbi5EZWZhdWx0LnByb3RvdHlwZS5fZ2V0SWNvblVybDtcclxuTC5JY29uLkRlZmF1bHQubWVyZ2VPcHRpb25zKHtcclxuICAgIGljb25SZXRpbmFVcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24tMngucG5nJyksXHJcbiAgICBpY29uVXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1pY29uLnBuZycpLFxyXG4gICAgc2hhZG93VXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1zaGFkb3cucG5nJyksXHJcbn0pO1xyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbmxldCBwcm9kdWNlcnMgPSBbXTtcclxubGV0IGRlc1RhYiA9IFtdO1xyXG5sZXQgdmFyaWV0eVRhYiA9IFtdO1xyXG5sZXQgbXltYXA7XHJcbmxldCBteW1hcDE7XHJcbmxldCBteW1hcDI7XHJcbmxldCBteW1hcFM7XHJcbmxldCBsYXllckdyb3VwO1xyXG5sZXQgbWFya2VyO1xyXG5sZXQgYmlnbWFwaGVpZ2h0ID0gNTAwO1xyXG5sZXQgc21hbGxtYXBoZWlnaHQgPSAzMDA7XHJcbmxldCBtYXBicmVha3dpZHRoID0gNzIwO1xyXG5sZXQgaGlnaHpvb20gPSA2O1xyXG5sZXQgbG93em9vbSA9IDQ7XHJcbmxldCBpbml0em9vbTtcclxubGV0IHdpbmVyaWVzTWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21haW5lc1wiKTtcclxubGV0IGRlc2lnbmF0aW9uc01hcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwZWxsYXRpb25zXCIpO1xyXG5sZXQgdmFyaWV0aWVzTWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZXBhZ2VzXCIpO1xyXG5cclxuZnVuY3Rpb24gcmVzZXRTZWFyY2goKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdEZvdW5kXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICAkKFwiI2Rlc2lnbmF0aW9uUmFkaW9cIikucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LW1hcFwiKS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUmVzTWFwXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS9wcm9kdWNlcnNcIiwgZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgIGlmKHN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb2R1Y2VyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG9iai5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogb2JqLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvbmc6IG9iai5sb25naXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgd2Vic2l0ZTogb2JqLndlYnNpdGVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBwcm9kdWNlcnMucHVzaChwcm9kdWNlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIG15bWFwID0gTC5tYXAoJ21hcGlkJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcHJvZHVjZXJzW2ldLmxhdCwgcHJvZHVjZXJzW2ldLmxvbmddKS5hZGRUbyhteW1hcCkuYWRkVG8obXltYXApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y2Vyc1tpXS53ZWJzaXRlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XCIgKyBwcm9kdWNlcnNbaV0ud2Vic2l0ZSArIFwiPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHJvZHVjZXJzW2ldLm5hbWUgKyBcIjwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHByb2R1Y2Vyc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vZGlzcGxheSBtYXAgd2l0aG91dCBtYXJrZXJzICsgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JNc2dBcGlOb3RXb3JraW5nJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgZG9tYWluZXNcIjtcclxuICAgICAgICAgICAgaWYgKCQoXCIjbWFwaWRcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbXltYXAgPSBMLm1hcCgnbWFwaWQnLCB7bWluWm9vbTogNSwgbWF4Wm9vbTogOH0pLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgfSkuYWRkVG8obXltYXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICBkZXNpZ25hdGlvbnNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgdmFyaWV0aWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICAvLyBsaXN0ZW4gZm9yIHNjcmVlbiByZXNpemUgZXZlbnRzIGFuZCBjaGFuZ2VzIG1hcCBzaXplIGFuZCB6b29tIGFjY29yZGluZ2x5XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICBteW1hcC5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICBteW1hcC5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20gKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIiNFQURGQzFcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICB3aW5lcmllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGRlc2lnbmF0aW9uc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgdmFyaWV0aWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvcHJvZHVjZXJzXCIsIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgaWYoc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZHVjZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG9iai5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IG9iai5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZzogb2JqLmxvbmdpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2Vic2l0ZTogb2JqLndlYnNpdGVcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y2Vycy5wdXNoKHByb2R1Y2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG15bWFwID0gTC5tYXAoJ21hcGlkJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUbyhteW1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kdWNlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcHJvZHVjZXJzW2ldLmxhdCwgcHJvZHVjZXJzW2ldLmxvbmddKS5hZGRUbyhteW1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2R1Y2Vyc1tpXS53ZWJzaXRlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVwiICsgcHJvZHVjZXJzW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHByb2R1Y2Vyc1tpXS5uYW1lICsgXCI8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHByb2R1Y2Vyc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2Rpc3BsYXkgbWFwIHdpdGhvdXQgbWFya2VycyArIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvck1zZ0FwaU5vdFdvcmtpbmcnKS5pbm5lclRleHQgPSBcIkTDqXNvbMOpIG5vdXMgbidhdm9ucyBwYXMgcHUgdHJvdXZlciBsZXMgZG9ubsOpZXMgc3VyIGxlcyBkb21haW5lc1wiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjbWFwaWRcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbXltYXAgPSBMLm1hcCgnbWFwaWQnLCB7bWluWm9vbTogNSwgbWF4Wm9vbTogOH0pLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAyTGluaycpLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAyTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIiNFQURGQzFcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMUxpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICB3aW5lcmllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZGVzaWduYXRpb25zTWFwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgdmFyaWV0aWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvd2luZXNcIiwgZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICBpZihzdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVsbGF0aW9uOiBvYmouZGVzaWduYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBvYmoucHJvZHVjZXIubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmc6IG9iai5wcm9kdWNlci5sb25naXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc1RhYi5wdXNoKGRlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZDFcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQxXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDFcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBteW1hcDEgPSBMLm1hcCgnbWFwaWQxJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUbyhteW1hcDEpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNUYWIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbZGVzVGFiW2ldLmxhdCwgZGVzVGFiW2ldLmxvbmddKS5hZGRUbyhteW1hcDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoZGVzVGFiW2ldLmFwcGVsbGF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vZGlzcGxheSBtYXAgd2l0aG91dCBtYXJrZXJzICsgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Vycm9yTXNnQXBpTm90V29ya2luZycpLmlubmVyVGV4dCA9IFwiRMOpc29sw6kgbm91cyBuJ2F2b25zIHBhcyBwdSB0cm91dmVyIGxlcyBkb25uw6llcyBzdXIgbGVzIGFwcGVsbGF0aW9uc1wiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjbWFwaWQxXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkMVwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQxXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbXltYXAxID0gTC5tYXAoJ21hcGlkMScsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIiNFQURGQzFcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMUxpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICB3aW5lcmllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZGVzaWduYXRpb25zTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB2YXJpZXRpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvd2luZXNcIiwgZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICBpZihzdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjZXBhZ2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlldHk6IG9iai52YXJpZXR5Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogb2JqLnByb2R1Y2VyLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nOiBvYmoucHJvZHVjZXIubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB2YXJpZXR5VGFiLnB1c2goY2VwYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkMlwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDJcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkMlwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG15bWFwMiA9IEwubWFwKCdtYXBpZDInLCB7bWluWm9vbTogNSwgbWF4Wm9vbTogOH0pLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwMik7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YXJpZXR5VGFiLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3ZhcmlldHlUYWJbaV0ubGF0LCB2YXJpZXR5VGFiW2ldLmxvbmddKS5hZGRUbyhteW1hcDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAodmFyaWV0eVRhYltpXS52YXJpZXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vZGlzcGxheSBtYXAgd2l0aG91dCBtYXJrZXJzICsgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Vycm9yTXNnQXBpTm90V29ya2luZycpLmlubmVyVGV4dCA9IFwiRMOpc29sw6kgbm91cyBuJ2F2b25zIHBhcyBwdSB0cm91dmVyIGxlcyBkb25uw6llcyBzdXIgbGVzIGPDqXBhZ2VzXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZDJcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQyXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDJcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBteW1hcDIgPSBMLm1hcCgnbWFwaWQyJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUbyhteW1hcDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgc2VhcmNoRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XHJcbiAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgbGV0IHNlYXJjaE9wdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoT3B0XCIpO1xyXG4gICAgbGV0IGNsb3NlU2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZVNlYXJjaFwiKTtcclxuXHJcbiAgICBzZWFyY2hPcHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWFyY2hEaXYuaGlkZGVuID0gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgcmFkaW9PcHRTZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvT3B0U2VhcmNoXCIpO1xyXG5cclxuICAgIHNlYXJjaE9wdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlYXJjaERpdi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICBzZWFyY2hPcHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHJhZGlvT3B0U2VhcmNoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVNUVUZGUyBUTyBGSUxURVIgU0VBUkNIIE9OIE1BUC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4gICAgbGV0IHNlYXJjaEJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hCdFwiKTsgLy9sZSBib3V0dG9uIHJlY2hlcmNoZXJcclxuICAgIGxldCByYWRpb09wdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdzZWFyY2hPcHRpb24nKTsgLy9sZSByYWRpbyBidCBjaG9zZW4gYnkgdXNlciB0byBmaWx0ZXIgYnlcclxuICAgIGxldCByZXNOb3RERm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm90Rm91bmQnKTtcclxuXHJcblxyXG4gICAgY2xvc2VTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHNlYXJjaE9wdC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcHNBbmRNZW51XCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hSZXNNYXBcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoRm9ybVwiKS5yZXNldCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyouLi4uY29udHJvbHMgdGhlIHBsYWNlaG9sZGVyIG9mIHRoZSBzZWFyY2ggYmFyIHdoZW4gcGlja2luZyBkaWZmZXJlbnQgZmlsdGVyaW5nIG9wdGlvbnMgZnJvbSB0aGUgcmFkaW8gYnV0dG9ucyAuLi4uKi9cclxuICAgIGxldCBwcmV2ID0gbnVsbDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFkaW9PcHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICByYWRpb09wdFtpXS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8ocHJldikgPyBjb25zb2xlLmxvZyhwcmV2LnZhbHVlKTogbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMgIT09IHByZXYpIHtcclxuICAgICAgICAgICAgICAgIHByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSByYWRpb09wdC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyYWRpbyBjaGVja2VkID0gXCIgKyByYWRpb09wdFtpXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiYXBwZWxsYXRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFF1ZXJ5XCIpLnBsYWNlaG9sZGVyID0gJ0VudHJleiB1biBub20gZFxcJ2FwcGVsbGF0aW9uJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiY291bGV1clwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikucGxhY2Vob2xkZXIgPSAnRW50cmV6IHVuZSBjb3VsZXVyJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiY2VwYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hRdWVyeVwiKS5wbGFjZWhvbGRlciA9ICdFbnRyZXogdW4gbm9tIGRlIGPDqXBhZ2UnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXHJcblxyXG4gICAgICAgIHNlYXJjaEJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKG15bWFwUyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG15bWFwUy5vZmYoKTtcclxuICAgICAgICAgICAgICAgIG15bWFwUy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcHNBbmRNZW51XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hSZXNNYXBcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgaWYobGF5ZXJHcm91cCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxheWVyR3JvdXAuY2xlYXJMYXllcnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHAgPSB7fTtcclxuICAgICAgICAgICAgbGV0IHNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikudmFsdWU7IC8vdXNlciBpbnB1dCBpbiBzZWFyY2ggYmFyXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFkaW9PcHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChyYWRpb09wdFtpXS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5nZXQoXCJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3dpbmVzXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiNzZWFyY2hSZXNNYXBcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI3NlYXJjaFJlc01hcFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjc2VhcmNoUmVzTWFwXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBteW1hcFMgPSBMLm1hcCgnc2VhcmNoUmVzTWFwJywge21pblpvb206IDUsIG1heFpvb206IDh9KS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwUyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllckdyb3VwID0gTC5sYXllckdyb3VwKCkuYWRkVG8obXltYXBTKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJhcHBlbGxhdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRBVEFbaV0gPSBcIiArIGRhdGFbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gb2JqLmRlc2lnbmF0aW9uLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoLnRvTG93ZXJDYXNlKCkudHJpbSgpID09IG5hbWUudG9Mb3dlckNhc2UoKS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uYW1lID0gb2JqLnByb2R1Y2VyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubGF0ID0gb2JqLnByb2R1Y2VyLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxvbmcgPSBvYmoucHJvZHVjZXIubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLndlYnNpdGUgPSBvYmoucHJvZHVjZXIud2Vic2l0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3BzW2ldLmxhdCwgcHNbaV0ubG9uZ10pLmFkZFRvKGxheWVyR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBzW2ldLndlYnNpdGUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHBzW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUgKyBcIjwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHBzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJWZXVpbGxleiBlbnRyZXogdW4gbW90LlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2ggIT0gXCJcIiAmJiBwcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIkF1Y3VuIHJlc3VsdGF0IHRyb3V2ZSBwb3VyIFwiICsgc2VhcmNoICsgXCIuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImNvdWxldXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gb2JqLmNvbG9yLmNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlYXJjaC50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PSBjb2xvci50b0xvd2VyQ2FzZSgpLnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5hbWUgPSBvYmoucHJvZHVjZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5sYXQgPSBvYmoucHJvZHVjZXIubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubG9uZyA9IG9iai5wcm9kdWNlci5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAud2Vic2l0ZSA9IG9iai5wcm9kdWNlci53ZWJzaXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcy5wdXNoKHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcHNbaV0ubGF0LCBwc1tpXS5sb25nXSkuYWRkVG8obGF5ZXJHcm91cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHNbaV0ud2Vic2l0ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVwiICsgcHNbaV0ud2Vic2l0ZSArIFwiPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHNbaV0ubmFtZSArIFwiPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2ggPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIlZldWlsbGV6IGVudHJleiB1biBtb3QuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlYXJjaCAhPSBcIlwiICYmIHBzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzTm90REZvdW5kLmlubmVyVGV4dCA9IFwiQXVjdW4gcmVzdWx0YXQgdHJvdXZlIHBvdXIgXCIgKyBzZWFyY2ggKyBcIi5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiY2VwYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJpZXR5ID0gb2JqLnZhcmlldHkubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2gudG9Mb3dlckNhc2UoKS50cmltKCkgPT0gdmFyaWV0eS50b0xvd2VyQ2FzZSgpLnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5hbWUgPSBvYmoucHJvZHVjZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5sYXQgPSBvYmoucHJvZHVjZXIubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubG9uZyA9IG9iai5wcm9kdWNlci5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAud2Vic2l0ZSA9IG9iai5wcm9kdWNlci53ZWJzaXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcy5wdXNoKHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcHNbaV0ubGF0LCBwc1tpXS5sb25nXSkuYWRkVG8obGF5ZXJHcm91cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHNbaV0ud2Vic2l0ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVwiICsgcHNbaV0ud2Vic2l0ZSArIFwiPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHNbaV0ubmFtZSArIFwiPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2ggPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIlZldWlsbGV6IGVudHJleiB1biBtb3QuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlYXJjaCAhPSBcIlwiICYmIHBzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzTm90REZvdW5kLmlubmVyVGV4dCA9IFwiQXVjdW4gcmVzdWx0YXQgdHJvdXZlIHBvdXIgXCIgKyBzZWFyY2ggKyBcIi5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc05vdERGb3VuZC5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEZvcm1cIikucmVzZXQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy8gVGhlIExlYWZsZXQgTC5NYXAgY2xhc3MgcHJvdmlkZXMgdGhlIGZpdEJvdW5kcyBtZXRob2QgdG8gem9vbSBhIG1hcCB0byBjb250YWluIGEgcmVjdGFuZ3VsYXIgYm91bmRpbmcgYm94LlxyXG4vLyBUaGUgTC5sYXRMbmdCb3VuZHMgdXRpbGl0eSBmdW5jdGlvbiBjcmVhdGVzIGEgYm91bmRpbmcgYm94IG9iamVjdCBmcm9tIGFuIGFycmF5IG9mIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgY29vcmRpbmF0ZXMuXHJcbi8vIFdpdGggYSBzaW5nbGUgbWFya2VyLCBob3dldmVyLCB3ZSBvbmx5IGhhdmUgb25lIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgY29vcmRpbmF0ZSBmcm9tIHdoaWNoIHRvIGNyZWF0ZSB0aGUgYm91bmRpbmcgYm94LlxyXG4vLyBUaGUgc29sdXRpb24gaXMgdG8gY3JlYXRlIGEgc2luZ2xlLWVsZW1lbnQgYXJyYXkgY29udGFpbmluZyB0aGUgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBjb29yZGluYXRlIG9mIHRoZSBtYXJrZXIuXHJcblxyXG4vLyBUaGUgZm9sbG93aW5nIGZ1bmN0aW9uIGNlbnRlcnMgYW5kIHpvb21zIGEgbGVhZmxldCBtYXAgb24gYSBzaW5nbGUgbWFya2VyLiBMaW5lIDIgY3JlYXRlcyB0aGUgc2luZ2xlLWVsZW1lbnQgYXJyYXkgY29udGFpbmluZ1xyXG4vLyB0aGUgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBjb29yZGluYXRlIG9mIHRoZSBtYXJrZXIuIExpbmUgMyBjcmVhdGVzIHRoZSBib3VuZGluZyBib3ggdGhhdCBlbmNsb3NlcyB0aGUgbWFya2Vy4oCZcyBsb2NhdGlvbi4gRmluYWxseSxcclxuLy8gbGluZSA0IHpvb21zIHRoZSBtYXAgdG8gZW5jbG9zZSB0aGUgYm91bmRpbmcgYm94LlxyXG5cclxuLy8gZnVuY3Rpb24gY2VudGVyTGVhZmxldE1hcE9uTWFya2VyKG1hcCwgbWFya2VyKSB7XHJcbi8vICAgICB2YXIgbGF0TG5ncyA9IFsgbWFya2VyLmdldExhdExuZygpIF07XHJcbi8vICAgICB2YXIgbWFya2VyQm91bmRzID0gTC5sYXRMbmdCb3VuZHMobGF0TG5ncyk7XHJcbi8vICAgICBtYXAuZml0Qm91bmRzKG1hcmtlckJvdW5kcyk7XHJcbi8vIH1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==