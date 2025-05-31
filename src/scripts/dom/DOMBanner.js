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
        ).then(() => alert("Copied to clipboard!")).catch(() => console.error("Error writing to clipboard"));
    });

    document.querySelector('#download-board').addEventListener('click', () => {


        const json = DOMSerializer.SerializeToJSON();
        const data = JSON.stringify(json, null, 2);

        const blob = new Blob([data], {type: "application/json"});
        const url = URL.createObjectURL(blob);



        const a = document.querySelector('#download-anchor');
        a.href = url;

        a.click();
        URL.revokeObjectURL(url);

    });



})();



export { DOMBanner };