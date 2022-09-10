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

// Have a cruddy play the dancing game.
const playGame = (cruddy) => {
    const machine = document.getElementById('dancemachine');

    // Prevent multiple cruddies from using the machine.
    if (!machine.classList.contains('used')) {
        machine.classList.add('used');

        const style = getComputedStyle(machine);

        // Move the cruddy to the targeted bush.
        cruddy.style.top =  `calc(${style.top} - 1rem)`;
        cruddy.style.left = `calc(${style.left} + 6rem)`;

        // Point cruddy in the right direction.
        const crudRect = cruddy.getBoundingClientRect();
        const machineRect = machine.getBoundingClientRect();

        if (crudRect.x - machineRect.x >= 0) {
            cruddy.style.transform = 'scaleX(-1)';
        } else {
            cruddy.style.transform = 'scaleX(1)';
        }

        // Toggle walking animation on and off.
        cruddy.classList.add('walking', 'playing');

        // Remove the walking animation once arrived at the machine.
        setTimeout(() => {
            cruddy.classList.remove('walking', 'playing');
            cruddy.style.transform = 'scaleX(-1)';
            runGame(cruddy);
        }, 3000);
    }
}

// Run a session on the dance machine.
const runGame = (cruddy) => {
    const machine = document.getElementById('dancemachine');
    machine.classList.add('running');

    generateBoard(cruddy);

    setTimeout(() => {
        machine.classList.remove('used');
        cruddy.classList.remove('playing');
    }, 6200);
}

// Add randomly generated moves to the dance machine.
const generateBoard = (cruddy) => {
    const machine = document.getElementById('dancemachine');
    const board = document.getElementById('board');

    const totalMoves = 20;
    let correctMoves = []

    // Generate moves for the machine.
    for (let i = 0; i < totalMoves; i++) {
        const move = document.createElement('div');
        move.classList.add('move');

        const roll = Math.floor(Math.random() * 2);
        if (roll === 1) {
            move.classList.add('left');
            correctMoves.push('left');
        } else {
            move.classList.add('right');
            correctMoves.push('right');
        }

        board.appendChild(move);
    }

    let moveList = [];
    let index = 0;
    let score = 0;

    for (let i = 0; i < totalMoves; i++) {
        const roll = Math.floor(Math.random() * 10);
        if (roll === 1) {
            moveList.push('wrong');
        } else {
            moveList.push('correct');
        }
    }

    // Animate the movebox based on cruddy's inputs.
    setTimeout(() => {


        myInterval = setInterval(() => {

            // Animate the machine's display.
            const bottom = document.getElementById('bottom');
            bottom.classList.remove('correct', 'wrong');
            void bottom.offsetHeight;
            bottom.classList.add(moveList[index]);

            //Animate cruddy dancing.
            cruddy.classList.remove('danceleft', 'danceright');
            void cruddy.offsetHeight;
            
            if (moveList[index] === 'correct') {
                cruddy.classList.add(`dance${correctMoves[index]}`);
                score++;
            } else {
                switch(correctMoves[index]) {
                    case 'left':
                        cruddy.classList.add('danceright');
                    case 'right':
                        cruddy.classList.add('danceleft');
                }

            }

            index++;

            if (index === totalMoves + 1) {
                cruddy.classList.remove('danceleft', 'danceright');
                clearInterval(myInterval);
            };
        }, 250);
    }, 600);

    setTimeout(() => {
        machine.classList.remove('running');

        cruddy.classList.add('scoring');
        const scoreBubble = cruddy.querySelector('.score');
        scoreBubble.innerText = `${score}!`;

        setTimeout(() => {
            cruddy.classList.remove('scoring');
        }, 2000);

        const moves = Array.from(document.querySelectorAll('.move'));
        moves.forEach(move => {
            move.remove();
        });
    }, 6200);
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
                }, 24000);

            }, 3000);

            found = true;
        } else if (index === bushes.length - 1 && !found) {
            cruddy.classList.add('dying');
            setTimeout(() => {
                cruddy.style.transform = null;
                cruddy.classList.remove('dying');
                cruddy.classList.add('dead');
            }, 2000);

            // Send post request to delete the passed cruddy.
            sendData({ id: cruddy.id });

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
    if (cruddy.classList.contains('dead')) return;
    if (cruddy.classList.contains('playing')) return;

    cruddy.classList.remove('sitting');

    const actions = [
        moveToRandomPosition,
        animateSitting,
        gatherFood,
        playGame
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
