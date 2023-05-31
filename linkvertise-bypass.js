// ==UserScript==
// @name         Redirect Links
// @namespace    https://example.com
// @version      1.0
// @description  Redirect specific links to kiwis destinations
// @match        https://linkvertise.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Redirect the first link
    if (window.location.href === "https://linkvertise.com/17242/Key1/1") {
        window.location.href = "https://kiwiexploits.com/Key2";
    }

    // Redirect the second link
    if (window.location.href === "https://linkvertise.com/17242/Key2/1") {
        window.location.href = "https://kiwiexploits.com/KeySystems/index.php";
    }
})();
