
import { CreateGhostImage } from "./DOMUtils";


const DOMCard = (function () {

    const cards = [];

    const CreateCardElement = function () {

    }

    const CreateCard = function (element) {


        const id = crypto.randomUUID();

        const card = { element, id };
        cards.push(card);

        return card;
    }


    const FindCard = function(id){

        return cards.find((card) => card.id === id)
    }


    const InitialiseData = (function () {

        let cardsElements = document.querySelectorAll('.card');


        cardsElements.forEach((card) => {

            const cardData = CreateCard(card);


            card.draggable = true;

            card.addEventListener('dragstart', (e) => {


                e.target.currentGhostCard = CreateGhostImage(e.target, e);



                e.dataTransfer.setData('flexboard/card', cardData.id);

            });

            card.addEventListener('dragend', (e) => {


                if (e.target.currentGhostCard) {

                    e.target.currentGhostCard.remove();
                    e.target.currentGhostCard = null;
                }
            });

        });
    })();

    return {cards, FindCard}

})();





const CardWrapper = function () {


    let selected = null;

    const Set = function (card) {
        selected = card;
    }

    const Get = function () {
        return selected;
    }

    const Clear = function () {

        selected = null;
    }

    return { Get, Set, Clear }
}



export { DOMCard, CardWrapper }