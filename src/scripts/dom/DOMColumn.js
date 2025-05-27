

const DOMColumn = function () {



};




const InitialiseColumns = function (cardWrapper) {


    let columns = document.querySelectorAll('.column');


    columns.forEach((col) => {


        let dragCounter = 0;
        let columnContent = col.querySelector('.column-content');

        col.addEventListener('dragenter', (e) => {

            dragCounter++;
            col.classList.add("dragover");
        });

        col.addEventListener('dragleave', (e) => {


            dragCounter--;

            if (dragCounter <= 0)
                col.classList.remove("dragover");

        });


        col.addEventListener('dragover', (e) => {

            e.preventDefault();
        });

        col.addEventListener('drag', (e) => {


            

        });

        col.addEventListener('drop', (e) => {

            dragCounter = 0;
            col.classList.remove("dragover");
            columnContent.append(cardWrapper.Get());
        });

    });
}



export { DOMColumn, InitialiseColumns };
