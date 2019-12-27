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

var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"); // line 132 no need for for loop probably needs to take care of hat first then we can count more easily
// the issue is cpt can be > 3 and only have one winery associated with it. ex moulis so how can we really count ? line 343

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
//-------- variables --------//

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
var smallmapheight = 370;
var mapbreakwidth = 460;
var highzoom = 5.75;
var mediumZoom = 5; // let lowzoom = 3;

var initzoom;
var wineriesMap = document.getElementById("domaines");
var designationsMap = document.getElementById("appellations");
var varietiesMap = document.getElementById("cepages");
var searchResMap = document.getElementById("searchResMap");
var searchDiv = document.getElementById("search"); //div that contains the search form

var searchOpt = document.getElementById("searchOpt"); // button "Rechercher sur la carte"

var closeSearch = document.getElementById("closeSearch"); // button to close search

var radioOptSearch = document.getElementById("radioOptSearch"); // radio buttons

var radioOpt = document.getElementsByName("searchOption"); //le radio bt chosen by user to filter by

var resNotFound = document.getElementById("notFound"); //div to display error message
// let mobile;

var markerArr = []; //-------- end variables --------//
//-------- functions --------//

function sizeMap(idMap) {
  if ($("#" + idMap).width() > mapbreakwidth) {
    initzoom = highzoom;
    $("#" + idMap).height(bigmapheight);
  } else {
    initzoom = mediumZoom;
    $("#" + idMap).height(smallmapheight);
  }

  ;
}

function mapResponsiveSize(mapName, idMap) {
  window.addEventListener('resize', function (event) {
    sizeMap(idMap); // if(isMobileDevice()) {
    //     console.log("MOBILE FUNCTION");
    //     mymap.setView([46.0986268, 2.2346064], 4.5);
    // }

    if ($("#" + idMap).width() > mapbreakwidth) {
      mapName.setView([46.8527171, 2.5889735], initzoom);
    } else {
      mapName.setView([46.8527171, 2.5889735], initzoom);
    }

    ;
  });
}

function displayWineriesMap() {
  $.get("http://127.0.0.1:8000/api/producers", function (data, status) {
    sizeMap("mapid");

    if (status == "success") {
      for (var i = 0; i < data.length; i++) {
        var producer = {
          name: data[i].name,
          lat: data[i].latitude,
          "long": data[i].longitude,
          website: data[i].website
        };
        producers.push(producer);
      }

      mymap = L.map('mapid', {
        minZoom: 3,
        maxZoom: 8,
        zoomSnap: 0,
        zoomDelta: 0.25
      }).setView([46.8527171, 2.5889735], initzoom);
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
      //code below displays map without markers + error message
      document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous n'avons pas pu trouver les données sur les domaines";
      mymap = L.map('mapid', {
        minZoom: 4,
        maxZoom: 8,
        zoomSnap: 0,
        zoomDelta: 0.25
      }).setView([46.8527171, 2.5889735], initzoom);
      L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mymap);
    }

    if (isMobileDevice()) {
      mymap.setView([46.0986268, 2.2346064], 4.5);
    }

    mapResponsiveSize(mymap, "mapid");
  });
}

function changeMapsTabs(link1, link2, link3) {
  document.getElementById(link1).style.color = "black";
  document.getElementById(link1).style.background = "#EADFC1";
  document.getElementById(link2).style.color = "#444340";
  document.getElementById(link2).style.background = "white";
  document.getElementById(link3).style.color = "#444340";
  document.getElementById(link3).style.background = "white";
}

function gatherSearchRes(obj, search) {
  var arr = [];
  markerArr = [];
  var p = {
    name: obj.producer.name,
    lat: obj.producer.latitude,
    "long": obj.producer.longitude,
    website: obj.producer.website
  };
  arr.push(p);
  marker = L.marker([arr[0].lat, arr[0]["long"]]).addTo(layerGroup);

  if (arr[0].website != "") {
    marker.bindPopup("<a target=\"_blank\" href=" + arr[0].website + "><b>Domaine</b><br>" + arr[0].name + "</a><br>" + search);
  } else {
    marker.bindPopup("<b>Domaine</b><br>" + arr[0].name);
  }

  markerArr.push(marker);
  return arr;
}

function radioBtEvent() {
  /* code below controls the placeholder of the search bar when picking different filtering options through the radio buttons */
  var prev = null;

  for (var i = 0; i < radioOpt.length; i++) {
    radioOpt[i].addEventListener('change', function () {
      if (this !== prev) {
        prev = this;
      }

      for (var _i2 = 0, length = radioOpt.length; _i2 < length; _i2++) {
        if (radioOpt[_i2].checked) {
          if (radioOpt[_i2].value === "appellation") {
            document.getElementById("searchQuery").value = "";
            document.getElementById("searchQuery").placeholder = 'Entrez un nom d\'appellation';
          } else if (radioOpt[_i2].value === "cepage") {
            document.getElementById("searchQuery").value = "";
            document.getElementById("searchQuery").placeholder = 'Entrez un nom de cépage';
          }
        }
      }
    });
  }
}

function isMobileDevice() {
  return window.innerWidth <= 800 && window.innerHeight <= 600;
}

; //-------- end functions --------//

document.getElementById("nav-map").setAttribute("class", "active");
designationsMap.style.display = "none";
varietiesMap.style.display = "none";
searchDiv.style.display = "none";
searchResMap.style.display = "none";
$(document).ready(function () {
  // mobile = isMobileDevice();
  displayWineriesMap();
  document.getElementById('map1Link').addEventListener("click", function (event) {
    if (mymap != undefined) {
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
    if (mymap1 != undefined) {
      mymap1.off();
      mymap1.remove();
    }

    changeMapsTabs("map2Link", "map1Link", "map3Link");
    wineriesMap.style.display = "none";
    designationsMap.style.display = "block";
    varietiesMap.style.display = "none";
    $.get("http://127.0.0.1:8000/api/wines", function (data, status) {
      sizeMap("mapid1");

      if (status == "success") {
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            var des = {
              appellation: data[i].designation.name,
              lat: data[i].producer.latitude,
              "long": data[i].producer.longitude
            };
            desTab.push(des);
          } else if (desTab[desTab.length - 1].lat != data[i].producer.latitude && desTab[desTab.length - 1]["long"] != data[i].producer.longitude) {
            var _des = {
              appellation: data[i].designation.name,
              lat: data[i].producer.latitude,
              "long": data[i].producer.longitude
            };
            desTab.push(_des);
          }
        }

        mymap1 = L.map('mapid1', {
          minZoom: 3,
          maxZoom: 8,
          zoomSnap: 0,
          zoomDelta: 0.25
        }).setView([46.8527171, 2.5889735], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap1);

        for (var _i3 = 0; _i3 < desTab.length; _i3++) {
          marker = L.marker([desTab[_i3].lat, desTab[_i3]["long"]]).addTo(mymap1);
          marker.bindPopup(desTab[_i3].appellation);
        }
      } else {
        //code below displays map without markers + error message
        document.getElementById('errorMsgApiNotWorking1').innerText = "Désolé nous n'avons pas pu trouver les données sur les appellations";
        mymap1 = L.map('mapid1', {
          minZoom: 3,
          maxZoom: 8,
          zoomSnap: 0,
          zoomDelta: 0.25
        }).setView([46.8527171, 2.5889735], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap1);
      }

      if (isMobileDevice()) {
        mymap1.setView([46.0986268, 2.2346064], 4.5);
      }

      mapResponsiveSize(mymap1, "mapid1");
    });
  });
  document.getElementById('map3Link').addEventListener("click", function (event) {
    if (mymap2 != undefined) {
      mymap2.off();
      mymap2.remove();
    }

    changeMapsTabs("map3Link", "map2Link", "map1Link");
    wineriesMap.style.display = "none";
    designationsMap.style.display = "none";
    varietiesMap.style.display = "block";
    $.get("http://127.0.0.1:8000/api/wines", function (data, status) {
      sizeMap("mapid2");

      if (status == "success") {
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            var cepage = {
              variety: data[i].variety.name,
              lat: data[i].producer.latitude,
              "long": data[i].producer.longitude
            };
            varietyTab.push(cepage);
          } else if (varietyTab[varietyTab.length - 1].lat != data[i].producer.latitude && varietyTab[varietyTab.length - 1]["long"] != data[i].producer.longitude) {
            var _cepage = {
              variety: data[i].variety.name,
              lat: data[i].producer.latitude,
              "long": data[i].producer.longitude
            };
            varietyTab.push(_cepage);
          }
        }

        mymap2 = L.map('mapid2', {
          minZoom: 3,
          maxZoom: 8,
          zoomSnap: 0,
          zoomDelta: 0.25
        }).setView([46.8527171, 2.5889735], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap2);

        for (var _i4 = 0; _i4 < varietyTab.length; _i4++) {
          marker = L.marker([varietyTab[_i4].lat, varietyTab[_i4]["long"]]).addTo(mymap2);
          marker.bindPopup(varietyTab[_i4].variety);
        }
      } else {
        //code below displays map without markers + error message
        document.getElementById('errorMsgApiNotWorking2').innerText = "Désolé nous n'avons pas pu trouver les données sur les cépages";
        mymap2 = L.map('mapid2', {
          minZoom: 3,
          maxZoom: 8,
          zoomSnap: 0,
          zoomDelta: 0.25
        }).setView([46.8527171, 2.5889735], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap2);
      }

      if (isMobileDevice()) {
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
  radioBtEvent(); // when we click on the search button :

  document.getElementById("searchBt").addEventListener("click", function () {
    var search = document.getElementById("searchQuery").value.toLowerCase().trim();

    if (search == "") {
      resNotFound.style.display = "block";
      resNotFound.innerText = "Veuillez entrez un mot.";
    } else {
      if (mymapS != undefined) {
        mymapS.off();
        mymapS.remove();
      }

      document.getElementById("mapsAndMenu").style.display = "none";

      if (layerGroup != undefined) {
        layerGroup.clearLayers();
      }

      document.getElementById("searchResMap").style.display = "block";
      var resArr = [];
      var cpt = 0;
      $.get("http://127.0.0.1:8000/api/wines", function (data) {
        sizeMap("searchResMap");
        mymapS = L.map('searchResMap', {
          minZoom: 3,
          maxZoom: 8,
          zoomSnap: 0,
          zoomDelta: 0.25
        }).setView([46.8527171, 2.5889735], initzoom);
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymapS);
        mapResponsiveSize(mymapS, "searchResMap");
        layerGroup = L.layerGroup().addTo(mymapS);

        if (document.getElementById("designationRadio").checked) {
          for (var i = 0; i < data.length; i++) {
            if (search == data[i].designation.name.toLowerCase().trim()) {
              markerArr = [];

              if (resArr.length == 0) {
                console.log("hello 1");
                var p = {
                  name: data[i].producer.name,
                  lat: data[i].producer.latitude,
                  "long": data[i].producer.longitude,
                  website: data[i].producer.website
                };
                resArr.push(p);
                cpt = cpt + 1;
              } else if (resArr[resArr.length - 1].name != data[i].producer.name) {
                var _p = {
                  name: data[i].producer.name,
                  lat: data[i].producer.latitude,
                  "long": data[i].producer.longitude,
                  website: data[i].producer.website
                };
                resArr.push(_p);
                cpt = cpt + 1;
              } // console.log("total cpt = " + cpt);


              for (var _i5 = 0; _i5 < resArr.length; _i5++) {
                marker = L.marker([resArr[_i5].lat, resArr[_i5]["long"]]).addTo(layerGroup);

                if (resArr[_i5].website != "") {
                  marker.bindPopup("<a target=\"_blank\" href=" + resArr[_i5].website + "><b>Domaine</b><br>" + resArr[_i5].name + "</a><br>" + search);
                } else {
                  marker.bindPopup("<b>Domaine</b><br>" + resArr[_i5].name);
                }

                markerArr.push(marker);
              } // resArr = gatherSearchRes(data[i], search);

            }
          }

          if (resArr.length == 0) {
            resNotFound.style.display = "block";
            resNotFound.innerText = "Aucun resultat trouvé pour " + search + ".";
          } else if (cpt < 3) {
            var group = new L.featureGroup(markerArr);
            mymapS.fitBounds(group.getBounds());
          }
        }

        if (document.getElementById("varietyRadio").checked) {
          for (var _i6 = 0; _i6 < data.length; _i6++) {
            if (search == data[_i6].variety.name.toLowerCase().trim()) {
              markerArr = [];

              if (resArr.length == 0) {
                // console.log("hello 1");
                var _p2 = {
                  name: data[_i6].producer.name,
                  lat: data[_i6].producer.latitude,
                  "long": data[_i6].producer.longitude,
                  website: data[_i6].producer.website
                };
                resArr.push(_p2);
                cpt = cpt + 1;
              } else if (resArr[resArr.length - 1].name != data[_i6].producer.name) {
                // console.log("hello 2");
                var _p3 = {
                  name: data[_i6].producer.name,
                  lat: data[_i6].producer.latitude,
                  "long": data[_i6].producer.longitude,
                  website: data[_i6].producer.website
                };
                resArr.push(_p3);
                cpt = cpt + 1;
              } // console.log("total cpt = " + cpt);


              for (var _i7 = 0; _i7 < resArr.length; _i7++) {
                marker = L.marker([resArr[_i7].lat, resArr[_i7]["long"]]).addTo(layerGroup);

                if (resArr[_i7].website != "") {
                  marker.bindPopup("<a target=\"_blank\" href=" + resArr[_i7].website + "><b>Domaine</b><br>" + resArr[_i7].name + "</a><br>" + search);
                } else {
                  marker.bindPopup("<b>Domaine</b><br>" + resArr[_i7].name);
                }

                markerArr.push(marker);
              }
            }
          }

          if (resArr.length == 0) {
            resNotFound.style.display = "block";
            resNotFound.innerText = "Aucun resultat trouvé pour " + search + ".";
          } else if (cpt < 3) {
            var _group = new L.featureGroup(markerArr);

            mymapS.fitBounds(_group.getBounds());
          }
        }

        if (isMobileDevice() && cpt > 3) {
          console.log("MOBILE SEARCH");
          mymapS.setView([46.0986268, 2.2346064], 4.5);
        }
      });
      resNotFound.innerText = "";
    }
  });
});

/***/ })

},[["./assets/js/leaflet.js","runtime","vendors~app~leaflet","vendors~leaflet"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbGVhZmxldC5qcyJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIiQiLCJJY29uIiwiRGVmYXVsdCIsInByb3RvdHlwZSIsIl9nZXRJY29uVXJsIiwibWVyZ2VPcHRpb25zIiwiaWNvblJldGluYVVybCIsImljb25VcmwiLCJzaGFkb3dVcmwiLCJwcm9kdWNlcnMiLCJkZXNUYWIiLCJ2YXJpZXR5VGFiIiwibXltYXAiLCJteW1hcDEiLCJteW1hcDIiLCJteW1hcFMiLCJsYXllckdyb3VwIiwibWFya2VyIiwiYmlnbWFwaGVpZ2h0Iiwic21hbGxtYXBoZWlnaHQiLCJtYXBicmVha3dpZHRoIiwiaGlnaHpvb20iLCJtZWRpdW1ab29tIiwiaW5pdHpvb20iLCJ3aW5lcmllc01hcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkZXNpZ25hdGlvbnNNYXAiLCJ2YXJpZXRpZXNNYXAiLCJzZWFyY2hSZXNNYXAiLCJzZWFyY2hEaXYiLCJzZWFyY2hPcHQiLCJjbG9zZVNlYXJjaCIsInJhZGlvT3B0U2VhcmNoIiwicmFkaW9PcHQiLCJnZXRFbGVtZW50c0J5TmFtZSIsInJlc05vdEZvdW5kIiwibWFya2VyQXJyIiwic2l6ZU1hcCIsImlkTWFwIiwid2lkdGgiLCJoZWlnaHQiLCJtYXBSZXNwb25zaXZlU2l6ZSIsIm1hcE5hbWUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJzZXRWaWV3IiwiZGlzcGxheVdpbmVyaWVzTWFwIiwiZ2V0IiwiZGF0YSIsInN0YXR1cyIsImkiLCJsZW5ndGgiLCJwcm9kdWNlciIsIm5hbWUiLCJsYXQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsIndlYnNpdGUiLCJwdXNoIiwibWFwIiwibWluWm9vbSIsIm1heFpvb20iLCJ6b29tU25hcCIsInpvb21EZWx0YSIsInRpbGVMYXllciIsImF0dHJpYnV0aW9uIiwiYWRkVG8iLCJiaW5kUG9wdXAiLCJpbm5lclRleHQiLCJpc01vYmlsZURldmljZSIsImNoYW5nZU1hcHNUYWJzIiwibGluazEiLCJsaW5rMiIsImxpbmszIiwic3R5bGUiLCJjb2xvciIsImJhY2tncm91bmQiLCJnYXRoZXJTZWFyY2hSZXMiLCJvYmoiLCJzZWFyY2giLCJhcnIiLCJwIiwicmFkaW9CdEV2ZW50IiwicHJldiIsImNoZWNrZWQiLCJ2YWx1ZSIsInBsYWNlaG9sZGVyIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0Iiwic2V0QXR0cmlidXRlIiwiZGlzcGxheSIsInJlYWR5IiwidW5kZWZpbmVkIiwib2ZmIiwicmVtb3ZlIiwiZGVzIiwiYXBwZWxsYXRpb24iLCJkZXNpZ25hdGlvbiIsImNlcGFnZSIsInZhcmlldHkiLCJyZXNldCIsInRvTG93ZXJDYXNlIiwidHJpbSIsImNsZWFyTGF5ZXJzIiwicmVzQXJyIiwiY3B0IiwiY29uc29sZSIsImxvZyIsImdyb3VwIiwiZmVhdHVyZUdyb3VwIiwiZml0Qm91bmRzIiwiZ2V0Qm91bmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxDQUFDLEdBQUNDLG1CQUFPLENBQUMsMkRBQUQsQ0FBYjs7QUFDQSxJQUFNQyxDQUFDLEdBQUdELG1CQUFPLENBQUMsb0RBQUQsQ0FBakIsQyxDQUVBO0FBQ0E7O0FBRUE7Ozs7O0FBR0EsT0FBT0QsQ0FBQyxDQUFDRyxJQUFGLENBQU9DLE9BQVAsQ0FBZUMsU0FBZixDQUF5QkMsV0FBaEM7QUFDQU4sQ0FBQyxDQUFDRyxJQUFGLENBQU9DLE9BQVAsQ0FBZUcsWUFBZixDQUE0QjtBQUN4QkMsZUFBYSxFQUFFUCxtQkFBTyxDQUFDLHFHQUFELENBREU7QUFFeEJRLFNBQU8sRUFBRVIsbUJBQU8sQ0FBQywrRkFBRCxDQUZRO0FBR3hCUyxXQUFTLEVBQUVULG1CQUFPLENBQUMsbUdBQUQ7QUFITSxDQUE1QjtBQUtBO0FBRUE7O0FBQ0EsSUFBSVUsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsSUFBSUMsTUFBTSxHQUFHLEVBQWI7QUFDQSxJQUFJQyxVQUFV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QUFDSCxXQUhELE1BR08sSUFBRzBCLEdBQUcsR0FBRyxDQUFULEVBQVk7QUFDZixnQkFBSUcsTUFBSyxHQUFHLElBQUloSCxDQUFDLENBQUNpSCxZQUFOLENBQW1CMUUsU0FBbkIsQ0FBWjs7QUFDQXRCLGtCQUFNLENBQUNpRyxTQUFQLENBQWlCRixNQUFLLENBQUNHLFNBQU4sRUFBakI7QUFDSDtBQUNKOztBQUNELFlBQUcxQyxjQUFjLE1BQU1vQyxHQUFHLEdBQUcsQ0FBN0IsRUFBZ0M7QUFDNUJDLGlCQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0E5RixnQkFBTSxDQUFDZ0MsT0FBUCxDQUFlLENBQUMsVUFBRCxFQUFhLFNBQWIsQ0FBZixFQUF3QyxHQUF4QztBQUNIO0FBQ0osT0ExR0Q7QUEyR1JYLGlCQUFXLENBQUNrQyxTQUFaLEdBQXdCLEVBQXhCO0FBQ0g7QUFDSixHQTlIRDtBQStISCxDQWhSRCxFIiwiZmlsZSI6ImxlYWZsZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgTD1yZXF1aXJlKCdsZWFmbGV0Jyk7XHJcbmNvbnN0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbi8vIGxpbmUgMTMyIG5vIG5lZWQgZm9yIGZvciBsb29wIHByb2JhYmx5IG5lZWRzIHRvIHRha2UgY2FyZSBvZiBoYXQgZmlyc3QgdGhlbiB3ZSBjYW4gY291bnQgbW9yZSBlYXNpbHlcclxuLy8gdGhlIGlzc3VlIGlzIGNwdCBjYW4gYmUgPiAzIGFuZCBvbmx5IGhhdmUgb25lIHdpbmVyeSBhc3NvY2lhdGVkIHdpdGggaXQuIGV4IG1vdWxpcyBzbyBob3cgY2FuIHdlIHJlYWxseSBjb3VudCA/IGxpbmUgMzQzXHJcblxyXG4vKiAtLS0tLS0tLS0tLS0tXHJcbiogdGhpcyBmaXhlcyBhIGxlYWZsZXQgYnVnIHRoYXQgZG9lcyBub3QgaW1wb3J0IHRoZSBtYXJrZXIgaW1hZ2VzIGlmIHdlIGRvbid0IGFkZCB0aG9zZSBsaW5lc1xyXG4qL1xyXG5kZWxldGUgTC5JY29uLkRlZmF1bHQucHJvdG90eXBlLl9nZXRJY29uVXJsO1xyXG5MLkljb24uRGVmYXVsdC5tZXJnZU9wdGlvbnMoe1xyXG4gICAgaWNvblJldGluYVVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi0yeC5wbmcnKSxcclxuICAgIGljb25Vcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24ucG5nJyksXHJcbiAgICBzaGFkb3dVcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLXNoYWRvdy5wbmcnKSxcclxufSk7XHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLy8tLS0tLS0tLSB2YXJpYWJsZXMgLS0tLS0tLS0vL1xyXG5sZXQgcHJvZHVjZXJzID0gW107XHJcbmxldCBkZXNUYWIgPSBbXTtcclxubGV0IHZhcmlldHlUYWIgPSBbXTtcclxubGV0IG15bWFwO1xyXG5sZXQgbXltYXAxO1xyXG5sZXQgbXltYXAyO1xyXG5sZXQgbXltYXBTO1xyXG5sZXQgbGF5ZXJHcm91cDtcclxubGV0IG1hcmtlcjtcclxubGV0IGJpZ21hcGhlaWdodCA9IDUwMDtcclxubGV0IHNtYWxsbWFwaGVpZ2h0ID0gMzcwO1xyXG5sZXQgbWFwYnJlYWt3aWR0aCA9IDQ2MDtcclxubGV0IGhpZ2h6b29tID0gNS43NTtcclxubGV0IG1lZGl1bVpvb20gPSA1O1xyXG4vLyBsZXQgbG93em9vbSA9IDM7XHJcbmxldCBpbml0em9vbTtcclxubGV0IHdpbmVyaWVzTWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21haW5lc1wiKTtcclxubGV0IGRlc2lnbmF0aW9uc01hcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwZWxsYXRpb25zXCIpO1xyXG5sZXQgdmFyaWV0aWVzTWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZXBhZ2VzXCIpO1xyXG5sZXQgc2VhcmNoUmVzTWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hSZXNNYXBcIik7XHJcbmxldCBzZWFyY2hEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKTsgLy9kaXYgdGhhdCBjb250YWlucyB0aGUgc2VhcmNoIGZvcm1cclxubGV0IHNlYXJjaE9wdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoT3B0XCIpOyAvLyBidXR0b24gXCJSZWNoZXJjaGVyIHN1ciBsYSBjYXJ0ZVwiXHJcbmxldCBjbG9zZVNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VTZWFyY2hcIik7IC8vIGJ1dHRvbiB0byBjbG9zZSBzZWFyY2hcclxubGV0IHJhZGlvT3B0U2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb09wdFNlYXJjaFwiKTsgLy8gcmFkaW8gYnV0dG9uc1xyXG5sZXQgcmFkaW9PcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcInNlYXJjaE9wdGlvblwiKTsgLy9sZSByYWRpbyBidCBjaG9zZW4gYnkgdXNlciB0byBmaWx0ZXIgYnlcclxubGV0IHJlc05vdEZvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub3RGb3VuZFwiKTsgLy9kaXYgdG8gZGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbi8vIGxldCBtb2JpbGU7XHJcbmxldCBtYXJrZXJBcnIgPSBbXTtcclxuLy8tLS0tLS0tLSBlbmQgdmFyaWFibGVzIC0tLS0tLS0tLy9cclxuXHJcbi8vLS0tLS0tLS0gZnVuY3Rpb25zIC0tLS0tLS0tLy9cclxuZnVuY3Rpb24gc2l6ZU1hcChpZE1hcCkge1xyXG4gICAgaWYgKCQoXCIjXCIraWRNYXApLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgaW5pdHpvb20gPSBoaWdoem9vbTtcclxuICAgICAgICAkKFwiI1wiK2lkTWFwKS5oZWlnaHQoYmlnbWFwaGVpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5pdHpvb20gPSBtZWRpdW1ab29tO1xyXG4gICAgICAgICQoXCIjXCIraWRNYXApLmhlaWdodChzbWFsbG1hcGhlaWdodCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBSZXNwb25zaXZlU2l6ZShtYXBOYW1lLCBpZE1hcCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgc2l6ZU1hcChpZE1hcCk7XHJcbiAgICAgICAgLy8gaWYoaXNNb2JpbGVEZXZpY2UoKSkge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIk1PQklMRSBGVU5DVElPTlwiKTtcclxuICAgICAgICAvLyAgICAgbXltYXAuc2V0VmlldyhbNDYuMDk4NjI2OCwgMi4yMzQ2MDY0XSwgNC41KTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYgKCQoXCIjXCIraWRNYXApLndpZHRoKCkgPiBtYXBicmVha3dpZHRoKSB7XHJcbiAgICAgICAgICAgIG1hcE5hbWUuc2V0VmlldyhbNDYuODUyNzE3MSwgMi41ODg5NzM1XSwgaW5pdHpvb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbWFwTmFtZS5zZXRWaWV3KFs0Ni44NTI3MTcxLCAyLjU4ODk3MzVdLCBpbml0em9vbSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGRpc3BsYXlXaW5lcmllc01hcCgpIHtcclxuICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS9wcm9kdWNlcnNcIiwgZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgIHNpemVNYXAoXCJtYXBpZFwiKTtcclxuICAgICAgICBpZihzdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvZHVjZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVtpXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogZGF0YVtpXS5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICBsb25nOiBkYXRhW2ldLmxvbmdpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICB3ZWJzaXRlOiBkYXRhW2ldLndlYnNpdGVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBwcm9kdWNlcnMucHVzaChwcm9kdWNlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbXltYXAgPSBMLm1hcCgnbWFwaWQnLCB7bWluWm9vbTogMywgbWF4Wm9vbTogOCwgem9vbVNuYXA6IDAsIHpvb21EZWx0YTogMC4yNX0pLnNldFZpZXcoWzQ2Ljg1MjcxNzEsIDIuNTg4OTczNV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcHJvZHVjZXJzW2ldLmxhdCwgcHJvZHVjZXJzW2ldLmxvbmddKS5hZGRUbyhteW1hcCkuYWRkVG8obXltYXApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y2Vyc1tpXS53ZWJzaXRlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XCIgKyBwcm9kdWNlcnNbaV0ud2Vic2l0ZSArIFwiPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHJvZHVjZXJzW2ldLm5hbWUgKyBcIjwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHByb2R1Y2Vyc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7IC8vY29kZSBiZWxvdyBkaXNwbGF5cyBtYXAgd2l0aG91dCBtYXJrZXJzICsgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JNc2dBcGlOb3RXb3JraW5nJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgZG9tYWluZXNcIjtcclxuICAgICAgICAgICAgbXltYXAgPSBMLm1hcCgnbWFwaWQnLCB7bWluWm9vbTogNCwgbWF4Wm9vbTogOCwgem9vbVNuYXA6IDAsIHpvb21EZWx0YTogMC4yNX0pLnNldFZpZXcoWzQ2Ljg1MjcxNzEsIDIuNTg4OTczNV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICB9KS5hZGRUbyhteW1hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzTW9iaWxlRGV2aWNlKCkpIHtcclxuICAgICAgICAgICAgbXltYXAuc2V0VmlldyhbNDYuMDk4NjI2OCwgMi4yMzQ2MDY0XSwgNC41KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWFwUmVzcG9uc2l2ZVNpemUobXltYXAsIFwibWFwaWRcIik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlTWFwc1RhYnMobGluazEsIGxpbmsyLCBsaW5rMykge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGluazEpLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGluazEpLnN0eWxlLmJhY2tncm91bmQgPSBcIiNFQURGQzFcIjtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpbmsyKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaW5rMikuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpbmszKS5zdHlsZS5jb2xvciA9IFwiIzQ0NDM0MFwiO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGluazMpLnN0eWxlLmJhY2tncm91bmQgPSBcIndoaXRlXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdhdGhlclNlYXJjaFJlcyhvYmosIHNlYXJjaCkge1xyXG4gICAgbGV0IGFyciA9IFtdO1xyXG4gICAgbWFya2VyQXJyID0gW107XHJcbiAgICBsZXQgcCA9IHtcclxuICAgICAgICBuYW1lOiBvYmoucHJvZHVjZXIubmFtZSxcclxuICAgICAgICBsYXQ6IG9iai5wcm9kdWNlci5sYXRpdHVkZSxcclxuICAgICAgICBsb25nOiBvYmoucHJvZHVjZXIubG9uZ2l0dWRlLFxyXG4gICAgICAgIHdlYnNpdGU6IG9iai5wcm9kdWNlci53ZWJzaXRlXHJcbiAgICB9XHJcbiAgICBhcnIucHVzaChwKTtcclxuICAgIG1hcmtlciA9IEwubWFya2VyKFthcnJbMF0ubGF0LCBhcnJbMF0ubG9uZ10pLmFkZFRvKGxheWVyR3JvdXApO1xyXG4gICAgaWYgKGFyclswXS53ZWJzaXRlICE9IFwiXCIpIHtcclxuICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XCIgKyBhcnJbMF0ud2Vic2l0ZSArIFwiPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgYXJyWzBdLm5hbWUgKyBcIjwvYT48YnI+XCIgKyBzZWFyY2gpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGI+RG9tYWluZTwvYj48YnI+XCIgKyBhcnJbMF0ubmFtZSk7XHJcbiAgICB9XHJcbiAgICBtYXJrZXJBcnIucHVzaChtYXJrZXIpO1xyXG4gICAgcmV0dXJuIGFycjtcclxufVxyXG5cclxuZnVuY3Rpb24gcmFkaW9CdEV2ZW50KCkgey8qIGNvZGUgYmVsb3cgY29udHJvbHMgdGhlIHBsYWNlaG9sZGVyIG9mIHRoZSBzZWFyY2ggYmFyIHdoZW4gcGlja2luZyBkaWZmZXJlbnQgZmlsdGVyaW5nIG9wdGlvbnMgdGhyb3VnaCB0aGUgcmFkaW8gYnV0dG9ucyAqL1xyXG4gICAgbGV0IHByZXYgPSBudWxsO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWRpb09wdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHJhZGlvT3B0W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcyAhPT0gcHJldikgeyBwcmV2ID0gdGhpczsgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gcmFkaW9PcHQubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJhcHBlbGxhdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFF1ZXJ5XCIpLnBsYWNlaG9sZGVyID0gJ0VudHJleiB1biBub20gZFxcJ2FwcGVsbGF0aW9uJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiY2VwYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hRdWVyeVwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikucGxhY2Vob2xkZXIgPSAnRW50cmV6IHVuIG5vbSBkZSBjw6lwYWdlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNNb2JpbGVEZXZpY2UoKSB7XHJcbiAgICByZXR1cm4gKHdpbmRvdy5pbm5lcldpZHRoIDw9IDgwMCAmJiB3aW5kb3cuaW5uZXJIZWlnaHQgPD0gNjAwKTtcclxufTtcclxuLy8tLS0tLS0tLSBlbmQgZnVuY3Rpb25zIC0tLS0tLS0tLy9cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LW1hcFwiKS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcclxuZGVzaWduYXRpb25zTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxudmFyaWV0aWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuc2VhcmNoRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuc2VhcmNoUmVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBtb2JpbGUgPSBpc01vYmlsZURldmljZSgpO1xyXG4gICAgZGlzcGxheVdpbmVyaWVzTWFwKCk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmKG15bWFwICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBteW1hcC5vZmYoKTtcclxuICAgICAgICAgICAgbXltYXAucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoYW5nZU1hcHNUYWJzKFwibWFwMUxpbmtcIiwgXCJtYXAyTGlua1wiLCBcIm1hcDNMaW5rXCIpO1xyXG4gICAgICAgIHdpbmVyaWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgZGVzaWduYXRpb25zTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB2YXJpZXRpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGRpc3BsYXlXaW5lcmllc01hcCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDJMaW5rJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmKG15bWFwMSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbXltYXAxLm9mZigpO1xyXG4gICAgICAgICAgICBteW1hcDEucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoYW5nZU1hcHNUYWJzKFwibWFwMkxpbmtcIiwgXCJtYXAxTGlua1wiLCBcIm1hcDNMaW5rXCIpO1xyXG4gICAgICAgIHdpbmVyaWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBkZXNpZ25hdGlvbnNNYXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB2YXJpZXRpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS93aW5lc1wiLCBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHNpemVNYXAoXCJtYXBpZDFcIik7XHJcbiAgICAgICAgICAgIGlmKHN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZWxsYXRpb246IGRhdGFbaV0uZGVzaWduYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogZGF0YVtpXS5wcm9kdWNlci5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvbmc6IGRhdGFbaV0ucHJvZHVjZXIubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc1RhYi5wdXNoKGRlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZXNUYWJbZGVzVGFiLmxlbmd0aC0xXS5sYXQgIT0gZGF0YVtpXS5wcm9kdWNlci5sYXRpdHVkZSAmJiBkZXNUYWJbZGVzVGFiLmxlbmd0aC0xXS5sb25nICE9IGRhdGFbaV0ucHJvZHVjZXIubG9uZ2l0dWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBlbGxhdGlvbjogZGF0YVtpXS5kZXNpZ25hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBkYXRhW2ldLnByb2R1Y2VyLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZzogZGF0YVtpXS5wcm9kdWNlci5sb25naXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzVGFiLnB1c2goZGVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbXltYXAxID0gTC5tYXAoJ21hcGlkMScsIHttaW5ab29tOiAzLCBtYXhab29tOiA4LCB6b29tU25hcDogMCwgem9vbURlbHRhOiAwLjI1fSkuc2V0VmlldyhbNDYuODUyNzE3MSwgMi41ODg5NzM1XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE5LCBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlc1RhYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKFtkZXNUYWJbaV0ubGF0LCBkZXNUYWJbaV0ubG9uZ10pLmFkZFRvKG15bWFwMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChkZXNUYWJbaV0uYXBwZWxsYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgeyAvL2NvZGUgYmVsb3cgZGlzcGxheXMgbWFwIHdpdGhvdXQgbWFya2VycyArIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvck1zZ0FwaU5vdFdvcmtpbmcxJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgYXBwZWxsYXRpb25zXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgbXltYXAxID0gTC5tYXAoJ21hcGlkMScsIHttaW5ab29tOiAzLCBtYXhab29tOiA4LCB6b29tU25hcDogMCwgem9vbURlbHRhOiAwLjI1fSkuc2V0VmlldyhbNDYuODUyNzE3MSwgMi41ODg5NzM1XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUbyhteW1hcDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGlzTW9iaWxlRGV2aWNlKCkpIHtcclxuICAgICAgICAgICAgICAgIG15bWFwMS5zZXRWaWV3KFs0Ni4wOTg2MjY4LCAyLjIzNDYwNjRdLCA0LjUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1hcFJlc3BvbnNpdmVTaXplKG15bWFwMSwgXCJtYXBpZDFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgaWYobXltYXAyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBteW1hcDIub2ZmKCk7XHJcbiAgICAgICAgICAgIG15bWFwMi5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2hhbmdlTWFwc1RhYnMoXCJtYXAzTGlua1wiLCBcIm1hcDJMaW5rXCIsIFwibWFwMUxpbmtcIik7XHJcbiAgICAgICAgd2luZXJpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGRlc2lnbmF0aW9uc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgdmFyaWV0aWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgJC5nZXQoXCJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3dpbmVzXCIsIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgc2l6ZU1hcChcIm1hcGlkMlwiKTtcclxuICAgICAgICAgICAgaWYoc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZXBhZ2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpZXR5OiBkYXRhW2ldLnZhcmlldHkubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogZGF0YVtpXS5wcm9kdWNlci5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvbmc6IGRhdGFbaV0ucHJvZHVjZXIubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlldHlUYWIucHVzaChjZXBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFyaWV0eVRhYlt2YXJpZXR5VGFiLmxlbmd0aC0xXS5sYXQgIT0gZGF0YVtpXS5wcm9kdWNlci5sYXRpdHVkZSAmJiB2YXJpZXR5VGFiW3ZhcmlldHlUYWIubGVuZ3RoLTFdLmxvbmcgIT0gZGF0YVtpXS5wcm9kdWNlci5sb25naXR1ZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlcGFnZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlldHk6IGRhdGFbaV0udmFyaWV0eS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBkYXRhW2ldLnByb2R1Y2VyLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZzogZGF0YVtpXS5wcm9kdWNlci5sb25naXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWV0eVRhYi5wdXNoKGNlcGFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbXltYXAyID0gTC5tYXAoJ21hcGlkMicsIHttaW5ab29tOiAzLCBtYXhab29tOiA4LCB6b29tU25hcDogMCwgem9vbURlbHRhOiAwLjI1fSkuc2V0VmlldyhbNDYuODUyNzE3MSwgMi41ODg5NzM1XSwgaW5pdHpvb20pO1xyXG4gICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE5LCBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVG8obXltYXAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhcmlldHlUYWIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbdmFyaWV0eVRhYltpXS5sYXQsIHZhcmlldHlUYWJbaV0ubG9uZ10pLmFkZFRvKG15bWFwMik7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cCh2YXJpZXR5VGFiW2ldLnZhcmlldHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgeyAvL2NvZGUgYmVsb3cgZGlzcGxheXMgbWFwIHdpdGhvdXQgbWFya2VycyArIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvck1zZ0FwaU5vdFdvcmtpbmcyJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIG4nYXZvbnMgcGFzIHB1IHRyb3V2ZXIgbGVzIGRvbm7DqWVzIHN1ciBsZXMgY8OpcGFnZXNcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBteW1hcDIgPSBMLm1hcCgnbWFwaWQyJywge21pblpvb206IDMsIG1heFpvb206IDgsIHpvb21TbmFwOiAwLCB6b29tRGVsdGE6IDAuMjV9KS5zZXRWaWV3KFs0Ni44NTI3MTcxLCAyLjU4ODk3MzVdLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaXNNb2JpbGVEZXZpY2UoKSkge1xyXG4gICAgICAgICAgICAgICAgbXltYXAyLnNldFZpZXcoWzQ2LjA5ODYyNjgsIDIuMjM0NjA2NF0sIDQuNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWFwUmVzcG9uc2l2ZVNpemUobXltYXAyLCBcIm1hcGlkMlwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0gQ09ERSBUTyBGSUxURVIgU0VBUkNIIE9OIE1BUC0tLS0tLS0tLS0tLS0tLS0qL1xyXG4gICAgc2VhcmNoT3B0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VhcmNoRGl2LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xyXG4gICAgICAgIHNlYXJjaE9wdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgcmFkaW9PcHRTZWFyY2guc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2xvc2VTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHNlYXJjaE9wdC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcHNBbmRNZW51XCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgc2VhcmNoUmVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICByZXNOb3RGb3VuZC5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoRm9ybVwiKS5yZXNldCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmFkaW9CdEV2ZW50KCk7XHJcblxyXG4gICAgLy8gd2hlbiB3ZSBjbGljayBvbiB0aGUgc2VhcmNoIGJ1dHRvbiA6XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEJ0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikudmFsdWUudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgICAgICAgaWYoc2VhcmNoID09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmVzTm90Rm91bmQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgcmVzTm90Rm91bmQuaW5uZXJUZXh0ID0gXCJWZXVpbGxleiBlbnRyZXogdW4gbW90LlwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYobXltYXBTICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbXltYXBTLm9mZigpO1xyXG4gICAgICAgICAgICAgICAgbXltYXBTLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwc0FuZE1lbnVcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBpZihsYXllckdyb3VwICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJHcm91cC5jbGVhckxheWVycygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUmVzTWFwXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgIGxldCByZXNBcnIgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGNwdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5nZXQoXCJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3dpbmVzXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVNYXAoXCJzZWFyY2hSZXNNYXBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15bWFwUyA9IEwubWFwKCdzZWFyY2hSZXNNYXAnLCB7bWluWm9vbTogMywgbWF4Wm9vbTogOCwgem9vbVNuYXA6IDAsIHpvb21EZWx0YTogMC4yNX0pLnNldFZpZXcoWzQ2Ljg1MjcxNzEsIDIuNTg4OTczNV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwUyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBSZXNwb25zaXZlU2l6ZShteW1hcFMsIFwic2VhcmNoUmVzTWFwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllckdyb3VwID0gTC5sYXllckdyb3VwKCkuYWRkVG8obXltYXBTKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2lnbmF0aW9uUmFkaW9cIikuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoID09IGRhdGFbaV0uZGVzaWduYXRpb24ubmFtZS50b0xvd2VyQ2FzZSgpLnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzQXJyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlbGxvIDFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBkYXRhW2ldLnByb2R1Y2VyLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBkYXRhW2ldLnByb2R1Y2VyLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvbmc6IGRhdGFbaV0ucHJvZHVjZXIubG9uZ2l0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYnNpdGU6IGRhdGFbaV0ucHJvZHVjZXIud2Vic2l0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzQXJyLnB1c2gocCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcHQgPSBjcHQrMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNBcnJbcmVzQXJyLmxlbmd0aC0xXS5uYW1lICE9IGRhdGFbaV0ucHJvZHVjZXIubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVtpXS5wcm9kdWNlci5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogZGF0YVtpXS5wcm9kdWNlci5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25nOiBkYXRhW2ldLnByb2R1Y2VyLmxvbmdpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJzaXRlOiBkYXRhW2ldLnByb2R1Y2VyLndlYnNpdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc0Fyci5wdXNoKHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3B0ID0gY3B0KzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0b3RhbCBjcHQgPSBcIiArIGNwdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcmVzQXJyW2ldLmxhdCwgcmVzQXJyW2ldLmxvbmddKS5hZGRUbyhsYXllckdyb3VwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNBcnJbaV0ud2Vic2l0ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVwiICsgcmVzQXJyW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHJlc0FycltpXS5uYW1lICsgXCI8L2E+PGJyPlwiICsgc2VhcmNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcmVzQXJyW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyQXJyLnB1c2gobWFya2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZXNBcnIgPSBnYXRoZXJTZWFyY2hSZXMoZGF0YVtpXSwgc2VhcmNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzQXJyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzTm90Rm91bmQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNOb3RGb3VuZC5pbm5lclRleHQgPSBcIkF1Y3VuIHJlc3VsdGF0IHRyb3V2w6kgcG91ciBcIiArIHNlYXJjaCArIFwiLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNwdCA8IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JvdXAgPSBuZXcgTC5mZWF0dXJlR3JvdXAobWFya2VyQXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBteW1hcFMuZml0Qm91bmRzKGdyb3VwLmdldEJvdW5kcygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmFyaWV0eVJhZGlvXCIpLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWFyY2ggPT0gZGF0YVtpXS52YXJpZXR5Lm5hbWUudG9Mb3dlckNhc2UoKS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyQXJyID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNBcnIubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gMVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGRhdGFbaV0ucHJvZHVjZXIubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IGRhdGFbaV0ucHJvZHVjZXIubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZzogZGF0YVtpXS5wcm9kdWNlci5sb25naXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Vic2l0ZTogZGF0YVtpXS5wcm9kdWNlci53ZWJzaXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNBcnIucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNwdCA9IGNwdCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzQXJyW3Jlc0Fyci5sZW5ndGggLSAxXS5uYW1lICE9IGRhdGFbaV0ucHJvZHVjZXIubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoZWxsbyAyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVtpXS5wcm9kdWNlci5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogZGF0YVtpXS5wcm9kdWNlci5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25nOiBkYXRhW2ldLnByb2R1Y2VyLmxvbmdpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJzaXRlOiBkYXRhW2ldLnByb2R1Y2VyLndlYnNpdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNBcnIucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNwdCA9IGNwdCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0b3RhbCBjcHQgPSBcIiArIGNwdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcmVzQXJyW2ldLmxhdCwgcmVzQXJyW2ldLmxvbmddKS5hZGRUbyhsYXllckdyb3VwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNBcnJbaV0ud2Vic2l0ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVwiICsgcmVzQXJyW2ldLndlYnNpdGUgKyBcIj48Yj5Eb21haW5lPC9iPjxicj5cIiArIHJlc0FycltpXS5uYW1lICsgXCI8L2E+PGJyPlwiICsgc2VhcmNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcmVzQXJyW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyQXJyLnB1c2gobWFya2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNBcnIubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNOb3RGb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc05vdEZvdW5kLmlubmVyVGV4dCA9IFwiQXVjdW4gcmVzdWx0YXQgdHJvdXbDqSBwb3VyIFwiICsgc2VhcmNoICsgXCIuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY3B0IDwgMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncm91cCA9IG5ldyBMLmZlYXR1cmVHcm91cChtYXJrZXJBcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15bWFwUy5maXRCb3VuZHMoZ3JvdXAuZ2V0Qm91bmRzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzTW9iaWxlRGV2aWNlKCkgJiYgY3B0ID4gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNT0JJTEUgU0VBUkNIXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXltYXBTLnNldFZpZXcoWzQ2LjA5ODYyNjgsIDIuMjM0NjA2NF0sIDQuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVzTm90Rm91bmQuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=