
import { DOMBoard } from "./DOMBoard"
import { DOMColumn } from "./DOMColumn"
import { DOMCard } from "./DOMCard";

const DOMFlexboard = (function () {



    const content = document.querySelector('.content');


    DOMCard.SetDragEndCallback(() => {

        DOMColumn.ClearHighlight();
        DOMCard.UnappedCardGap();
    });


    const CreateCard = function (card, column) {

        const cardData = DOMCard.CreateCardElement(column).data;

        cardData.title = card.title;
        cardData.description = card.description;
        cardData.color = card.color;

        cardData.UpdateElement();
    }


    const DragAndDrop = (function () {


        content.addEventListener('dragover', (e) => {

            e.preventDefault();


            if (e.dataTransfer.types.includes('flexboard/card')) {

                DOMColumn.ClearHighlight();

                const selectedColumn = DOMColumn.GetMaxColumnPosition(e.clientX);
                DOMColumn.HighlightColumn(selectedColumn);

                const columnContent = DOMColumn.ColumnContent(selectedColumn);

                const insertIdx = DOMCard.CalculateCardPositionIndex(columnContent, e.clientY);

                DOMCard.AppendCardGapAtIndex(columnContent, insertIdx);


            } else if (e.dataTransfer.types.includes('flexboard/column')) {

            }

            else {

                console.log("hubo un problema");
            }


        });

        content.addEventListener('drop', (e) => {


            if (e.dataTransfer.types.includes('flexboard/card')) {

                const id = e.dataTransfer.getData('flexboard/card');

                const card = DOMCard.FindCard(id);
                const newColumn = DOMColumn.GetMaxColumnPosition(e.clientX);
                const contentElement = DOMColumn.ColumnContent(newColumn);


                DOMCard.UnappedCardGap();
                const insertIdx = DOMCard.CalculateCardPositionIndex(contentElement, e.clientY);

                contentElement.insertBefore(card.element, contentElement.children[insertIdx]);

            }


        });

    })();




    return {CreateCard}


})();



export {DOMFlexboard};