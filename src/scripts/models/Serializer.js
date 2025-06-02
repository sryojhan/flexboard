import { DOMColumn } from "../dom/DOMColumn";
import { DOMCard } from "../dom/DOMCard";
import { Column } from "./column";
import { DOMModal } from "../dom/DOMModal";
import { DOMBanner } from "../dom/DOMBanner";

const Serializer = (function () {

    
    //TODO: Serialize images

    const SaveJSON = function (name, data) {

        SaveString(name, JSON.stringify(data));
    }

    const LoadJSON = function (name) {

        return JSON.parse(LoadString(name))
    }

    const SaveString = function(name, data){

        window.localStorage.setItem(name, data);
    }

    const LoadString = function(name){

        return window.localStorage.getItem(name);
    }

    const ClearData = function(){
        window.localStorage.clear();
    }


    return { SaveJSON, LoadJSON, SaveString, LoadString, ClearData}

})();



export { Serializer };



