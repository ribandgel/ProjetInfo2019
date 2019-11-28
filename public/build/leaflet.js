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
}); // let mymap = L.map('mapid').setView([51.505, -0.09], 13);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbGVhZmxldC5qcyJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIiQiLCJJY29uIiwiRGVmYXVsdCIsInByb3RvdHlwZSIsIl9nZXRJY29uVXJsIiwibWVyZ2VPcHRpb25zIiwiaWNvblJldGluYVVybCIsImljb25VcmwiLCJzaGFkb3dVcmwiLCJwcm9kdWNlcnMiLCJwcm9kdWNlciIsIm1hcmtlciIsImRvY3VtZW50IiwicmVhZHkiLCJnZXQiLCJkYXRhIiwiaSIsImxlbmd0aCIsIm9iaiIsIm5hbWUiLCJsYXQiLCJsYXRpdHVkZSIsImxvbmciLCJsb25naXR1ZGUiLCJwdXNoIiwibXltYXAiLCJtYXAiLCJzZXRWaWV3IiwidGlsZUxheWVyIiwibWF4Wm9vbSIsImF0dHJpYnV0aW9uIiwiYWRkVG8iLCJiaW5kUG9wdXAiLCJvcGVuUG9wdXAiLCJzZWFyY2hEaXYiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsInNlYXJjaE9wdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoaWRkZW4iLCJkcm9wRHduQ29udGVudCIsImZpbHRlckJ0Iiwic2VhcmNoQnQiLCJzZWFyY2giLCJyYWRpb09wdCIsImdldEVsZW1lbnRzQnlOYW1lIiwiY2hlY2tlZCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsQ0FBQyxHQUFDQyxtQkFBTyxDQUFDLDJEQUFELENBQWI7O0FBQ0EsSUFBSUMsQ0FBQyxHQUFHRCxtQkFBTyxDQUFDLG9EQUFELENBQWY7O0FBRUEsT0FBT0QsQ0FBQyxDQUFDRyxJQUFGLENBQU9DLE9BQVAsQ0FBZUMsU0FBZixDQUF5QkMsV0FBaEM7QUFFQU4sQ0FBQyxDQUFDRyxJQUFGLENBQU9DLE9BQVAsQ0FBZUcsWUFBZixDQUE0QjtBQUN4QkMsZUFBYSxFQUFFUCxtQkFBTyxDQUFDLHFHQUFELENBREU7QUFFeEJRLFNBQU8sRUFBRVIsbUJBQU8sQ0FBQywrRkFBRCxDQUZR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Q0o7O0FBQ0QsY0FBRzBCLFFBQVEsQ0FBQzdCLEdBQUQsQ0FBUixDQUFZZ0MsS0FBWixLQUFzQixTQUF6QixFQUFvQyxDQUFFOztBQUN0QyxjQUFHSCxRQUFRLENBQUM3QixHQUFELENBQVIsQ0FBWWdDLEtBQVosS0FBc0IsUUFBekIsRUFBbUMsQ0FBRTs7QUFDckMsY0FBR0gsUUFBUSxDQUFDN0IsR0FBRCxDQUFSLENBQVlnQyxLQUFaLEtBQXNCLFFBQXpCLEVBQW1DLENBQUU7QUFDeEMsU0FqQkQ7QUFrQkg7QUF0QnFDOztBQUMxQyxTQUFJLElBQUloQyxHQUFDLEdBQUcsQ0FBWixFQUFlQSxHQUFDLEdBQUc2QixRQUFRLENBQUM1QixNQUE1QixFQUFvQ0QsR0FBQyxFQUFyQyxFQUF5QztBQUFBLFlBQWpDQSxHQUFpQztBQXNCeEM7QUFDSixHQXhCRCxFQTNEMEIsQ0FxRjFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUFVQTtBQUNBOztBQUNBOzs7OztBQUtILENBbEhELEUsQ0FxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUlBOzs7O0FBS0E7QUFDQSxpRyIsImZpbGUiOiJsZWFmbGV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEw9cmVxdWlyZSgnbGVhZmxldCcpO1xyXG5sZXQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuZGVsZXRlIEwuSWNvbi5EZWZhdWx0LnByb3RvdHlwZS5fZ2V0SWNvblVybDtcclxuXHJcbkwuSWNvbi5EZWZhdWx0Lm1lcmdlT3B0aW9ucyh7XHJcbiAgICBpY29uUmV0aW5hVXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1pY29uLTJ4LnBuZycpLFxyXG4gICAgaWNvblVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi5wbmcnKSxcclxuICAgIHNoYWRvd1VybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItc2hhZG93LnBuZycpLFxyXG59KTtcclxuXHJcbmxldCBwcm9kdWNlcnMgPSBbXTtcclxubGV0IHByb2R1Y2VyID0ge307XHJcbmxldCBtYXJrZXI7XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgJC5nZXQoXCJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3Byb2R1Y2Vyc1wiLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IG9iai5uYW1lO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibmFtZVwiICsgbmFtZSlcclxuICAgICAgICAgICAgbGV0IGxhdCA9IG9iai5sYXRpdHVkZTtcclxuICAgICAgICAgICAgbGV0IGxvbmcgPSBvYmoubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICBsZXQgcHJvZHVjZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBvYmoubmFtZSxcclxuICAgICAgICAgICAgICAgIGxhdDogb2JqLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgbG9uZzogb2JqLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBwcm9kdWNlcnMucHVzaChwcm9kdWNlcik7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJIRVJFIElTIFRIRSBsYXQgXCIgKyBsYXQpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiSEVSRSBJUyBUSEUgbG9uZyBcIiArIGxvbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbXltYXAgPSBMLm1hcCgnbWFwaWQnKS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgNik7XHJcbiAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICB9KS5hZGRUbyhteW1hcCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHByb2R1Y2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbcHJvZHVjZXJzW2ldLmxhdCwgcHJvZHVjZXJzW2ldLmxvbmddKS5hZGRUbyhteW1hcCk7XHJcbiAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSBocmVmPScvaW5mb193aW5lcnknPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHJvZHVjZXJzW2ldLm5hbWUgKyBcIjwvYT5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSBocmVmPScvaW5mb193aW5lcnknPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgcHJvZHVjZXJzW2ldLm5hbWUgKyBcIjwvYT5cIikub3BlblBvcHVwKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgc2VhcmNoRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XHJcbiAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgbGV0IHNlYXJjaE9wdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoT3B0XCIpO1xyXG5cclxuICAgIHNlYXJjaE9wdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlYXJjaERpdi5oaWRkZW4gPSBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBkcm9wRHduQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcGRvd24tY29udGVudFwiKTtcclxuXHJcbiAgICBzZWFyY2hPcHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgICAgICAgc2VhcmNoT3B0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBkcm9wRHduQ29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZmlsdGVyQnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbHRlckJ0XCIpO1xyXG5cclxuICAgIGZpbHRlckJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZHJvcER3bkNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIH0pXHJcblxyXG4gICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tU1RVRkZTIFRPIEZJTFRFUiBTRUFSQ0ggT04gTUFQLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbiAgICBsZXQgc2VhcmNoQnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEJ0XCIpOyAvL2xlIGJvdXR0b24gcmVjaGVyY2hlclxyXG4gICAgbGV0IHNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoUXVlcnlcIik7IC8vY2UgcXUnYSBlY3JpdCBsJ3V0aWxpc2F0ZXVyIGRhbnMgbGEgYmFycmUgZGUgcmVjaGVyY2hlXHJcbiAgICBsZXQgcmFkaW9PcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnc2VhcmNoT3B0aW9uJyk7IC8vbGUgcmFkaW8gYnQgY2hvc2VuIGJ5IHVzZXIgdG8gZmlsdGVyIGJ5XHJcbiAgICAvL2xldCBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRcIik7Ly8gdGhpcyBpcyBqdXN0IGEgdGVzdFxyXG5cclxuICAgIHNlYXJjaEJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmFkaW9PcHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgLy9wLmlubmVySFRNTCA9IHNlYXJjaC52YWx1ZSArIHJhZGlvT3B0W2ldLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgJC5nZXQoXCJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3dpbmVzXCIsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJBcHBlbGxhdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IG9iai5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGxhdCA9IG9iai5sYXRpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBsb25nID0gb2JqLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCB3aW5lcnkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbmFtZTogb2JqLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGF0OiBvYmoubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbG9uZzogb2JqLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJDb3VsZXVyXCIpIHt9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiUsOpZ2lvblwiKSB7fVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcIkPDqXBhZ2VcIikge31cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gbWFya2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgbWFwLm9uKCdkcmF3OmNyZWF0ZWQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgLy8gICAgICAgICB2YXIgdHlwZSA9IGUubGF5ZXJUeXBlLFxyXG4gICAgLy8gICAgICAgICAgICAgbGF5ZXIgPSBlLmxheWVyO1xyXG4gICAgLy8gICAgICAgICBtYXAuYWRkTGF5ZXIobGF5ZXIpO1xyXG4gICAgLy8gICAgICAgICBpZiAodHlwZSA9PT0gJ21hcmtlcicpIHtcclxuICAgIC8vICAgICAgICAgICAgIGxheWVyLmJpbmRQb3B1cCgnTGF0TG5nOiAnICsgbGF5ZXIuZ2V0TGF0TG5nKCkpLm9wZW5Qb3B1cCgpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgICAgLy9tYXJrZXIuYmluZFBvcHVwKFwiPGEgaHJlZj0nL2luZm9fd2luZXJ5Jz48Yj5Eb21haW5lPC9iPjxicj5cIiArIHdpbmVyaWVzW2ldLm5hbWUgKyBcIjwvYT5cIikub3BlblBvcHVwKCk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvKmZvcihsZXQgaT0wOyBpPHdpbmVyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIRVJFIElTIFRIRSBuYW1lIFwiICsgd2luZXJpZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIRVJFIElTIFRIRSBsYXQgXCIgKyB3aW5lcmllc1tpXS5sYXQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSEVSRSBJUyBUSEUgbG9uZyBcIiArIHdpbmVyaWVzW2ldLmxvbmcpO1xyXG4gICAgfVxyXG4gICAgbGV0IG15bWFwID0gTC5tYXAoJ21hcGlkJykuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIDYpO1xyXG4gICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbiAgICB9KS5hZGRUbyhteW1hcCk7Ki9cclxuICAgIC8vdmFyIG1hcmtlciA9IEwubWFya2VyKHdpbmVyaWVzWzBdLmxhdGl0dWRlLCB3aW5lcmllc1swXS5sb25naXR1ZGUpLmFkZFRvKG15bWFwKTtcclxuICAgIC8vbWFya2VyLmJpbmRQb3B1cChcIjxhIGhyZWY9Jy9pbmZvX3dpbmVyeSc+PGI+RG9tYWluZTwvYj48YnI+XCIgKyB3aW5lcmllc1swXS5uYW1lICsgXCI8L2E+XCIpLm9wZW5Qb3B1cCgpO1xyXG4gICAgLypmb3IobGV0IGk9MDsgaTx3aW5lcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSU4gRk9SIExPT1AgRk9SIE1BUktFUlNcIik7XHJcbiAgICAgICAgdmFyIG1hcmtlciA9IEwubWFya2VyKHdpbmVyaWVzW2ldLmxhdGl0dWRlLCB3aW5lcmllc1tpXS5sb25naXR1ZGUpLmFkZFRvKG15bWFwKTtcclxuICAgICAgICBtYXJrZXIuYmluZFBvcHVwKFwiPGEgaHJlZj0nL2luZm9fd2luZXJ5Jz48Yj5Eb21haW5lPC9iPjxicj5cIiArIHdpbmVyaWVzW2ldLm5hbWUgKyBcIjwvYT5cIikub3BlblBvcHVwKCk7XHJcbiAgICB9Ki9cclxufSk7XHJcblxyXG5cclxuLy8gbGV0IG15bWFwID0gTC5tYXAoJ21hcGlkJykuc2V0VmlldyhbNTEuNTA1LCAtMC4wOV0sIDEzKTtcclxuLy9cclxuLy8gTC50aWxlTGF5ZXIoJ2h0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQve2lkfS97en0ve3h9L3t5fS5wbmc/YWNjZXNzX3Rva2VuPXthY2Nlc3NUb2tlbn0nLCB7XHJcbi8vICAgICBhdHRyaWJ1dGlvbjogJ01hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvXCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzLCA8YSBocmVmPVwiaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LXNhLzIuMC9cIj5DQy1CWS1TQTwvYT4sIEltYWdlcnkgwqkgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vXCI+TWFwYm94PC9hPicsXHJcbi8vICAgICBtYXhab29tOiAxOCxcclxuLy8gICAgIGlkOiAnbWFwYm94LnN0cmVldHMnLFxyXG4vLyAgICAgYWNjZXNzVG9rZW46ICd5b3VyLm1hcGJveC5hY2Nlc3MudG9rZW4nXHJcbi8vIH0pLmFkZFRvKG15bWFwKTtcclxuXHJcbi8vbGV0IG15bWFwID0gTC5tYXAoJ21hcGlkJykuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIDgpO1xyXG4vL2xldCBteW1hcCA9IEwubWFwKCdtYXBpZCcpLnNldFZpZXcoW0xBVElUVURFLCBMT05HSVRVREVdLCBaT09NIExFVkVMKTtcclxuLy9aT09NIExFVkVMIHBsdXMgaWwgZXN0IHBldGl0IG1vaW5zIGxhIG1hcCBlc3Qgem9vbWVlLCBldCBwbHVzIGlsIGVzdCBncmFuZCBwbHVzIGxhIG1hcCBlc3Qgem9vbWVlXHJcblxyXG4vKkwudGlsZUxheWVyKCdodHRwczovL2FwaS5tYXB0aWxlci5jb20vbWFwcy9zdHJlZXRzL3t6fS97eH0ve3l9LnBuZz9rZXk9YmpsZXJXc2Nudmx6OHFpQml6RlcnLCB7XHJcbiAgICBhdHRyaWJ1dGlvbjogJzxhIGhyZWY9XCJodHRwczovL3d3dy5tYXB0aWxlci5jb20vY29weXJpZ2h0L1wiIHRhcmdldD1cIl9ibGFua1wiPsKpIE1hcFRpbGVyPC9hPiA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCIgdGFyZ2V0PVwiX2JsYW5rXCI+wqkgT3BlblN0cmVldE1hcCBjb250cmlidXRvcnM8L2E+J1xyXG59KS5hZGRUbyhteW1hcCk7Ki9cclxuXHJcbi8qTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgbWF4Wm9vbTogMTksXHJcbiAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG59KS5hZGRUbyhteW1hcCk7Ki9cclxuXHJcbi8vdmFyIG1hcmtlcjEgPSBMLm1hcmtlcihkb21haW5lMSkuYWRkVG8obXltYXApO1xyXG4vL21hcmtlcjEuYmluZFBvcHVwKFwiPGEgaHJlZj0nL2luZm9fd2luZXJ5Jz48Yj5Eb21haW5lPC9iPjxicj5DaMOidGVhdSBMZSBCb3NxLjwvYT5cIikub3BlblBvcHVwKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=