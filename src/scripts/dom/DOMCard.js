
import { CreateGhostImage } from "./DOMUtils";

import { DOMModal } from "./DOMModal";

import { Card } from "../models/card";
import DOMFlexboard from "./DOMFlexboard";

const DOMCard = (function () {

    let currentlyDraggedCard = null;

    const CreateCardElement = function (columnContent, creationData) {

        const card = document.createElement('div');
        const color = document.createElement('div');
        const title = document.createElement('h1');
        const description = document.createElement('p');

        card.draggable = true;
        card.classList.add('card');

        color.classList.add('card-color');
        color.classList.add(creationData.color);

        title.textContent = creationData.title;
        description.textContent = creationData.description;

        card.append(color);
        card.append(title);
        card.append(description);

        columnContent.append(card);

        card.data = Card.CreateCard(card, creationData);


        card.addEventListener('dragstart', (event) => {


            event.target.ghostCard = CreateGhostImage(event.target, event);
            event.target.gapElement = CreateGapElement(event.target);


            DOMFlexboard.SetCardDragType(card.data.id);

            currentlyDraggedCard = event.target;

            DOMFlexboard.BeginDrag();
        });

        card.addEventListener('dragend', (event) => {

            card.classList.remove('hidden');

            
            if (event.target.ghostCard) {
                
                event.target.ghostCard.remove();
                event.target.ghostCard = null;
            }
            
            if (event.target.gapElement) {
                
                event.target.gapElement.remove();
                event.target.gapElement = null;
            }
            
            currentlyDraggedCard = null;

            DOMFlexboard.ClearDragType();

            DOMFlexboard.EndDrag();
        });

        card.addEventListener('dblclick', () => {

            DOMModal.modal.OpenModal(card.data);
        });



        return card;
    }


    const UpdateElement = function (card) {

        const titleElement = card.element.querySelector('h1');
        const descriptionElement = card.element.querySelector('p');
        const colorElement = card.element.querySelector('.card-color');


        titleElement.textContent = card.title;
        descriptionElement.textContent = card.description;

        Array.from(colorElement.classList).forEach((cssClass) => {

            if (cssClass !== 'card-color')
                colorElement.classList.remove(cssClass);
        });

        colorElement.classList.add(card.color);
    }




    const CreateGapElement = function (draggedCard) {


        const gapElement = document.createElement('div');
        gapElement.classList.add('card-gap');

        gapElement.style.height = `${draggedCard.getBoundingClientRect().height}px`;

        gapElement.nextElement = null;

        return gapElement;
    }



    const CalculateInsertPosition = function (columnElement, yPosition) {


        const cardElements = columnElement.querySelectorAll('.card');

        let insertIdx = 0;
        let insertElement = cardElements[0];

        let selectNext = false;

        let isBelowHidden = false;

        cardElements.forEach((card, idx) => {

            if (selectNext) {
                insertElement = card;
                selectNext = false;
            }

            const rect = card.getBoundingClientRect();
            let centerPoint = (rect.top + rect.bottom) * 0.5;


            let isCardHidden = card.classList.contains('hidden');

            if(isCardHidden)
            {
                isBelowHidden = true;
            }

            if (!isCardHidden && yPosition > centerPoint) {

                selectNext = true;
                insertIdx = idx + (isBelowHidden ? 0 : 1);
            }

        });

        if (selectNext){

            insertElement = null;
        }
        

        return {insertElement, insertIdx};
    }


    const AppendCardGapBeforeElement = function (columnElement, afterElement) {

        currentlyDraggedCard.classList.add('hidden');

        const gapElement = currentlyDraggedCard.gapElement;

        if (!gapElement.nextElement || gapElement.nextElement !== afterElement) {

            gapElement.nextElement = afterElement;

            columnElement.insertBefore(gapElement, afterElement);
        }

    }


    const UnAppedCardGap = function () {

        if (currentlyDraggedCard === null) return;

        const gapElement = currentlyDraggedCard.gapElement;
        gapElement.remove();
    }


    return { CalculateInsertPosition, AppendCardGapBeforeElement, UnAppedCardGap, CreateCardElement, UpdateElement }

})();





export { DOMCard }