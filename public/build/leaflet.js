(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["leaflet"],{

/***/ "./assets/css/map.css":
/*!****************************!*\
  !*** ./assets/css/map.css ***!
  \****************************/
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

__webpack_require__(/*! ../css/map.css */ "./assets/css/map.css");

var LL = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");

var domaine1 = [45.2625, -0.7724];
var test = [45.773311, 4.886934];
var mymap = L.map('mapid').setView(test, 6); //let mymap = L.map('mapid').setView([LATITUDE, LONGITUDE], ZOOM LEVEL);
//ZOOM LEVEL plus il est petit moins la map est zommee, et plus il est grand plus la map est zoomee

/*L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=bjlerWscnvlz8qiBizFW', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
}).addTo(mymap);*/

L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
var marker1 = L.marker(test).addTo(mymap);
marker1.bindPopup("<a href='/info_winery'><b>Domaine</b><br>Château Le Bosq.</a>").openPopup(); //code after here are just tests to see if I can get coordinates from mapquest geocoding api

var xmlhttp = new XMLHttpRequest(); //just need to change what is after the location= with all the addresses of the Wineries to get the coordinates
// need to get all the addresses from the DB
// then we can store the each pair of coordinates at a JS object and store all the objects in a table
// then loop to create markers

var url = "http://www.mapquestapi.com/geocoding/v1/address?key=y0TITKwvxumckEPFoEJrVoPCccjlBwyl&location=Villeurbanne";

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    var myobj1 = myObj.results;
    var myobj2 = myobj1[0];
    var obj3 = myobj2.locations;
    var objArr = obj3[0];
    var obj4 = objArr.latLng;
    var lat = obj4.lat;
    var _long = obj4.lng;
    console.log("HERE IS THE lat " + JSON.stringify(lat));
    console.log("HERE IS THE long " + JSON.stringify(_long));
    document.getElementById("latitude").innerHTML = lat;
    document.getElementById("longitude").innerHTML = _long;
  }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

/***/ })

},[["./assets/js/leaflet.js","runtime","vendors~leaflet"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL21hcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2xlYWZsZXQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIkxMIiwiZG9tYWluZTEiLCJ0ZXN0IiwibXltYXAiLCJMIiwibWFwIiwic2V0VmlldyIsInRpbGVMYXllciIsIm1heFpvb20iLCJhdHRyaWJ1dGlvbiIsImFkZFRvIiwibWFya2VyMSIsIm1hcmtlciIsImJpbmRQb3B1cCIsIm9wZW5Qb3B1cCIsInhtbGh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsInVybCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJteU9iaiIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIm15b2JqMSIsInJlc3VsdHMiLCJteW9iajIiLCJvYmozIiwibG9jYXRpb25zIiwib2JqQXJyIiwib2JqNCIsImxhdExuZyIsImxhdCIsImxvbmciLCJsbmciLCJjb25zb2xlIiwibG9nIiwic3RyaW5naWZ5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsIm9wZW4iLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1Qzs7Ozs7Ozs7Ozs7OztBQ0FBQSxtQkFBTyxDQUFDLDRDQUFELENBQVA7O0FBQ0EsSUFBSUMsRUFBRSxHQUFDRCxtQkFBTyxDQUFDLDJEQUFELENBQWQ7O0FBRUEsSUFBSUUsUUFBUSxHQUFHLENBQUMsT0FBRCxFQUFVLENBQUMsTUFBWCxDQUFmO0FBQ0EsSUFBSUMsSUFBSSxHQUFHLENBQUMsU0FBRCxFQUFZLFFBQVosQ0FBWDtBQUVBLElBQUlDLEtBQUssR0FBR0MsQ0FBQyxDQUFDQyxHQUFGLENBQU0sT0FBTixFQUFlQyxPQUFmLENBQXVCSixJQUF2QixFQUE2QixDQUE3QixDQUFaLEMsQ0FDQTtBQUNBOztBQUVBOzs7O0FBSUFFLENBQUMsQ0FBQ0csU0FBRixDQUFZLCtFQUFaLEVBQTZGO0FBQ3pGQyxTQUFPLEVBQUUsRUFEZ0Y7QUFFekZDLGFBQVcsRUFBRTtBQUY0RSxDQUE3RixFQUdHQyxLQUhILENBR1NQLEtBSFQ7QUFLQSxJQUFJUSxPQUFPLEdBQUdQLENBQUMsQ0FBQ1EsTUFBRixDQUFTVixJQUFULEVBQWVRLEtBQWYsQ0FBcUJQLEtBQXJCLENBQWQ7QUFDQVEsT0FBTyxDQUFDRSxTQUFSLENBQWtCLCtEQUFsQixFQUFtRkMsU0FBbkYsRyxDQUVBOztBQUVBLElBQUlDLE9BQU8sR0FBRyxJQUFJQyxjQUFKLEVBQWQsQyxDQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlDLEdBQUcsR0FBRyw0R0FBVjs7QUFFQUYsT0FBTyxDQUFDRyxrQkFBUixHQUE2QixZQUFXO0FBQ3BDLE1BQUksS0FBS0MsVUFBTCxJQUFtQixDQUFuQixJQUF3QixLQUFLQyxNQUFMLElBQWUsR0FBM0MsRUFBZ0Q7QUFDNUMsUUFBSUMsS0FBSyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLQyxZQUFoQixDQUFaO0FBQ0EsUUFBSUMsTUFBTSxHQUFHSixLQUFLLENBQUNLLE9BQW5CO0FBQ0EsUUFBSUMsTUFBTSxHQUFHRixNQUFNLENBQUMsQ0FBRCxDQUFuQjtBQUNBLFFBQUlHLElBQUksR0FBR0QsTUFBTSxDQUFDRSxTQUFsQjtBQUNBLFFBQUlDLE1BQU0sR0FBR0YsSUFBSSxDQUFDLENBQUQsQ0FBakI7QUFDQSxRQUFJRyxJQUFJLEdBQUdELE1BQU0sQ0FBQ0UsTUFBbEI7QUFDQSxRQUFJQyxHQUFHLEdBQUdGLElBQUksQ0FBQ0UsR0FBZjtBQUNBLFFBQUlDLEtBQUksR0FBR0gsSUFBSSxDQUFDSSxHQUFoQjtBQUNBQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBcUJmLElBQUksQ0FBQ2dCLFNBQUwsQ0FBZUwsR0FBZixDQUFqQztBQUNBRyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBc0JmLElBQUksQ0FBQ2dCLFNBQUwsQ0FBZUosS0FBZixDQUFsQztBQUNBSyxZQUFRLENBQUNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NDLFNBQXBDLEdBQWdEUixHQUFoRDtBQUNBTSxZQUFRLENBQUNDLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNDLFNBQXJDLEdBQWlEUCxLQUFqRDtBQUNIO0FBQ0osQ0FmRDs7QUFnQkFuQixPQUFPLENBQUMyQixJQUFSLENBQWEsS0FBYixFQUFvQnpCLEdBQXBCLEVBQXlCLElBQXpCO0FBQ0FGLE9BQU8sQ0FBQzRCLElBQVIsRyIsImZpbGUiOiJsZWFmbGV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwicmVxdWlyZSgnLi4vY3NzL21hcC5jc3MnKTtcclxubGV0IExMPXJlcXVpcmUoJ2xlYWZsZXQnKTtcclxuXHJcbnZhciBkb21haW5lMSA9IFs0NS4yNjI1LCAtMC43NzI0XTtcclxudmFyIHRlc3QgPSBbNDUuNzczMzExLCA0Ljg4NjkzNF07XHJcblxyXG5sZXQgbXltYXAgPSBMLm1hcCgnbWFwaWQnKS5zZXRWaWV3KHRlc3QsIDYpO1xyXG4vL2xldCBteW1hcCA9IEwubWFwKCdtYXBpZCcpLnNldFZpZXcoW0xBVElUVURFLCBMT05HSVRVREVdLCBaT09NIExFVkVMKTtcclxuLy9aT09NIExFVkVMIHBsdXMgaWwgZXN0IHBldGl0IG1vaW5zIGxhIG1hcCBlc3Qgem9tbWVlLCBldCBwbHVzIGlsIGVzdCBncmFuZCBwbHVzIGxhIG1hcCBlc3Qgem9vbWVlXHJcblxyXG4vKkwudGlsZUxheWVyKCdodHRwczovL2FwaS5tYXB0aWxlci5jb20vbWFwcy9zdHJlZXRzL3t6fS97eH0ve3l9LnBuZz9rZXk9YmpsZXJXc2Nudmx6OHFpQml6RlcnLCB7XHJcbiAgICBhdHRyaWJ1dGlvbjogJzxhIGhyZWY9XCJodHRwczovL3d3dy5tYXB0aWxlci5jb20vY29weXJpZ2h0L1wiIHRhcmdldD1cIl9ibGFua1wiPsKpIE1hcFRpbGVyPC9hPiA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCIgdGFyZ2V0PVwiX2JsYW5rXCI+wqkgT3BlblN0cmVldE1hcCBjb250cmlidXRvcnM8L2E+J1xyXG59KS5hZGRUbyhteW1hcCk7Ki9cclxuXHJcbkwudGlsZUxheWVyKCdodHRwczovL21hcHMuaGVpZ2l0Lm9yZy9vcGVubWFwc3VyZmVyL3RpbGVzL3JvYWRzL3dlYm1lcmNhdG9yL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgIG1heFpvb206IDE5LFxyXG4gICAgYXR0cmlidXRpb246ICdJbWFnZXJ5IGZyb20gPGEgaHJlZj1cImh0dHA6Ly9naXNjaWVuY2UudW5pLWhkLmRlL1wiPkdJU2NpZW5jZSBSZXNlYXJjaCBHcm91cCBAIFVuaXZlcnNpdHkgb2YgSGVpZGVsYmVyZzwvYT4gfCBNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcclxufSkuYWRkVG8obXltYXApO1xyXG5cclxudmFyIG1hcmtlcjEgPSBMLm1hcmtlcih0ZXN0KS5hZGRUbyhteW1hcCk7XHJcbm1hcmtlcjEuYmluZFBvcHVwKFwiPGEgaHJlZj0nL2luZm9fd2luZXJ5Jz48Yj5Eb21haW5lPC9iPjxicj5DaMOidGVhdSBMZSBCb3NxLjwvYT5cIikub3BlblBvcHVwKCk7XHJcblxyXG4vL2NvZGUgYWZ0ZXIgaGVyZSBhcmUganVzdCB0ZXN0cyB0byBzZWUgaWYgSSBjYW4gZ2V0IGNvb3JkaW5hdGVzIGZyb20gbWFwcXVlc3QgZ2VvY29kaW5nIGFwaVxyXG5cclxudmFyIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuLy9qdXN0IG5lZWQgdG8gY2hhbmdlIHdoYXQgaXMgYWZ0ZXIgdGhlIGxvY2F0aW9uPSB3aXRoIGFsbCB0aGUgYWRkcmVzc2VzIG9mIHRoZSBXaW5lcmllcyB0byBnZXQgdGhlIGNvb3JkaW5hdGVzXHJcbi8vIG5lZWQgdG8gZ2V0IGFsbCB0aGUgYWRkcmVzc2VzIGZyb20gdGhlIERCXHJcbi8vIHRoZW4gd2UgY2FuIHN0b3JlIHRoZSBlYWNoIHBhaXIgb2YgY29vcmRpbmF0ZXMgYXQgYSBKUyBvYmplY3QgYW5kIHN0b3JlIGFsbCB0aGUgb2JqZWN0cyBpbiBhIHRhYmxlXHJcbi8vIHRoZW4gbG9vcCB0byBjcmVhdGUgbWFya2Vyc1xyXG52YXIgdXJsID0gXCJodHRwOi8vd3d3Lm1hcHF1ZXN0YXBpLmNvbS9nZW9jb2RpbmcvdjEvYWRkcmVzcz9rZXk9eTBUSVRLd3Z4dW1ja0VQRm9FSnJWb1BDY2NqbEJ3eWwmbG9jYXRpb249VmlsbGV1cmJhbm5lXCI7XHJcblxyXG54bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgIHZhciBteU9iaiA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIHZhciBteW9iajEgPSBteU9iai5yZXN1bHRzO1xyXG4gICAgICAgIHZhciBteW9iajIgPSBteW9iajFbMF07XHJcbiAgICAgICAgdmFyIG9iajMgPSBteW9iajIubG9jYXRpb25zO1xyXG4gICAgICAgIHZhciBvYmpBcnIgPSBvYmozWzBdO1xyXG4gICAgICAgIHZhciBvYmo0ID0gb2JqQXJyLmxhdExuZztcclxuICAgICAgICB2YXIgbGF0ID0gb2JqNC5sYXQ7XHJcbiAgICAgICAgdmFyIGxvbmcgPSBvYmo0LmxuZztcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhFUkUgSVMgVEhFIGxhdCBcIiArIEpTT04uc3RyaW5naWZ5KGxhdCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSEVSRSBJUyBUSEUgbG9uZyBcIiArIEpTT04uc3RyaW5naWZ5KGxvbmcpKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhdGl0dWRlXCIpLmlubmVySFRNTCA9IGxhdDtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvbmdpdHVkZVwiKS5pbm5lckhUTUwgPSBsb25nO1xyXG4gICAgfVxyXG59XHJcbnhtbGh0dHAub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xyXG54bWxodHRwLnNlbmQoKTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=