const loadingScreen = document.getElementById('loadingScreen');
const mainContent = document.getElementById('mainContent');
const squaresContainer = document.getElementById('squaresContainer');
const cursorImage = document.getElementById('cursorImage');

// Function to generate squares
function generateSquares() {
    const squareSize = 50; // Size of each square
    const columns = Math.floor(window.innerWidth / squareSize); // Calculate the number of columns based on the viewport width
    const rows = Math.floor((window.innerHeight - 50) / squareSize); // Calculate the number of rows based on the viewport height minus footer height
    const numberOfSquares = columns * rows; // Total number of squares to generate

    squaresContainer.innerHTML = ''; // Clear existing squares
    for (let i = 0; i < numberOfSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        squaresContainer.appendChild(square);
    }
}

// Generate squares immediately on page load
generateSquares();

// Loading assets with progress
let progress = 0;
const loadingText = document.getElementById("loadingText");

const interval = setInterval(() => {
    if (progress < 100) {
        progress += 1; // Increment by 1% for a smooth transition
        loadingText.textContent = `Loading Assets ${progress}%`;
    } else {
        clearInterval(interval);
        loadingScreen.style.display = "none"; // Hide loading screen
        showTapToContinue(); // Show "Tap to Continue" text
    }
}, 30); // Update every 30 milliseconds for a smooth effect

function showTapToContinue() {
    const tapText = document.createElement("h3");
    tapText.textContent = "Tap to Continue";
    tapText.style.position = "absolute";
    tapText.style.top = "50%";
    tapText.style.left = "50%";
    tapText.style.transform = "translate(-50%, -50%)";
    tapText.style.color = "white"; // Ensure the text is visible
    tapText.style.fontSize = "2em"; // Adjust font size as needed
    document.body.appendChild(tapText);

    // Add click event to the entire document
    document.addEventListener("click", () => {
        mainContent.style.display = "block"; // Show main content
        tapText.remove(); // Remove the tap text after clicking
        document.removeEventListener("click", arguments.callee); // Remove the event listener to prevent multiple triggers
    }, { once: true }); // Use { once: true } to ensure the listener is removed after the first click
}

// Custom cursor functionality
document.addEventListener('mousemove', (e) => {
    cursorImage.style.display = 'block'; // Show custom cursor
    cursorImage.style.left = `${e.pageX}px`; // Position cursor image
    cursorImage.style.top = `${e.pageY}px`; // Position cursor image
});

// Hide custom cursor when mouse leaves the window
document.addEventListener('mouseleave', () => {
    cursorImage.style.display = 'none'; // Hide custom cursor
});

// Optional: Add mousemove event listener for scaling effect
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

// Ensure squares are generated on window resize
window.addEventListener('resize', generateSquares); // Regenerate squares when the window is resized
