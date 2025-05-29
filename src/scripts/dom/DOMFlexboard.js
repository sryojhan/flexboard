
import { DOMBoard } from "./DOMBoard"
import { DOMColumn } from "./DOMColumn"
import { DOMCard } from "./DOMCard";
import { DOMSerializer } from "./DOMSerializer";
import { Card } from "../models/card";

const DOMFlexboard = (function () {



    const content = document.querySelector('.content');


    DOMCard.SetDragEndCallback(() => {

        DOMColumn.ClearHighlight();
        DOMCard.UnAppedCardGap();
    });




    const DragAndDrop = (function () {


        content.addEventListener('dragover', (e) => {

            e.preventDefault();


            if (e.dataTransfer.types.includes('flexboard/card')) {

                DOMColumn.ClearHighlight();

                const selectedColumn = DOMColumn.GetMaxColumnPosition(e.clientX);
                DOMColumn.HighlightColumn(selectedColumn);

                const columnContent = DOMColumn.ColumnContent(selectedColumn);

                const afterElement = DOMCard.CalculateInsertPosition(columnContent, e.clientY);

                DOMCard.AppendCardGapAtIndex(columnContent, afterElement);


            } else if (e.dataTransfer.types.includes('flexboard/column')) {

            }

            else {

                console.log("hubo un problema");
            }


        });

        content.addEventListener('drop', (e) => {


            if (e.dataTransfer.types.includes('flexboard/card')) {

                const id = e.dataTransfer.getData('flexboard/card');

                const card = Card.FindCard(id);
                const newColumn = DOMColumn.GetMaxColumnPosition(e.clientX);
                const contentElement = DOMColumn.ColumnContent(newColumn);


                const afterElement = DOMCard.CalculateInsertPosition(contentElement, e.clientY);
                
                contentElement.insertBefore(card.element, afterElement);
                
                DOMCard.UnAppedCardGap();
                
                DOMSerializer.Save();
            }


        });

    })();




    return {}


})();



export default DOMFlexboard;