// ==UserScript==
// @name         Kiwi Bypass
// @namespace    http://tampermonkey.net/
// @icon         https://media.discordapp.net/attachments/1106956575295410228/1113377396066877470/j.jpg
// @version      1.0
// @description  Automatically fills the captcha text, clicks the button, and handles redirects on specific domains.
// @match        https://kiwiexploits.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Delay in milliseconds to wait for the captcha text to update
    const delay = 800;
    const buttonDelay = 900; // Delay in milliseconds before clicking the button

    // Function to fill the captcha text and click the button
    function fillCaptchaAndClickButton() {
        // Get the captcha text from the <h2> element
        const captchaText = document.getElementById('mainCaptcha').textContent;

        // Find the text input field and fill it with the captcha text
        const inputField = document.getElementById('txtInput');
        inputField.value = captchaText;

        // Find the button and click it
        const button = document.getElementById('Button1');
        button.click();
    }

    // Function to handle the redirect
    function handleRedirect() {
        window.location.href = 'https://kiwiexploits.com/KeySystems/start.php';
    }

    // Check if the current page is "https://www.kiwiexploits.com/keysystem" and redirect if necessary
    if (window.location.href === 'https://www.kiwiexploits.com/keysystem') {
        handleRedirect();
    } else {
        // Wait for the captcha text to update, fill it, click the button, and handle redirects
        setTimeout(function() {
            fillCaptchaAndClickButton();
            setTimeout(handleRedirect, buttonDelay);
        }, delay + buttonDelay);
    }
})();
