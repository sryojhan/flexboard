
import { DOMColumn } from "./DOMColumn"
import { DOMCard } from "./DOMCard";
import { DOMSerializer } from "./DOMSerializer";
import { Card } from "../models/card";
import { Column } from "../models/column";

const DOMFlexboard = (function () {



    const content = document.querySelector('.content');
    const deleteElements = document.querySelector('#delete-elements');

    let deleteElementsDragCounter = 0;

    setTimeout(() => {

        deleteElements.classList.remove('load');
    }, 0);

    const BeginDrag = function () {



        deleteElementsDragCounter = 0;
        deleteElements.classList.remove('hidden');

    }

    const EndDrag = function () {


        deleteElements.classList.add('hidden');

        DOMColumn.ClearHighlight();
        DOMCard.UnAppedCardGap();
    }


    const DragAndDrop = (function () {


        content.addEventListener('dragover', (event) => {

            event.preventDefault();


            if (event.dataTransfer.types.includes('flexboard/card')) {

                DOMColumn.ClearHighlight();

                const selectedColumn = DOMColumn.GetMaxColumnPosition(event.clientX);
                DOMColumn.HighlightColumn(selectedColumn);


                const columnContent = selectedColumn.ContentElement();

                const { insertElement: afterElement } = DOMCard.CalculateInsertPosition(columnContent, event.clientY);

                DOMCard.AppendCardGapBeforeElement(columnContent, afterElement);


            } else if (event.dataTransfer.types.includes('flexboard/column')) {

                DOMColumn.HideDraggedColumn();

                const {insertElement} = DOMColumn.CalculateInsertPosition(event.clientX);
                DOMColumn.AppendColumnGapBeforeElement(insertElement);



            }

            else {

                console.log("hubo un problema");
            }


        });

        content.addEventListener('drop', (event) => {



            if (event.dataTransfer.types.includes('flexboard/card')) {

                const id = event.dataTransfer.getData('flexboard/card');

                const card = Card.FindCard(id);
                const newColumn = DOMColumn.GetMaxColumnPosition(event.clientX);
                const contentElement = newColumn.ContentElement();


                const { insertElement: afterElement, insertIdx } = DOMCard.CalculateInsertPosition(contentElement, event.clientY);


                Column.EraseCardFromHierarchy(card);


                newColumn.InsertCardAtIndex(card, insertIdx);


                contentElement.insertBefore(card.element, afterElement);

                DOMCard.UnAppedCardGap();


                DOMSerializer.Save();
            }


            else if(event.dataTransfer.types.includes('flexboard/column')){

                const id = event.dataTransfer.getData('flexboard/column');

                const col = Column.FindColumn(id);
                const colElement = col.MainElement();

                const {insertElement, index} = DOMColumn.CalculateInsertPosition(event.clientX);

                Column.EraseColumn(col);
                Column.AddColumnAtPosition(col, index);

                console.log(Column.columns);


                colElement.parentElement.insertBefore(colElement, insertElement);

                DOMSerializer.Save();
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


        deleteElements.addEventListener('drop', (event)=>{

            event.stopPropagation();
            DOMCard.UnAppedCardGap();


            if (event.dataTransfer.types.includes('flexboard/card')) {

                const id = event.dataTransfer.getData('flexboard/card');

                const card = Card.FindCard(id);

                //Remove card from columns
                Column.EraseCardFromHierarchy(card);

                //Remove card from card list
                Card.RemoveCard(card);

                //Remove card from DOM
                card.element.remove();


                DOMSerializer.Save();
            }
            else if(event.dataTransfer.types.includes('flexboard/column')){


                const id = event.dataTransfer.getData('flexboard/column');

                const column = Column.FindColumn(id);

                column.cardsInColumn.forEach((card) =>{

                    Column.EraseCardFromHierarchy(card);
                });

                Column.EraseColumn(column);
                column.MainElement().remove();


                DOMSerializer.Save();
            }

        });

    })();




    return { BeginDrag, EndDrag }


})();



export default DOMFlexboard;