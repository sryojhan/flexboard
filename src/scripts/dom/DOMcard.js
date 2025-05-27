



const DOMCard = function(){




}

const InitialiseCards = function(cardWrapper){
    
    let cards = document.querySelectorAll('.card');

   
    cards.forEach((value) => {

        
        value.draggable = true;

        value.addEventListener('dragstart', (e) =>{


            const ghostCard = e.target.cloneNode(true);

            ghostCard.classList.add('ghost-card');

            const rect = e.target.getBoundingClientRect();

            ghostCard.style.width = `${rect.width}px`;
            ghostCard.style.height = `${rect.height}px`;

            const xOffset = e.clientX - rect.left;
            const yOffset = e.clientY - rect.top;


            const parent = document.createElement('div');
            parent.classList.add('ghost-card-parent');

            parent.style.width = `${rect.width}px`;
            parent.style.height = `${rect.height}px`;
            parent.append(ghostCard);
            document.body.append(parent);

            e.target.currentGhostCard = parent;

            e.dataTransfer.setDragImage(parent, xOffset, yOffset);

            cardWrapper.Set(value);
        });

        value.addEventListener('dragend', (e) =>{

            cardWrapper.Clear();

            if(e.target.currentGhostCard){

                e.target.currentGhostCard.remove();
                e.target.currentGhostCard = null;
            }
        });

    });
}


const CardWrapper = function(){


    let selected = null;

    const Set = function(card){
        selected = card;
    }

    const Get = function(){
        return selected;
    }

    const Clear = function(){

        selected = null;
    }

    return {Get, Set, Clear}
}



export {DOMCard, InitialiseCards, CardWrapper}