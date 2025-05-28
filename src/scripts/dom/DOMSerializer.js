import { DOMColumn } from "./DOMColumn";
import { DOMCard } from "./DOMCard";

const DOMSerializer = (function () {



    const SerializeToJSON = function () {

        const cols = DOMColumn.columns;
        const data = Array(cols.length);


        cols.forEach((colData, idx) => {


            const name = colData.DOMElements.header.querySelector('.column-title').textContent;

            const content = colData.DOMElements.content;

            const cards = [];

            for (const cardElem of content.children) {


                const title = cardElem.querySelector('h1').textContent;
                const description = cardElem.querySelector('p').textContent;

                const colorElem = cardElem.querySelector('.card-color');

                let color = "";

                Array.from(colorElem.classList).forEach((cssClass) => {

                    if (cssClass !== "card-color")
                        color = cssClass;
                });



                cards.push({ title, description, color })

            }


            data[idx] = { name, cards };
        });



        return data;
    }


    const DeserializeFromJSON = function (data) {


        data.forEach((columns, idx) => {

            const colData = DOMColumn.CreateColumnElement(columns.name).data;

            const col = DOMColumn.ColumnContent(colData);

            columns.cards.forEach((data) => {


                DOMCard.CreateCardElement(col, data);
            });
        });

    }

    const SaveStringToLocalStorage = function(data){

        window.localStorage.setItem('storage', data);
    }


    const LoadStringFromLocalStorage = function(){

        return window.localStorage.getItem('storage');
    }


    const Save = function(){

        const json = SerializeToJSON();
        const data = JSON.stringify(json);

        SaveStringToLocalStorage(data);
    }

    const Load = function(defaultData = null){

        let stringData = LoadStringFromLocalStorage();
        let dataToLoad = null;

        if(stringData === null)
        {
            dataToLoad = cards;
        }
        else{

            dataToLoad = JSON.parse(stringData);
        }

        if(dataToLoad !== null)
            DeserializeFromJSON(dataToLoad);

    }

    const ClearData = function(){
        window.localStorage.clear();
    }


    return { Save, Load, SerializeToJSON, DeserializeFromJSON, SaveStringToLocalStorage, LoadStringFromLocalStorage, ClearData}

})();



export { DOMSerializer };



