import "./styles.css";

import {Board} from "./scripts/models/board"
import {Card} from "./scripts/models/card"
import {Column} from "./scripts/models/column"



import {DOMboard} from "./scripts/dom/DOMboard"
import {DOMColumn, InitialiseColumns} from "./scripts/dom/DOMcolumn"
import {DOMCard, InitialiseCards, CardWrapper } from "./scripts/dom/DOMcard";

const data = {

    boards: [],


    addBoard: function(board){


        this.boards.push(board);
    }
}



const createEmptyBoard = function(){


    const board = Board("New board");

    const boardElement = DOMboard('New board');



    data.addBoard(board);
}

let currentlySelected = CardWrapper();

InitialiseCards(currentlySelected);
InitialiseColumns(currentlySelected);


window.create = createEmptyBoard;
