let options = {
    color: 'white',
}

// Update the displayed cruddy in the creator.
const updateCruddy = () => {
    const bods = Array.from(document.querySelectorAll('.bod'));

    bods.forEach(bod => {
        bod.style.backgroundColor = options.color;
    });
}

// Update displayed cruddy color when selecting colors.
const colorButtons = Array.from(document.querySelectorAll('.colorbtn'));
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Prevent updating cruddy colour in item creator.
        if (document.querySelector('#layers')) return;

        options.color = button.style.backgroundColor;
        updateCruddy();
    })
});

// Toggle visibility on delete box for cruddies when clicking them.
const cruddies = Array.from(document.querySelectorAll('.crud'));
cruddies.forEach(cruddy => {
    cruddy.addEventListener('click', (e) => {
        const deleteBox = cruddy.querySelector('.killbox');

        // Prevent closing panel when clicking panel.

        if (!e.target.classList.contains('crud')) {
            return;
        }

        deleteBox.classList.toggle('visible');
    });
});

// Send data to delete cruddy on button click, also play animation.
const killButtons = Array.from(document.querySelectorAll('.kill-btn'));
killButtons.forEach(button => {
    button.addEventListener('click', (e) => {

        const cruddy = button.parentElement.parentElement;
        
        // Delete cruddy from the database.
        newSendData({ id: cruddy.id });

        // Find all matching cruddies and animate them all.
        const killedCruddies = Array.from(document.querySelectorAll(`[id='${cruddy.id}']`));

        killedCruddies.forEach(crud => {

            // Avoid attempting to animate mini cruds on world discs.
            if (crud.classList.contains('scroller')) {
                // Animate the dying cruddy.
                crud.classList.toggle('dead');

                const killBox = crud.querySelector('.killbox');
                killBox.classList.remove('visible');
            }
        });
    });
});

// Send the data of a killed cruddy.
const newSendData = (data) => {
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
