// Add walking animation on walk button click.
const walkButton = document.getElementById('walk');
walkButton.addEventListener('click', () => {

    const cruddy = document.querySelector('.crud');
    cruddy.classList.remove('sitting', 'dead');
    cruddy.classList.toggle('walking');
});

// Add sitting animation on sit button click.
const sitButton = document.getElementById('sit');
sitButton.addEventListener('click', () => {
    const cruddy = document.querySelector('.crud');
    cruddy.classList.remove('walking', 'dead');
    cruddy.classList.toggle('sitting');
});

// Add dying animation on play dead button click.
const dieButton = document.getElementById('die');
dieButton.addEventListener('click', () => {
    const cruddy = document.querySelector('.crud');
    cruddy.classList.remove('sitting', 'walking');
    cruddy.classList.toggle('dead');
});

const path = document.querySelector('.path');
//Update temp item's clip path on input change.
path.addEventListener('input', () => {
    const tempItems = Array.from(document.querySelectorAll('.temp-item'));

    tempItems.forEach(item => {
        item.style.clipPath = path.value;
    });
});

// Give temp item a default shape.
window.addEventListener('load', () => {
    const tempItems = Array.from(document.querySelectorAll('.temp-item'));

    tempItems.forEach(item => {
        item.style.clipPath = 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)';
    });

});

// Update displayed cruddy color when selecting colors.
const colorButtons = Array.from(document.querySelectorAll('.colorbtn'));
colorButtons.forEach(button => {
    button.addEventListener('click', () => {

        color = button.style.backgroundColor;

        const tempItems = Array.from(document.querySelectorAll('.temp-item'));

        tempItems.forEach(item => {
            item.style.backgroundColor = color;
        });

    })
});

//Toggle boundary boxes for front and top on button click.
const boxToggle = document.getElementById('itemboxtoggle');
boxToggle.addEventListener('click', () => {
    const topBox = document.querySelector('.top-item-box');
    topBox.classList.toggle('hidden');

    const frontBox = document.querySelector('.front-item-box');
    frontBox.classList.toggle('hidden');
});

let layers = [];
let side = 'top';
let counter = 0;

// Add current temp layer to all displayed layers.
const addLayerButton = document.getElementById('addlayerbtn');
addLayerButton.addEventListener('click', () => {
    if (layers.length >= 5) {
        alert('Max 5 layers, please remove a layer to continue.');
        return;
    }

    counter++;

    let tempItem = document.querySelector('.temp-item');
    let style = getComputedStyle(tempItem);

    let layer = {
        color: style.backgroundColor,
        clipPath: style.clipPath,
        id: `class${counter}`
    }

    layers.push(layer);
    updateLayersDisplay(layer);
    addLayerTop(layer);
    addLayerFront(layer);

    console.log(layer);
});

// Add the given layer info as a layer in layers list.
const updateLayersDisplay = (info) => {
    const layer = document.createElement('div');
    layer.classList.add('layericon');
    layer.id = `class${counter}`;

    // Add shape icon to layer box.
    const icon = document.createElement('div');
    icon.style.clipPath = info.clipPath;
    icon.style.backgroundColor = info.color;
    icon.classList.add('felt');
    layer.appendChild(icon);

    // Add delete button to layer box.
    const layerDelete = document.createElement('button');
    layerDelete.innerText = 'X';
    layerDelete.type = 'button';
    layerDelete.onclick = (e) => deleteLayer(e);
    layerDelete.classList.add('def-button', 'layerdelbtn');
    layer.appendChild(layerDelete);

    const layerBox = document.getElementById('layers');
    layerBox.appendChild(layer);
}

// Add the given layer to the top of displayed cruddy.
const addLayerTop = (info) => {
    const layer = document.createElement('div');
    layer.classList.add('item', 'felt', `class${counter}`);

    layer.style.clipPath = info.clipPath;
    layer.style.backgroundColor = info.color;

    // Add new layer to top cruddy box.
    const topItemBox = document.querySelector('.top-item-box');
    topItemBox.appendChild(layer);
}

// Add the given layer to the front of displayed cruddy.
const addLayerFront = (info) => {
    const layer = document.createElement('div');
    layer.classList.add('item', 'felt', `class${counter}`);

    layer.style.clipPath = info.clipPath;
    layer.style.backgroundColor = info.color;

    // Add new layer to front cruddy box.
    const frontItemBox = document.querySelector('.front-item-box');
    frontItemBox.appendChild(layer);
}

// Toggle layer placement between front and top.
let layerChoice = 'top';
const sideButton = document.getElementById('changesidebtn');
sideButton.addEventListener('click', () => {
    const topBox = document.querySelector('.top-item-box');
    topBox.classList.toggle('deselected');

    const frontBox = document.querySelector('.front-item-box');
    frontBox.classList.toggle('deselected');

    if (sideButton.innerText === 'Change to Front') {
        sideButton.innerText = 'Change to Top';
        side = 'front';
    } else {
        sideButton.innerText = 'Change to Front';
        side = 'top';
    }
});

// Add ability to remove layers on click.
const deleteLayer = (e) => {
    const targetId = e.target.parentElement.id;

    // Remove layer from layers array.
    const index = layers.map(e => e.id).indexOf(targetId);

    if (index > -1) {
        layers.splice(index, 1);
    }

    // Remove all layer instances from DOM.
    e.target.parentElement.remove();

    const targets = Array.from(document.querySelectorAll(`.${targetId}`));
    targets.forEach(target => {
        target.remove();
    });
}

// Send the data of a killed cruddy.
const saveItem = () => {
    if (layers.length < 1) {
        alert('Needs at least one layer.');
        return;
    }

    // Initialize item data.
    const data = {
        type: side,
        layers: JSON.stringify(layers)
    }

    console.log(data.layers);

    const XHR = new XMLHttpRequest();
    const FD = new FormData();

    // Push our data into our FormData object
    for (const [name, value] of Object.entries(data)) {
        FD.append(name, value);
    }

    // Define what happens in case of error
    XHR.addEventListener('error', (event) => {
        console.log('Oops! Something went wrong.');
    });

    // Set up our request
    XHR.open('POST', '');

    // Send our FormData object; HTTP headers are set automatically
    XHR.send(FD);

    alert('item saved!');
}

//Save item on submit button click.
const submitButton = document.querySelector('.submit-item');
submitButton.onclick = saveItem;
