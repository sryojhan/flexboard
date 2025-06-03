import "./styles.css";
import "./scripts/dom/DOMFlexboard";

import { DOMBanner } from "./scripts/dom/DOMBanner";
import { DOMBoard } from "./scripts/dom/DOMBoard";
import { Board } from "./scripts/models/board";


setTimeout(()=>{

    document.querySelectorAll('.loading').forEach((elem) =>
    {
        elem.classList.remove("loading");     
    });
        
}, 0);



const Initialise = function () {

    Board.LoadBoardData();
    DOMBoard.LoadBoard();
    
}


DOMBanner.CreateToast("Pro tip: Close the left banner by double clicking it!");

Initialise();

