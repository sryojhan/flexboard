
const Column = (function(){

    let columns = [];


    const CreateColumn = function (DOMElements, name) {

        const id = crypto.randomUUID();
        const cardsInColumn = [];


        //This should not be here, this overlaps DOM and Modals
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


        const col = { id, name, DOMElements , cardsInColumn, MainElement, ContentElement, HeaderElement, PushCard, InsertCardAtIndex};


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

    const EraseColumn = function(column){

        const elemIdx = columns.indexOf(column);


        columns.splice(elemIdx, 1);
    }

    const AddColumnAtPosition = function(column, idx){

        columns.splice(idx, 0, column);
    }


    return {columns, CreateColumn, FindColumn, EraseCardFromHierarchy, EraseColumn, AddColumnAtPosition};
})();

export {Column};