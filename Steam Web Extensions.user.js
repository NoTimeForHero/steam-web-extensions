// ==UserScript==
// @name         Steam Web Extensions
// @namespace    http://github.com/notimeforhero/
// @version      0.1
// @description  Some useful extensions for Steam
// @author       You
// @match        https://steamcommunity.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steamcommunity.com
// @require      http://127.0.0.1:8080/assets/index.js
// @resource     IMPORTED_CSS http://127.0.0.1:8080/assets/index.css
// @grant      GM_getResourceText
// @grant      GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);
    // Your code here...
})();