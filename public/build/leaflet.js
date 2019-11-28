(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["leaflet"],{

/***/ "./assets/css/leaflet.css":
/*!********************************!*\
  !*** ./assets/css/leaflet.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/js/leaflet.js":
/*!******************************!*\
  !*** ./assets/js/leaflet.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");

__webpack_require__(/*! ../css/leaflet.css */ "./assets/css/leaflet.css");

var L = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");

var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

var wineries = [];
var winery = {};
var marker;
var searchDiv = document.getElementById("search");
$(document).ready(function () {
  $.get("http://127.0.0.1:8000/api/wineries", function (data) {
    //console.log(data);
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      var name = obj.name;
      var lat = obj.latitude;
      var _long = obj.longitude;
      var _winery = {
        name: obj.name,
        lat: obj.latitude,
        "long": obj.longitude
      };
      wineries.push(_winery); //console.log("HERE IS THE lat " + lat);
      //console.log("HERE IS THE long " + long);
    }

    var mymap = L.map('mapid').setView([46.227638, 2.213749], 6);
    L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    for (var _i = 0; _i < wineries.length; _i++) {
      marker = L.marker([wineries[_i].lat, wineries[_i]["long"]]).addTo(mymap); //marker.bindPopup("<a href='/info_winery'><b>Domaine</b><br>" + wineries[i].name + "</a>").openPopup();
    }
  }); // let mymap = L.map('mapid').setView([46.227638, 2.213749], 6);
  // L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
  //     maxZoom: 19,
  //     attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // }).addTo(mymap);
  //     var searchOpt = document.getElementById("searchOpt");
  // searchOpt.addEventListener("hover", function () {
  //     searchDiv.hidden = false;
  // });
  //
  // searchOpt.addEventListener("click", function () {
  //     searchDiv.hidden = false;
  // });
  // searchOpt.hover(function(){
  //     searchDiv.style.display = "inline";
  // }, function(){
  //     searchDiv.style.display = "none";
  // });

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
    var _loop = function _loop(i) {
      if (radioOpt[i].checked) {
        //p.innerHTML = search.value + radioOpt[i].value;
        $.get("http://127.0.0.1:8000/api/wineries", function (data) {
          if (radioOpt[i].value === "Appellation") {
            for (var _i2 = 0; _i2 < data.length; _i2++) {
              var obj = data[_i2];
              var name = obj.name; // let lat = obj.latitude;
              // let long = obj.longitude;
              // let winery = {
              //     name: obj.name,
              //     lat: obj.latitude,
              //     long: obj.longitude
              // };
            }
          }

          if (radioOpt[i].value === "Couleur") {}

          if (radioOpt[i].value === "Région") {}

          if (radioOpt[i].value === "Cépage") {}
        });
      }
    };

    for (var i = 0; i < radioOpt.length; i++) {
      _loop(i);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL2xlYWZsZXQuY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9sZWFmbGV0LmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJMIiwiJCIsIndpbmVyaWVzIiwid2luZXJ5IiwibWFya2VyIiwic2VhcmNoRGl2IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlYWR5IiwiZ2V0IiwiZGF0YSIsImkiLCJsZW5ndGgiLCJvYmoiLCJuYW1lIiwibGF0IiwibGF0aXR1ZGUiLCJsb25nIiwibG9uZ2l0dWRlIiwicHVzaCIsIm15bWFwIiwibWFwIiwic2V0VmlldyIsInRpbGVMYXllciIsIm1heFpvb20iLCJhdHRyaWJ1dGlvbiIsImFkZFRvIiwiZHJvcER3bkNvbnRlbnQiLCJzZWFyY2hPcHQiLCJhZGRFdmVudExpc3RlbmVyIiwic3R5bGUiLCJkaXNwbGF5IiwiZmlsdGVyQnQiLCJzZWFyY2hCdCIsInNlYXJjaCIsInJhZGlvT3B0IiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJjaGVja2VkIiwidmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHVDOzs7Ozs7Ozs7Ozs7Ozs7QUNBQUEsbUJBQU8sQ0FBQyxvREFBRCxDQUFQOztBQUVBLElBQUlDLENBQUMsR0FBQ0QsbUJBQU8sQ0FBQywyREFBRCxDQUFiOztBQUNBLElBQUlFLENBQUMsR0FBR0YsbUJBQU8sQ0FBQyxvREFBRCxDQUFmOztBQUVBLElBQUlHLFFBQVEsR0FBRyxFQUFmO0FBQ0EsSUFBSUMsTUFBTSxHQUFHLEVBQWI7QUFDQSxJQUFJQyxNQUFKO0FBQ0EsSUFBSUMsU0FBUyxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBaEI7QUFFQU4sQ0FBQyxDQUFDSyxRQUFELENBQUQsQ0FBWUUsS0FBWixDQUFrQixZQUFZO0FBQzFCUCxHQUFDLENBQUNRLEdBQUYsQ0FBTSxvQ0FBTixFQUE0QyxVQUFTQyxJQUFULEVBQWU7QUFDdkQ7QUFD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QSxpRyIsImZpbGUiOiJsZWFmbGV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwicmVxdWlyZSgnLi4vY3NzL2xlYWZsZXQuY3NzJyk7XHJcblxyXG5sZXQgTD1yZXF1aXJlKCdsZWFmbGV0Jyk7XHJcbmxldCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5sZXQgd2luZXJpZXMgPSBbXTtcclxubGV0IHdpbmVyeSA9IHt9O1xyXG5sZXQgbWFya2VyO1xyXG5sZXQgc2VhcmNoRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIilcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICQuZ2V0KFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS93aW5lcmllc1wiLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IG9iai5uYW1lO1xyXG4gICAgICAgICAgICBsZXQgbGF0ID0gb2JqLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICBsZXQgbG9uZyA9IG9iai5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIGxldCB3aW5lcnkgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBvYmoubmFtZSxcclxuICAgICAgICAgICAgICAgIGxhdDogb2JqLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgbG9uZzogb2JqLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB3aW5lcmllcy5wdXNoKHdpbmVyeSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJIRVJFIElTIFRIRSBsYXQgXCIgKyBsYXQpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiSEVSRSBJUyBUSEUgbG9uZyBcIiArIGxvbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbXltYXAgPSBMLm1hcCgnbWFwaWQnKS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgNik7XHJcbiAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgICAgICB9KS5hZGRUbyhteW1hcCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHdpbmVyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKFt3aW5lcmllc1tpXS5sYXQsIHdpbmVyaWVzW2ldLmxvbmddKS5hZGRUbyhteW1hcCk7XHJcbiAgICAgICAgICAgIC8vbWFya2VyLmJpbmRQb3B1cChcIjxhIGhyZWY9Jy9pbmZvX3dpbmVyeSc+PGI+RG9tYWluZTwvYj48YnI+XCIgKyB3aW5lcmllc1tpXS5uYW1lICsgXCI8L2E+XCIpLm9wZW5Qb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbi8vIGxldCBteW1hcCA9IEwubWFwKCdtYXBpZCcpLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCA2KTtcclxuLy8gTC50aWxlTGF5ZXIoJ2h0dHBzOi8vbWFwcy5oZWlnaXQub3JnL29wZW5tYXBzdXJmZXIvdGlsZXMvcm9hZHMvd2VibWVyY2F0b3Ive3p9L3t4fS97eX0ucG5nJywge1xyXG4vLyAgICAgbWF4Wm9vbTogMTksXHJcbi8vICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4vLyB9KS5hZGRUbyhteW1hcCk7XHJcbi8vICAgICB2YXIgc2VhcmNoT3B0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hPcHRcIik7XHJcblxyXG4gICAgLy8gc2VhcmNoT3B0LmFkZEV2ZW50TGlzdGVuZXIoXCJob3ZlclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgc2VhcmNoRGl2LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgLy8gfSk7XHJcbiAgICAvL1xyXG4gICAgLy8gc2VhcmNoT3B0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgc2VhcmNoRGl2LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLy8gc2VhcmNoT3B0LmhvdmVyKGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgc2VhcmNoRGl2LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xyXG4gICAgLy8gfSwgZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgbGV0IGRyb3BEd25Db250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcm9wZG93bi1jb250ZW50XCIpO1xyXG5cclxuICAgIHNlYXJjaE9wdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlYXJjaERpdi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICBzZWFyY2hPcHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGRyb3BEd25Db250ZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBmaWx0ZXJCdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsdGVyQnRcIik7XHJcblxyXG4gICAgZmlsdGVyQnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkcm9wRHduQ29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgfSlcclxuXHJcbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TVFVGRlMgVE8gRklMVEVSIFNFQVJDSCBPTiBNQVAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIGxldCBzZWFyY2hCdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoQnRcIik7IC8vbGUgYm91dHRvbiByZWNoZXJjaGVyXHJcbiAgICBsZXQgc2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hRdWVyeVwiKTsgLy9jZSBxdSdhIGVjcml0IGwndXRpbGlzYXRldXIgZGFucyBsYSBiYXJyZSBkZSByZWNoZXJjaGVcclxuICAgIGxldCByYWRpb09wdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdzZWFyY2hPcHRpb24nKTsgLy9sZSByYWRpbyBidCBjaG9zZW4gYnkgdXNlciB0byBmaWx0ZXIgYnlcclxuICAgIC8vbGV0IHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3VsdFwiKTsvLyB0aGlzIGlzIGp1c3QgYSB0ZXN0XHJcblxyXG4gICAgc2VhcmNoQnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByYWRpb09wdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihyYWRpb09wdFtpXS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAvL3AuaW5uZXJIVE1MID0gc2VhcmNoLnZhbHVlICsgcmFkaW9PcHRbaV0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvd2luZXJpZXNcIiwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcIkFwcGVsbGF0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gb2JqLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbGF0ID0gb2JqLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGxvbmcgPSBvYmoubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHdpbmVyeSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBuYW1lOiBvYmoubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBsYXQ6IG9iai5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBsb25nOiBvYmoubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcIkNvdWxldXJcIikge31cclxuICAgICAgICAgICAgICAgICAgICBpZihyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJSw6lnaW9uXCIpIHt9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiQ8OpcGFnZVwiKSB7fVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtYXJrZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICBtYXAub24oJ2RyYXc6Y3JlYXRlZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAvLyAgICAgICAgIHZhciB0eXBlID0gZS5sYXllclR5cGUsXHJcbiAgICAvLyAgICAgICAgICAgICBsYXllciA9IGUubGF5ZXI7XHJcbiAgICAvLyAgICAgICAgIG1hcC5hZGRMYXllcihsYXllcik7XHJcbiAgICAvLyAgICAgICAgIGlmICh0eXBlID09PSAnbWFya2VyJykge1xyXG4gICAgLy8gICAgICAgICAgICAgbGF5ZXIuYmluZFBvcHVwKCdMYXRMbmc6ICcgKyBsYXllci5nZXRMYXRMbmcoKSkub3BlblBvcHVwKCk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICAvL21hcmtlci5iaW5kUG9wdXAoXCI8YSBocmVmPScvaW5mb193aW5lcnknPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgd2luZXJpZXNbaV0ubmFtZSArIFwiPC9hPlwiKS5vcGVuUG9wdXAoKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8qZm9yKGxldCBpPTA7IGk8d2luZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhFUkUgSVMgVEhFIG5hbWUgXCIgKyB3aW5lcmllc1tpXS5uYW1lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhFUkUgSVMgVEhFIGxhdCBcIiArIHdpbmVyaWVzW2ldLmxhdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIRVJFIElTIFRIRSBsb25nIFwiICsgd2luZXJpZXNbaV0ubG9uZyk7XHJcbiAgICB9XHJcbiAgICBsZXQgbXltYXAgPSBMLm1hcCgnbWFwaWQnKS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgNik7XHJcbiAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgIH0pLmFkZFRvKG15bWFwKTsqL1xyXG4gICAgLy92YXIgbWFya2VyID0gTC5tYXJrZXIod2luZXJpZXNbMF0ubGF0aXR1ZGUsIHdpbmVyaWVzWzBdLmxvbmdpdHVkZSkuYWRkVG8obXltYXApO1xyXG4gICAgLy9tYXJrZXIuYmluZFBvcHVwKFwiPGEgaHJlZj0nL2luZm9fd2luZXJ5Jz48Yj5Eb21haW5lPC9iPjxicj5cIiArIHdpbmVyaWVzWzBdLm5hbWUgKyBcIjwvYT5cIikub3BlblBvcHVwKCk7XHJcbiAgICAvKmZvcihsZXQgaT0wOyBpPHdpbmVyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJTiBGT1IgTE9PUCBGT1IgTUFSS0VSU1wiKTtcclxuICAgICAgICB2YXIgbWFya2VyID0gTC5tYXJrZXIod2luZXJpZXNbaV0ubGF0aXR1ZGUsIHdpbmVyaWVzW2ldLmxvbmdpdHVkZSkuYWRkVG8obXltYXApO1xyXG4gICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSBocmVmPScvaW5mb193aW5lcnknPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgd2luZXJpZXNbaV0ubmFtZSArIFwiPC9hPlwiKS5vcGVuUG9wdXAoKTtcclxuICAgIH0qL1xyXG59KTtcclxuXHJcblxyXG4vLyBsZXQgbXltYXAgPSBMLm1hcCgnbWFwaWQnKS5zZXRWaWV3KFs1MS41MDUsIC0wLjA5XSwgMTMpO1xyXG4vL1xyXG4vLyBMLnRpbGVMYXllcignaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC97aWR9L3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49e2FjY2Vzc1Rva2VufScsIHtcclxuLy8gICAgIGF0dHJpYnV0aW9uOiAnTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9cIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMsIDxhIGhyZWY9XCJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMi4wL1wiPkNDLUJZLVNBPC9hPiwgSW1hZ2VyeSDCqSA8YSBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9cIj5NYXBib3g8L2E+JyxcclxuLy8gICAgIG1heFpvb206IDE4LFxyXG4vLyAgICAgaWQ6ICdtYXBib3guc3RyZWV0cycsXHJcbi8vICAgICBhY2Nlc3NUb2tlbjogJ3lvdXIubWFwYm94LmFjY2Vzcy50b2tlbidcclxuLy8gfSkuYWRkVG8obXltYXApO1xyXG5cclxuLy9sZXQgbXltYXAgPSBMLm1hcCgnbWFwaWQnKS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgOCk7XHJcbi8vbGV0IG15bWFwID0gTC5tYXAoJ21hcGlkJykuc2V0VmlldyhbTEFUSVRVREUsIExPTkdJVFVERV0sIFpPT00gTEVWRUwpO1xyXG4vL1pPT00gTEVWRUwgcGx1cyBpbCBlc3QgcGV0aXQgbW9pbnMgbGEgbWFwIGVzdCB6b29tZWUsIGV0IHBsdXMgaWwgZXN0IGdyYW5kIHBsdXMgbGEgbWFwIGVzdCB6b29tZWVcclxuXHJcbi8qTC50aWxlTGF5ZXIoJ2h0dHBzOi8vYXBpLm1hcHRpbGVyLmNvbS9tYXBzL3N0cmVldHMve3p9L3t4fS97eX0ucG5nP2tleT1iamxlcldzY252bHo4cWlCaXpGVycsIHtcclxuICAgIGF0dHJpYnV0aW9uOiAnPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcHRpbGVyLmNvbS9jb3B5cmlnaHQvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+wqkgTWFwVGlsZXI8L2E+IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIiB0YXJnZXQ9XCJfYmxhbmtcIj7CqSBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9yczwvYT4nXHJcbn0pLmFkZFRvKG15bWFwKTsqL1xyXG5cclxuLypMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICBtYXhab29tOiAxOSxcclxuICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbn0pLmFkZFRvKG15bWFwKTsqL1xyXG5cclxuLy92YXIgbWFya2VyMSA9IEwubWFya2VyKGRvbWFpbmUxKS5hZGRUbyhteW1hcCk7XHJcbi8vbWFya2VyMS5iaW5kUG9wdXAoXCI8YSBocmVmPScvaW5mb193aW5lcnknPjxiPkRvbWFpbmU8L2I+PGJyPkNow6J0ZWF1IExlIEJvc3EuPC9hPlwiKS5vcGVuUG9wdXAoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==