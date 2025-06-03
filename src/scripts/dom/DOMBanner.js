import { Board } from "../models/board";
import { Serializer } from "../models/Serializer";
import { DOMBoard } from "./DOMBoard";
import { CreateGhostImage } from "./DOMUtils";



const DOMBanner = (function () {


    //* Collapse logic
    const banner = document.querySelector('.banner-container');
    const collapsedBanner = document.querySelector('.banner-collapsed');

    banner.addEventListener('dblclick', (event) => {

        if (event.target !== event.currentTarget) return;

        banner.classList.toggle('hide-animation');
        collapsedBanner.classList.toggle('hoverable');

        console.log("hola");
    })

    collapsedBanner.addEventListener('dblclick', () => {

        banner.classList.toggle('hide-animation');
        collapsedBanner.classList.toggle('hoverable');
    })





    //* Board background
    const viewportBackground = document.querySelector('.viewport');
    const backgroundImageSelector = document.querySelector('#background-image-selector');

    const removeBackground = document.querySelector('#remove-background');
    removeBackground.disabled = true;


    document.querySelector('#board-background-image').addEventListener('click', () => {

        backgroundImageSelector.click();
    });

    backgroundImageSelector.addEventListener('change', () => {

        const file = backgroundImageSelector.files[0];
        if (file) {

            const reader = new FileReader();

            reader.addEventListener('load', () => {

                viewportBackground.style.backgroundImage = `url(${reader.result})`;

                removeBackground.disabled = false;
            });

            reader.readAsDataURL(file);
        }
    });

    removeBackground.addEventListener('click', () => {


        removeBackground.disabled = true;
        backgroundImageSelector.value = null;
        viewportBackground.style.backgroundImage = "";
    });




    document.querySelector('#export-board').addEventListener('click', () => {

        navigator.clipboard.writeText(
            JSON.stringify(DOMBoard.CreateJSONFromBoard(), null, 2)
        ).then(() => {
            CreateToast("Copied to clipboard");
        }
        )
            .catch(() => console.error("Error writing to clipboard"));
    });

    document.querySelector('#download-board').addEventListener('click', () => {


        const json = DOMBoard.CreateJSONFromBoard();
        const data = JSON.stringify(json, null, 2);

        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);



        const a = document.querySelector('#download-anchor');
        a.href = url;

        a.click();
        URL.revokeObjectURL(url);

    });


    document.querySelector('#create-board').addEventListener('click', () => {

        Board.CreateBoard();
        InitialiseBoardSelector();

    });

    document.querySelector('#delete-board').addEventListener('click', () => {

        Board.DeleteBoard(Board.data.GetCurrentBoard().id);

        DOMBoard.LoadBoard();
        InitialiseBoardSelector();
    });

    document.querySelector('#card-height-collapse').addEventListener('click', () => {

        document.querySelector('.content').classList.toggle("uncollapseCards");

    });

    document.querySelector('#clear-all-data').addEventListener('click', () => {
        Serializer.ClearData();

        CreateToast('Data removed correctly');
    });


    document.querySelectorAll('.not-implemented').forEach((element) => {


        element.addEventListener('click', () => {

            CreateWarningToast('Not yet implemented');
        });

    });


    const ClearBoardSelector = function () {

        const boardSelector = document.querySelector('#board-selector');

        while (boardSelector.children.length > 0) {

            boardSelector.children[0].remove();
        }

    }


    //* Board selector drag & drop
    const boardSelector = document.querySelector('#board-selector');

    const gapElement = document.createElement('div');
    gapElement.classList.add('banner-button-gap');

    let draggedBoard = null;

    const CalculateInsertPosition = function (yPosition) {


        let setNext = false;
        let insertIdx = 0;

        Array.from(boardSelector.children).forEach((button, idx) => {

            if(button.classList.contains('hidden')){

                return;
            }

            if(button.classList.contains('banner-button-gap')){

                return;
            }

            if(setNext){

                insertIdx = idx;
                setNext = false;
            }

            const rect = button.getBoundingClientRect();

            if (yPosition > rect.top) {

                setNext = true;
            }

        });

        if(setNext)
            insertIdx = -1;

        return insertIdx;
    }

    banner.addEventListener('dragover', (event) => {



        if (draggedBoard === null) {
            return;
        }

        draggedBoard.classList.add('hidden');

        const insertIdx = CalculateInsertPosition(event.clientY);

        if(insertIdx === -1)
            boardSelector.append(gapElement);
        else
            boardSelector.insertBefore(gapElement, boardSelector.children[insertIdx]);

        event.preventDefault();

    });

    banner.addEventListener('drop', (event) => {

        
        const insertIdx = CalculateInsertPosition(event.clientY);

        draggedBoard.classList.remove('hidden');


        if(insertIdx === -1){

            boardSelector.append(draggedBoard);
            Board.ChangeBoardOrder(draggedBoard.boardId, null);

        }else{


            const elementInPosition = boardSelector.children[insertIdx];
            
            boardSelector.insertBefore(draggedBoard, elementInPosition);
            
            Board.ChangeBoardOrder(draggedBoard.boardId, elementInPosition.boardId);
        }


    });


    const InitialiseBoardSelector = function () {

        ClearBoardSelector();


        const allBoards = Board.data.boards;

        const currentBoard = Board.data.GetCurrentBoard();

        allBoards.forEach((board) => {


            const button = document.createElement('button');
            button.classList.add('banner-button');

            button.textContent = board.name;
            button.boardId = board.id;

            button.draggable = true;

            if (board === currentBoard) {
                button.disabled = true;
            }

            button.addEventListener('click', () => {


                Board.ChangeBoard(button.boardId);
                DOMBoard.LoadBoard();
            });


            button.addEventListener('dragstart', (event) => {

                draggedBoard = button;

            });

            button.addEventListener('dragend', (event) => {

                gapElement.remove();
                draggedBoard = null;
            });


            boardSelector.append(button);
        });

    }







    // TODO: mover esto de aqui
    //* Toast notifications

    const toastContainer = document.querySelector('.information-toast-container');
    const CreateToast = function (message) {

        const element = document.createElement('div');
        element.classList.add('information-toast');


        setTimeout(() => {

            element.classList.add('visible');
        }, 10);


        element.textContent = message;
        toastContainer.append(element);

        const removeElement = function () {

            element.remove();
        }

        const beginRemove = function (deleteTime) {

            element.classList.remove('visible');
            setTimeout(
                () => {
                    removeElement();
                }, deleteTime
            );
        }

        element.addEventListener('click', (e) => {

            element.classList.add('fast-delete');
            beginRemove(300);

            e.stopPropagation();
        })


        element.addEventListener('hover', (e) => e.stopPropagation());


        setTimeout(() => {

            beginRemove(3000);
        }, 5000);

        return element;
    }

    const CreateErrorToast = function (message) {

        const elem = CreateToast('Error: ' + message);
        elem.classList.add('toast-error')

        return elem;
    }


    const CreateWarningToast = function (message) {

        const elem = CreateToast('Warning: ' + message);
        elem.classList.add('toast-warning')

        return elem;
    }


    return { CreateToast, CreateErrorToast, CreateWarningToast, InitialiseBoardSelector };
})();



export { DOMBanner };