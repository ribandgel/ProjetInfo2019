(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["leaflet"],{

/***/ "./assets/js/leaflet.js":
/*!******************************!*\
  !*** ./assets/js/leaflet.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");

var L = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");

var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon-2x.png */ "./node_modules/leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon.png */ "./node_modules/leaflet/dist/images/marker-icon.png"),
  shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "./node_modules/leaflet/dist/images/marker-shadow.png")
});
var producers = [];
var producer = {};
var marker;
$(document).ready(function () {
  $.get("http://127.0.0.1:8000/api/producers", function (data) {
    //console.log(data);
    for (var _i = 0; _i < data.length; _i++) {
      var obj = data[_i];
      var name = obj.name; //console.log("name" + name)

      var lat = obj.latitude;
      var _long = obj.longitude;
      var _producer = {
        name: obj.name,
        lat: obj.latitude,
        "long": obj.longitude
      };
      producers.push(_producer); //console.log("HERE IS THE lat " + lat);
      //console.log("HERE IS THE long " + long);
    }

    var mymap = L.map('mapid').setView([46.227638, 2.213749], 6);
    L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    for (var _i2 = 0; _i2 < producers.length; _i2++) {
      marker = L.marker([producers[_i2].lat, producers[_i2]["long"]]).addTo(mymap);
      marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + producers[_i2].name + "</a>");
    }

    marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + producers[i].name + "</a>").openPopup();
  });
  var searchDiv = document.getElementById("search");
  searchDiv.style.display = "none";
  var searchOpt = document.getElementById("searchOpt");
  searchOpt.addEventListener("click", function () {
    searchDiv.hidden = false;
  });
  var dropDwnContent = document.getElementById("dropdown-content");
  searchOpt.addEventListener("click", function () {
    searchDiv.style.display = "inline";
    searchOpt.style.display = "none";
    dropDwnContent.style.display = "none";
  });
  var filterBt = document.getElementById("filterBt");
  filterBt.addEventListener("click", function () {
    dropDwnContent.style.display = "block";
  });
  /*----------------------------STUFFS TO FILTER SEARCH ON MAP-------------------------------*/

  var searchBt = document.getElementById("searchBt"); //le boutton rechercher

  var search = document.getElementById("searchQuery"); //ce qu'a ecrit l'utilisateur dans la barre de recherche

  var radioOpt = document.getElementsByName('searchOption'); //le radio bt chosen by user to filter by
  //let p = document.getElementById("result");// this is just a test

  var prev = null;

  for (var i = 0; i < radioOpt.length; i++) {
    radioOpt[i].addEventListener('change', function () {
      prev ? console.log(prev.value) : null;

      if (this !== prev) {
        prev = this;
      }

      for (var i = 0, length = radioOpt.length; i < length; i++) {
        if (radioOpt[i].checked) {
          console.log("radio checked = " + radioOpt[i].value);

          if (radioOpt[i].value === "appellation") {
            search.placeholder = 'Entrez un nom d\'appellation';
          }

          if (radioOpt[i].value === "couleur") {
            search.placeholder = 'Entrez une couleur';
          }

          if (radioOpt[i].value === "region") {
            search.placeholder = 'Entrez une ville, region ou code postal';
          }

          if (radioOpt[i].value === "cepage") {
            search.placeholder = 'Entrez un nom de cépage';
          }
        }

        console.log(this.value);
      }
    });
  }

  searchBt.addEventListener("click", function () {
    var _loop = function _loop(_i3) {
      if (radioOpt[_i3].checked) {
        //p.innerHTML = search.value + radioOpt[i].value;
        $.get("http://127.0.0.1:8000/api/wines", function (data) {
          if (radioOpt[_i3].value === "Appellation") {
            for (var _i4 = 0; _i4 < data.length; _i4++) {
              var obj = data[_i4];
              var name = obj.name; // let lat = obj.latitude;
              // let long = obj.longitude;
              // let winery = {
              //     name: obj.name,
              //     lat: obj.latitude,
              //     long: obj.longitude
              // };
            }
          }

          if (radioOpt[_i3].value === "Couleur") {}

          if (radioOpt[_i3].value === "Région") {}

          if (radioOpt[_i3].value === "Cépage") {}
        });
      }
    };

    for (var _i3 = 0; _i3 < radioOpt.length; _i3++) {
      _loop(_i3);
    }
  });
}); // marker.addEventListener("click", function () {
//     map.on('draw:created', function (e) {
//         var type = e.layerType,
//             layer = e.layer;
//         map.addLayer(layer);
//         if (type === 'marker') {
//             layer.bindPopup('LatLng: ' + layer.getLatLng()).openPopup();
//         }
//     });
//     //marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + wineries[i].name + "</a>").openPopup();
// });

/*for(let i=0; i<wineries.length; i++) {
    console.log("HERE IS THE name " + wineries[i].name);
    console.log("HERE IS THE lat " + wineries[i].lat);
    console.log("HERE IS THE long " + wineries[i].long);
}
let mymap = L.map('mapid').setView([46.227638, 2.213749], 6);
L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);*/
//var marker = L.marker(wineries[0].latitude, wineries[0].longitude).addTo(mymap);
//marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + wineries[0].name + "</a>").openPopup();

/*for(let i=0; i<wineries.length; i++) {
    console.log("IN FOR LOOP FOR MARKERS");
    var marker = L.marker(wineries[i].latitude, wineries[i].longitude).addTo(mymap);
    marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + wineries[i].name + "</a>").openPopup();
}*/
// let mymap = L.map('mapid').setView([51.505, -0.09], 13);
//
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'your.mapbox.access.token'
// }).addTo(mymap);
//let mymap = L.map('mapid').setView([46.227638, 2.213749], 8);
//let mymap = L.map('mapid').setView([LATITUDE, LONGITUDE], ZOOM LEVEL);
//ZOOM LEVEL plus il est petit moins la map est zoomee, et plus il est grand plus la map est zoomee

/*L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=bjlerWscnvlz8qiBizFW', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
}).addTo(mymap);*/

/*L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);*/
//var marker1 = L.marker(domaine1).addTo(mymap);
//marker1.bindPopup("<a href='/info_winery'><b>Domaine</b><br>Château Le Bosq.</a>").openPopup();

/***/ })

},[["./assets/js/leaflet.js","runtime","vendors~app~leaflet","vendors~leaflet"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbGVhZmxldC5qcyJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIiQiLCJJY29uIiwiRGVmYXVsdCIsInByb3RvdHlwZSIsIl9nZXRJY29uVXJsIiwibWVyZ2VPcHRpb25zIiwiaWNvblJldGluYVVybCIsImljb25VcmwiLCJzaGFkb3dVcmwiLCJwcm9kdWNlcnMiLCJwcm9kdWNlciIsIm1hcmtlciIsImRvY3VtZW50IiwicmVhZHkiLCJnZXQiLCJkYXRhIiwiaSIsImxlbmd0aCIsIm9iaiIsIm5hbWUiLCJsYXQiLCJsYXRpdHVkZSIsImxvbmciLCJsb25naXR1ZGUiLCJwdXNoIiwibXltYXAiLCJtYXAiLCJzZXRWaWV3IiwidGlsZUxheWVyIiwibWF4Wm9vbSIsImF0dHJpYnV0aW9uIiwiYWRkVG8iLCJiaW5kUG9wdXAiLCJvcGVuUG9wdXAiLCJzZWFyY2hEaXYiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsInNlYXJjaE9wdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoaWRkZW4iLCJkcm9wRHduQ29udGVudCIsImZpbHRlckJ0Iiwic2VhcmNoQnQiLCJzZWFyY2giLCJyYWRpb09wdCIsImdldEVsZW1lbnRzQnlOYW1lIiwicHJldiIsImNvbnNvbGUiLCJsb2ciLCJ2YWx1ZSIsImNoZWNrZWQiLCJwbGFjZWhvbGRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLENBQUMsR0FBQ0MsbUJBQU8sQ0FBQywyREFBRCxDQUFiOztBQUNBLElBQUlDLENBQUMsR0FBR0QsbUJBQU8sQ0FBQyxvREFBRCxDQUFmOztBQUVBLE9BQU9ELENBQUMsQ0FBQ0csSUFBRixDQUFPQyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJDLFdBQWhDO0FBRUFOLENBQUMsQ0FBQ0csSUFBRixDQUFPQyxPQUFQLENBQWVHLFlBQWYsQ0FBNEI7QUFDeEJDLGVBQWEsRUFBRVAsbUJBQU8sQ0FBQyxxR0FBRCxDQURFO0FB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QWdCQSxHQUFDLEdBQUdELElBQUksQ0FBQ0UsTUFBekIsRUFBaUNELEdBQUMsRUFBbEMsRUFBc0M7QUFDbEMsa0JBQUlFLEdBQUcsR0FBR0gsSUFBSSxDQUFDQyxHQUFELENBQWQ7QUFDQSxrQkFBSUcsSUFBSSxHQUFHRCxHQUFHLENBQUNDLElBQWYsQ0FGa0MsQ0FHbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKOztBQUNELGNBQUkwQixRQUFRLENBQUM3QixHQUFELENBQVIsQ0FBWWtDLEtBQVosS0FBc0IsU0FBMUIsRUFBcUMsQ0FDcEM7O0FBQ0QsY0FBSUwsUUFBUSxDQUFDN0IsR0FBRCxDQUFSLENBQVlrQyxLQUFaLEtBQXNCLFFBQTFCLEVBQW9DLENBQ25DOztBQUNELGNBQUlMLFFBQVEsQ0FBQzdCLEdBQUQsQ0FBUixDQUFZa0MsS0FBWixLQUFzQixRQUExQixFQUFvQyxDQUNuQztBQUNKLFNBcEJEO0FBcUJIO0FBekJzQzs7QUFDM0MsU0FBSyxJQUFJbEMsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBRzZCLFFBQVEsQ0FBQzVCLE1BQTdCLEVBQXFDRCxHQUFDLEVBQXRDLEVBQTBDO0FBQUEsWUFBakNBLEdBQWlDO0FBeUJ6QztBQUNKLEdBM0JEO0FBNEJILENBbkhMLEUsQ0FxSEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7O0FBQ0E7Ozs7O0FBT0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUlBOzs7O0FBS0E7QUFDQSxpRyIsImZpbGUiOiJsZWFmbGV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEw9cmVxdWlyZSgnbGVhZmxldCcpO1xyXG5sZXQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuZGVsZXRlIEwuSWNvbi5EZWZhdWx0LnByb3RvdHlwZS5fZ2V0SWNvblVybDtcclxuXHJcbkwuSWNvbi5EZWZhdWx0Lm1lcmdlT3B0aW9ucyh7XHJcbiAgICBpY29uUmV0aW5hVXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1pY29uLTJ4LnBuZycpLFxyXG4gICAgaWNvblVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi5wbmcnKSxcclxuICAgIHNoYWRvd1VybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItc2hhZG93LnBuZycpLFxyXG59KTtcclxuXHJcbmxldCBwcm9kdWNlcnMgPSBbXTtcclxubGV0IHByb2R1Y2VyID0ge307XHJcbmxldCBtYXJrZXI7XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgJC5nZXQoXCJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3Byb2R1Y2Vyc1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IG9iai5uYW1lO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibmFtZVwiICsgbmFtZSlcclxuICAgICAgICAgICAgbGV0IGxhdCA9IG9iai5sYXRpdHVkZTtcclxuICAgICAgICAgICAgbGV0IGxvbmcgPSBvYmoubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICBsZXQgcHJvZHVjZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBvYmoubmFtZSxcclxuICAgICAgICAgICAgICAgIGxhdDogb2JqLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgbG9uZzogb2JqLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBwcm9kdWNlcnMucHVzaChwcm9kdWNlcik7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJIRVJFIElTIFRIRSBsYXQgXCIgKyBsYXQpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiSEVSRSBJUyBUSEUgbG9uZyBcIiArIGxvbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbXltYXAgPSBMLm1hcCgnbWFwaWQnKS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgNik7XHJcbiAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICB9KS5hZGRUbyhteW1hcCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKFtwcm9kdWNlcnNbaV0ubGF0LCBwcm9kdWNlcnNbaV0ubG9uZ10pLmFkZFRvKG15bWFwKTtcclxuICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIGhyZWY9Jy9pbmZvX3dpbmVyeSc+PGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSArIFwiPC9hPlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIGhyZWY9Jy9pbmZvX3dpbmVyeSc+PGI+RG9tYWluZTwvYj48YnI+XCIgKyBwcm9kdWNlcnNbaV0ubmFtZSArIFwiPC9hPlwiKS5vcGVuUG9wdXAoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBsZXQgc2VhcmNoRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XHJcbiAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgbGV0IHNlYXJjaE9wdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoT3B0XCIpO1xyXG5cclxuICAgIHNlYXJjaE9wdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlYXJjaERpdi5oaWRkZW4gPSBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBkcm9wRHduQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcGRvd24tY29udGVudFwiKTtcclxuXHJcbiAgICBzZWFyY2hPcHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgICAgICAgc2VhcmNoT3B0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBkcm9wRHduQ29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZmlsdGVyQnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbHRlckJ0XCIpO1xyXG5cclxuICAgIGZpbHRlckJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZHJvcER3bkNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVNUVUZGUyBUTyBGSUxURVIgU0VBUkNIIE9OIE1BUC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4gICAgbGV0IHNlYXJjaEJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hCdFwiKTsgLy9sZSBib3V0dG9uIHJlY2hlcmNoZXJcclxuICAgIGxldCBzZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFF1ZXJ5XCIpOyAvL2NlIHF1J2EgZWNyaXQgbCd1dGlsaXNhdGV1ciBkYW5zIGxhIGJhcnJlIGRlIHJlY2hlcmNoZVxyXG4gICAgbGV0IHJhZGlvT3B0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3NlYXJjaE9wdGlvbicpOyAvL2xlIHJhZGlvIGJ0IGNob3NlbiBieSB1c2VyIHRvIGZpbHRlciBieVxyXG4gICAgLy9sZXQgcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdWx0XCIpOy8vIHRoaXMgaXMganVzdCBhIHRlc3RcclxuXHJcbiAgICB2YXIgcHJldiA9IG51bGw7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhZGlvT3B0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcmFkaW9PcHRbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIChwcmV2KSA/IGNvbnNvbGUubG9nKHByZXYudmFsdWUpOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcyAhPT0gcHJldikge1xyXG4gICAgICAgICAgICAgICAgcHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHJhZGlvT3B0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyYWRpb09wdFtpXS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyYWRpbyBjaGVja2VkID0gXCIgKyByYWRpb09wdFtpXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiYXBwZWxsYXRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2gucGxhY2Vob2xkZXIgPSAnRW50cmV6IHVuIG5vbSBkXFwnYXBwZWxsYXRpb24nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJjb3VsZXVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoLnBsYWNlaG9sZGVyID0gJ0VudHJleiB1bmUgY291bGV1cic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcInJlZ2lvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaC5wbGFjZWhvbGRlciA9ICdFbnRyZXogdW5lIHZpbGxlLCByZWdpb24gb3UgY29kZSBwb3N0YWwnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJjZXBhZ2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2gucGxhY2Vob2xkZXIgPSAnRW50cmV6IHVuIG5vbSBkZSBjw6lwYWdlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgICAgIHNlYXJjaEJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFkaW9PcHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChyYWRpb09wdFtpXS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9wLmlubmVySFRNTCA9IHNlYXJjaC52YWx1ZSArIHJhZGlvT3B0W2ldLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS93aW5lc1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiQXBwZWxsYXRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBvYmoubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbGF0ID0gb2JqLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBsb25nID0gb2JqLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgd2luZXJ5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBuYW1lOiBvYmoubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGF0OiBvYmoubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxvbmc6IG9iai5sb25naXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJDb3VsZXVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiUsOpZ2lvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcIkPDqXBhZ2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG1hcmtlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgIG1hcC5vbignZHJhdzpjcmVhdGVkJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIC8vICAgICAgICAgdmFyIHR5cGUgPSBlLmxheWVyVHlwZSxcclxuICAgIC8vICAgICAgICAgICAgIGxheWVyID0gZS5sYXllcjtcclxuICAgIC8vICAgICAgICAgbWFwLmFkZExheWVyKGxheWVyKTtcclxuICAgIC8vICAgICAgICAgaWYgKHR5cGUgPT09ICdtYXJrZXInKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBsYXllci5iaW5kUG9wdXAoJ0xhdExuZzogJyArIGxheWVyLmdldExhdExuZygpKS5vcGVuUG9wdXAoKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICAgIC8vbWFya2VyLmJpbmRQb3B1cChcIjxhIGhyZWY9Jy9pbmZvX3dpbmVyeSc+PGI+RG9tYWluZTwvYj48YnI+XCIgKyB3aW5lcmllc1tpXS5uYW1lICsgXCI8L2E+XCIpLm9wZW5Qb3B1cCgpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLypmb3IobGV0IGk9MDsgaTx3aW5lcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSEVSRSBJUyBUSEUgbmFtZSBcIiArIHdpbmVyaWVzW2ldLm5hbWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSEVSRSBJUyBUSEUgbGF0IFwiICsgd2luZXJpZXNbaV0ubGF0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhFUkUgSVMgVEhFIGxvbmcgXCIgKyB3aW5lcmllc1tpXS5sb25nKTtcclxuICAgIH1cclxuICAgIGxldCBteW1hcCA9IEwubWFwKCdtYXBpZCcpLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCA2KTtcclxuICAgIEwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgfSkuYWRkVG8obXltYXApOyovXHJcbiAgICAvL3ZhciBtYXJrZXIgPSBMLm1hcmtlcih3aW5lcmllc1swXS5sYXRpdHVkZSwgd2luZXJpZXNbMF0ubG9uZ2l0dWRlKS5hZGRUbyhteW1hcCk7XHJcbiAgICAvL21hcmtlci5iaW5kUG9wdXAoXCI8YSBocmVmPScvaW5mb193aW5lcnknPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgd2luZXJpZXNbMF0ubmFtZSArIFwiPC9hPlwiKS5vcGVuUG9wdXAoKTtcclxuICAgIC8qZm9yKGxldCBpPTA7IGk8d2luZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIklOIEZPUiBMT09QIEZPUiBNQVJLRVJTXCIpO1xyXG4gICAgICAgIHZhciBtYXJrZXIgPSBMLm1hcmtlcih3aW5lcmllc1tpXS5sYXRpdHVkZSwgd2luZXJpZXNbaV0ubG9uZ2l0dWRlKS5hZGRUbyhteW1hcCk7XHJcbiAgICAgICAgbWFya2VyLmJpbmRQb3B1cChcIjxhIGhyZWY9Jy9pbmZvX3dpbmVyeSc+PGI+RG9tYWluZTwvYj48YnI+XCIgKyB3aW5lcmllc1tpXS5uYW1lICsgXCI8L2E+XCIpLm9wZW5Qb3B1cCgpO1xyXG4gICAgfSovXHJcblxyXG5cclxuLy8gbGV0IG15bWFwID0gTC5tYXAoJ21hcGlkJykuc2V0VmlldyhbNTEuNTA1LCAtMC4wOV0sIDEzKTtcclxuLy9cclxuLy8gTC50aWxlTGF5ZXIoJ2h0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQve2lkfS97en0ve3h9L3t5fS5wbmc/YWNjZXNzX3Rva2VuPXthY2Nlc3NUb2tlbn0nLCB7XHJcbi8vICAgICBhdHRyaWJ1dGlvbjogJ01hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvXCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzLCA8YSBocmVmPVwiaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LXNhLzIuMC9cIj5DQy1CWS1TQTwvYT4sIEltYWdlcnkgwqkgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vXCI+TWFwYm94PC9hPicsXHJcbi8vICAgICBtYXhab29tOiAxOCxcclxuLy8gICAgIGlkOiAnbWFwYm94LnN0cmVldHMnLFxyXG4vLyAgICAgYWNjZXNzVG9rZW46ICd5b3VyLm1hcGJveC5hY2Nlc3MudG9rZW4nXHJcbi8vIH0pLmFkZFRvKG15bWFwKTtcclxuXHJcbi8vbGV0IG15bWFwID0gTC5tYXAoJ21hcGlkJykuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIDgpO1xyXG4vL2xldCBteW1hcCA9IEwubWFwKCdtYXBpZCcpLnNldFZpZXcoW0xBVElUVURFLCBMT05HSVRVREVdLCBaT09NIExFVkVMKTtcclxuLy9aT09NIExFVkVMIHBsdXMgaWwgZXN0IHBldGl0IG1vaW5zIGxhIG1hcCBlc3Qgem9vbWVlLCBldCBwbHVzIGlsIGVzdCBncmFuZCBwbHVzIGxhIG1hcCBlc3Qgem9vbWVlXHJcblxyXG4vKkwudGlsZUxheWVyKCdodHRwczovL2FwaS5tYXB0aWxlci5jb20vbWFwcy9zdHJlZXRzL3t6fS97eH0ve3l9LnBuZz9rZXk9YmpsZXJXc2Nudmx6OHFpQml6RlcnLCB7XHJcbiAgICBhdHRyaWJ1dGlvbjogJzxhIGhyZWY9XCJodHRwczovL3d3dy5tYXB0aWxlci5jb20vY29weXJpZ2h0L1wiIHRhcmdldD1cIl9ibGFua1wiPsKpIE1hcFRpbGVyPC9hPiA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCIgdGFyZ2V0PVwiX2JsYW5rXCI+wqkgT3BlblN0cmVldE1hcCBjb250cmlidXRvcnM8L2E+J1xyXG59KS5hZGRUbyhteW1hcCk7Ki9cclxuXHJcbi8qTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgbWF4Wm9vbTogMTksXHJcbiAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG59KS5hZGRUbyhteW1hcCk7Ki9cclxuXHJcbi8vdmFyIG1hcmtlcjEgPSBMLm1hcmtlcihkb21haW5lMSkuYWRkVG8obXltYXApO1xyXG4vL21hcmtlcjEuYmluZFBvcHVwKFwiPGEgaHJlZj0nL2luZm9fd2luZXJ5Jz48Yj5Eb21haW5lPC9iPjxicj5DaMOidGVhdSBMZSBCb3NxLjwvYT5cIikub3BlblBvcHVwKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=