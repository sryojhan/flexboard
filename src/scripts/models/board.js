import { Serializer } from "./Serializer";



const Board = (function(){


    const boardDataName = 'flexboard: board-data'

    let boards = ["storage", "Programmming", "Music"];
    let currentBoard = 0;


    const SaveBoardData = function(){

        Serializer.SaveJSON(boardDataName, {currentBoard, boards});
    }


    const LoadBoardData = function(){

        (
            {currentBoard, boards} = Serializer.LoadJSON(boardDataName)
        );
    }


    const GetCurrentBoard = function(){

        return boards[currentBoard];
    }


    return {LoadBoardData, SaveBoardData, GetCurrentBoard}

}());


export {Board}