const items = Array.from(document.querySelectorAll('.itemicon'));
items.forEach(item => {
    item.addEventListener('click', (e) => {
        // Prevent attempting to display item if trying to delete.
        if (e.target.classList.contains('confirmdeletebtn')) {
            return;
        }

        // Clear all previous items.
        const topItemBox = document.querySelector('.top-item-box');
        const frontItemBox = document.querySelector('.front-item-box');

        // Clear previous items from the same item section.
        if (item.classList.contains('top-item')) {
            topItemBox.innerHTML = '';
        } else if (item.classList.contains('front-item')) {
            frontItemBox.innerHTML = '';
        }

        const itemLayers = Array.from(item.querySelectorAll('.itemiconlayer'));
        itemLayers.forEach(layer => {
            const info = getComputedStyle(layer);

            const newLayer = document.createElement('div');
            newLayer.classList.add('item', 'felt');
        
            newLayer.style.clipPath = info.clipPath;
            newLayer.style.backgroundColor = info.backgroundColor;
        
            // Add new layer to top cruddy box.
            
            if (item.classList.contains('top-item')) {
                topItemBox.appendChild(newLayer);
            } else if (item.classList.contains('front-item')) {
                frontItemBox.appendChild(newLayer);
            }
            
        })
    })
});

// Close out of all items on back button click.
const backButton = document.getElementById(['backbtn']);
backButton.addEventListener('click', () => {
    const allItems = document.getElementById('allitems');
    allItems.classList.toggle('hidden');
});

// Show all items panel on all items button click.
const allButton = document.getElementById(['allitemsbtn']);
allButton.addEventListener('click', () => {
    const allItems = document.getElementById('allitems');
    allItems.classList.toggle('hidden');
});

// Delete items from DB on their buttons' clicks.
const delItemButtons = document.querySelectorAll('.deleteitembtn');
delItemButtons.forEach(button => {
    button.addEventListener('click', () => {
        const confirmBox = button.querySelector('.confirmbox');
        confirmBox.classList.toggle('hidden');
    });
});

// Close out of confirm delete item box on undo button click.
const undoButtons = Array.from(document.querySelectorAll('.undo'));
undoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const confirmBox = button.querySelector('.confirmbox');
        confirmBox.classList.toggle('hidden');
    });
});

// Send delete request and remove item from dom on delete button click.
const confirmButtons = Array.from(document.querySelectorAll('.confirmdeletebtn'));
confirmButtons.forEach(button => {
    console.log('dasdasdsa');
    button.addEventListener('click', () => {

        // Remove button's item from DB.
        sendData({id: button.id});
  
        const item = button.parentElement.parentElement.parentElement;
    
        // Remove item from DOM if it's in small item box.
        const id = item.getAttribute('foo');
        const itemPicker = document.getElementById('itempicker');
        const boxItem = itemPicker.querySelector(`[foo="${id}"]`);
        console.log(boxItem);

        if (boxItem) boxItem.remove();

        // Clear relevant item from crud's display.
        if (item.classList.contains('top-item')) {
            const topItemBox = document.querySelector('.top-item-box');
            const disItem = topItemBox.querySelector('.item');
            disItem.remove();
        } else {
            const frontItemBox = document.querySelector('.front-item-box');
            const disItem = frontItemBox.querySelector('.item');
            disItem.remove();
        }

        // Remove button's item from DOM;
        item.remove();
    });
});

// Send the data of a killed cruddy.
const sendData = (data) => {
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
}