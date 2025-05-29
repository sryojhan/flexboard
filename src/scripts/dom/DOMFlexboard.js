
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

                DOMCard.AppendCardGapAtIndex(columnContent, afterElement);


            } else if (event.dataTransfer.types.includes('flexboard/column')) {

            }

            else {

//                console.log("hubo un problema");
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

            //TODO: drag and drop for cards elements
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

        });

    })();




    return { BeginDrag, EndDrag }


})();



export default DOMFlexboard;