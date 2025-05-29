
import { DOMColumn } from "./DOMColumn"
import { DOMCard } from "./DOMCard";
import { DOMSerializer } from "./DOMSerializer";
import { Card } from "../models/card";
import { Column } from "../models/column";

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


                const columnContent = selectedColumn.ContentElement();

                const {insertElement: afterElement} = DOMCard.CalculateInsertPosition(columnContent, e.clientY);

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
                const contentElement = newColumn.ContentElement();


                const {insertElement: afterElement, insertIdx} = DOMCard.CalculateInsertPosition(contentElement, e.clientY);
                

                Column.EraseCardFromHierarchy(card);

                
                newColumn.InsertCardAtIndex(card, insertIdx);


                contentElement.insertBefore(card.element, afterElement);
                
                DOMCard.UnAppedCardGap();
                
                DOMSerializer.Save();
            }

            //TODO: drag and drop for cards elements
        });

    })();




    return {}


})();



export default DOMFlexboard;