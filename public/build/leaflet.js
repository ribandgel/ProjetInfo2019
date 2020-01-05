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

var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"); // the code below fixes a leaflet bug that does not import the marker images


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon-2x.png */ "./node_modules/leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon.png */ "./node_modules/leaflet/dist/images/marker-icon.png"),
  shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "./node_modules/leaflet/dist/images/marker-shadow.png")
}); //-------- variables --------//

var producers = [];
var desTab = [];
var varietyTab = [];
var mymap;
var mymap1;
var mymap2;
var mymapS;
var layerGroup;
var marker;
var initzoom;
var wineriesMap = document.getElementById("domaines");
var designationsMap = document.getElementById("appellations");
var varietiesMap = document.getElementById("cepages");
var searchResMap = document.getElementById("searchResMap");
var searchDiv = document.getElementById("search"); //div that contains the search form

var searchOpt = document.getElementById("searchOpt"); // button "Rechercher sur la carte"

var closeSearch = document.getElementById("closeSearch"); // button to close search

var resNotFound = document.getElementById("notFound"); //div to display error message

var markerArr = []; //-------- end variables --------//
//-------- functions --------//

function sizeMap(idMap) {
  if ($("#" + idMap).width() > 460) {
    initzoom = 5.75;
    $("#" + idMap).height(500);
  } else {
    initzoom = 5;
    $("#" + idMap).height(370);
  }

  ;
}

function mapResponsiveSize(mapName, idMap) {
  window.addEventListener('resize', function (event) {
    sizeMap(idMap);

    if ($("#" + idMap).width() > 460) {
      mapName.setView([46.8527171, 2.5889735], initzoom);
    } else {
      mapName.setView([46.8527171, 2.5889735], initzoom);
    }

    ;
  });
}

function displayWineriesMap() {
  var response = $.get("http://127.0.0.1:8000/api/producers", function (data) {
    sizeMap("mapid");

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

    if (isMobileDevice()) {
      mymap.setView([46.0986268, 2.2346064], 4.5);
    }

    mapResponsiveSize(mymap, "mapid");
  });
  response.fail(function () {
    //code below displays map without markers + error message
    document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous avons quelques problèmes pour afficher les données, veuillez réessayer plus tard";
  });
}

function getSearchRes(data, type, search) {
  var resArr = [];
  var cpt = 0;
  markerArr = [];

  for (var i = 0; i < data.length; i++) {
    var name = void 0;
    if (type == "designation") name = data[i].designation.name.toLowerCase().trim();else name = data[i].variety.name.toLowerCase().trim();

    if (search == name) {
      if (resArr.length == 0) {
        var p = {
          name: data[i].producer.name,
          lat: data[i].producer.latitude,
          "long": data[i].producer.longitude,
          website: data[i].producer.website
        };
        resArr.push(p);
        cpt++;
      } else if (resArr[resArr.length - 1].name != data[i].producer.name) {
        var _p = {
          name: data[i].producer.name,
          lat: data[i].producer.latitude,
          "long": data[i].producer.longitude,
          website: data[i].producer.website
        };
        resArr.push(_p);
        cpt++;
      }

      for (var _i2 = 0; _i2 < resArr.length; _i2++) {
        marker = L.marker([resArr[_i2].lat, resArr[_i2]["long"]]).addTo(layerGroup);

        if (resArr[_i2].website != "") {
          marker.bindPopup("<a target=\"_blank\" href=" + resArr[_i2].website + "><b>Domaine</b><br>" + resArr[_i2].name + "</a><br>" + search);
        } else {
          marker.bindPopup("<b>Domaine</b><br>" + resArr[_i2].name + "</a><br>" + search);
        }

        markerArr.push(marker);
      }
    }
  }

  if (resArr.length == 0) {
    resNotFound.style.display = "block";
    resNotFound.innerText = "Aucun resultat trouvé pour " + search + ".";
  } else if (cpt < 3) {
    var group = new L.featureGroup(markerArr);
    mymapS.fitBounds(group.getBounds());
  }

  if (isMobileDevice() && cpt > 3) {
    mymapS.setView([46.0986268, 2.2346064], 4.5);
  }
}

function changeMapsTabs(link1, link2, link3) {
  document.getElementById(link1).style.color = "black";
  document.getElementById(link1).style.background = "#EADFC1";
  document.getElementById(link2).style.color = "#444340";
  document.getElementById(link2).style.background = "white";
  document.getElementById(link3).style.color = "#444340";
  document.getElementById(link3).style.background = "white";
}

function radioBtEvent() {
  document.getElementById("designationRadio").addEventListener('change', function () {
    if (document.getElementById("designationRadio").checked) {
      document.getElementById("searchQuery").value = "";
      document.getElementById("searchQuery").placeholder = 'Entrez un nom d\'appellation';
    }
  });
  document.getElementById("varietyRadio").addEventListener('change', function () {
    if (document.getElementById("varietyRadio").checked) {
      document.getElementById("searchQuery").value = "";
      document.getElementById("searchQuery").placeholder = 'Entrez un nom de cépage';
    }
  });
}

function removeMap(mapName) {
  if (mapName != undefined) {
    mapName.off();
    mapName.remove();
  }
}

function isMobileDevice() {
  return window.innerWidth <= 800 && window.innerHeight <= 600;
} //-------- end functions --------//


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
    var response1 = $.get("http://127.0.0.1:8000/api/wines", function (data) {
      sizeMap("mapid1");

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

      if (isMobileDevice()) {
        mymap1.setView([46.0986268, 2.2346064], 4.5);
      }

      mapResponsiveSize(mymap1, "mapid1");
    });
    response1.fail(function () {
      document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous avons quelques problèmes pour afficher les données, veuillez réessayer plus tard";
    });
  });
  document.getElementById('map3Link').addEventListener("click", function (event) {
    removeMap(mymap2);
    changeMapsTabs("map3Link", "map2Link", "map1Link");
    wineriesMap.style.display = "none";
    designationsMap.style.display = "none";
    varietiesMap.style.display = "block";
    var response2 = $.get("http://127.0.0.1:8000/api/wines", function (data) {
      sizeMap("mapid2");

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

      if (isMobileDevice()) {
        mymap2.setView([46.0986268, 2.2346064], 4.5);
      }

      mapResponsiveSize(mymap2, "mapid2");
    });
    response2.fail(function () {
      document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous avons quelques problèmes pour afficher les données, veuillez réessayer plus tard";
    });
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
  }); // when we click on the search button :

  document.getElementById("searchBt").addEventListener("click", function () {
    var search = document.getElementById("searchQuery").value.toLowerCase().trim();

    if (search == "") {
      resNotFound.style.display = "block";
      resNotFound.innerText = "Veuillez entrez un mot.";
    } else {
      removeMap(mymapS);
      document.getElementById("mapsAndMenu").style.display = "none";

      if (layerGroup != undefined) {
        layerGroup.clearLayers();
      }

      document.getElementById("searchResMap").style.display = "block";
      var response = $.get("http://127.0.0.1:8000/api/wines", function (data) {
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
          getSearchRes(data, "designation", search);
        }

        if (document.getElementById("varietyRadio").checked) {
          getSearchRes(data, "variety", search);
        }
      });
      response.fail(function () {
        document.getElementById('errorMsgApiNotWorking').innerText = "Désolé nous avons quelques problèmes pour afficher les données, veuillez réessayer plus tard";
      });
      resNotFound.innerText = "";
    }
  });
});

/***/ })

},[["./assets/js/leaflet.js","runtime","vendors~app~leaflet","vendors~leaflet"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbGVhZmxldC5qcyJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIiQiLCJJY29uIiwiRGVmYXVsdCIsInByb3RvdHlwZSIsIl9nZXRJY29uVXJsIiwibWVyZ2VPcHRpb25zIiwiaWNvblJldGluYVVybCIsImljb25VcmwiLCJzaGFkb3dVcmwiLCJwcm9kdWNlcnMiLCJkZXNUYWIiLCJ2YXJpZXR5VGFiIiwibXltYXAiLCJteW1hcDEiLCJteW1hcDIiLCJteW1hcFMiLCJsYXllckdyb3VwIiwibWFya2VyIiwiaW5pdHpvb20iLCJ3aW5lcmllc01hcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkZXNpZ25hdGlvbnNNYXAiLCJ2YXJpZXRpZXNNYXAiLCJzZWFyY2hSZXNNYXAiLCJzZWFyY2hEaXYiLCJzZWFyY2hPcHQiLCJjbG9zZVNlYXJjaCIsInJlc05vdEZvdW5kIiwibWFya2VyQXJyIiwic2l6ZU1hcCIsImlkTWFwIiwid2lkdGgiLCJoZWlnaHQiLCJtYXBSZXNwb25zaXZlU2l6ZSIsIm1hcE5hbWUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJzZXRWaWV3IiwiZGlzcGxheVdpbmVyaWVzTWFwIiwicmVzcG9uc2UiLCJnZXQiLCJkYXRhIiwiaSIsImxlbmd0aCIsInByb2R1Y2VyIiwibmFtZSIsImxhdCIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwid2Vic2l0ZSIsInB1c2giLCJtYXAiLCJtaW5ab29tIiwibWF4Wm9vbSIsInpvb21TbmFwIiwiem9vbURlbHRhIiwidGlsZUxheWVyIiwiYXR0cmlidXRpb24iLCJhZGRUbyIsImJpbmRQb3B1cCIsImlzTW9iaWxlRGV2aWNlIiwiZmFpbCIsImlubmVyVGV4dCIsImdldFNlYXJjaFJlcyIsInR5cGUiLCJzZWFyY2giLCJyZXNBcnIiLCJjcHQiLCJkZXNpZ25hdGlvbiIsInRvTG93ZXJDYXNlIiwidHJpbSIsInZhcmlldHkiLCJwIiwic3R5bGUiLCJkaXNwbGF5IiwiZ3JvdXAiLCJmZWF0dXJlR3JvdXAiLCJmaXRCb3VuZHMiLCJnZXRCb3VuZHMiLCJjaGFuZ2VNYXBzVGFicyIsImxpbmsxIiwibGluazIiLCJsaW5rMyIsImNvbG9yIiwiYmFja2dyb3VuZCIsInJhZGlvQnRFdmVudCIsImNoZWNrZWQiLCJ2YWx1ZSIsInBsYWNlaG9sZGVyIiwicmVtb3ZlTWFwIiwidW5kZWZpbmVkIiwib2ZmIiwicmVtb3ZlIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0Iiwic2V0QXR0cmlidXRlIiwicmVhZHkiLCJyZXNwb25zZTEiLCJkZXMiLCJhcHBlbGxhdGlvbiIsInJlc3BvbnNlMiIsImNlcGFnZSIsInJlc2V0IiwiY2xlYXJMYXllcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLENBQUMsR0FBQ0MsbUJBQU8sQ0FBQywyREFBRCxDQUFiOztBQUNBLElBQU1DLENBQUMsR0FBR0QsbUJBQU8sQ0FBQyxvREFBRCxDQUFqQixDLENBRUE7OztBQUNBLE9BQU9ELENBQUMsQ0FBQ0csSUFBRixDQUFPQyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJDLFdBQWhDO0FBQ0FOLENBQUMsQ0FBQ0csSUFBRixDQUFPQyxPQUFQLENBQWVHLFlBQWYsQ0FBNEI7QUFDeEJDLGVBQWEsRUFBRVAsbUJBQU8sQ0FBQyxxR0FBRCxDQURFO0FBRXhCUSxTQUFPLEVBQUVSLG1CQUFPLENBQUMsK0ZBQUQsQ0FGUTtBQUd4QlMsV0FBUyxFQUFFVCxtQkFBTyxDQUFDLG1HQUFEO0FBSE0sQ0FBNUIsRSxDQU1BOztBQUNBLElBQUlVLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLE1BQU0sR0FBRyxFQUFiO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0EsSUFBSUMsS0FBSjtBQUNBLElBQUlDLE1BQUo7QUFDQSxJQUFJQyxNQUFKO0FBQ0EsSUFBSUMsTUFBSjtBQUNBLElBQUlDLFVBQUo7QUFDQSxJQUFJQyxNQUFKO0FBQ0EsSUFBSUMsUUFB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Q0FBQyxDQUFDa0IsVUFBRixHQUFlNEMsS0FBZixDQUFxQjdDLE1BQXJCLENBQWI7O0FBRUEsWUFBSUssUUFBUSxDQUFDQyxjQUFULENBQXdCLGtCQUF4QixFQUE0Q21FLE9BQWhELEVBQXlEO0FBQ3JEdkIsc0JBQVksQ0FBQ3RCLElBQUQsRUFBTyxhQUFQLEVBQXNCd0IsTUFBdEIsQ0FBWjtBQUNIOztBQUNELFlBQUkvQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsY0FBeEIsRUFBd0NtRSxPQUE1QyxFQUFxRDtBQUNqRHZCLHNCQUFZLENBQUN0QixJQUFELEVBQU8sU0FBUCxFQUFrQndCLE1BQWxCLENBQVo7QUFDSDtBQUNKLE9BaEJjLENBQWY7QUFpQkExQixjQUFRLENBQUNzQixJQUFULENBQWMsWUFBVztBQUNyQjNDLGdCQUFRLENBQUNDLGNBQVQsQ0FBd0IsdUJBQXhCLEVBQWlEMkMsU0FBakQsR0FBNkQsOEZBQTdEO0FBQ0gsT0FGRDtBQUdBcEMsaUJBQVcsQ0FBQ29DLFNBQVosR0FBd0IsRUFBeEI7QUFDSDtBQUNKLEdBbENEO0FBbUNILENBNUpELEUiLCJmaWxlIjoibGVhZmxldC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBMPXJlcXVpcmUoJ2xlYWZsZXQnKTtcclxuY29uc3QgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuLy8gdGhlIGNvZGUgYmVsb3cgZml4ZXMgYSBsZWFmbGV0IGJ1ZyB0aGF0IGRvZXMgbm90IGltcG9ydCB0aGUgbWFya2VyIGltYWdlc1xyXG5kZWxldGUgTC5JY29uLkRlZmF1bHQucHJvdG90eXBlLl9nZXRJY29uVXJsO1xyXG5MLkljb24uRGVmYXVsdC5tZXJnZU9wdGlvbnMoe1xyXG4gICAgaWNvblJldGluYVVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi0yeC5wbmcnKSxcclxuICAgIGljb25Vcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24ucG5nJyksXHJcbiAgICBzaGFkb3dVcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLXNoYWRvdy5wbmcnKSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tIHZhcmlhYmxlcyAtLS0tLS0tLS8vXHJcbmxldCBwcm9kdWNlcnMgPSBbXTtcclxubGV0IGRlc1RhYiA9IFtdO1xyXG5sZXQgdmFyaWV0eVRhYiA9IFtdO1xyXG5sZXQgbXltYXA7XHJcbmxldCBteW1hcDE7XHJcbmxldCBteW1hcDI7XHJcbmxldCBteW1hcFM7XHJcbmxldCBsYXllckdyb3VwO1xyXG5sZXQgbWFya2VyO1xyXG5sZXQgaW5pdHpvb207XHJcbmxldCB3aW5lcmllc01hcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tYWluZXNcIik7XHJcbmxldCBkZXNpZ25hdGlvbnNNYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcGVsbGF0aW9uc1wiKTtcclxubGV0IHZhcmlldGllc01hcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VwYWdlc1wiKTtcclxubGV0IHNlYXJjaFJlc01hcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUmVzTWFwXCIpO1xyXG5sZXQgc2VhcmNoRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7IC8vZGl2IHRoYXQgY29udGFpbnMgdGhlIHNlYXJjaCBmb3JtXHJcbmxldCBzZWFyY2hPcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaE9wdFwiKTsgLy8gYnV0dG9uIFwiUmVjaGVyY2hlciBzdXIgbGEgY2FydGVcIlxyXG5sZXQgY2xvc2VTZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlU2VhcmNoXCIpOyAvLyBidXR0b24gdG8gY2xvc2Ugc2VhcmNoXHJcbmxldCByZXNOb3RGb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90Rm91bmRcIik7IC8vZGl2IHRvIGRpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG5sZXQgbWFya2VyQXJyID0gW107XHJcbi8vLS0tLS0tLS0gZW5kIHZhcmlhYmxlcyAtLS0tLS0tLS8vXHJcblxyXG4vLy0tLS0tLS0tIGZ1bmN0aW9ucyAtLS0tLS0tLS8vXHJcbmZ1bmN0aW9uIHNpemVNYXAoaWRNYXApIHtcclxuICAgIGlmICgkKFwiI1wiK2lkTWFwKS53aWR0aCgpID4gNDYwKSB7XHJcbiAgICAgICAgaW5pdHpvb20gPSA1Ljc1O1xyXG4gICAgICAgICQoXCIjXCIraWRNYXApLmhlaWdodCg1MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbml0em9vbSA9IDU7XHJcbiAgICAgICAgJChcIiNcIitpZE1hcCkuaGVpZ2h0KDM3MCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBSZXNwb25zaXZlU2l6ZShtYXBOYW1lLCBpZE1hcCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgc2l6ZU1hcChpZE1hcCk7XHJcbiAgICAgICAgaWYgKCQoXCIjXCIraWRNYXApLndpZHRoKCkgPiA0NjApIHtcclxuICAgICAgICAgICAgbWFwTmFtZS5zZXRWaWV3KFs0Ni44NTI3MTcxLCAyLjU4ODk3MzVdLCBpbml0em9vbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtYXBOYW1lLnNldFZpZXcoWzQ2Ljg1MjcxNzEsIDIuNTg4OTczNV0sIGluaXR6b29tKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlXaW5lcmllc01hcCgpIHtcclxuICAgIGxldCByZXNwb25zZSA9ICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS9wcm9kdWNlcnNcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBzaXplTWFwKFwibWFwaWRcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9kdWNlciA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGRhdGFbaV0ubmFtZSxcclxuICAgICAgICAgICAgICAgIGxhdDogZGF0YVtpXS5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgIGxvbmc6IGRhdGFbaV0ubG9uZ2l0dWRlLFxyXG4gICAgICAgICAgICAgICAgd2Vic2l0ZTogZGF0YVtpXS53ZWJzaXRlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHByb2R1Y2Vycy5wdXNoKHByb2R1Y2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbXltYXAgPSBMLm1hcCgnbWFwaWQnLCB7bWluWm9vbTogMywgbWF4Wm9vbTogOCwgem9vbVNuYXA6IDAsIHpvb21EZWx0YTogMC4yNX0pLnNldFZpZXcoWzQ2Ljg1MjcxNzEsIDIuNTg4OTczNV0sIGluaXR6b29tKTtcclxuICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgIG1heFpvb206IDE5LCBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kdWNlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3Byb2R1Y2Vyc1tpXS5sYXQsIHByb2R1Y2Vyc1tpXS5sb25nXSkuYWRkVG8obXltYXApLmFkZFRvKG15bWFwKTtcclxuICAgICAgICAgICAgaWYgKHByb2R1Y2Vyc1tpXS53ZWJzaXRlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHByb2R1Y2Vyc1tpXS53ZWJzaXRlICsgXCI+PGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSArIFwiPC9hPlwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHByb2R1Y2Vyc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc01vYmlsZURldmljZSgpKSB7XHJcbiAgICAgICAgICAgIG15bWFwLnNldFZpZXcoWzQ2LjA5ODYyNjgsIDIuMjM0NjA2NF0sIDQuNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hcFJlc3BvbnNpdmVTaXplKG15bWFwLCBcIm1hcGlkXCIpO1xyXG4gICAgfSlcclxuICAgIHJlc3BvbnNlLmZhaWwoZnVuY3Rpb24oKSB7IC8vY29kZSBiZWxvdyBkaXNwbGF5cyBtYXAgd2l0aG91dCBtYXJrZXJzICsgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvck1zZ0FwaU5vdFdvcmtpbmcnKS5pbm5lclRleHQgPSBcIkTDqXNvbMOpIG5vdXMgYXZvbnMgcXVlbHF1ZXMgcHJvYmzDqG1lcyBwb3VyIGFmZmljaGVyIGxlcyBkb25uw6llcywgdmV1aWxsZXogcsOpZXNzYXllciBwbHVzIHRhcmRcIjtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWFyY2hSZXMoZGF0YSwgdHlwZSwgc2VhcmNoKSB7XHJcbiAgICBsZXQgcmVzQXJyID0gW107XHJcbiAgICBsZXQgY3B0ID0gMDtcclxuICAgIG1hcmtlckFyciA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG5hbWU7XHJcbiAgICAgICAgaWYodHlwZSA9PSBcImRlc2lnbmF0aW9uXCIpIG5hbWUgPSBkYXRhW2ldLmRlc2lnbmF0aW9uLm5hbWUudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgICAgICAgZWxzZSBuYW1lID0gZGF0YVtpXS52YXJpZXR5Lm5hbWUudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgICAgICAgaWYgKHNlYXJjaCA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNBcnIubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBwID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRhdGFbaV0ucHJvZHVjZXIubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IGRhdGFbaV0ucHJvZHVjZXIubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZzogZGF0YVtpXS5wcm9kdWNlci5sb25naXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgd2Vic2l0ZTogZGF0YVtpXS5wcm9kdWNlci53ZWJzaXRlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNBcnIucHVzaChwKTtcclxuICAgICAgICAgICAgICAgIGNwdCsrO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc0FycltyZXNBcnIubGVuZ3RoIC0gMV0ubmFtZSAhPSBkYXRhW2ldLnByb2R1Y2VyLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRhdGFbaV0ucHJvZHVjZXIubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IGRhdGFbaV0ucHJvZHVjZXIubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZzogZGF0YVtpXS5wcm9kdWNlci5sb25naXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgd2Vic2l0ZTogZGF0YVtpXS5wcm9kdWNlci53ZWJzaXRlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmVzQXJyLnB1c2gocCk7XHJcbiAgICAgICAgICAgICAgICBjcHQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3Jlc0FycltpXS5sYXQsIHJlc0FycltpXS5sb25nXSkuYWRkVG8obGF5ZXJHcm91cCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzQXJyW2ldLndlYnNpdGUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cIiArIHJlc0FycltpXS53ZWJzaXRlICsgXCI+PGI+RG9tYWluZTwvYj48YnI+XCIgKyByZXNBcnJbaV0ubmFtZSArIFwiPC9hPjxicj5cIiArIHNlYXJjaCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8Yj5Eb21haW5lPC9iPjxicj5cIiArIHJlc0FycltpXS5uYW1lICsgXCI8L2E+PGJyPlwiICsgc2VhcmNoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1hcmtlckFyci5wdXNoKG1hcmtlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocmVzQXJyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgcmVzTm90Rm91bmQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICByZXNOb3RGb3VuZC5pbm5lclRleHQgPSBcIkF1Y3VuIHJlc3VsdGF0IHRyb3V2w6kgcG91ciBcIiArIHNlYXJjaCArIFwiLlwiO1xyXG4gICAgfSBlbHNlIGlmKGNwdCA8IDMpIHtcclxuICAgICAgICBsZXQgZ3JvdXAgPSBuZXcgTC5mZWF0dXJlR3JvdXAobWFya2VyQXJyKTtcclxuICAgICAgICBteW1hcFMuZml0Qm91bmRzKGdyb3VwLmdldEJvdW5kcygpKTtcclxuICAgIH1cclxuICAgIGlmKGlzTW9iaWxlRGV2aWNlKCkgJiYgY3B0ID4gMykge1xyXG4gICAgICAgIG15bWFwUy5zZXRWaWV3KFs0Ni4wOTg2MjY4LCAyLjIzNDYwNjRdLCA0LjUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VNYXBzVGFicyhsaW5rMSwgbGluazIsIGxpbmszKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaW5rMSkuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaW5rMSkuc3R5bGUuYmFja2dyb3VuZCA9IFwiI0VBREZDMVwiO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGluazIpLnN0eWxlLmNvbG9yID0gXCIjNDQ0MzQwXCJcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpbmsyKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ3aGl0ZVwiO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGluazMpLnN0eWxlLmNvbG9yID0gXCIjNDQ0MzQwXCI7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaW5rMykuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gcmFkaW9CdEV2ZW50KCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNpZ25hdGlvblJhZGlvXCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzaWduYXRpb25SYWRpb1wiKS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFF1ZXJ5XCIpLnBsYWNlaG9sZGVyID0gJ0VudHJleiB1biBub20gZFxcJ2FwcGVsbGF0aW9uJztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmFyaWV0eVJhZGlvXCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmFyaWV0eVJhZGlvXCIpLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hRdWVyeVwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikucGxhY2Vob2xkZXIgPSAnRW50cmV6IHVuIG5vbSBkZSBjw6lwYWdlJztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlTWFwKG1hcE5hbWUpIHtcclxuICAgIGlmKG1hcE5hbWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbWFwTmFtZS5vZmYoKTtcclxuICAgICAgICBtYXBOYW1lLnJlbW92ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc01vYmlsZURldmljZSgpIHtcclxuICAgIHJldHVybiAod2luZG93LmlubmVyV2lkdGggPD0gODAwICYmIHdpbmRvdy5pbm5lckhlaWdodCA8PSA2MDApO1xyXG59XHJcbi8vLS0tLS0tLS0gZW5kIGZ1bmN0aW9ucyAtLS0tLS0tLS8vXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1tYXBcIikuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XHJcbmRlc2lnbmF0aW9uc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbnZhcmlldGllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbnNlYXJjaERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbnNlYXJjaFJlc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgZGlzcGxheVdpbmVyaWVzTWFwKCk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcDFMaW5rJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJlbW92ZU1hcChteW1hcCk7XHJcbiAgICAgICAgY2hhbmdlTWFwc1RhYnMoXCJtYXAxTGlua1wiLCBcIm1hcDJMaW5rXCIsIFwibWFwM0xpbmtcIik7XHJcbiAgICAgICAgd2luZXJpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICBkZXNpZ25hdGlvbnNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHZhcmlldGllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZGlzcGxheVdpbmVyaWVzTWFwKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwMkxpbmsnKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmVtb3ZlTWFwKG15bWFwMSk7XHJcbiAgICAgICAgY2hhbmdlTWFwc1RhYnMoXCJtYXAyTGlua1wiLCBcIm1hcDFMaW5rXCIsIFwibWFwM0xpbmtcIik7XHJcbiAgICAgICAgd2luZXJpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGRlc2lnbmF0aW9uc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIHZhcmlldGllc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlMSA9ICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS93aW5lc1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBzaXplTWFwKFwibWFwaWQxXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbGxhdGlvbjogZGF0YVtpXS5kZXNpZ25hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IGRhdGFbaV0ucHJvZHVjZXIubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmc6IGRhdGFbaV0ucHJvZHVjZXIubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBkZXNUYWIucHVzaChkZXMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZXNUYWJbZGVzVGFiLmxlbmd0aC0xXS5sYXQgIT0gZGF0YVtpXS5wcm9kdWNlci5sYXRpdHVkZSAmJiBkZXNUYWJbZGVzVGFiLmxlbmd0aC0xXS5sb25nICE9IGRhdGFbaV0ucHJvZHVjZXIubG9uZ2l0dWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZWxsYXRpb246IGRhdGFbaV0uZGVzaWduYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBkYXRhW2ldLnByb2R1Y2VyLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nOiBkYXRhW2ldLnByb2R1Y2VyLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzVGFiLnB1c2goZGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBteW1hcDEgPSBMLm1hcCgnbWFwaWQxJywge21pblpvb206IDMsIG1heFpvb206IDgsIHpvb21TbmFwOiAwLCB6b29tRGVsdGE6IDAuMjV9KS5zZXRWaWV3KFs0Ni44NTI3MTcxLCAyLjU4ODk3MzVdLCBpbml0em9vbSk7XHJcbiAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgIG1heFpvb206IDE5LCBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgICAgICB9KS5hZGRUbyhteW1hcDEpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNUYWIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKFtkZXNUYWJbaV0ubGF0LCBkZXNUYWJbaV0ubG9uZ10pLmFkZFRvKG15bWFwMSk7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKGRlc1RhYltpXS5hcHBlbGxhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaXNNb2JpbGVEZXZpY2UoKSkge1xyXG4gICAgICAgICAgICAgICAgbXltYXAxLnNldFZpZXcoWzQ2LjA5ODYyNjgsIDIuMjM0NjA2NF0sIDQuNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWFwUmVzcG9uc2l2ZVNpemUobXltYXAxLCBcIm1hcGlkMVwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJlc3BvbnNlMS5mYWlsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JNc2dBcGlOb3RXb3JraW5nJykuaW5uZXJUZXh0ID0gXCJEw6lzb2zDqSBub3VzIGF2b25zIHF1ZWxxdWVzIHByb2Jsw6htZXMgcG91ciBhZmZpY2hlciBsZXMgZG9ubsOpZXMsIHZldWlsbGV6IHLDqWVzc2F5ZXIgcGx1cyB0YXJkXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwM0xpbmsnKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmVtb3ZlTWFwKG15bWFwMik7XHJcbiAgICAgICAgY2hhbmdlTWFwc1RhYnMoXCJtYXAzTGlua1wiLCBcIm1hcDJMaW5rXCIsIFwibWFwMUxpbmtcIik7XHJcbiAgICAgICAgd2luZXJpZXNNYXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGRlc2lnbmF0aW9uc01hcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgdmFyaWV0aWVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlMiA9ICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS93aW5lc1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBzaXplTWFwKFwibWFwaWQyXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2VwYWdlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpZXR5OiBkYXRhW2ldLnZhcmlldHkubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBkYXRhW2ldLnByb2R1Y2VyLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nOiBkYXRhW2ldLnByb2R1Y2VyLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyaWV0eVRhYi5wdXNoKGNlcGFnZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhcmlldHlUYWJbdmFyaWV0eVRhYi5sZW5ndGgtMV0ubGF0ICE9IGRhdGFbaV0ucHJvZHVjZXIubGF0aXR1ZGUgJiYgdmFyaWV0eVRhYlt2YXJpZXR5VGFiLmxlbmd0aC0xXS5sb25nICE9IGRhdGFbaV0ucHJvZHVjZXIubG9uZ2l0dWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlcGFnZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWV0eTogZGF0YVtpXS52YXJpZXR5Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogZGF0YVtpXS5wcm9kdWNlci5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZzogZGF0YVtpXS5wcm9kdWNlci5sb25naXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlldHlUYWIucHVzaChjZXBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG15bWFwMiA9IEwubWFwKCdtYXBpZDInLCB7bWluWm9vbTogMywgbWF4Wm9vbTogOCwgem9vbVNuYXA6IDAsIHpvb21EZWx0YTogMC4yNX0pLnNldFZpZXcoWzQ2Ljg1MjcxNzEsIDIuNTg4OTczNV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICAgICAgbWF4Wm9vbTogMTksIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwMik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhcmlldHlUYWIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKFt2YXJpZXR5VGFiW2ldLmxhdCwgdmFyaWV0eVRhYltpXS5sb25nXSkuYWRkVG8obXltYXAyKTtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAodmFyaWV0eVRhYltpXS52YXJpZXR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc01vYmlsZURldmljZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBteW1hcDIuc2V0VmlldyhbNDYuMDk4NjI2OCwgMi4yMzQ2MDY0XSwgNC41KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYXBSZXNwb25zaXZlU2l6ZShteW1hcDIsIFwibWFwaWQyXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmVzcG9uc2UyLmZhaWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvck1zZ0FwaU5vdFdvcmtpbmcnKS5pbm5lclRleHQgPSBcIkTDqXNvbMOpIG5vdXMgYXZvbnMgcXVlbHF1ZXMgcHJvYmzDqG1lcyBwb3VyIGFmZmljaGVyIGxlcyBkb25uw6llcywgdmV1aWxsZXogcsOpZXNzYXllciBwbHVzIHRhcmRcIjtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyotLS0tLS0tLS0tLS0tLS0tLSBDT0RFIFRPIFNFQVJDSCBPTiBNQVAtLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIHJhZGlvQnRFdmVudCgpO1xyXG5cclxuICAgIHNlYXJjaE9wdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlYXJjaERpdi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICBzZWFyY2hPcHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9PcHRTZWFyY2hcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2xvc2VTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHNlYXJjaE9wdC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcHNBbmRNZW51XCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgc2VhcmNoUmVzTWFwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICByZXNOb3RGb3VuZC5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikucGxhY2Vob2xkZXIgPSAnRW50cmV6IHVuIG5vbSBkXFwnYXBwZWxsYXRpb24nO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoRm9ybVwiKS5yZXNldCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gd2hlbiB3ZSBjbGljayBvbiB0aGUgc2VhcmNoIGJ1dHRvbiA6XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEJ0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIikudmFsdWUudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgICAgICAgaWYoc2VhcmNoID09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmVzTm90Rm91bmQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgcmVzTm90Rm91bmQuaW5uZXJUZXh0ID0gXCJWZXVpbGxleiBlbnRyZXogdW4gbW90LlwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVtb3ZlTWFwKG15bWFwUyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwc0FuZE1lbnVcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBpZihsYXllckdyb3VwICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJHcm91cC5jbGVhckxheWVycygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUmVzTWFwXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9ICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS93aW5lc1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgc2l6ZU1hcChcInNlYXJjaFJlc01hcFwiKTtcclxuICAgICAgICAgICAgICAgIG15bWFwUyA9IEwubWFwKCdzZWFyY2hSZXNNYXAnLCB7bWluWm9vbTogMywgbWF4Wm9vbTogOCwgem9vbVNuYXA6IDAsIHpvb21EZWx0YTogMC4yNX0pLnNldFZpZXcoWzQ2Ljg1MjcxNzEsIDIuNTg4OTczNV0sIGluaXR6b29tKTtcclxuICAgICAgICAgICAgICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxOSwgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRvKG15bWFwUyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWFwUmVzcG9uc2l2ZVNpemUobXltYXBTLCBcInNlYXJjaFJlc01hcFwiKTtcclxuICAgICAgICAgICAgICAgIGxheWVyR3JvdXAgPSBMLmxheWVyR3JvdXAoKS5hZGRUbyhteW1hcFMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2lnbmF0aW9uUmFkaW9cIikuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFNlYXJjaFJlcyhkYXRhLCBcImRlc2lnbmF0aW9uXCIsIHNlYXJjaCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2YXJpZXR5UmFkaW9cIikuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFNlYXJjaFJlcyhkYXRhLCBcInZhcmlldHlcIiwgc2VhcmNoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmVzcG9uc2UuZmFpbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvck1zZ0FwaU5vdFdvcmtpbmcnKS5pbm5lclRleHQgPSBcIkTDqXNvbMOpIG5vdXMgYXZvbnMgcXVlbHF1ZXMgcHJvYmzDqG1lcyBwb3VyIGFmZmljaGVyIGxlcyBkb25uw6llcywgdmV1aWxsZXogcsOpZXNzYXllciBwbHVzIHRhcmRcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc05vdEZvdW5kLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=