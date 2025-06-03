
import { CreateGhostImage } from "./DOMUtils";
import { DOMCard } from "./DOMCard";
import { DOMModal } from "./DOMModal";

import dragHandle from "./../../images/drag-handle.svg";

import { Column } from "../models/column";
import DOMFlexboard from "./DOMFlexboard";
import { DOMBoard } from "./DOMBoard";

const DOMColumn = (function () {


    const parentContent = document.querySelector('.content');

    const addColumnButton = parentContent.querySelector('.add-column');

    let currentlySelectedColumn = null;

    addColumnButton.addEventListener('click', () => {

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
        titleEditable.draggable = true;

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


        titleEditable.addEventListener('dragstart', (event) => {


            event.preventDefault();
            event.stopPropagation();
        });

        header.addEventListener('dragstart', (event) => {


            column.ghostImage = CreateGhostImage(column, event);
            column.gapElement = CreateGapElement(column);


            currentlySelectedColumn = column;
            
            DOMFlexboard.SetColumnDragType(column.data.id);
            DOMFlexboard.BeginDrag();


        });

        header.addEventListener('dragend', (event) => {

            if (column.ghostImage) {

                column.ghostImage.remove();
                column.ghostImage = null;
            }

            if (column.gapElement) {
                column.gapElement.remove();
                column.gapElement = null;
            }

            currentlySelectedColumn.classList.remove('hidden');
            currentlySelectedColumn = null;

            DOMFlexboard.ClearDragType();

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

            DOMBoard.SaveBoard();
        })

        titleEditable.addEventListener('keydown', (e) => {

            if (e.key === 'Enter') {

                titleEditable.blur();
            }
        });



        addCard.addEventListener('click', (e) => {

            const emptyCardData = { title: "", description: "", color: "grey" };
            const card = DOMCard.CreateCardElement(content, emptyCardData);

            column.data.PushCard(card.data);


            DOMModal.editModal.FirstCardInitialisation();
            DOMModal.editModal.OpenEditModal(card.data);
        });


        column.data = Column.CreateColumn({ column, header, content }, name);


        parentContent.insertBefore(column, addColumnButton);
        return column;
    }


    const HideDraggedColumn = function () {

        currentlySelectedColumn.classList.add('highlight');
        currentlySelectedColumn.classList.add('hidden');
    }


    const CalculateInsertPosition = function (xPosition) {

        const parent = currentlySelectedColumn.parentElement;

        let maxValidIdx = 0;

        let afterHidden = false;
        let selectedAfterHidden = false;

        Array.from(parent.children).forEach((col, idx) => {

            //col.classList.contains('column-gap') || col.classList.contains('hidden')
            if (col.classList.contains('add-column')) {
                return;
            }

            if (col.classList.contains('hidden')) {
                afterHidden = true;
                return;
            }

            const rect = col.getBoundingClientRect();
            const centerPoint = (rect.left + rect.right) * 0.5;

            if (xPosition > centerPoint) {

                if (afterHidden) selectedAfterHidden = true;
                maxValidIdx = idx + 1;
            }
        });

        return { insertElement: parent.children[maxValidIdx], index: (selectedAfterHidden ? maxValidIdx - 1 : maxValidIdx) };
    }



    let scrollData = {

        isScrolling: false,
        scrollDirection: 0,
        scrollElement: null,
        currentScroll: 0,
        isVertical: false
    }

    const BeginScroll = function (direction, scrollElement, isVertical) {

        scrollData.isScrolling = true;
        scrollData.scrollDirection = direction;
        scrollData.scrollElement = scrollElement;
        scrollData.isVertical = isVertical;


        scrollData.currentScroll = isVertical ? scrollElement.scrollTop : scrollElement.scrollLeft;


        requestAnimationFrame(Scroll);
    }


    const EndScroll = function () {

        scrollData.isScrolling = false;
        scrollData.scrollDirection = 0;
        scrollData.scrollElement = null;
        scrollData.currentScroll = 0;
        scrollData.isVertical = false;
    }

    const Scroll = function () {

        if (!scrollData.isScrolling) {

            return;
        }

        const scrollSpeed = .05;

        scrollData.currentScroll += scrollData.scrollDirection * scrollSpeed;

        if (scrollData.isVertical)
            scrollData.scrollElement.scrollTop = scrollData.currentScroll;
        else
            scrollData.scrollElement.scrollLeft = scrollData.currentScroll;

        requestAnimationFrame(Scroll);
    }

    const CalculateVerticalScroll = function (columnContent, yPosition) {

        if (scrollData.isScrolling) return;

        const scrollElement = columnContent.parentElement;
        const rect = scrollElement.getBoundingClientRect();


        if (scrollElement.clientHeight === scrollElement.scrollHeight) {

            return;
        }

        const scrollMargin = 200;

        if (yPosition < rect.top + scrollMargin) {

            BeginScroll(-1, scrollElement, true);
        }
        else if (yPosition > rect.bottom - scrollMargin) {

            BeginScroll(1, scrollElement, true);
        }

    }


    const CalculateHorizontalScroll = function (xPosition) {

        if (scrollData.isScrolling) return;

        const scrollElement = parentContent;

        const rect = scrollElement.getBoundingClientRect();

        if (scrollElement.clientWidth === scrollElement.scrollWidth) {

            return;
        }


        const scrollMargin = 200;

        if (xPosition < rect.left + scrollMargin) {

            BeginScroll(-1, scrollElement, false);
        }

        else if (xPosition > rect.right - scrollMargin) {

            BeginScroll(1, scrollElement, false);
        }

    }


    const AppendColumnGapBeforeElement = function (element) {

        const parent = currentlySelectedColumn.parentElement;
        const gapElement = currentlySelectedColumn.gapElement;

        parent.insertBefore(gapElement, element);
    }


    const CreateGapElement = function (column) {

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


    const ClearAllColumns = function () {

        for (const col of parentContent.children) {

            if (col.classList.contains('add-columnn')) continue;

        }

        while (parentContent.children.length > 1) {

            parentContent.children[0].remove();
        }

    }


    return { GetMaxColumnPosition, ClearHighlight, HighlightColumn, CreateColumnElement, HideDraggedColumn, CalculateInsertPosition, AppendColumnGapBeforeElement, ClearAllColumns, CalculateVerticalScroll, CalculateHorizontalScroll, EndScroll };

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
