(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["leaflet"],{

/***/ "./assets/js/leaflet.js":
/*!******************************!*\
  !*** ./assets/js/leaflet.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");

//require('leaflet');
var L = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");

var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

var wineries = [];
var winery = {};
var marker;
var searchDiv = document.getElementById("search");
$(document).ready(function () {
  $.get("http://127.0.0.1:8000/api/producers", function (data) {
    console.log(data);

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
      wineries.push(_winery);
      console.log("HERE IS THE lat " + lat);
      console.log("HERE IS THE long " + _long);
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

  var searchOpt = document.getElementById("searchOpt"); // searchOpt.addEventListener("hover", function () {
  //     searchDiv.hidden = false;
  // });

  searchOpt.addEventListener("click", function () {
    searchDiv.hidden = false;
  }); // searchOpt.hover(function(){
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
        $.get("http://127.0.0.1:8000/api/wines", function (data) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbGVhZmxldC5qcyJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIiQiLCJ3aW5lcmllcyIsIndpbmVyeSIsIm1hcmtlciIsInNlYXJjaERpdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZWFkeSIsImdldCIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiaSIsImxlbmd0aCIsIm9iaiIsIm5hbWUiLCJsYXQiLCJsYXRpdHVkZSIsImxvbmciLCJsb25naXR1ZGUiLCJwdXNoIiwibXltYXAiLCJtYXAiLCJzZXRWaWV3IiwidGlsZUxheWVyIiwibWF4Wm9vbSIsImF0dHJpYnV0aW9uIiwiYWRkVG8iLCJzZWFyY2hPcHQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGlkZGVuIiwiZHJvcER3bkNvbnRlbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJmaWx0ZXJCdCIsInNlYXJjaEJ0Iiwic2VhcmNoIiwicmFkaW9PcHQiLCJnZXRFbGVtZW50c0J5TmFtZSIsImNoZWNrZWQiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsQ0FBQyxHQUFDQyxtQkFBTyxDQUFDLDJEQUFELENBQWI7O0FBQ0EsSUFBSUMsQ0FBQyxHQUFHRCxtQkFBTyxDQUFDLG9EQUFELENBQWY7O0FBRUEsSUFBSUUsUUFBUSxHQUFHLEVBQWY7QUFDQSxJQUFJQyxNQUFNLEdBQUcsRUFBYjtBQUNBLElBQUlDLE1BQUo7QUFDQSxJQUFJQyxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFoQjtBQUVBTixDQUFDLENBQUNLLFFBQUQsQ0FBRCxDQUFZRSxLQUFaLENBQWtCLFlBQVk7QUFDMUJQLEdBQUMsQ0FBQ1EsR0FBRixDQUFNLHFDQUFOLEVBQTZDLFVBQVNDLElBQVQsRUFBZTtBQUN4REMsV0FBTyxDQUFDQyxHQUFSLENBQVlGLElBQVo7O0FBQ0EsU0FBSSxJQUFJRyxDQUFDLEdBQUMsQ0FB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QWlHMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7O0FBQ0E7Ozs7O0FBS0gsQ0E5SEQsRSxDQWlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7Ozs7QUFLQTtBQUNBLGlHIiwiZmlsZSI6ImxlYWZsZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL3JlcXVpcmUoJ2xlYWZsZXQnKTtcclxubGV0IEw9cmVxdWlyZSgnbGVhZmxldCcpO1xyXG5sZXQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxubGV0IHdpbmVyaWVzID0gW107XHJcbmxldCB3aW5lcnkgPSB7fTtcclxubGV0IG1hcmtlcjtcclxubGV0IHNlYXJjaERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvcHJvZHVjZXJzXCIsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IG9iai5uYW1lO1xyXG4gICAgICAgICAgICBsZXQgbGF0ID0gb2JqLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICBsZXQgbG9uZyA9IG9iai5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIGxldCB3aW5lcnkgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBvYmoubmFtZSxcclxuICAgICAgICAgICAgICAgIGxhdDogb2JqLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgbG9uZzogb2JqLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB3aW5lcmllcy5wdXNoKHdpbmVyeSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSEVSRSBJUyBUSEUgbGF0IFwiICsgbGF0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIRVJFIElTIFRIRSBsb25nIFwiICsgbG9uZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBteW1hcCA9IEwubWFwKCdtYXBpZCcpLnNldFZpZXcoWzQ2LjIyNzYzOCwgMi4yMTM3NDldLCA2KTtcclxuICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgICAgIG1heFpvb206IDE5LFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ltYWdlcnkgZnJvbSA8YSBocmVmPVwiaHR0cDovL2dpc2NpZW5jZS51bmktaGQuZGUvXCI+R0lTY2llbmNlIFJlc2VhcmNoIEdyb3VwIEAgVW5pdmVyc2l0eSBvZiBIZWlkZWxiZXJnPC9hPiB8IE1hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAgIH0pLmFkZFRvKG15bWFwKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8d2luZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW3dpbmVyaWVzW2ldLmxhdCwgd2luZXJpZXNbaV0ubG9uZ10pLmFkZFRvKG15bWFwKTtcclxuICAgICAgICAgICAgLy9tYXJrZXIuYmluZFBvcHVwKFwiPGEgaHJlZj0nL2luZm9fd2luZXJ5Jz48Yj5Eb21haW5lPC9iPjxicj5cIiArIHdpbmVyaWVzW2ldLm5hbWUgKyBcIjwvYT5cIikub3BlblBvcHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gbGV0IG15bWFwID0gTC5tYXAoJ21hcGlkJykuc2V0VmlldyhbNDYuMjI3NjM4LCAyLjIxMzc0OV0sIDYpO1xyXG4vLyBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbi8vICAgICBtYXhab29tOiAxOSxcclxuLy8gICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbi8vIH0pLmFkZFRvKG15bWFwKTtcclxuICAgICBsZXQgc2VhcmNoT3B0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hPcHRcIik7XHJcblxyXG4gICAgLy8gc2VhcmNoT3B0LmFkZEV2ZW50TGlzdGVuZXIoXCJob3ZlclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgc2VhcmNoRGl2LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgc2VhcmNoT3B0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VhcmNoRGl2LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gc2VhcmNoT3B0LmhvdmVyKGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgc2VhcmNoRGl2LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xyXG4gICAgLy8gfSwgZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICBzZWFyY2hEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgbGV0IGRyb3BEd25Db250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcm9wZG93bi1jb250ZW50XCIpO1xyXG5cclxuICAgIHNlYXJjaE9wdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlYXJjaERpdi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICBzZWFyY2hPcHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGRyb3BEd25Db250ZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBmaWx0ZXJCdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsdGVyQnRcIik7XHJcblxyXG4gICAgZmlsdGVyQnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkcm9wRHduQ29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgfSlcclxuXHJcbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TVFVGRlMgVE8gRklMVEVSIFNFQVJDSCBPTiBNQVAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIGxldCBzZWFyY2hCdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoQnRcIik7IC8vbGUgYm91dHRvbiByZWNoZXJjaGVyXHJcbiAgICBsZXQgc2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hRdWVyeVwiKTsgLy9jZSBxdSdhIGVjcml0IGwndXRpbGlzYXRldXIgZGFucyBsYSBiYXJyZSBkZSByZWNoZXJjaGVcclxuICAgIGxldCByYWRpb09wdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdzZWFyY2hPcHRpb24nKTsgLy9sZSByYWRpbyBidCBjaG9zZW4gYnkgdXNlciB0byBmaWx0ZXIgYnlcclxuICAgIC8vbGV0IHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3VsdFwiKTsvLyB0aGlzIGlzIGp1c3QgYSB0ZXN0XHJcblxyXG4gICAgc2VhcmNoQnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByYWRpb09wdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihyYWRpb09wdFtpXS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAvL3AuaW5uZXJIVE1MID0gc2VhcmNoLnZhbHVlICsgcmFkaW9PcHRbaV0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAkLmdldChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvd2luZXNcIiwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcIkFwcGVsbGF0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gb2JqLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbGF0ID0gb2JqLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGxvbmcgPSBvYmoubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHdpbmVyeSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBuYW1lOiBvYmoubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBsYXQ6IG9iai5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBsb25nOiBvYmoubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhZGlvT3B0W2ldLnZhbHVlID09PSBcIkNvdWxldXJcIikge31cclxuICAgICAgICAgICAgICAgICAgICBpZihyYWRpb09wdFtpXS52YWx1ZSA9PT0gXCJSw6lnaW9uXCIpIHt9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFkaW9PcHRbaV0udmFsdWUgPT09IFwiQ8OpcGFnZVwiKSB7fVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtYXJrZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICBtYXAub24oJ2RyYXc6Y3JlYXRlZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAvLyAgICAgICAgIHZhciB0eXBlID0gZS5sYXllclR5cGUsXHJcbiAgICAvLyAgICAgICAgICAgICBsYXllciA9IGUubGF5ZXI7XHJcbiAgICAvLyAgICAgICAgIG1hcC5hZGRMYXllcihsYXllcik7XHJcbiAgICAvLyAgICAgICAgIGlmICh0eXBlID09PSAnbWFya2VyJykge1xyXG4gICAgLy8gICAgICAgICAgICAgbGF5ZXIuYmluZFBvcHVwKCdMYXRMbmc6ICcgKyBsYXllci5nZXRMYXRMbmcoKSkub3BlblBvcHVwKCk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICAvL21hcmtlci5iaW5kUG9wdXAoXCI8YSBocmVmPScvaW5mb193aW5lcnknPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgd2luZXJpZXNbaV0ubmFtZSArIFwiPC9hPlwiKS5vcGVuUG9wdXAoKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8qZm9yKGxldCBpPTA7IGk8d2luZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhFUkUgSVMgVEhFIG5hbWUgXCIgKyB3aW5lcmllc1tpXS5uYW1lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhFUkUgSVMgVEhFIGxhdCBcIiArIHdpbmVyaWVzW2ldLmxhdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIRVJFIElTIFRIRSBsb25nIFwiICsgd2luZXJpZXNbaV0ubG9uZyk7XHJcbiAgICB9XHJcbiAgICBsZXQgbXltYXAgPSBMLm1hcCgnbWFwaWQnKS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgNik7XHJcbiAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxuICAgIH0pLmFkZFRvKG15bWFwKTsqL1xyXG4gICAgLy92YXIgbWFya2VyID0gTC5tYXJrZXIod2luZXJpZXNbMF0ubGF0aXR1ZGUsIHdpbmVyaWVzWzBdLmxvbmdpdHVkZSkuYWRkVG8obXltYXApO1xyXG4gICAgLy9tYXJrZXIuYmluZFBvcHVwKFwiPGEgaHJlZj0nL2luZm9fd2luZXJ5Jz48Yj5Eb21haW5lPC9iPjxicj5cIiArIHdpbmVyaWVzWzBdLm5hbWUgKyBcIjwvYT5cIikub3BlblBvcHVwKCk7XHJcbiAgICAvKmZvcihsZXQgaT0wOyBpPHdpbmVyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJTiBGT1IgTE9PUCBGT1IgTUFSS0VSU1wiKTtcclxuICAgICAgICB2YXIgbWFya2VyID0gTC5tYXJrZXIod2luZXJpZXNbaV0ubGF0aXR1ZGUsIHdpbmVyaWVzW2ldLmxvbmdpdHVkZSkuYWRkVG8obXltYXApO1xyXG4gICAgICAgIG1hcmtlci5iaW5kUG9wdXAoXCI8YSBocmVmPScvaW5mb193aW5lcnknPjxiPkRvbWFpbmU8L2I+PGJyPlwiICsgd2luZXJpZXNbaV0ubmFtZSArIFwiPC9hPlwiKS5vcGVuUG9wdXAoKTtcclxuICAgIH0qL1xyXG59KTtcclxuXHJcblxyXG4vLyBsZXQgbXltYXAgPSBMLm1hcCgnbWFwaWQnKS5zZXRWaWV3KFs1MS41MDUsIC0wLjA5XSwgMTMpO1xyXG4vL1xyXG4vLyBMLnRpbGVMYXllcignaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC97aWR9L3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49e2FjY2Vzc1Rva2VufScsIHtcclxuLy8gICAgIGF0dHJpYnV0aW9uOiAnTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9cIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMsIDxhIGhyZWY9XCJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMi4wL1wiPkNDLUJZLVNBPC9hPiwgSW1hZ2VyeSDCqSA8YSBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9cIj5NYXBib3g8L2E+JyxcclxuLy8gICAgIG1heFpvb206IDE4LFxyXG4vLyAgICAgaWQ6ICdtYXBib3guc3RyZWV0cycsXHJcbi8vICAgICBhY2Nlc3NUb2tlbjogJ3lvdXIubWFwYm94LmFjY2Vzcy50b2tlbidcclxuLy8gfSkuYWRkVG8obXltYXApO1xyXG5cclxuLy9sZXQgbXltYXAgPSBMLm1hcCgnbWFwaWQnKS5zZXRWaWV3KFs0Ni4yMjc2MzgsIDIuMjEzNzQ5XSwgOCk7XHJcbi8vbGV0IG15bWFwID0gTC5tYXAoJ21hcGlkJykuc2V0VmlldyhbTEFUSVRVREUsIExPTkdJVFVERV0sIFpPT00gTEVWRUwpO1xyXG4vL1pPT00gTEVWRUwgcGx1cyBpbCBlc3QgcGV0aXQgbW9pbnMgbGEgbWFwIGVzdCB6b29tZWUsIGV0IHBsdXMgaWwgZXN0IGdyYW5kIHBsdXMgbGEgbWFwIGVzdCB6b29tZWVcclxuXHJcbi8qTC50aWxlTGF5ZXIoJ2h0dHBzOi8vYXBpLm1hcHRpbGVyLmNvbS9tYXBzL3N0cmVldHMve3p9L3t4fS97eX0ucG5nP2tleT1iamxlcldzY252bHo4cWlCaXpGVycsIHtcclxuICAgIGF0dHJpYnV0aW9uOiAnPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcHRpbGVyLmNvbS9jb3B5cmlnaHQvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+wqkgTWFwVGlsZXI8L2E+IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIiB0YXJnZXQ9XCJfYmxhbmtcIj7CqSBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9yczwvYT4nXHJcbn0pLmFkZFRvKG15bWFwKTsqL1xyXG5cclxuLypMLnRpbGVMYXllcignaHR0cHM6Ly9tYXBzLmhlaWdpdC5vcmcvb3Blbm1hcHN1cmZlci90aWxlcy9yb2Fkcy93ZWJtZXJjYXRvci97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICBtYXhab29tOiAxOSxcclxuICAgIGF0dHJpYnV0aW9uOiAnSW1hZ2VyeSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vZ2lzY2llbmNlLnVuaS1oZC5kZS9cIj5HSVNjaWVuY2UgUmVzZWFyY2ggR3JvdXAgQCBVbml2ZXJzaXR5IG9mIEhlaWRlbGJlcmc8L2E+IHwgTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXHJcbn0pLmFkZFRvKG15bWFwKTsqL1xyXG5cclxuLy92YXIgbWFya2VyMSA9IEwubWFya2VyKGRvbWFpbmUxKS5hZGRUbyhteW1hcCk7XHJcbi8vbWFya2VyMS5iaW5kUG9wdXAoXCI8YSBocmVmPScvaW5mb193aW5lcnknPjxiPkRvbWFpbmU8L2I+PGJyPkNow6J0ZWF1IExlIEJvc3EuPC9hPlwiKS5vcGVuUG9wdXAoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==