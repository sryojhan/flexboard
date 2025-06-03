
import { DOMColumn } from "./DOMColumn"
import { DOMCard } from "./DOMCard";
import { Card } from "../models/card";
import { Column } from "../models/column";
import { DOMBoard } from "./DOMBoard";


//TODO: change name to flexboard

const DOMFlexboard = (function () {



    const content = document.querySelector('.content');
    const deleteElements = document.querySelector('#delete-elements');

    let deleteElementsDragCounter = 0;


    const BeginDrag = function () {



        deleteElementsDragCounter = 0;
        deleteElements.classList.remove('hidden');

        content.classList.add('limit-height');

    }

    const EndDrag = function () {

        content.classList.remove('limit-height');

        deleteElements.classList.add('hidden');

        DOMColumn.ClearHighlight();
        DOMCard.UnAppedCardGap();
        DOMColumn.EndScroll();
    }


    const DragAndDrop = (function () {


        content.addEventListener('dragover', (event) => {


            if (dragDataTransfer.type === 'flexboard/card') {

                DOMColumn.ClearHighlight();

                const selectedColumn = DOMColumn.GetMaxColumnPosition(event.clientX);
                DOMColumn.HighlightColumn(selectedColumn);


                const columnContent = selectedColumn.ContentElement();

                const { insertElement: afterElement } = DOMCard.CalculateInsertPosition(columnContent, event.clientY);

                DOMCard.AppendCardGapBeforeElement(columnContent, afterElement);


                DOMColumn.EndScroll();
                DOMColumn.CalculateHorizontalScroll(event.clientX);
                DOMColumn.CalculateVerticalScroll(columnContent, event.clientY);

                event.preventDefault();


            } else if (dragDataTransfer.type === 'flexboard/column') {

                DOMColumn.HideDraggedColumn();

                const { insertElement } = DOMColumn.CalculateInsertPosition(event.clientX);
                DOMColumn.AppendColumnGapBeforeElement(insertElement);

                DOMColumn.EndScroll();
                DOMColumn.CalculateHorizontalScroll(event.clientX);

                event.preventDefault();
            }

            else {

                console.error("Problem reading data transfer types");
            }


        });

        content.addEventListener('drop', (event) => {



            if (dragDataTransfer.type === 'flexboard/card') {

                const id = dragDataTransfer.value;

                const card = Card.FindCard(id);
                const newColumn = DOMColumn.GetMaxColumnPosition(event.clientX);
                const contentElement = newColumn.ContentElement();


                const { insertElement: afterElement, insertIdx } = DOMCard.CalculateInsertPosition(contentElement, event.clientY);


                Column.EraseCardFromHierarchy(card);


                newColumn.InsertCardAtIndex(card, insertIdx);


                contentElement.insertBefore(card.element, afterElement);

                DOMCard.UnAppedCardGap();

                DOMBoard.SaveBoard();
            }


            else if (dragDataTransfer.type === 'flexboard/column') {

                const id = dragDataTransfer.value;

                const col = Column.FindColumn(id);
                const colElement = col.MainElement();

                const { insertElement, index } = DOMColumn.CalculateInsertPosition(event.clientX);

                Column.EraseColumn(col);
                Column.AddColumnAtPosition(col, index);

                colElement.parentElement.insertBefore(colElement, insertElement);

                DOMBoard.SaveBoard();
            }

        });





        deleteElements.addEventListener('dragenter', (event) => {

            deleteElementsDragCounter++;

            deleteElements.classList.add('hover');

        });

        deleteElements.addEventListener('dragleave', (event) => {

            deleteElementsDragCounter--;

            if (deleteElementsDragCounter <= 0) {
                deleteElements.classList.remove('hover');
            }
        });


        deleteElements.addEventListener('dragover', (event) => {

            event.stopPropagation();
            event.preventDefault();

            DOMCard.UnAppedCardGap();
            DOMColumn.ClearHighlight();
        });


        deleteElements.addEventListener('drop', (event) => {

            event.stopPropagation();
            DOMCard.UnAppedCardGap();


            if (dragDataTransfer.type === 'flexboard/card') {

                const id = dragDataTransfer.value;

                const card = Card.FindCard(id);

                //Remove card from columns
                Column.EraseCardFromHierarchy(card);

                //Remove card from card list
                Card.RemoveCard(card);

                //Remove card from DOM
                card.element.remove();

                DOMBoard.SaveBoard();
            }
            else if (dragDataTransfer.type === 'flexboard/column') {


                const id = dragDataTransfer.value;

                const column = Column.FindColumn(id);

                column.cardsInColumn.forEach((card) => {

                    Column.EraseCardFromHierarchy(card);
                });

                Column.EraseColumn(column);
                column.MainElement().remove();


                DOMBoard.SaveBoard();
            }

        });


    })();


    const dragDataTransfer = {

        type: "none",
        value: null
    }


    const SetCardDragType = function (id) {
        dragDataTransfer.type = "flexboard/card";
        dragDataTransfer.value = id;
    }

    const SetColumnDragType = function (id) {
        dragDataTransfer.type = "flexboard/column"
        dragDataTransfer.value = id;
    }

    const ClearDragType = function () {
        dragDataTransfer.type = "none";
        dragDataTransfer.value = null;
    }




    return { BeginDrag, EndDrag, SetCardDragType, SetColumnDragType, ClearDragType }


})();



export default DOMFlexboard;