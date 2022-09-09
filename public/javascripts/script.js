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
        options.color = button.style.backgroundColor;
        updateCruddy();
    })
});

// Toggle visibility on delete box for cruddies when clicking them.
const cruddies = Array.from(document.querySelectorAll('.crud'));
cruddies.forEach(cruddy => {
    cruddy.addEventListener('click', (e) => {
        const deleteBox = cruddy.querySelector('.deletebox');

        // Prevent closing panel when clicking panel.
        
        if (!e.target.classList.contains('crud')) {
            return;
        }

        deleteBox.classList.toggle('visible');
    });
});

//Toggle zooming into various worlds.
const worlds = Array.from(document.querySelectorAll('.world-preview'));
worlds.forEach(world => {
    world.addEventListener('click', (e) => {
        worlds.forEach(newWorld => {
            newWorld.classList.remove('expanded');
        });
        world.classList.toggle('expanded');
    });
});
