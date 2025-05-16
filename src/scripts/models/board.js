import {Column} from "./column.js"



function Board(name){


    let columns = [];

    function addColumn(column){

        columns.push(column);
    }

    return {name, id: crypto.randomUUID()};
}


export {Board};