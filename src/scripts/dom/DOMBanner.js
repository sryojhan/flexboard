import { DOMSerializer } from "./DOMSerializer";


const DOMBanner = (function () {


    //* Collapse logic
    const banner = document.querySelector('.banner');
    const collapsedBanner = document.querySelector('.banner-collapsed');

    banner.addEventListener('dblclick', (event) => {

        if (event.target !== event.currentTarget) return;

        banner.classList.toggle('hide-animation');
        collapsedBanner.classList.toggle('hoverable');
    })

    collapsedBanner.addEventListener('dblclick', () => {

        banner.classList.toggle('hide-animation');
        collapsedBanner.classList.toggle('hoverable');
    })



    //* Board background
    const viewportBackground = document.querySelector('.viewport');
    const backgroundImageSelector = document.querySelector('#background-image-selector');


    document.querySelector('#board-background-image').addEventListener('click', () => {

        backgroundImageSelector.click();
    });

    backgroundImageSelector.addEventListener('change', () => {

        const file = backgroundImageSelector.files[0];
        if (file) {

            const reader = new FileReader();

            reader.addEventListener('load', () => {

                viewportBackground.style.backgroundImage = `url(${reader.result})`;
            });

            reader.readAsDataURL(file);
        }
    });

    document.querySelector('#remove-background').addEventListener('click', () => {

        viewportBackground.style.backgroundImage = "";
    });




    document.querySelector('#export-board').addEventListener('click', () => {

        navigator.clipboard.writeText(
            JSON.stringify(DOMSerializer.SerializeToJSON(), null, 2)
        ).then(() => {
            CreateToast("Copied to clipboard");
        }
        )
            .catch(() => console.error("Error writing to clipboard"));
    });

    document.querySelector('#download-board').addEventListener('click', () => {


        const json = DOMSerializer.SerializeToJSON();
        const data = JSON.stringify(json, null, 2);

        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);



        const a = document.querySelector('#download-anchor');
        a.href = url;

        a.click();
        URL.revokeObjectURL(url);

    });


    document.querySelectorAll('.not-implemented').forEach((element) => {


        element.addEventListener('click', ()=>{

            CreateWarningToast('Not yet implemented');
        });

    });


    //* Toast notifications

    const toastContainer = document.querySelector('.information-toast-container');
    const CreateToast = function (message) {

        const element = document.createElement('div');
        element.classList.add('information-toast');


        setTimeout(() => {
            
            element.classList.add('visible');
        }, 10);
        
        
        element.textContent = message;
        toastContainer.append(element);

        const removeElement = function (){

            element.remove();
        }

        const beginRemove = function () {

            element.classList.remove('visible');
            setTimeout(
                ()=>{
                    removeElement();
                }, 500
            );
        }

        element.addEventListener('click', () => {

            beginRemove();
        })

        setTimeout(() => {

            beginRemove();
        }, 5000);

        return element;
    }

    const CreateErrorTaost = function (message) {

        const elem = CreateToast('Error: ' + message);
        elem.classList.add('toast-error')

        return elem;
    }


    const CreateWarningToast = function (message) {

        const elem = CreateToast('Warning: ' + message);
        elem.classList.add('toast-warning')

        return elem;
    }


    return { CreateToast, CreateErrorTaost, CreateWarningToast };
})();



export { DOMBanner };