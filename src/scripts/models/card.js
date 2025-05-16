


const Card = function(name, description, priority){

    return {name, description, priority, id: crypto.randomUUID()};
}


export {Card};







