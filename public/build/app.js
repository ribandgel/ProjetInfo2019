(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "./assets/css/app.scss":
/*!*****************************!*\
  !*** ./assets/css/app.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
var title = document.title;

if (title == "Accueil") {
  document.getElementById("nav-home").setAttribute("class", "active");
} else if (title == "À Propos") {
  document.getElementById("nav-info").setAttribute("class", "active");
} else if (title == "Contact") {
  document.getElementById("nav-contact").setAttribute("class", "active");
} else if (title == "Log in") {
  document.getElementById("nav-login").setAttribute("class", "active");
} // any CSS you require will output into a single css file (app.scss in this case)


__webpack_require__(/*! ../css/app.scss */ "./assets/css/app.scss");

 // Need jQuery? Install it with "yarn add jquery", then uncomment to require it.

var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"); //


console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

/***/ })

},[["./assets/js/app.js","runtime","vendors~app"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hcHAuanMiXSwibmFtZXMiOlsidGl0bGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2V0QXR0cmlidXRlIiwicmVxdWlyZSIsIiQiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1Qzs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7Ozs7OztBQU9BLElBQUlBLEtBQUssR0FBR0MsUUFBUSxDQUFDRCxLQUFyQjs7QUFDQSxJQUFHQSxLQUFLLElBQUksU0FBWixFQUF1QjtBQUN0QkMsVUFBUSxDQUFDQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DQyxZQUFwQyxDQUFpRCxPQUFqRCxFQUEwRCxRQUExRDtBQUNBLENBRkQsTUFFTyxJQUFJSCxLQUFLLElBQUksVUFBYixFQUF5QjtBQUMvQkMsVUFBUSxDQUFDQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DQyxZQUFwQyxDQUFpRCxPQUFqRCxFQUEwRCxRQUExRDtBQUNBLENBRk0sTUFFQSxJQUFJSCxLQUFLLElBQUksU0FBYixFQUF3QjtBQUM5QkMsVUFBUSxDQUFDQyxjQUFULENBQXdCLGFBQXhCLEVBQXVDQyxZQUF2QyxDQUFvRCxPQUFwRCxFQUE2RCxRQUE3RDtBQUNBLENBRk0sTUFFQSxJQUFJSCxLQUFLLElBQUksUUFBYixFQUF1QjtBQUM3QkMsVUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDQyxZQUFyQyxDQUFrRCxPQUFsRCxFQUEyRCxRQUEzRDtBQUNBLEMsQ0FFRDs7O0FBQ0FDLG1CQUFPLENBQUMsOENBQUQsQ0FBUDs7Q0FHQTs7QUFDQSxJQUFNQyxDQUFDLEdBQUdELG1CQUFPLENBQUMsb0RBQUQsQ0FBakIsQyxDQUNBOzs7QUFDQUUsT0FBTyxDQUFDQyxHQUFSLENBQVksbURBQVosRSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvKlxyXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXHJcbiAqXHJcbiAqIFdlIHJlY29tbWVuZCBpbmNsdWRpbmcgdGhlIGJ1aWx0IHZlcnNpb24gb2YgdGhpcyBKYXZhU2NyaXB0IGZpbGVcclxuICogKGFuZCBpdHMgQ1NTIGZpbGUpIGluIHlvdXIgYmFzZSBsYXlvdXQgKGJhc2UuaHRtbC50d2lnKS5cclxuICovXHJcblxyXG5sZXQgdGl0bGUgPSBkb2N1bWVudC50aXRsZTtcclxuaWYodGl0bGUgPT0gXCJBY2N1ZWlsXCIpIHtcclxuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LWhvbWVcIikuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XHJcbn0gZWxzZSBpZiAodGl0bGUgPT0gXCLDgCBQcm9wb3NcIikge1xyXG4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtaW5mb1wiKS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcclxufSBlbHNlIGlmICh0aXRsZSA9PSBcIkNvbnRhY3RcIikge1xyXG4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtY29udGFjdFwiKS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcclxufSBlbHNlIGlmICh0aXRsZSA9PSBcIkxvZyBpblwiKSB7XHJcbiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1sb2dpblwiKS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcclxufVxyXG5cclxuLy8gYW55IENTUyB5b3UgcmVxdWlyZSB3aWxsIG91dHB1dCBpbnRvIGEgc2luZ2xlIGNzcyBmaWxlIChhcHAuc2NzcyBpbiB0aGlzIGNhc2UpXHJcbnJlcXVpcmUoJy4uL2Nzcy9hcHAuc2NzcycpO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcCc7XHJcblxyXG4vLyBOZWVkIGpRdWVyeT8gSW5zdGFsbCBpdCB3aXRoIFwieWFybiBhZGQganF1ZXJ5XCIsIHRoZW4gdW5jb21tZW50IHRvIHJlcXVpcmUgaXQuXHJcbmNvbnN0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuLy9cclxuY29uc29sZS5sb2coJ0hlbGxvIFdlYnBhY2sgRW5jb3JlISBFZGl0IG1lIGluIGFzc2V0cy9qcy9hcHAuanMnKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==