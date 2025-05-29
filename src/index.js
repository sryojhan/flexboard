import "./styles.css";

import "./scripts/dom/DOMFlexboard";
import { DOMSerializer } from "./scripts/dom/DOMSerializer";



const leftBanner = document.querySelector('.left-banner');

leftBanner.addEventListener('dblclick', () => {

    leftBanner.classList.toggle('hidden');
})


const Initialise = function () {



    DOMSerializer.ClearData();
    DOMSerializer.Load(toDoCards);
}


window.Serialize = DOMSerializer.SerializeToJSON;




const toDoCards = [
    {
        "name": "Pending",
        "cards": [


            {
                "title": "Columns must be movable",
                "description": "",
                "color": "red"
            },

            {
                "title": "Remove columns",
                "description": "",
                "color": "red"
            },
            {
                "title": "Setup different boards",
                "description": "",
                "color": "red"
            },
            {
                "title": "Page header",
                "description": "",
                "color": "red"
            },
            {
                "title": "Center save button",
                "description": "",
                "color": "yellow"
            },
            {
                "title": "Create cancel button when editing",
                "description": "",
                "color": "yellow"
            },
            {
                "title": "Remove done button from view",
                "description": "Maybe just add an x at the top right",
                "color": "yellow"
            },
            {
                "title": "copyright @ all rights reserved",
                "description": "Maybe just add an x at the top right",
                "color": "yellow"
            },
            {
                "title": "Sistema de drag and drop personalizado",
                "description": "",
                "color": "pink"
            },
            {
                "title": "Dark mode",
                "description": "",
                "color": "pink"
            },
            {
                "title": "Collapse cards",
                "description": "",
                "color": "pink"
            },
            {
                "title": "Background color selector",
                "description": "",
                "color": "pink"
            },
            {
                "title": "Import background image",
                "description": "",
                "color": "pink"
            },
            {
                "title": "favicon",
                "description": "",
                "color": "pink"
            },
        ]
    },
    {
        "name": "Hate",
        "cards": [
            {
                "title": "Insultar a Iván",
                "description": "",
                "color": "blue"
            },
            {
                "title": "Insultar a Iván pero en rojo",
                "description": "",
                "color": "red"
            },
            {
                "title": "Insultar en amarillo",
                "description": "",
                "color": "yellow"
            }
        ]
    },
    {
        "name": "Complete",
        "cards": [
            {
                "title": "Create new columns",
                "description": "",
                "color": "green"
            },
            {
                "title": "Description overflow",
                "description": "",
                "color": "green"
            },
            {
                "title": "save columns names",
                "description": "",
                "color": "green"
            },
            {
                "title": "Create new cards",
                "description": "Donete",
                "color": "green"
            },
            {
                "title": "Serialize data",
                "description": "",
                "color": "green"
            },
            {
                "title": "Store data",
                "description": "",
                "color": "green"
            },
            {
                "title": "Disable card",
                "description": "Disable original card when draggin and the card gap is visible",
                "color": "green"
            },
            {
                "title": "Remove cards",
                "description": "",
                "color": "green"
            },
            
            {
                "title": "Page model serialization",
                "description": "",
                "color": "green"
            },
        ]
    }
]

const defaultInit = [

    {
        name: "Pending",

        "cards": [

            {
                title: "You can create your custom cards!",
                description: "",
                color: "blue"
            },

            {
                title: "Keep track of every task you have to complete",
                description: "",
                color: "yellow"
            },
            {
                title: "Personalize each card with a unique color",
                description: "",
                color: "red"
            },
        ]
    },
    {
        name: "In progress",

        "cards": [

            {
                title: "Use descriptions to add more information!",
                description: "Double click the card to see the full description of the element! Use as much space as you need to use to make use everything is perfectly clear to you later",
                color: "pink"
            },

            {
                title: "You can create new columns and even change the name of already existing ones",
                description: "",
                color: "purple"
            },
            {
                title: "Did I say you can have custom colors for your cards?",
                description: "You can edit already existing cards by double clicking a card and pressing 'Edit'",
                color: "turqoise"
            },

            {
                title: "Create as many cards as you need to organise your project",
                description: "",
                color: "orange"
            },
        ]
    },
    {
        name: "I HATE DANIEL I HATE DANIEL I HATE DANIEL",

        "cards": [

            {
                title: "I HATE DANIEL",
                description: "",
                color: "grey"
            },

            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },

            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
            {
                title: "I HATE DANIEL ",
                description: "",
                color: "grey"
            },
        ]
    },
    {
        name: "^^",

        "cards": [

            {
                title: "Have fun!",
                description: "",
                color: "green"
            },

        ]
    }
]


Initialise();