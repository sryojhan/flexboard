
import { CreateGhostImage } from "./DOMUtils";


const DOMColumn = (function () {


    const columns = [];


    const CreateColumnElement = function () {



    }

    const CreateColumn = function (DOMElements) {


        const id = crypto.randomUUID();

        const col = { DOMElements, id };
        columns.push(col);

        return col;
    }


    const ClearHighlight = function(){

        columns.forEach((column) =>{

            column.DOMElements.column.classList.remove('highlight');
        });
    }


    const GetMaxColumnPosition = function(xPosition){


        const max = columns.reduce((max, column) =>{


            const colElement = column.DOMElements.column;

            const rect = colElement.getBoundingClientRect();
            

            if(rect.left < xPosition){

                return column;
            }
                
            return max;
        });

        max.DOMElements.column.classList.add('highlight');
        return max;
    }



    const InitialiseData = (function () {


        let columnsElements = document.querySelectorAll('.column');

        columnsElements.forEach((col) => {


            const header = col.querySelector('.column-header');
            header.draggable = true;

            header.addEventListener('dragstart', (e) => {


                e.target.ghostImage = CreateGhostImage(col, e);

            });

            header.addEventListener('dragend', (e) => {

                if(e.target.ghostImage){

                    e.target.ghostImage.remove();
                    e.target.ghostImage = null;
                }

            });


            const text = col.querySelector('.column-title');
            const textEditable = col.querySelector('.column-title-editable');

            
            text.addEventListener('mouseup', () => {

                text.classList.add('hidden');
                textEditable.classList.remove('hidden');
                textEditable.focus();

            });


            textEditable.addEventListener('blur', ()=>{

                text.classList.remove('hidden');
                textEditable.classList.add('hidden');
            })

            const content = col.querySelector('.column-content');


            CreateColumn({ column: col, header, content });
        });

    })();


    return {columns, GetMaxColumnPosition, ClearHighlight};

})();



const InitialiseColumns = function (cardWrapper) {


    let columns = document.querySelectorAll('.column');


    columns.forEach((col) => {


        let dragCounter = 0;
        let columnContent = col.querySelector('.column-content');

        col.addEventListener('dragenter', (e) => {

            dragCounter++;
            col.classList.add("dragover");
        });

        col.addEventListener('dragleave', (e) => {


            dragCounter--;

            if (dragCounter <= 0)
                col.classList.remove("dragover");

        });


        col.addEventListener('dragover', (e) => {

            e.preventDefault();
        });

        col.addEventListener('drag', (e) => {




        });

        col.addEventListener('drop', (e) => {

            dragCounter = 0;
            col.classList.remove("dragover");
            columnContent.append(cardWrapper.Get());
        });

    });
}



export { DOMColumn, InitialiseColumns };
