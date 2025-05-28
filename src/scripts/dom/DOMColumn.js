
import { CreateGhostImage } from "./DOMUtils";
import { DOMCard } from "./DOMCard";
import { DOMModal } from "./DOMModal";

import dragHandle from "./../../images/drag-handle.svg";
import { DOMSerializer } from "./DOMSerializer";


const DOMColumn = (function () {


    const columns = [];

    const parentContent = document.querySelector('.content');

    const addColumnButton = parentContent.querySelector('.add-column');

    addColumnButton.addEventListener('click', ()=>{

        const col = CreateColumnElement("");    

        const tittle = col.querySelector('.column-title');
        const tittleEditble = col.querySelector('.column-title-editable');

        tittle.classList.add('hidden');
        tittleEditble.classList.remove('hidden');
        tittleEditble.focus();

    });

    const CreateColumnElement = function (name) {


        const column = document.createElement('div');
        column.classList.add('column');

        const header = document.createElement('div');
        header.classList.add('column-header');
        header.draggable = true;

        const dragImage = document.createElement('img');
        dragImage.classList.add('drag-image');
        dragImage.draggable = false;
        dragImage.src = dragHandle;
        dragImage.width = 30;

        const title = document.createElement('h2');
        title.classList.add('column-title');
        title.textContent = name;

        const titleEditable = document.createElement('input');
        titleEditable.classList.add('column-title-editable');
        titleEditable.classList.add('hidden');
        titleEditable.spellcheck = false;
        titleEditable.type = "text";
        titleEditable.value = name;

        header.append(dragImage);
        header.append(title);
        header.append(titleEditable);


        const scrollArea = document.createElement('div');
        scrollArea.classList.add('column-scroll-area');
        const content = document.createElement('div');
        content.classList.add('column-content');
        const addCard = document.createElement('div');
        addCard.classList.add('add-card');
        addCard.textContent = "+ Add new card";

        scrollArea.append(content);
        scrollArea.append(addCard);


        column.append(header);
        column.append(scrollArea);



        header.addEventListener('dragstart', (e) => {


            e.target.ghostImage = CreateGhostImage(column, e);

        });

        header.addEventListener('dragend', (e) => {

            if (e.target.ghostImage) {

                e.target.ghostImage.remove();
                e.target.ghostImage = null;
            }

        });


        title.addEventListener('mouseup', () => {

            title.classList.add('hidden');
            titleEditable.classList.remove('hidden');
            titleEditable.focus();

        });


        titleEditable.addEventListener('blur', () => {

            title.textContent = titleEditable.value;

            title.classList.remove('hidden');
            titleEditable.classList.add('hidden');


            DOMSerializer.Save();
        })

        titleEditable.addEventListener('keydown', (e)=>{

            if(e.key === 'Enter'){

                titleEditable.blur();
            }
        });


        addCard.addEventListener('click', (e) => {

            const emptyCardData = { title: "", description: "", color: "grey" };
            const card = DOMCard.CreateCardElement(content, emptyCardData);
            DOMModal.editModal.OpenEditModal(card.data);
        });


        column.data = CreateColumn({ column, header, content });


        parentContent.insertBefore(column, addColumnButton);
        return column;
    }

    const CreateColumn = function (DOMElements) {


        const id = crypto.randomUUID();

        const col = { DOMElements, id };
        columns.push(col);

        return col;
    }


    const ClearHighlight = function () {

        columns.forEach((column) => {

            column.DOMElements.column.classList.remove('highlight');
        });
    }


    const GetMaxColumnPosition = function (xPosition) {


        const max = columns.reduce((max, column) => {


            const colElement = column.DOMElements.column;

            const rect = colElement.getBoundingClientRect();


            if (rect.left < xPosition) {

                return column;
            }

            return max;
        });

        return max;
    }

    const HighlightColumn = function (col) {

        col.DOMElements.column.classList.add('highlight');
    }

    const ColumnContent = function (col) {

        return col.DOMElements.content;
    }


    return { columns, GetMaxColumnPosition, ClearHighlight, HighlightColumn, ColumnContent, CreateColumnElement };

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
