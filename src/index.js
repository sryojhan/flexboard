import "./styles.css";

import {Board} from "./scripts/models/board"
import {Card} from "./scripts/models/card"
import {Column} from "./scripts/models/column"



import {DOMboard} from "./scripts/dom/DOMboard"


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






window.create = createEmptyBoard;
