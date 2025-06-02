
import { Board } from "../models/board";
import { Card } from "../models/card";
import { Column } from "../models/column";
import {DOMColumn} from "./DOMColumn"
import { Serializer } from "../models/Serializer";
import { DOMCard } from "./DOMCard";


const DOMBoard = (function(){

    const defaultBoardNames = ["my AWESOME board", "mildly interesting board", "EPIC MICKEY 2 baby"]
    
    
    const GetRandomBoardName = function(){

        const idx = Math.floor(Math.random() * defaultBoardNames.length);

        return defaultBoardNames[idx];
    }


    const GetCurrentBoardName = function(){

        return currentBoard;
    }

    const LoadBoard = function(boardName){

        const boardNameElement = document.querySelector('#board-name');
        boardNameElement.textContent = boardName;
        

        const boardData = Serializer.LoadJSON(boardName);

        boardData.forEach((columns) =>{

            const colData = DOMColumn.CreateColumnElement(columns.name).data;
            const col = colData.ContentElement();

            columns.cards.forEach((data) => {


                const cardData = DOMCard.CreateCardElement(col, data).data;
                colData.PushCard(cardData);
            });
        });


        //TODO: Update current board in board.js
    }

    
    const CreateJSONFromBoard = function(){

        const cols = Column.columns;
        const data = Array(cols.length);


        cols.forEach((colData, idx) => {

            const name = colData.name;

            const cardsInColumn = colData.cardsInColumn;

            const cards = [];

            for (const card of cardsInColumn) {

                const title = card.title;
                const description = card.description;
                const color = card.color;


                cards.push({ title, description, color })

            }


            data[idx] = { name, cards };
        });

        return data;
    }


    const SaveBoard = function(){

        const data = CreateJSONFromBoard();

        const boardName = Board.GetCurrentBoard();
        Serializer.SaveJSON(boardName, data);
    }


    const ClearCurrentBoard = function(){

        DOMColumn.ClearAllColumns();
        Column.ClearAllColumns();
        Card.ClearAllCards();
    }



    return {GetCurrentBoardName, LoadBoard, SaveBoard, ClearCurrentBoard, CreateJSONFromBoard}
})();


export {DOMBoard};