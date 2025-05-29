
const Column = (function(){

    let columns = [];


    const CreateColumn = function (DOMElements) {

        const id = crypto.randomUUID();
        const cardsInColumn = [];

        let name = "";

        const MainElement = function(){

            return DOMElements.column;
        }

        const ContentElement = function(){

            return DOMElements.content;
        }

        const HeaderElement = function(){

            return DOMElements.header;
        }


        const PushCard = function(card){

            card.column = id;
            cardsInColumn.push(card);
        }

        const InsertCardAtIndex = function(card, idx){

            card.column = id;
            cardsInColumn.splice(idx, 0, card);

        }

        const SetName  = function(newName){

            name = newName;
        }


        const col = { id, name, DOMElements , cardsInColumn, MainElement, ContentElement, HeaderElement, PushCard, InsertCardAtIndex, SetName};


        columns.push(col);
        return col;
    }

    const FindColumn = function(id){

        return columns.find((col) => col.id === id);
    }


    const EraseCardFromHierarchy = function(card){

        const col = FindColumn(card.column);

        const elemIdx = col.cardsInColumn.indexOf(card);
        col.cardsInColumn.splice(elemIdx, 1);
    }


    return {columns, CreateColumn, FindColumn, EraseCardFromHierarchy};
})();

export {Column};