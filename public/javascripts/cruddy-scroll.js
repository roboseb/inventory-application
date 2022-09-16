const crudScroll = (() => {

    const crudBox = document.querySelector('.crudbox');
    const defCruddies = Array.from(crudBox.querySelectorAll('.crud'));
    const crudHeight = defCruddies[0].offsetHeight;

    // Add extra cruddies based on default amount.
    let bonusCruds = Math.floor(10 / defCruddies.length);

    // Append extra cruddies to crudbox for the animation.
    for (let i = 0; i < bonusCruds; i++) {
        defCruddies.forEach(cruddy => {
            const crudClone = cruddy.cloneNode(true);
            crudBox.appendChild(crudClone);
        });
    }

    let scrollCount = 0;

    // Initial scroll to make animation more fluid.
    crudBox.scroll({
        top: crudBox.scrollTop + crudHeight + 20,
        left: 0,
        behavior: 'instant'
    });

    const scrollingAni = () => {
        // Reset scroll to top if reach last set.
        let reachedBottom = false;
        if (scrollCount === defCruddies.length) {
            reachedBottom = true;
            scrollCount = 0;
        }

        if (reachedBottom) {
            crudBox.scroll({
                top: crudHeight + 20,
                left: 0,
                behavior: 'instant'
            });
        }

        // Scroll down by one cruddy, including margin.
        crudBox.scroll({
            top: crudBox.scrollTop + crudHeight + 20,
            left: 0,
            behavior: 'smooth'
        });

        scrollCount++;
    }

    // Start the scrolling animation.
    let startScrolling = setInterval(scrollingAni, 500);

    // Pause scrolling animation on hover.
    crudBox.addEventListener('mouseenter', () => {
        clearInterval(startScrolling);
    });

    // Continue scrolling animation on mouse leave.
    crudBox.addEventListener('mouseleave', () => {
        startScrolling = setInterval(scrollingAni, 500);
    });

})();