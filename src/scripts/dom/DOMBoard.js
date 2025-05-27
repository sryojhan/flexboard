

const boardParent = document.querySelector('.board-container');


const DOMBoard = function(name){


    const boardElem = document.createElement('h1');
    boardElem.textContent = name;



    boardElem.addEventListener('contextmenu', (e) =>{

        e.preventDefault();

    });




    boardParent.append(boardElem);

    return boardElem;
}


export {DOMBoard};