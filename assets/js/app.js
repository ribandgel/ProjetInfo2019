/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

let title = document.title;
if(title == "Accueil") {
 document.getElementById("nav-home").setAttribute("class", "active");
} else if (title == "À Propos") {
 document.getElementById("nav-info").setAttribute("class", "active");
} else if (title == "Contact") {
 document.getElementById("nav-contact").setAttribute("class", "active");
} else if (title == "Log in") {
 document.getElementById("nav-login").setAttribute("class", "active");
}

// any CSS you require will output into a single css file (app.scss in this case)
require('../css/app.scss');
import 'bootstrap';

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');
//
//console.log('Hello Webpack Encore! Edit me in assets/js/app.js');
