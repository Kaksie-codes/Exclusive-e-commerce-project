
export function scrollEffect () {
    
const productContainer = document.querySelector('.product-container');

document.addEventListener("DOMContentLoaded", function() {
    const leftArrow = document.querySelector('.arrow-btn.left');
    const rightArrow = document.querySelector('.arrow-btn.right');

    let scrollInterval;

    const startScrolling = (direction) => {
        scrollInterval = setInterval(() => {
            productContainer.scrollBy({
                left: direction === 'left' ? -10 : 10, 
                behavior: 'auto',
                
            });
        }, 10); 
    };

    const stopScrolling = () => {
        clearInterval(scrollInterval);
    };

    leftArrow.addEventListener('mousedown', () => startScrolling('left'));
    rightArrow.addEventListener('mousedown', () => startScrolling('right'));

    document.addEventListener('mouseup', stopScrolling);
    document.addEventListener('mouseleave', stopScrolling);
});

 }

