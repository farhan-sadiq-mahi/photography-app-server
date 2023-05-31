// ==UserScript==
// @name         Kiwi Bypass V2
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Its just changing the html sir
// @match        https://kiwiexploits.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Function to modify the text
    function modifyText() {
        const targetElement = document.querySelector('.mbr-section-title.mbr-fonts-style.align-center.mb-4.display-2');
        if (targetElement) {
            targetElement.innerHTML = '<strong>Bypassed By Foch#2946</strong><div><strong></strong></div>';
            targetElement.classList.add('animate__animated', 'animate__tada');
        }
    }

    // Wait for the page to load and modify the text
    window.addEventListener('load', function() {
        modifyText();
    });

    // Add animate.css for the animation
    GM_addStyle(`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
    `);
})();
