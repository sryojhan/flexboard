import { Serializer } from "./Serializer";



const Board = (function () {


    const boardDataName = 'flexboard: board-data'

    const data = {

        boards: [],
        currentBoardIdx: -1,

        GetCurrentBoard: function () {

            if (this.currentBoardIdx < 0) {

                return null;
            }


            return this.boards[this.currentBoardIdx];
        },

    };


    const defaultBoardNames = [
        "My AWESOME board",
        "Mildly interesting board",
        "EPIC MICKEY 3",
        "Just another board",
        "Tasks and stuff",
        "Possibly important things",
        "Final final board ",
        "Todo or not todo",
        "Suspicious board",
        "akjhfakjshd",
        "Pending doom board",
        "Please be done soon",
        "Almost serious board",
        "productivity.exe",
        "90% ideas, 10% doing",
        "I can't come up with more random board names",
        "help",
        "✨Waterboarding✨",
    ];


    const GetRandomBoardName = function () {

        const idx = Math.floor(Math.random() * defaultBoardNames.length);

        let str = defaultBoardNames[idx];

        return str;
    }


    const SaveBoardData = function () {

        Serializer.SaveJSON(boardDataName, data);
    }


    const LoadBoardData = function () {

        const serializedData = Serializer.LoadJSON(boardDataName);

        if (serializedData === null) {


            data.currentBoardIdx = 0;
            CreateBoard();
        }
        else {

            data.currentBoardIdx = serializedData.currentBoardIdx;
            data.boards = serializedData.boards;
        }

    }

    const CreateBoard = function () {

        const name = GetRandomBoardName();
        const id = crypto.randomUUID();

        data.boards.push({ name, id });

        SaveBoardData();
    }


    const ChangeBoard = function (id) {


        const newboardIdx = data.boards.findIndex((board) => {

            return board.id === id
        });

        data.currentBoardIdx = newboardIdx;
        SaveBoardData();
    }


    const DeleteBoard = function (id) {

        const idx = data.boards.findIndex((board) => board.id === id);

        data.boards.splice(idx, 1);
        data.currentBoardIdx = Math.max(0, data.currentBoardIdx - 1);

        if (data.boards.length === 0) {

            CreateBoard();
        }
        Serializer.RemoveData(id);
        SaveBoardData();

    }

    const ChangeBoardOrder = function (id, idFromNewPosition) {

        const idx = data.boards.findIndex((board) => board.id === id);

        const board = data.boards[idx];
        data.boards.splice(idx, 1);


        if (!idFromNewPosition) {

            data.boards.push(board);
            SaveBoardData();
            return;
        }


        const newIdx = data.boards.findIndex((board) => board.id === idFromNewPosition);

        data.boards.splice(newIdx, 0, board);

        SaveBoardData();
    }



    return { LoadBoardData, SaveBoardData, data, CreateBoard, ChangeBoard, DeleteBoard, ChangeBoardOrder }

}());


export { Board }