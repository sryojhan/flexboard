import "./styles.css";

import {Board} from "./scripts/models/board"
import {Card} from "./scripts/models/card"
import {Column} from "./scripts/models/column"



import {DOMBoard} from "./scripts/dom/DOMBoard"
import {DOMColumn, InitialiseColumns} from "./scripts/dom/DOMColumn"
import {DOMCard, InitialiseCards, CardWrapper } from "./scripts/dom/DOMCard";

const data = {

    boards: [],


    addBoard: function(board){


        this.boards.push(board);
    }
}



const createEmptyBoard = function(){


    const board = Board("New board");

    const boardElement = DOMBoard('New board');



    data.addBoard(board);
}

let currentlySelected = CardWrapper();

InitialiseCards(currentlySelected);
InitialiseColumns(currentlySelected);


window.create = createEmptyBoard;
