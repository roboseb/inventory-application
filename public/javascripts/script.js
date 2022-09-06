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

const colorButtons = Array.from(document.querySelectorAll('.colorbtn'));

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        options.color = button.innerText;
        updateCruddy();

        console.log(button.innerText);
    })
})

