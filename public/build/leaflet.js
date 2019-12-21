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
 ---------------*/


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
      layerGroup = L.layerGroup().addTo(mymap);

      for (var _i = 0; _i < producers.length; _i++) {
        marker = L.marker([producers[_i].lat, producers[_i]["long"]]).addTo(layerGroup);

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
        layerGroup = L.layerGroup().addTo(mymap);

        for (var _i2 = 0; _i2 < producers.length; _i2++) {
          marker = L.marker([producers[_i2].lat, producers[_i2]["long"]]).addTo(layerGroup);

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
        layerGroup = L.layerGroup().addTo(mymap1);

        for (var _i3 = 0; _i3 < desTab.length; _i3++) {
          marker = L.marker([desTab[_i3].lat, desTab[_i3]["long"]]).addTo(layerGroup);
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
          console.log("obj.variety.name = " + obj.variety.name);
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
        layerGroup = L.layerGroup().addTo(mymap2);

        for (var _i4 = 0; _i4 < varietyTab.length; _i4++) {
          marker = L.marker([varietyTab[_i4].lat, varietyTab[_i4]["long"]]).addTo(layerGroup);
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
  closeSearch.addEventListener("click", function () {
    searchDiv.style.display = "none";
    searchOpt.style.display = "inline";
  });
  /*----------------------------STUFFS TO FILTER SEARCH ON MAP-------------------------------*/

  var searchBt = document.getElementById("searchBt"); //le boutton rechercher

  var radioOpt = document.getElementsByName('searchOption'); //le radio bt chosen by user to filter by

  var resNotDFound = document.getElementById('notFound');
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
    layerGroup.clearLayers();
    var ps = [];
    var p = {};
    var search = document.getElementById("searchQuery").value; //ce qu'a ecrit l'utilisateur dans la barre de recherche

    var _loop = function _loop(_i6) {
      if (radioOpt[_i6].checked) {
        $.get("http://127.0.0.1:8000/api/wines", function (data) {
          if (radioOpt[_i6].value === "appellation") {
            for (var _i7 = 0; _i7 < data.length; _i7++) {
              var obj = data[_i7];
              console.log("DATA[i] = " + data[_i7]);
              var name = obj.designation.name;

              if (search.toLowerCase().trim() == name.toLowerCase().trim()) {
                p.name = obj.producer.name; //console.log("name found = " + p.name);

                p.lat = obj.producer.latitude; //console.log("name found = " + p.lat);

                p["long"] = obj.producer.longitude; //console.log("name found = " + p.long);

                ps.push(p);

                for (var _i8 = 0; _i8 < ps.length; _i8++) {
                  marker = L.marker([ps[_i8].lat, ps[_i8]["long"]]).addTo(layerGroup);
                  marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + ps[_i8].name + "</a>");
                }
              }
            }

            if (ps.length == 0) {
              resNotDFound.innerText = "Pas de résultats.";
            }
          }

          if (radioOpt[_i6].value === "couleur") {
            for (var _i9 = 0; _i9 < data.length; _i9++) {
              var _obj = data[_i9];
              var color = _obj.color.color; //console.log("COLOR = " + color);

              if (search.toLowerCase().trim() == color.toLowerCase().trim()) {
                p.name = _obj.producer.name; //console.log("name found = " + p.name);

                p.lat = _obj.producer.latitude; //console.log("name found = " + p.lat);

                p["long"] = _obj.producer.longitude; //console.log("name found = " + p.long);

                ps.push(p);

                for (var _i10 = 0; _i10 < ps.length; _i10++) {
                  marker = L.marker([ps[_i10].lat, ps[_i10]["long"]]).addTo(layerGroup);
                  marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + ps[_i10].name + "</a>");
                }
              }
            }
          }

          if (radioOpt[_i6].value === "cepage") {
            for (var _i11 = 0; _i11 < data.length; _i11++) {
              var _obj2 = data[_i11];
              var variety = _obj2.variety.name;

              if (search.toLowerCase().trim() == variety.toLowerCase().trim()) {
                p.name = _obj2.producer.name; //console.log("name found = " + p.name);

                p.lat = _obj2.producer.latitude; //console.log("name found = " + p.lat);

                p["long"] = _obj2.producer.longitude; //console.log("name found = " + p.long);

                ps.push(p);

                for (var _i12 = 0; _i12 < ps.length; _i12++) {
                  marker = L.marker([ps[_i12].lat, ps[_i12]["long"]]).addTo(layerGroup);
                  marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + ps[_i12].name + "</a>");
                }
              }
            }
          }
        });
      }
    };

    for (var _i6 = 0; _i6 < radioOpt.length; _i6++) {
      _loop(_i6);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbGVhZmxldC5qcyJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIiQiLCJJY29uIiwiRGVmYXVsdCIsInByb3RvdHlwZSIsIl9nZXRJY29uVXJsIiwibWVyZ2VPcHRpb25zIiwiaWNvblJldGluYVVybCIsImljb25VcmwiLCJzaGFkb3dVcmwiLCJwcm9kdWNlcnMiLCJkZXNUYWIiLCJ2YXJpZXR5VGFiIiwibXltYXAiLCJteW1hcDEiLCJteW1hcDIiLCJsYXllckdyb3VwIiwibWFya2VyIiwiYmlnbWFwaGVpZ2h0Iiwic21hbGxtYXBoZWlnaHQiLCJtYXBicmVha3dpZHRoIiwiaGlnaHpvb20iLCJsb3d6b29tIiwiaW5pdHpvb20iLCJ3aW5lcmllc01hcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkZXNpZ25hdGlvbnNNYXAiLCJ2YXJpZXRpZXNNYXAiLCJzZXRBdHRyaWJ1dGUiLCJyZWFkeSIsImdldCIsImRhdGEiLCJzdGF0dXMiLCJpIiwibGVuZ3RoIiwib2JqIiwicHJvZHVjZXIiLCJuYW1lIiwibGF0IiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ3ZWJzaXRlIiwicHVzaCIsIndpZHRoIiwiaGVpZ2h0IiwibWFwIiwibWluWm9vbSIsIm1heFpvb20iLCJzZXRWaWV3IiwidGlsZUxheWVyIiwiYXR0cmlidXRpb24iLCJhZGRUbyIsImJpbmRQb3B1cCIsImlubmVyVGV4dCIsInN0eWxlIiwiZGlzcGxheSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNvbG9yIiwiYmFja2dyb3VuZCIsImRlcyIsImFwcGVsbGF0aW9uIiwiZGVzaWduYXRpb24iLCJjb25zb2xlIiwibG9nIiwidmFyaWV0eSIsImNlcGFnZSIsInNlYXJjaERpdiIsInNlYXJjaE9wdCIsImNsb3NlU2VhcmNoIiwiaGlkZGVuIiwicmFkaW9PcHRTZWFyY2giLCJzZWFyY2hCdCIsInJhZGlvT3B0IiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJyZXNOb3RERm91bmQiLCJwcmV2IiwiY2hlY2tlZCIsInZhbHVlIiwicGxhY2Vob2xkZXIiLCJjbGVhckxheWVycyIsInBzIiwicCIsInNlYXJjaCIsInRvTG93ZXJDYXNlIiwidHJpbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsQ0FBQyxHQUFDQyxtQkFBTyxDQUFDLDJEQUFELENBQWI7O0FBQ0EsSUFBSUMsQ0FBQyxHQUFHRCxtQkFBTyxDQUFDLG9EQUFELENBQWY7QUFFQTs7Ozs7QUFHQSxPQUFPRCxDQUFDLENBQUNHLElBQUYsQ0FBT0MsT0FBUCxDQUFlQyxTQUFmLENBQXlCQyxXQUFoQztBQUNBTixDQUFDLENBQUNHLElBQUYsQ0FBT0MsT0FBUCxDQUFlRyxZQUFmLENBQTRCO0FBQ3hCQyxlQUFhLEVBQUVQLG1CQUFPLENBQUMscUdBQUQsQ0FERTtBQUV4QlEsU0FBTyxFQUFFUixtQkFBTyxDQUFDLCtGQUFELENBRlE7QUFHeEJTLFdBQVMsRUFBRVQsbUJBQU8sQ0FBQyxtR0FBRDtBQUhNLENBQTVCO0FBS0E7O0FBRUEsSUFBSVUsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsSUFBSUMsTUFBTSxHQUFHLEVBQWI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxJQUFJQyxLQUFKO0FBQ0EsSUFBSUMsTUFBSjtBQUNBLElBQUlDLE1BQUo7QUFDQSxJQUFJQyxVQUFKO0FBQ0EsSUFBSUMsTUFBSjtBQUNBLElBQUlDLFlBQVksR0FBRyxHQUFuQjtBQUNBLElBQUlDLGNBQWMsR0FBRyxHQUFyQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxHQUFwQjtBQUNBLElBQUlDLFFBQVEsR0FBRyxDQUFmO0FBQ0EsSUFBSUMsT0FBTyxHQUFHLENBQWQ7QUFDQSxJQUFJQyxRQUFKO0FBQ0EsSUFBSUMsV0FBVyxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBbEI7QUFDQSxJQUFJQyxlQUFlLEdBQUdGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixjQUF4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QUMsQ0FBQ2tCLE1BQUYsQ0FBUyxDQUFDa0UsRUFBRSxDQUFDakQsSUFBRCxDQUFGLENBQU1LLEdBQVAsRUFBWTRDLEVBQUUsQ0FBQ2pELElBQUQsQ0FBRixRQUFaLENBQVQsRUFBa0NrQixLQUFsQyxDQUF3Q3BDLFVBQXhDLENBQVQ7QUFDQUMsd0JBQU0sQ0FBQ29DLFNBQVAsQ0FBaUIsOENBQThDOEIsRUFBRSxDQUFDakQsSUFBRCxDQUFGLENBQU1JLElBQXBELEdBQTJELE1BQTVFO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDSixTQS9ERDtBQWdFSDtBQXZFc0M7O0FBSzNDLFNBQUssSUFBSUosR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR3lDLFFBQVEsQ0FBQ3hDLE1BQTdCLEVBQXFDRCxHQUFDLEVBQXRDLEVBQTBDO0FBQUEsWUFBakNBLEdBQWlDO0FBbUV6QztBQUNKLEdBekVEO0FBMEVILENBM1lMLEUsQ0E2WUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJmaWxlIjoibGVhZmxldC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBMPXJlcXVpcmUoJ2xlYWZsZXQnKTtcclxubGV0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbi8qIC0tLS0tLS0tLS0tLS1cclxuKiB0aGlzIGZpeGVzIGEgbGVhZmxldCBidWcgdGhhdCBkb2VzIG5vdCBpbXBvcnQgdGhlIG1hcmtlciBpbWFnZXMgaWYgd2UgZG9uJ3QgYWRkIHRob3NlIGxpbmVzXHJcbiAtLS0tLS0tLS0tLS0tLS0qL1xyXG5kZWxldGUgTC5JY29uLkRlZmF1bHQucHJvdG90eXBlLl9nZXRJY29uVXJsO1xyXG5MLkljb24uRGVmYXVsdC5tZXJnZU9wdGlvbnMoe1xyXG4gICAgaWNvblJldGluYVVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi0yeC5wbmcnKSxcclxuICAgIGljb25Vcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24ucG5nJyksXHJcbiAgICBzaGFkb3dVcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLXNoYWRvdy5wbmcnKSxcclxufSk7XHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxubGV0IHByb2R1Y2VycyA9IFtdO1xyXG5sZXQgZGVzVGFiID0gW107XHJcbmxldCB2YXJpZXR5VGFiID0gW107XHJcbmxldCBteW1hcDtcclxubGV0IG15bWFwMTtcclxubGV0IG15bWFwMjtcclxubGV0IGxheWVyR3JvdXA7XHJcbmxldCBtYXJrZXI7XHJcbmxldCBiaWdtYXBoZWlnaHQgPSA1MDA7XHJcbmxldCBzbWFsbG1hcGhlaWdodCA9IDMwMDtcclxubGV0IG1hcGJyZWFrd2lkdGggPSA3MjA7XHJcbmxldCBoaWdoem9vbSA9IDY7XHJcbmxldCBsb3d6b29tID0gNDtcclxubGV0IGluaXR6b29tO1xyXG5sZXQgd2luZXJpZXNNYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbWFpbmVzXCIpO1xyXG5sZXQgZGVzaWduYXRpb25zTWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBlbGxhdGlvbnNcIik7XHJcbmxldCB2YXJpZXRpZXNNYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlcGFnZXNcIik7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1tYXBcIikuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvcHJvZHVjZXJzXCIsIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICBpZihzdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9kdWNlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBvYmoubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IG9iai5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICBsb25nOiBvYmoubG9uZ2l0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYnNpdGU6IG9iai53ZWJzaXRlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjZXJzLnB1c2gocHJvZHVjZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBteW1hcCA9IEwubWFwKCdtYXBpZCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICB9KS5hZGRUbyhteW1hcCk7XHJcblxyXG4gICAgICAgICAgICBsYXllckdyb3VwID0gTC5sYXllckdyb3VwKCkuYWRkVG8obXltYXApO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2R1Y2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3Byb2R1Y2Vyc1tpXS5sYXQsIHByb2R1Y2Vyc1tpXS5sb25nXSkuYWRkVG8obGF5ZXJHcm91cCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZHVjZXJzW2ldLndlYnNpdGUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHByb2R1Y2Vyc1tpXS53ZWJzaXRlICsgXCI+PGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSArIFwiPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHJvZHVjZXJzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9kaXNwbGF5IG1hcCB3aXRob3V0IG1hcmtlcnMgKyBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvck1zZ0FwaU5vdFdvcmtpbmcnKS5pbm5lclRleHQgPSBcIkTDqXNvbMOpIG5vdXMgbidhdm9ucyBwYXMgcHUgdHJvdXZlciBsZXMgZG9ubsOpZXMgc3VyIGxlcyBkb21haW5lc1wiO1xyXG4gICAgICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBteW1hcCA9IEwubWFwKCdtYXBpZCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICB9KS5hZGRUbyhteW1hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGRlc2lnbmF0aW9uc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB2YXJpZXRpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cclxuICAgIC8vIGxpc3RlbiBmb3Igc2NyZWVuIHJlc2l6ZSBldmVudHMgYW5kIGNoYW5nZXMgbWFwIHNpemUgYW5kIHpvb20gYWNjb3JkaW5nbHlcclxuICAgIC8vY2hlY2sgZmlyc3QgZm9yIHdoaWNoIG1hcCBpcyBhY3RpdmVcclxuICAgIC8vaWYgLi4uXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICBteW1hcC5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICBteW1hcC5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgaW5pdHpvb20gKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIiNFQURGQzFcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICB3aW5lcmllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGRlc2lnbmF0aW9uc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgdmFyaWV0aWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvcHJvZHVjZXJzXCIsIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgaWYoc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZHVjZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG9iai5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IG9iai5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZzogb2JqLmxvbmdpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2Vic2l0ZTogb2JqLndlYnNpdGVcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y2Vycy5wdXNoKHByb2R1Y2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgICAgICBteW1hcCA9IEwubWFwKCdtYXBpZCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXApO1xyXG5cclxuICAgICAgICAgICAgICAgIGxheWVyR3JvdXAgPSBMLmxheWVyR3JvdXAoKS5hZGRUbyhteW1hcCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2R1Y2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKFtwcm9kdWNlcnNbaV0ubGF0LCBwcm9kdWNlcnNbaV0ubG9uZ10pLmFkZFRvKGxheWVyR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWNlcnNbaV0ud2Vic2l0ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHByb2R1Y2Vyc1tpXS53ZWJzaXRlICsgXCI+PGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSArIFwiPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9kaXNwbGF5IG1hcCB3aXRob3V0IG1hcmtlcnMgKyBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JNc2dBcGlOb3RXb3JraW5nJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgZG9tYWluZXNcIjtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkXCIpLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBteW1hcCA9IEwubWFwKCdtYXBpZCcsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwiI0VBREZDMVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAxTGluaycpLnN0eWxlLmNvbG9yID0gXCIjNDQ0MzQwXCJcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMUxpbmsnKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLnN0eWxlLmNvbG9yID0gXCIjNDQ0MzQwXCJcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHdpbmVyaWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBkZXNpZ25hdGlvbnNNYXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB2YXJpZXRpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS93aW5lc1wiLCBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGlmKHN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZWxsYXRpb246IG9iai5kZXNpZ25hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IG9iai5wcm9kdWNlci5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZzogb2JqLnByb2R1Y2VyLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzVGFiLnB1c2goZGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZDFcIikud2lkdGgoKSA+IG1hcGJyZWFrd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGhpZ2h6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWQxXCIpLmhlaWdodChiaWdtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0em9vbSA9IGxvd3pvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDFcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbXltYXAxID0gTC5tYXAoJ21hcGlkMScsIHttaW5ab29tOiA1LCBtYXhab29tOiA4fSkuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsYXllckdyb3VwID0gTC5sYXllckdyb3VwKCkuYWRkVG8obXltYXAxKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVzVGFiLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW2Rlc1RhYltpXS5sYXQsIGRlc1RhYltpXS5sb25nXSkuYWRkVG8obGF5ZXJHcm91cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChkZXNUYWJbaV0uYXBwZWxsYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9kaXNwbGF5IG1hcCB3aXRob3V0IG1hcmtlcnMgKyBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JNc2dBcGlOb3RXb3JraW5nJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgYXBwZWxsYXRpb25zXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbXltYXAgPSBMLm1hcCgnbWFwaWQnLCB7bWluWm9vbTogNSwgbWF4Wm9vbTogOH0pLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDNMaW5rJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAzTGluaycpLnN0eWxlLmJhY2tncm91bmQgPSBcIiNFQURGQzFcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMUxpbmsnKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgICAgICB3aW5lcmllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZGVzaWduYXRpb25zTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB2YXJpZXRpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvd2luZXNcIiwgZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICBpZihzdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2JqLnZhcmlldHkubmFtZSA9IFwiICsgb2JqLnZhcmlldHkubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlcGFnZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWV0eTogb2JqLnZhcmlldHkubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBvYmoucHJvZHVjZXIubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmc6IG9iai5wcm9kdWNlci5sb25naXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlldHlUYWIucHVzaChjZXBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKFwiI21hcGlkMlwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZDJcIikuaGVpZ2h0KGJpZ21hcGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gbG93em9vbTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21hcGlkMlwiKS5oZWlnaHQoc21hbGxtYXBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgIG15bWFwMiA9IEwubWFwKCdtYXBpZDInLCB7bWluWm9vbTogNSwgbWF4Wm9vbTogOH0pLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwMik7XHJcblxyXG4gICAgICAgICAgICAgICAgbGF5ZXJHcm91cCA9IEwubGF5ZXJHcm91cCgpLmFkZFRvKG15bWFwMik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhcmlldHlUYWIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbdmFyaWV0eVRhYltpXS5sYXQsIHZhcmlldHlUYWJbaV0ubG9uZ10pLmFkZFRvKGxheWVyR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAodmFyaWV0eVRhYltpXS52YXJpZXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vZGlzcGxheSBtYXAgd2l0aG91dCBtYXJrZXJzICsgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Vycm9yTXNnQXBpTm90V29ya2luZycpLmlubmVyVGV4dCA9IFwiRMOpc29sw6kgbm91cyBuJ2F2b25zIHBhcyBwdSB0cm91dmVyIGxlcyBkb25uw6llcyBzdXIgbGVzIGPDqXBhZ2VzXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNtYXBpZFwiKS53aWR0aCgpID4gbWFwYnJlYWt3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXR6b29tID0gaGlnaHpvb207XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYXBpZFwiKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdHpvb20gPSBsb3d6b29tO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbWFwaWRcIikuaGVpZ2h0KHNtYWxsbWFwaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbXltYXAgPSBMLm1hcCgnbWFwaWQnLCB7bWluWm9vbTogNSwgbWF4Wm9vbTogOH0pLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGxldCBzZWFyY2hEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKTtcclxuICAgIHNlYXJjaERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBsZXQgc2VhcmNoT3B0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hPcHRcIik7XHJcbiAgICBsZXQgY2xvc2VTZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlU2VhcmNoXCIpO1xyXG5cclxuICAgIHNlYXJjaE9wdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlYXJjaERpdi5oaWRkZW4gPSBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCByYWRpb09wdFNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9PcHRTZWFyY2hcIik7XHJcblxyXG4gICAgc2VhcmNoT3B0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VhcmNoRGl2LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xyXG4gICAgICAgIHNlYXJjaE9wdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgcmFkaW9PcHRTZWFyY2guc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2xvc2VTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHNlYXJjaE9wdC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgIH0pXHJcblxyXG4gICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tU1RVRkZTIFRPIEZJTFRFUiBTRUFSQ0ggT04gTUFQLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbiAgICBsZXQgc2VhcmNoQnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEJ0XCIpOyAvL2xlIGJvdXR0b24gcmVjaGVyY2hlclxyXG4gICAgbGV0IHJhZGlvT3B0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3NlYXJjaE9wdGlvbicpOyAvL2xlIHJhZGlvIGJ0IGNob3NlbiBieSB1c2VyIHRvIGZpbHRlciBieVxyXG4gICAgbGV0IHJlc05vdERGb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdub3RGb3VuZCcpO1xyXG5cclxuICAgIC8qLi4uLmNvbnRyb2xzIHRoZSBwbGFjZWhvbGRlciBvZiB0aGUgc2VhcmNoIGJhciB3aGVuIHBpY2tpbmcgZGlmZmVyZW50IGZpbHRlcmluZyBvcHRpb25zIGZyb20gdGhlIHJhZGlvIGJ1dHRvbnMgLi4uLiovXHJcbiAgICBsZXQgcHJldiA9IG51bGw7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvT3B0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcmFkaW9PcHRbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vKHByZXYpID8gY29uc29sZS5sb2cocHJldi52YWx1ZSk6IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzICE9PSBwcmV2KSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2ID0gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gcmFkaW9PcHQubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicmFkaW8gY2hlY2tlZCA9IFwiICsgcmFkaW9PcHRbaV0udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImFwcGVsbGF0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hRdWVyeVwiKS5wbGFjZWhvbGRlciA9ICdFbnRyZXogdW4gbm9tIGRcXCdhcHBlbGxhdGlvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImNvdWxldXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFF1ZXJ5XCIpLnBsYWNlaG9sZGVyID0gJ0VudHJleiB1bmUgY291bGV1cic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImNlcGFnZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikucGxhY2Vob2xkZXIgPSAnRW50cmV6IHVuIG5vbSBkZSBjw6lwYWdlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy52YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xyXG5cclxuICAgICAgICBzZWFyY2hCdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsYXllckdyb3VwLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgICAgIGxldCBwcyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgcCA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgc2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hRdWVyeVwiKS52YWx1ZTsgLy9jZSBxdSdhIGVjcml0IGwndXRpbGlzYXRldXIgZGFucyBsYSBiYXJyZSBkZSByZWNoZXJjaGVcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWRpb09wdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJhZGlvT3B0W2ldLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvd2luZXNcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcImFwcGVsbGF0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREFUQVtpXSA9IFwiICsgZGF0YVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBvYmouZGVzaWduYXRpb24ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2gudG9Mb3dlckNhc2UoKS50cmltKCkgPT0gbmFtZS50b0xvd2VyQ2FzZSgpLnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5hbWUgPSBvYmoucHJvZHVjZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIm5hbWUgZm91bmQgPSBcIiArIHAubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubGF0ID0gb2JqLnByb2R1Y2VyLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibmFtZSBmb3VuZCA9IFwiICsgcC5sYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxvbmcgPSBvYmoucHJvZHVjZXIubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibmFtZSBmb3VuZCA9IFwiICsgcC5sb25nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3BzW2ldLmxhdCwgcHNbaV0ubG9uZ10pLmFkZFRvKGxheWVyR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIGhyZWY9Jy9pbmZvX3dpbmVyeSc+PGI+RG9tYWluZTwvYj48YnI+XCIgKyBwc1tpXS5uYW1lICsgXCI8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocHMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNOb3RERm91bmQuaW5uZXJUZXh0ID0gXCJQYXMgZGUgcsOpc3VsdGF0cy5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJjb3VsZXVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IG9iai5jb2xvci5jb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ09MT1IgPSBcIiArIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2gudG9Mb3dlckNhc2UoKS50cmltKCkgPT0gY29sb3IudG9Mb3dlckNhc2UoKS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5uYW1lID0gb2JqLnByb2R1Y2VyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJuYW1lIGZvdW5kID0gXCIgKyBwLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxhdCA9IG9iai5wcm9kdWNlci5sYXRpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIm5hbWUgZm91bmQgPSBcIiArIHAubGF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5sb25nID0gb2JqLnByb2R1Y2VyLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIm5hbWUgZm91bmQgPSBcIiArIHAubG9uZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBzLnB1c2gocCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKFtwc1tpXS5sYXQsIHBzW2ldLmxvbmddKS5hZGRUbyhsYXllckdyb3VwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSBocmVmPScvaW5mb193aW5lcnknPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHNbaV0ubmFtZSArIFwiPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiY2VwYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJpZXR5ID0gb2JqLnZhcmlldHkubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2gudG9Mb3dlckNhc2UoKS50cmltKCkgPT0gdmFyaWV0eS50b0xvd2VyQ2FzZSgpLnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLm5hbWUgPSBvYmoucHJvZHVjZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIm5hbWUgZm91bmQgPSBcIiArIHAubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubGF0ID0gb2JqLnByb2R1Y2VyLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibmFtZSBmb3VuZCA9IFwiICsgcC5sYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxvbmcgPSBvYmoucHJvZHVjZXIubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibmFtZSBmb3VuZCA9IFwiICsgcC5sb25nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3BzW2ldLmxhdCwgcHNbaV0ubG9uZ10pLmFkZFRvKGxheWVyR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIGhyZWY9Jy9pbmZvX3dpbmVyeSc+PGI+RG9tYWluZTwvYj48YnI+XCIgKyBwc1tpXS5uYW1lICsgXCI8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy8gVGhlIExlYWZsZXQgTC5NYXAgY2xhc3MgcHJvdmlkZXMgdGhlIGZpdEJvdW5kcyBtZXRob2QgdG8gem9vbSBhIG1hcCB0byBjb250YWluIGEgcmVjdGFuZ3VsYXIgYm91bmRpbmcgYm94LlxyXG4vLyBUaGUgTC5sYXRMbmdCb3VuZHMgdXRpbGl0eSBmdW5jdGlvbiBjcmVhdGVzIGEgYm91bmRpbmcgYm94IG9iamVjdCBmcm9tIGFuIGFycmF5IG9mIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgY29vcmRpbmF0ZXMuXHJcbi8vIFdpdGggYSBzaW5nbGUgbWFya2VyLCBob3dldmVyLCB3ZSBvbmx5IGhhdmUgb25lIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgY29vcmRpbmF0ZSBmcm9tIHdoaWNoIHRvIGNyZWF0ZSB0aGUgYm91bmRpbmcgYm94LlxyXG4vLyBUaGUgc29sdXRpb24gaXMgdG8gY3JlYXRlIGEgc2luZ2xlLWVsZW1lbnQgYXJyYXkgY29udGFpbmluZyB0aGUgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBjb29yZGluYXRlIG9mIHRoZSBtYXJrZXIuXHJcblxyXG4vLyBUaGUgZm9sbG93aW5nIGZ1bmN0aW9uIGNlbnRlcnMgYW5kIHpvb21zIGEgbGVhZmxldCBtYXAgb24gYSBzaW5nbGUgbWFya2VyLiBMaW5lIDIgY3JlYXRlcyB0aGUgc2luZ2xlLWVsZW1lbnQgYXJyYXkgY29udGFpbmluZ1xyXG4vLyB0aGUgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBjb29yZGluYXRlIG9mIHRoZSBtYXJrZXIuIExpbmUgMyBjcmVhdGVzIHRoZSBib3VuZGluZyBib3ggdGhhdCBlbmNsb3NlcyB0aGUgbWFya2Vy4oCZcyBsb2NhdGlvbi4gRmluYWxseSxcclxuLy8gbGluZSA0IHpvb21zIHRoZSBtYXAgdG8gZW5jbG9zZSB0aGUgYm91bmRpbmcgYm94LlxyXG5cclxuLy8gZnVuY3Rpb24gY2VudGVyTGVhZmxldE1hcE9uTWFya2VyKG1hcCwgbWFya2VyKSB7XHJcbi8vICAgICB2YXIgbGF0TG5ncyA9IFsgbWFya2VyLmdldExhdExuZygpIF07XHJcbi8vICAgICB2YXIgbWFya2VyQm91bmRzID0gTC5sYXRMbmdCb3VuZHMobGF0TG5ncyk7XHJcbi8vICAgICBtYXAuZml0Qm91bmRzKG1hcmtlckJvdW5kcyk7XHJcbi8vIH1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==