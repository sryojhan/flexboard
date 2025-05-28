import "./styles.css";

import "./scripts/dom/DOMFlexboard";
import { DOMSerializer } from "./scripts/dom/DOMSerializer";



const leftBanner = document.querySelector('.left-banner');

leftBanner.addEventListener('dblclick', () => {

    leftBanner.classList.toggle('hidden');
})


const cards = [
    {
        name: "Pending",
        cards: [
            
            {
                title: "Columns must be movable",
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
        name: "Hate",
        cards: [
            {
                title: "Insultar a Iván",
                description: "",
                color: "blue"
            },
            {
                title: "Insultar a Iván pero en rojo",
                description: "",
                color: "red"
            },
            {
                title: "Dios es que que mal que me cae Iván",
                description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                color: "purple"
            },
        ]
    },

    {
        name: "Complete",
        cards: [
            {
                title: "Create new cards",
                description: "Donete",
                color: "green"
            },
            {
                title: "Create new columns",
                description: "",
                color: "green"
            },
            {
                title: "save columns names",
                description: "",
                color: "green"
            }, 
            {
                title: "Description overflow",
                description: "",
                color: "green"
            },
        ]
    },

]

DOMSerializer.Load(cards);