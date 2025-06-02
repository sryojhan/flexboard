import "./styles.css";

import "./scripts/dom/DOMFlexboard";
import { Serializer } from "./scripts/models/Serializer";
import { DOMBanner } from "./scripts/dom/DOMBanner";

import { DOMBoard } from "./scripts/dom/DOMBoard";

import defaultInit from "./data/defaultInit.json"
import safeData from "./data/safeData.json"
import { Board } from "./scripts/models/board";

setTimeout(()=>{

    document.querySelectorAll('.loading').forEach((elem) =>
    {
        elem.classList.remove("loading");     
    });
        
}, 0);



const Initialise = function () {


    //Serializer.ClearData();
    //Serializer.Load(safeData);

    Board.SaveBoardData();
    Board.LoadBoardData();

    DOMBoard.LoadBoard(Board.GetCurrentBoard());
}


window.Serialize = Serializer.SerializeToJSON;

DOMBanner.CreateToast("Pro tip: Close the left banner by double clicking it!");

Initialise();

