
import { CreateGhostImage } from "./DOMUtils";

import { DOMModal } from "./DOMModal";

const DOMCard = (function () {

    const cards = [];

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

        card.data = CreateCard(card, creationData);
         

        card.addEventListener('dragstart', (e) => {


            e.target.ghostCard = CreateGhostImage(e.target, e);
            e.target.gapElement = CreateGapElement(e.target);

            e.dataTransfer.setData('flexboard/card', card.data.id);


            currentlyDraggedCard = e.target;
        });

        card.addEventListener('dragend', (e) => {

            card.classList.remove('hidden');

            if (onDragEnd !== null) {

                onDragEnd();
            }

            if (e.target.ghostCard) {

                e.target.ghostCard.remove();
                e.target.ghostCard = null;
            }

            if (e.target.gapElement) {

                e.target.gapElement.remove();
                e.target.gapElement = null;
            }

            currentlyDraggedCard = null;
        });

        card.addEventListener('dblclick', () => {

            DOMModal.modal.OpenModal(card.data);
        });

        

        return card;
    }

    const CreateCard = function (element, creationData) {

        const id = crypto.randomUUID();

        const titleElement = element.querySelector('h1');
        const descriptionElement = element.querySelector('p');
        const colorElement = element.querySelector('.card-color');


        const title = creationData.title;
        const description = creationData.description;
        const color = creationData.color;

        const UpdateElement = function () {

            titleElement.textContent = card.title;
            descriptionElement.textContent = card.description;

            Array.from(colorElement.classList).forEach((cssClass) => {

                if (cssClass !== 'card-color')
                    colorElement.classList.remove(cssClass);
            });

            colorElement.classList.add(card.color);
        }


        
        const card = { element, id, title, description, color };
        card.UpdateElement = UpdateElement;


        cards.push(card);
        return card;
    }


    const FindCard = function (id) {

        return cards.find((card) => card.id === id)
    }


    const CreateGapElement = function (draggedCard) {


        const gapElement = document.createElement('div');
        gapElement.classList.add('card-gap');

        gapElement.style.height = `${draggedCard.getBoundingClientRect().height}px`;

        gapElement.nextElement = null;

        return gapElement;
    }



    const CalculateInsertPosition = function (columnElement, yPosition) {

        const cardsElemnents = columnElement.querySelectorAll('.card');

        let insertElement = cardsElemnents[0];

        let selectNext = false;

        cardsElemnents.forEach((card, idx) => {

            if(selectNext){
                insertElement = card;
                selectNext = false;
            }

            const rect = card.getBoundingClientRect();
            let centerPoint = (rect.top + rect.bottom) * 0.5;


            let isGap = card.classList.contains('card-gap');

            if(isGap) console.log("aa");

            let isCardHidden = card.classList.contains('hidden');

            if (!isCardHidden && yPosition > centerPoint) {

                selectNext = true;
            }

        });

        if(selectNext)
            insertElement = null;

        return insertElement;
    }


    const AppendCardGapAtIndex = function (columnElement, afterElement) {
        
        currentlyDraggedCard.classList.add('hidden');

        const gapElement = currentlyDraggedCard.gapElement;
        //TODO: comprobacion para no tener que hacer esto en cada frame

        if(!gapElement.nextElement || gapElement.nextElement !== afterElement){

            gapElement.nextElement = afterElement;
            columnElement.insertBefore(gapElement, afterElement);
        }

    }


    const UnAppedCardGap = function () {

        if (currentlyDraggedCard === null) return;

        const gapElement = currentlyDraggedCard.gapElement;
        gapElement.remove();
    }


    let onDragEnd = null;

    const SetDragEndCallback = function (callback) {

        onDragEnd = callback;
    }


    return { cards, FindCard,  CalculateInsertPosition, AppendCardGapAtIndex, UnAppedCardGap, SetDragEndCallback, CreateCardElement }

})();





export { DOMCard }