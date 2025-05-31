import "./styles.css";

import "./scripts/dom/DOMFlexboard";
import { DOMSerializer } from "./scripts/dom/DOMSerializer";
import { DOMBanner } from "./scripts/dom/DOMBanner";

import defaultInit from "./data/defaultInit.json"
import safeData from "./data/safeData.json"

setTimeout(()=>{

    document.querySelectorAll('.loading').forEach((elem) =>
    {
        elem.classList.remove("loading");     
    });
        
}, 0);



const Initialise = function () {


    //DOMSerializer.ClearData();
    DOMSerializer.Load(safeData);
}


window.Serialize = DOMSerializer.SerializeToJSON;




Initialise();