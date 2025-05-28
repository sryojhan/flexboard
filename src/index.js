import "./styles.css";

import "./scripts/dom/DOMFlexboard";


import { DOMColumn } from "./scripts/dom/DOMColumn";
import { DOMCard } from "./scripts/dom/DOMCard";


const leftBanner = document.querySelector('.left-banner');

leftBanner.addEventListener('dblclick', () => {

    leftBanner.classList.toggle('hidden');
})



const cards = [
    {
        name: "Pending",
        cards: [
            {
                title: "save columns names",
                description: "",
                color: "red"
            },
            {
                title: "Columns must be movable",
                description: "",
                color: "red"
            },
            {
                title: "Create new cards",
                description: "Donete",
                color: "green"
            },
            {
                title: "Create new columns",
                description: "",
                color: "red"
            },
            {
                title: "Serialize data",
                description: "",
                color: "red"
            },
            {
                title: "Store data",
                description: "",
                color: "red"
            },
            {
                title: "Setup different boards",
                description: "",
                color: "red"
            },
            {
                title: "Disable card",
                description: "Disable original card when draggin and the card gap is visible",
                color: "yellow"
            },
            {
                title: "Remove cards",
                description: "",
                color: "red"
            },
            {
                title: "Remove columns",
                description: "",
                color: "red"
            },

            {
                title: "Center save button",
                description: "",
                color: "yellow"
            },
            {
                title: "Create cancel button when editing",
                description: "",
                color: "yellow"
            },
            {
                title: "Remove done button from view",
                description: "Maybe just add an x at the top right",
                color: "yellow"
            },
            
        ]
    },
    {
        name: "Sprint",
        cards: [
            {
                title: "Insultar a Dani",
                description: "",
                color: "blue"
            },
            {
                title: "Insultar a Dani pero en rojo",
                description: "",
                color: "red"
            },
            {
                title: "Dios es que que mal que me cae Dani",
                description: "AAAAAAAAAAAAAAAAAAAAA",
                color: "purple"
            },
        ]
    }
]



cards.forEach((columns, idx) => {

    const colData = DOMColumn.CreateColumnElement(columns.name).data;

    const col = DOMColumn.ColumnContent(colData);

    columns.cards.forEach((data) => {


        DOMCard.CreateCardElement(col, data);
    });
});


const Serialize = function(){

    const cols = DOMColumn.columns;
    const cards = DOMCard.cards;

}

