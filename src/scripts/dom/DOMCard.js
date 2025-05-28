
import { CreateGhostImage } from "./DOMUtils";

import { DOMModal } from "./DOMModal";

const DOMCard = (function () {

    const cards = [];

    let currentlyDraggedCard = null;

    const CreateCardElement = function (columnContent) {

        const card = document.createElement('div');
        const color = document.createElement('div');
        const title = document.createElement('h1');
        const description = document.createElement('p');


        card.draggable = true;
        card.classList.add('card');

        color.classList.add('card-color');

        card.append(color);
        card.append(title);
        card.append(description);

        columnContent.append(card);

        const cardData = CreateCard(card);
        card.data = cardData;

        card.addEventListener('dragstart', (e) => {


            e.target.ghostCard = CreateGhostImage(e.target, e);
            e.target.gapElement = CreateGapElement(e.target);

            e.dataTransfer.setData('flexboard/card', cardData.id);


            currentlyDraggedCard = e.target;
        });

        card.addEventListener('dragend', (e) => {

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

            DOMModal.modal.OpenModal(cardData);
        });

        

        return card;
    }

    const CreateCard = function (element) {

        const id = crypto.randomUUID();

        const titleElement = element.querySelector('h1');
        const descriptionElement = element.querySelector('p');
        const colorElement = element.querySelector('.card-color');

        const title = titleElement.textContent;

        let description = "";
        const paragraphElement = descriptionElement;

        if (paragraphElement)
            description = paragraphElement.textContent;


        let color = 'red';

        Array.from(colorElement.classList).forEach((cssClass) => {

            if (cssClass !== 'card-color')
                color = cssClass;
        });


        const card = { element, id, title, description, color };
        cards.push(card);



        const UpdateElement = function () {

            titleElement.textContent = card.title;
            descriptionElement.textContent = card.description;

            Array.from(colorElement.classList).forEach((cssClass) => {

                if (cssClass !== 'card-color')
                    colorElement.classList.remove(cssClass);
            });

            colorElement.classList.add(card.color);
        }

        card.UpdateElement = UpdateElement;


        return card;
    }


    const FindCard = function (id) {

        return cards.find((card) => card.id === id)
    }


    const CreateGapElement = function (draggedCard) {


        const gapElement = document.createElement('div');
        gapElement.classList.add('card-gap');

        gapElement.style.height = `${draggedCard.getBoundingClientRect().height}px`;

        return gapElement;
    }



    const CalculateCardPositionIndex = function (columnElement, yPosition) {

        const cardsElemnents = columnElement.querySelectorAll('.card');

        let insertIdx = 0;

        cardsElemnents.forEach((card, idx) => {

            const rect = card.getBoundingClientRect();
            let centerPoint = (rect.top + rect.bottom) * 0.5;

            if (yPosition > centerPoint) {

                insertIdx = idx + 1;
            }

        });

        return insertIdx;
    }


    const AppendCardGapAtIndex = function (columnElement, idx) {


        const gapElement = currentlyDraggedCard.gapElement;
        if (gapElement.parentElement !== null && gapElement.parentElement === columnElement && Array.from(gapElement.parentElement.children).indexOf(gapElement) === idx) {
            return;
        }
        const cardsElemnents = columnElement.querySelectorAll('.card');
        columnElement.insertBefore(gapElement, cardsElemnents[idx]);
    }


    const UnappedCardGap = function () {

        if (currentlyDraggedCard === null) return;

        const gapElement = currentlyDraggedCard.gapElement;
        gapElement.remove();
    }


    let onDragEnd = null;

    const SetDragEndCallback = function (callback) {

        onDragEnd = callback;
    }

    const InitialiseData = (function () {

        let cardsElements = document.querySelectorAll('.card');


        cardsElements.forEach((card) => {

            const cardData = CreateCard(card);


            card.draggable = true;

            card.addEventListener('dragstart', (e) => {


                e.target.ghostCard = CreateGhostImage(e.target, e);
                e.target.gapElement = CreateGapElement(e.target);

                e.dataTransfer.setData('flexboard/card', cardData.id);


                currentlyDraggedCard = e.target;
            });

            card.addEventListener('dragend', (e) => {

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

                DOMModal.modal.OpenModal(cardData);
            });

        });
    })();



    return { cards, FindCard, CalculateCardPositionIndex, AppendCardGapAtIndex, UnappedCardGap, SetDragEndCallback, CreateCardElement }

})();





export { DOMCard }