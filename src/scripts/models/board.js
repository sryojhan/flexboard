import { Serializer } from "./Serializer";



const Board = (function(){


    const boardDataName = 'flexboard: board-data'

    let boards = [];
    let currentBoard = 0;

    const defaultBoardNames = ["my AWESOME board", "mildly interesting board", "EPIC MICKEY 2 baby"]
    
    
    const GetRandomBoardName = function(){

        const idx = Math.floor(Math.random() * defaultBoardNames.length);

        return defaultBoardNames[idx];
    }


    const SaveBoardData = function(){

        Serializer.SaveJSON(boardDataName, {currentBoard, boards});
    }


    const LoadBoardData = function(){

        const data = Serializer.LoadJSON(boardDataName);

        if(data === null)
        {
            boards = [GetRandomBoardName()];
            SaveBoardData();
        }
        else
        (
            {currentBoard, boards} = data
        );
    }


    const GetCurrentBoard = function(){

        return boards[currentBoard];
    }


    return {LoadBoardData, SaveBoardData, GetCurrentBoard, boards}

}());


export {Board}