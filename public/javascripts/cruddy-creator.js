const items = Array.from(document.querySelectorAll('.itemicon'));
items.forEach(item => {
    item.addEventListener('click', () => {

        // Clear all previous items.
        const topItemBox = document.querySelector('.top-item-box');
        const frontItemBox = document.querySelector('.front-item-box');

        // Clear previous items from the same item section.
        if (item.classList.contains('top-item')) {
            topItemBox.innerHTML = '';
            console.log('top things')
        } else if (item.classList.contains('front-item')) {
            frontItemBox.innerHTML = '';
            console.log('bottom things')
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