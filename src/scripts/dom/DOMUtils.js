

const CreateGhostImage = function (original, event) {


    const ghostCard = original.cloneNode(true);

    ghostCard.classList.add('ghost-card');

    const rect = original.getBoundingClientRect();

    ghostCard.style.width = `${rect.width}px`;
    ghostCard.style.height = `${rect.height}px`;

    const xOffset = event.clientX - rect.left;
    const yOffset = event.clientY - rect.top;


    const parent = document.createElement('div');
    parent.classList.add('ghost-card-parent');

    parent.style.width = `${rect.width}px`;
    parent.style.height = `${rect.height}px`;
    parent.append(ghostCard);
    document.body.append(parent);

    event.dataTransfer.setDragImage(parent, xOffset, yOffset);

    return parent;
}




export { CreateGhostImage };