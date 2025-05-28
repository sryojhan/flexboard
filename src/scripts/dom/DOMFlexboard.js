
import { DOMBoard } from "./DOMBoard"
import { DOMColumn, InitialiseColumns } from "./DOMColumn"
import { DOMCard, InitialiseCards, CardWrapper } from "./DOMCard";


const FlexboardManager = (function () {


    let currentlySelected = CardWrapper();

    //InitialiseCards(currentlySelected);
    //InitialiseColumns(currentlySelected);


    const content = document.querySelector('.content');


    const CalculateCardPosition = function (columnElement, yPosition) {


    }


    const DragAndDrop = (function () {


        content.addEventListener('dragover', (e) => {



            if (e.dataTransfer.types.includes('flexboard/card')) {


                DOMColumn.ClearHighlight();
                DOMColumn.GetMaxColumnPosition(e.clientX);
                CalculateCardPosition(DOMColumn, e.clientY);
                e.preventDefault();


            } else if (e.dataTransfer.types.includes('flexboard/column')) {

                e.preventDefault();
            }



        });

        content.addEventListener('drop', (e) => {


            if (e.dataTransfer.types.includes('flexboard/card')) {

                const id = e.dataTransfer.getData('flexboard/card');

                const card = DOMCard.FindCard(id);
                const newColumn = DOMColumn.GetMaxColumnPosition(e.clientX);


                const contentElement = newColumn.DOMElements.content;
                contentElement.insertBefore(card.element, contentElement.lastElementChild);

                console.log(id);
            }

            DOMColumn.ClearHighlight();

        });

    })();







})();



export default FlexboardManager;