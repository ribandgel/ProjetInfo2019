(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["leaflet"],{

/***/ "./assets/js/leaflet.js":
/*!******************************!*\
  !*** ./assets/js/leaflet.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var L = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");

var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

$(document).ready(function () {
  $.get($("#data").data('wineries-link'), function (data) {
    console.log(data);
    console.log('gjeghei');
  });
}); // let mymap = L.map('mapid').setView([51.505, -0.09], 13);
//
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'your.mapbox.access.token'
// }).addTo(mymap);

/***/ })

},[["./assets/js/leaflet.js","runtime","vendors~leaflet"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbGVhZmxldC5qcyJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiZ2V0IiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUlBLENBQUMsR0FBQ0MsbUJBQU8sQ0FBQywyREFBRCxDQUFiOztBQUNBLElBQUlDLENBQUMsR0FBR0QsbUJBQU8sQ0FBQyxvREFBRCxDQUFmOztBQUVBQyxDQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQVk7QUFDMUJGLEdBQUMsQ0FBQ0csR0FBRixDQUFNSCxDQUFDLENBQUMsT0FBRCxDQUFELENBQVdJLElBQVgsQ0FBZ0IsZUFBaEIsQ0FBTixFQUF3QyxVQUFTQSxJQUFULEVBQWU7QUFDbkRDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZRixJQUFaO0FBQ0FDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLFNBQVo7QUFDSCxHQUhEO0FBSUgsQ0FMRCxFLENBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQiIsImZpbGUiOiJsZWFmbGV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEw9cmVxdWlyZSgnbGVhZmxldCcpO1xyXG5sZXQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgJC5nZXQoJChcIiNkYXRhXCIpLmRhdGEoJ3dpbmVyaWVzLWxpbmsnKSwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnamVnaGVpJyk7XHJcbiAgICB9KSA7XHJcbn0pO1xyXG5cclxuLy8gbGV0IG15bWFwID0gTC5tYXAoJ21hcGlkJykuc2V0VmlldyhbNTEuNTA1LCAtMC4wOV0sIDEzKTtcclxuLy9cclxuLy8gTC50aWxlTGF5ZXIoJ2h0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQve2lkfS97en0ve3h9L3t5fS5wbmc/YWNjZXNzX3Rva2VuPXthY2Nlc3NUb2tlbn0nLCB7XHJcbi8vICAgICBhdHRyaWJ1dGlvbjogJ01hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvXCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzLCA8YSBocmVmPVwiaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LXNhLzIuMC9cIj5DQy1CWS1TQTwvYT4sIEltYWdlcnkgwqkgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vXCI+TWFwYm94PC9hPicsXHJcbi8vICAgICBtYXhab29tOiAxOCxcclxuLy8gICAgIGlkOiAnbWFwYm94LnN0cmVldHMnLFxyXG4vLyAgICAgYWNjZXNzVG9rZW46ICd5b3VyLm1hcGJveC5hY2Nlc3MudG9rZW4nXHJcbi8vIH0pLmFkZFRvKG15bWFwKTsiXSwic291cmNlUm9vdCI6IiJ9