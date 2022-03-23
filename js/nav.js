"use strict";

import { getURLParam } from "./getUrlParams.js";

const backButton = document.querySelector("#prev-page-btn");
const nextButton = document.querySelector("#next-page-btn");
const pageIndexSpan = document.querySelector("#page-index");

const initNav = () => {
    const currentPage = getURLParam("page") || 1;

    // back button
    if ( currentPage > 1) {
        backButton.classList.remove("disabled")
        backButton.setAttribute("href", `./index.html?page=${currentPage - 1}`)
    } else {
        backButton.classList.add("disabled");
    }  

    // page index 
    pageIndexSpan.textContent = currentPage

    // next button
    nextButton.setAttribute("href", `./index.html?page=${currentPage + 1}`)

}

window.addEventListener("load", initNav);