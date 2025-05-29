import {Card} from "./card.js"


const Column = (function(){

    let columns = [];


    const CreateColumn = function (DOMElements) {

        const id = crypto.randomUUID();
        const cardsInColumn = [];



        const MainElement = function(){

            return DOMElements.column;
        }

        const ContentElement = function(){

            return DOMElements.content;
        }

        const HeaderElement = function(){

            return DOMElements.header;
        }


        const col = { DOMElements, id , cardsInColumn, MainElement, ContentElement, HeaderElement};


        columns.push(col);
        return col;
    }


    return {columns, CreateColumn};
})();

export {Column};