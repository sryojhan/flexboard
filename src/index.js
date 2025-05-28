import "./styles.css";

import FlexboardManager from "./scripts/dom/DOMFlexboard";


const leftBanner = document.querySelector('.left-banner');

leftBanner.addEventListener('dblclick', ()=>{

    leftBanner.classList.toggle('hidden');
})
