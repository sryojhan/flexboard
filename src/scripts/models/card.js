

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


    const ClearAllCards =function(){

        cards = [];
    }

    
    const FindCard = function (id) {

        return cards.find((card) => card.id === id)
    }

    return {CreateCard, ClearAllCards, FindCard};

})();


export { Card };







