// Get a new valid position for a cruddy to move to.
const getNewPosition = () => {
    const ground = document.getElementById('ground');
    const groundRect = ground.getBoundingClientRect();
    const cruddyRef = document.querySelector('.crud').getBoundingClientRect();

    let newX = Math.floor(Math.random() * groundRect.width);

    // Limit new X position to keep cruddy within it.
    if (newX > groundRect.width - cruddyRef.width) {
        newX = groundRect.width - cruddyRef.width;
    }

    let newY = Math.floor(Math.random() * groundRect.height);

    // Limit new Y position to keep cruddy within it.
    if (newY > groundRect.height - cruddyRef.height) {
        newY = groundRect.height - cruddyRef.height;
    }

    return { x: newX, y: newY }
}

// Move a cruddy to a random valid position with no animation.
const noAniMove = (cruddy) => {
    cruddy.style.transition = 'initial';

    const newPos = getNewPosition();

    const crudRect = cruddy.getBoundingClientRect();

    if (crudRect.x - newPos.x >= 0) {
        cruddy.style.transform = 'scaleX(-1)';
    } else {
        cruddy.style.transform = 'scaleX(1)';
    }

    cruddy.style.top = `${newPos.y}px`;
    cruddy.style.left = `${newPos.x}px`;

    setTimeout(() => {
        cruddy.style.transition = null;
    }, 50);
}


// Move a cruddy to a random valid position;
const moveToRandomPosition = (cruddy) => {

    const newPos = getNewPosition();

    const crudRect = cruddy.getBoundingClientRect();

    if (crudRect.x - newPos.x >= 0) {
        cruddy.style.transform = 'scaleX(-1)';
    } else {
        cruddy.style.transform = 'scaleX(1)';
    }

    cruddy.style.top = `${newPos.y}px`;
    cruddy.style.left = `${newPos.x}px`;

    // Toggle walking animation on and off.
    cruddy.classList.add('walking');

    setTimeout(() => {
        cruddy.classList.remove('walking');
    }, 3000);
}

// Animate a cruddy vibing out.
const animateSitting = (cruddy) => {
    cruddy.classList.add('sitting');
}

// Have a cruddy attempt to find and eat food.
const gatherFood = (cruddy) => {
    const bushes = Array.from(document.querySelectorAll('.bush'));
    let found = false;

    bushes.forEach((targetBush, index) => {
        if (targetBush && targetBush.querySelector('.uneaten') && found === false) {
            const style = getComputedStyle(targetBush);

            // Move the cruddy to the targeted bush.
            cruddy.style.top = style.top;
            cruddy.style.left = style.left;

            // Point cruddy in the right direction.
            const crudRect = cruddy.getBoundingClientRect();
            const bushRect = targetBush.getBoundingClientRect();

            if (crudRect.x - bushRect.x >= 0) {
                cruddy.style.transform = 'scaleX(-1)';
            } else {
                cruddy.style.transform = 'scaleX(1)';
            }

            // Toggle walking animation on and off.
            cruddy.classList.add('walking', 'hungry');

            // Stop others from targeting the berry.
            const berry = targetBush.querySelector('.uneaten');
            berry.classList.remove('uneaten');

            setTimeout(() => {
                // Animate the food being eaten.
                berry.classList.add('eaten');
                cruddy.classList.remove('walking', 'hungry');

                // Regenerate the berry.
                setTimeout(() => {
                    berry.classList.remove('eaten');
                    berry.classList.add('uneaten');
                }, 60000);

            }, 3000);

            found = true;
        } else if (index === 2 && !found) {
            console.log('NO FOOD!')
            cruddy.classList.add('dying');
            setTimeout(() => {
                cruddy.classList.remove('dying');
            }, 2000);

            console.log(cruddy.id);

            sendData({id: cruddy.id});

        }
    });
}

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

// Have a cruddy perform a random action.
const performRandomAction = (cruddy) => {
    cruddy.classList.remove('sitting');

    const actions = [
        moveToRandomPosition,
        // animateSitting,
        gatherFood
    ]

    const index = Math.floor(Math.random() * actions.length);

    actions[index](cruddy);

    // Set a random timer length before choosing a new action.
    let timer;

    if (index === 0) {
        timer = 3000;
    } else {
        timer = Math.floor(Math.random() * 5000) + 8000;
    }


    setTimeout(() => performRandomAction(cruddy), timer)
}

// Set all items' stacking contexts based on their y position;
const setStacking = () => {
    let crudObjects = [];

    // Get rects for all cruds and add all info to cruObjects array.
    const crudList = Array.from(document.querySelectorAll('.stacked'));
    crudList.forEach(cruddy => {
        const rect = cruddy.getBoundingClientRect();

        const crudObj = { cruddy: cruddy, rect: rect };
        crudObjects.push(crudObj);
    });

    // Sort cruddies by y value.
    crudObjects.sort(function (a, b) { return (a.rect.y + a.rect.height) - (b.rect.y + b.rect.height) });

    // Give each cruddy a z-index based on y position.
    crudObjects.forEach((obj, index) => {
        obj.cruddy.style.zIndex = `${index}`
    });
}

// Set random initial positions for cruddies without transitioning smoothly.
const crudList = Array.from(document.querySelectorAll('.crud'));
crudList.forEach(cruddy => {

    noAniMove(cruddy);

    // Set random timer to start performing actions.
    const timer = Math.floor(Math.random() * 3000);
    setTimeout(() => performRandomAction(cruddy), timer)
});

// Update stacking order every 50ms;
setInterval(() => {
    setStacking();
}, 100);

// const testCrud = document.querySelector('.crud');

// noAniMove(testCrud);

// // Set random timer to start performing actions.
// const timer = Math.floor(Math.random() * 3000);
// setTimeout(() => performRandomAction(testCrud), timer)
