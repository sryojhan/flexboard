import {Card} from "./card.js"


const Column = function(name){

    let cards = [];


    function addCard(card){

        cards.push(card);
    }


    return {name, addCard, id: crypto.randomUUID()};
}

export {Column};