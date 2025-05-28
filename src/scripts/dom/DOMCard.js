
import { CreateGhostImage } from "./DOMUtils";


const DOMCard = (function () {

    const cards = [];

    let currentlyDraggedCard = null;

    const CreateCardElement = function () {

    }

    const CreateCard = function (element) {


        const id = crypto.randomUUID();

        const card = { element, id };
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


    const UnappedCardGap = function(){

        if(currentlyDraggedCard === null) return;

        const gapElement = currentlyDraggedCard.gapElement;
        gapElement.remove();
    }

    
    let onDragEnd = null;

    const SetDragEndCallback = function(callback){

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

                console.log(onDragEnd);
                if(onDragEnd !== null){

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

        });
    })();

    return { cards, FindCard, CalculateCardPositionIndex, AppendCardGapAtIndex, UnappedCardGap, SetDragEndCallback }

})();





export { DOMCard }