const canvas = document.getElementById('gridCanvas');
const context = canvas.getContext('2d');
const gridSize = 16;
const cellSize = canvas.width / gridSize;

function drawGrid() {
    for (let x = 0; x <= canvas.width; x += cellSize) {
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
    }

    for (let y = 0; y <= canvas.height; y += cellSize) {
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
    }

    context.strokeStyle = '#000';
    context.stroke();
}

drawGrid();

// Resize the canvas to fit the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Prevent the context menu from appearing
canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    drawDot(x, y);
});

function drawDot(x, y) {
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fill();
}