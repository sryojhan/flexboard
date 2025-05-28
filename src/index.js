import "./styles.css";

import { DOMFlexboard } from "./scripts/dom/DOMFlexboard";
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
        ]
    }
]



cards.forEach((columns, idx) => {

    columns.cards.forEach((data) => {

        const col = DOMColumn.columns[idx].DOMElements.content;
        DOMFlexboard.CreateCard(data, col);
    });


});