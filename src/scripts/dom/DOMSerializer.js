import { DOMColumn } from "./DOMColumn";
import { DOMCard } from "./DOMCard";
import { Column } from "../models/column";

const DOMSerializer = (function () {



    const SerializeToJSON = function () {

        const cols = Column.columns;
        const data = Array(cols.length);


        cols.forEach((colData, idx) => {


            const name = colData.name;

            const cardsInColumn = colData.cardsInColumn;

            const cards = [];

            for (const card of cardsInColumn) {

                const title = card.title;
                const description = card.description;
                const color = card.color;


                cards.push({ title, description, color })

            }


            data[idx] = { name, cards };
        });



        return data;
    }


    const DeserializeFromJSON = function (data) {


        data.forEach((columns, idx) => {

            const colData = DOMColumn.CreateColumnElement(columns.name).data;

            const col = colData.ContentElement();

            columns.cards.forEach((data) => {


                const cardData = DOMCard.CreateCardElement(col, data).data;

                colData.PushCard(cardData);
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
            dataToLoad = defaultData;
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



