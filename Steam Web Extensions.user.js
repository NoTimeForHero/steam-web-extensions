// ==UserScript==
// @name         Steam Web Extensions
// @namespace    http://github.com/NoTimeForHero/steam-web-extensions/
// @version      0.0.3
// @description  Some useful extensions for Steam
// @author       You
// @match        https://steamcommunity.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steamcommunity.com
// @require      https://raw.githubusercontent.com/NoTimeForHero/steam-web-extensions/master/dist/index.js?cache=ZnVuY3Rpb24gb
// @resource     IMPORTED_CSS https://raw.githubusercontent.com/NoTimeForHero/steam-web-extensions/master/dist/index.css?cache=ZnVuY3Rpb24gb
// @grant      GM_getResourceText
// @grant      GM_addStyle
// @grant      GM_xmlHTTPRequest
// ==/UserScript==

const gmFetch = (url, method = 'GET') => new Promise((onload, onerror) => GM_xmlhttpRequest ({ url, method, onload, onerror}));
const loadCSS = async(resourceName, fallbackURL) => {
    if (typeof GM_getResourceText === 'function' && typeof GM_addStyle === 'function') {
        console.log('[UserScript->SWE] CSS inserted by GM_addStyle');
        const cssImported = GM_getResourceText(resourceName);
        GM_addStyle(cssImported);
    } else {
        console.log('[UserScript->SWE] CSS inserted by GM_xmlHTTPRequest');
        const response = await gmFetch(fallbackURL);
        const style = document.createElement('style');
        style.textContent = response.response;
        document.head.append(style);
    }
};

(function() {
    loadCSS('IMPORTED_CSS', 'https://raw.githubusercontent.com/NoTimeForHero/steam-web-extensions/master/dist/index.css');
    // Your code here...
})();