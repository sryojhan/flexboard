import { DOMCard } from "./DOMCard";
import { DOMBoard } from "./DOMBoard";
import { Card } from "../models/card";
import { Column } from "../models/column";


const DOMModal = (function () {


    const edit_modalBackground = document.querySelector('.modal-background.card-edit');
    const edit_modal = edit_modalBackground.querySelector('.modal.card-edit');

    const modalBackground = document.querySelector('.modal-background.card-show');
    const modal = modalBackground.querySelector('.modal.card-show');


    const InitialiseModal = (function () {

        
        window.addEventListener('keydown', (event)=>{

            if (event.key === 'Escape') {

                CloseModal();
                CloseEditModal();
            }
        });


        edit_modalBackground.addEventListener('mousedown', (event) => {

            CloseEditModal();
        });

        modalBackground.addEventListener('mousedown', (event) => {

            CloseModal();
        });
        


        edit_modal.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });

        modal.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });


        /* Show modal*/
        const doneButton = modal.querySelector('#show-modal-done')
        doneButton.addEventListener('click', (e) => {

            CloseModal();
        });


        const editButton = modal.querySelector('#show-modal-edit')
        editButton.addEventListener('click', (e) => {

            CloseModal();
            OpenEditModal(lastCard);
        });


        /* Edit modal*/


        const cancelButton = edit_modal.querySelector('#cancel-button');
        cancelButton.addEventListener('click', () => {

            CloseEditModal()
        });

        const saveButton = edit_modal.querySelector('#save-button');
        saveButton.addEventListener('click', (e) => {

            SaveEditModalValues();
            CloseEditModal();
        });




    })();

    const title = document.querySelector('#card-title-show');
    const description = document.querySelector('#card-description-show');

    let lastCard = null;
    const OpenModal = function (card) {

        modalBackground.classList.remove('hidden');

        title.textContent = card.title;
        description.textContent = card.description;

        lastCard = card;
        modal.classList.add(card.color);
    }

    const editTitle = document.querySelector("#name");
    const editDescription = document.querySelector("#description");

    const colors = ['green', 'yellow', 'orange', 'red', 'blue', 'turqoise', 'purple', 'pink', 'grey'];

    const OpenEditModal = function (card) {

        lastCard = card;
        edit_modalBackground.classList.remove('hidden');


        currentlySelectedColor = colors.indexOf(card.color);
        UpdateSelectedColor();

        editTitle.value = card.title;
        editDescription.value = card.description;

        editTitle.focus();
    }

    const SaveEditModalValues = function () {

        lastCard.title = editTitle.value;
        lastCard.description = editDescription.value;

        lastCard.color = colors[currentlySelectedColor];

        DOMCard.UpdateElement(lastCard);
        DOMBoard.SaveBoard();

        isBeingInitialised = false;
    }


    const colorSelector = edit_modal.querySelector(".color-selector");
    const colorButtons = colorSelector.querySelectorAll('.color-selector-button');

    let currentlySelectedColor = 0;

    const UpdateSelectedColor = function () {

        colorButtons.forEach((color, idx) => {


            if (idx === currentlySelectedColor) {

                color.classList.add('selected');
            }
            else {
                color.classList.remove('selected');
            }
        });

    };

    UpdateSelectedColor();

    colorButtons.forEach((color, idx) => {

        color.addEventListener('click', () => {

            currentlySelectedColor = idx;
            UpdateSelectedColor();
        });

    });




    const CloseModal = function () {

        if(modalBackground.classList.contains('hidden')) return;

        modal.classList.remove(lastCard.color);
        modalBackground.classList.add('hidden');
    }


    let isBeingInitialised = false;
    const FirstCardInitialisation = function () {

        isBeingInitialised = true;
    }

    const CloseEditModal = function () {

        if(edit_modalBackground.classList.contains('hidden')) return;


        if (isBeingInitialised) {

            const card = lastCard;

            //Remove card from columns
            Column.EraseCardFromHierarchy(card);

            //Remove card from card list
            Card.RemoveCard(card);

            //Remove card from DOM
            card.element.remove();

            DOMBoard.SaveBoard();
        }

        edit_modalBackground.classList.add('hidden');
        isBeingInitialised = false;
    }

    return { modal: { OpenModal, CloseModal }, editModal: { OpenEditModal, CloseEditModal, FirstCardInitialisation } }

})();


export { DOMModal }
