
import { Board } from "../models/board";
import { Card } from "../models/card";
import { Column } from "../models/column";
import {DOMColumn} from "./DOMColumn"
import { Serializer } from "../models/Serializer";
import { DOMCard } from "./DOMCard";
import { DOMBanner } from "./DOMBanner";

const DOMBoard = (function(){

   

    const GetCurrentBoardName = function(){

        return currentBoard;
    }

    const LoadBoard = function(){

        ClearCurrentBoard();

        const board = Board.data.GetCurrentBoard();

        const boardNameElement = document.querySelector('#board-name');
        boardNameElement.textContent = board.name;
        

        const boardData = Serializer.LoadJSON(board.id);

        if(boardData === null){

            DOMBanner.InitialiseBoardSelector();
            return;
        }

        boardData.forEach((columns) =>{

            const colData = DOMColumn.CreateColumnElement(columns.name).data;
            const col = colData.ContentElement();

            columns.cards.forEach((data) => {


                const cardData = DOMCard.CreateCardElement(col, data).data;
                colData.PushCard(cardData);
            });
        });

        DOMBanner.InitialiseBoardSelector();
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

        const board = Board.data.GetCurrentBoard();

        Serializer.SaveJSON(board.id, data);
    }


    const ClearCurrentBoard = function(){

        DOMColumn.ClearAllColumns();
        Column.ClearAllColumns();
        Card.ClearAllCards();
    }

    return {GetCurrentBoardName, LoadBoard, SaveBoard, ClearCurrentBoard, CreateJSONFromBoard}
})();


export {DOMBoard};