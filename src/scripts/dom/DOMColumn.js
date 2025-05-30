
import { CreateGhostImage } from "./DOMUtils";
import { DOMCard } from "./DOMCard";
import { DOMModal } from "./DOMModal";

import dragHandle from "./../../images/drag-handle.svg";
import { DOMSerializer } from "./DOMSerializer";

import { Column } from "../models/column";
import DOMFlexboard from "./DOMFlexboard";

const DOMColumn = (function () {


    const parentContent = document.querySelector('.content');

    const addColumnButton = parentContent.querySelector('.add-column');

    let currentlySelectedColumn = null;

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


        header.addEventListener('dragstart', (event) => {


            column.ghostImage = CreateGhostImage(column, event);
            column.gapElement = CreateGapElement(column);

            event.dataTransfer.setData('flexboard/column', column.data.id);

            currentlySelectedColumn = column;

        });

        header.addEventListener('dragend', (event) => {

            if (column.ghostImage) {

                column.ghostImage.remove();
                column.ghostImage = null;
            }

            if(column.gapElement){
                column.gapElement.remove();
                column.gapElement = null;
            }

            currentlySelectedColumn.classList.remove('hidden');
            currentlySelectedColumn = null;


            DOMFlexboard.EndDrag();
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

            column.data.name = title.textContent;

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

            column.data.PushCard(card.data);

            DOMModal.editModal.OpenEditModal(card.data);
        });


        column.data = Column.CreateColumn({ column, header, content }, name);


        parentContent.insertBefore(column, addColumnButton);
        return column;
    }


    const HideDraggedColumn = function(){

        currentlySelectedColumn.classList.add('highlight');
        currentlySelectedColumn.classList.add('hidden');
    }


    const CalculateInsertPosition = function(xPosition){

        const parent = currentlySelectedColumn.parentElement;

        let maxValidIdx = 0;

        let afterHidden = false;
        let selectedAfterHidden = false;

        Array.from(parent.children).forEach((col, idx) =>{

            //col.classList.contains('column-gap') || col.classList.contains('hidden')
            if(col.classList.contains('add-column')){
                return;
            }

            if(col.classList.contains('hidden')){
                afterHidden = true;
                return;
            }

            const rect = col.getBoundingClientRect();
            const centerPoint = (rect.left + rect.right) * 0.5;

            if(xPosition > centerPoint){

                if(afterHidden) selectedAfterHidden = true;
                maxValidIdx = idx + 1;
            }
        });

        return {insertElement: parent.children[maxValidIdx], index: (selectedAfterHidden ? maxValidIdx -1 :  maxValidIdx)};
    }


    const AppendColumnGapBeforeElement = function(element){

        const parent = currentlySelectedColumn.parentElement;
        const gapElement = currentlySelectedColumn.gapElement;

        parent.insertBefore(gapElement, element);
    }

    
    const CreateGapElement = function(column){

        const gapElement = document.createElement('div');
        gapElement.classList.add('column-gap');

        const gapVisual = document.createElement('div');
        gapVisual.classList.add('column-gap-separator')



        const rect = column.getBoundingClientRect();
        gapElement.style.width = `${rect.right - rect.left}px`;
        gapElement.style.height = `${rect.bottom - rect.top}px`;


        gapElement.append(gapVisual);
        return gapElement;

    }


    const ClearHighlight = function () {

        Column.columns.forEach((column) => {

            column.MainElement().classList.remove('highlight');
        });
    }


    const GetMaxColumnPosition = function (xPosition) {


        const max = Column.columns.reduce((max, column) => {


            const colElement = column.MainElement();

            const rect = colElement.getBoundingClientRect();


            if (rect.left < xPosition) {

                return column;
            }

            return max;
        });

        return max;
    }

    const HighlightColumn = function (col) {

        col.MainElement().classList.add('highlight');
    }




    return { GetMaxColumnPosition, ClearHighlight, HighlightColumn, CreateColumnElement, HideDraggedColumn, CalculateInsertPosition, AppendColumnGapBeforeElement};

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
