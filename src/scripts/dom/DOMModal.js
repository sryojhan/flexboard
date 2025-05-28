

const DOMModal = (function(){


    const edit_modalBackground = document.querySelector('.modal-background.card-edit');
    const edit_modal = edit_modalBackground.querySelector('.modal.card-edit');

    const modalBackground = document.querySelector('.modal-background.card-show');
    const modal = modalBackground.querySelector('.modal.card-show');


    const InitialiseModal = (function () {


        edit_modalBackground.addEventListener('click', () => {

            CloseEditModal();
        });

        modalBackground.addEventListener('click', () => {

            CloseModal();
        });

        edit_modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });


        /* Show modal*/
        const doneButton = modal.querySelector('#show-modal-done')
        doneButton.addEventListener('click', (e)=>{

            CloseModal();
        });


        const editButton = modal.querySelector('#show-modal-edit')
        editButton.addEventListener('click', (e)=>{

            CloseModal();
            OpenEditModal(lastCard);
        });


        /* Edit modal*/

        
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

        console.log(card);

        lastCard = card;
        edit_modalBackground.classList.remove('hidden');


        currentlySelectedColor = colors.indexOf(card.color);
        UpdateSelectedColor();

        editTitle.value = card.title;
        editDescription.value = card.description;
    }

    const SaveEditModalValues = function(){

        lastCard.title = editTitle.value;
        lastCard.description = editDescription.value;

        lastCard.color = colors[currentlySelectedColor];

        lastCard.UpdateElement();
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

        modal.classList.remove(lastCard.color);
        modalBackground.classList.add('hidden');
    }

    const CloseEditModal = function () {

        edit_modalBackground.classList.add('hidden');
    }

    return {modal: {OpenModal, CloseModal}, editModal: {OpenEditModal, CloseEditModal}}

})();


export {DOMModal}
