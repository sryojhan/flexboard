

const Card = (function () {

    let cards = [];

    const CreateCard = function (element, creationData) {

        const id = crypto.randomUUID();

        const title = creationData.title;
        const description = creationData.description;
        const color = creationData.color;

        const card = { element, id, title, description, color };

        cards.push(card);
        return card;
    }


    const ClearAllCards = function(){

        cards = [];
    }

    
    const FindCard = function (id) {

        return cards.find((card) => card.id === id)
    }

    const RemoveCard = function(card) {

        const idx = cards.indexOf(card);
        cards.splice(idx, 1);
    }


    return {CreateCard, ClearAllCards, FindCard, RemoveCard};

})();


export { Card };







