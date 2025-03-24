const squaresContainer = document.querySelector('.squares-container');

// Generate squares
const numberOfSquares = Math.floor((window.innerWidth * window.innerHeight) / (50 * 50)); // Calculate number of squares based on screen size
for (let i = 0; i < numberOfSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    squaresContainer.appendChild(square);
}

document.addEventListener('mousemove', (e) => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        const rect = square.getBoundingClientRect();
        const squareX = rect.left + rect.width / 2;
        const squareY = rect.top + rect.height / 2;
        const distance = Math.sqrt((squareX - e.clientX) ** 2 + (squareY - e.clientY) ** 2);
        const maxDistance = 200; // Adjust this value for sensitivity
        const scale = Math.max(1 - distance / maxDistance, 0.5); // Scale down to a minimum of 0.5
        square.style.transform = `scale(${scale})`; // Maintain scaling effect without rotation
    });
});
