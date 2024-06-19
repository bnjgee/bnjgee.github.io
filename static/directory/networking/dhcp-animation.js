const textbox = document.getElementById('textbox');
const circle = document.getElementById('envelope');
const pauseResumeButton = document.getElementById('pauseResumeButton');
const replayButton = document.getElementById('replayButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const graphicContainer = document.querySelector('.graphic-container');
const resizeButton = document.getElementById('resizeButton');
const animationDuration = 2000; // Duration of the animation in milliseconds
const maxIterations = 4; // 4 complete back and forth
const envelopeLeftPX = 55;
const textboxLeftPX = 25;
let iteration = 0;
let isPaused = false;
let startTime;
let elapsedTime = 0;
let requestId;

// Function to update the distance and do something with it
function updateDistance() {
    const distance = calculateDistance();
    console.log('Updated distance:', distance);
    // You can add more logic here to handle the updated distance
}

// Add event listener for window resize
window.addEventListener('resize', updateDistance);

// Initial calculation
updateDistance();

function calculateDistance() {
    const containerWidth = graphicContainer.clientWidth - 40;
    const envelopeWidth = circle.clientWidth;
    return containerWidth - envelopeWidth - envelopeLeftPX; // 50px padding on both sides
}

let distance = calculateDistance();

window.addEventListener('resize', () => {
    distance = calculateDistance();
});

function updateText() {
    if (iteration % 2 === 1) {
        if (iteration === 1) {
            textbox.innerText = 'Test 2';
        } else if (iteration === 3) {
            textbox.innerText = 'Test 4';
        }
    } else {
        if (iteration === 2) {
            textbox.innerText = 'Test 3';
        } else if (iteration === 0) {
            textbox.innerText = 'Test';
        }
    }
}

function animate(time) {
    if (!startTime) startTime = time;
    const progress = (time - startTime + elapsedTime) / animationDuration;
    const moveDistance = Math.min(progress * distance, distance);

    if (iteration % 2 === 0) {
        // Move right
        circle.style.left = envelopeLeftPX + moveDistance + 'px';
        textbox.style.left = textboxLeftPX + moveDistance + 'px';
    } else {
        // Move left
        circle.style.left = distance + envelopeLeftPX - moveDistance + 'px';
        textbox.style.left = distance + textboxLeftPX - moveDistance + 'px';
    }

    if (progress < 1) {
        requestId = requestAnimationFrame(animate);
    } else if (iteration == (maxIterations - 1)) {
        iteration++;
    } else {
        startTime = null;
        elapsedTime = 0;
        if (iteration < maxIterations) {
            iteration++;
            updateText();
            requestId = requestAnimationFrame(animate);
        }
    }
}

function pauseResumeAnimation() {
    if (isPaused) {
        // Resume the animation
        startTime = null;
        requestId = requestAnimationFrame(animate);
        pauseResumeButton.innerText = 'Pause';
        isPaused = false;
    } else {
        // Pause the animation
        cancelAnimationFrame(requestId);
        elapsedTime += performance.now() - startTime;
        pauseResumeButton.innerText = 'Resume';
        isPaused = true;
    }
}

function replayAnimation() {
    cancelAnimationFrame(requestId);
    circle.style.left = `${envelopeLeftPX}px`;
    circle.style.left = `${textboxLeftPX}px`;
    textbox.innerText = 'Test';
    iteration = 0;
    isPaused = false;
    pauseResumeButton.innerText = 'Pause';
    startTime = null;
    elapsedTime = 0;
    requestId = requestAnimationFrame(animate);
}

function moveToIteration(iterationDelta) {
    cancelAnimationFrame(requestId);

    // Adjust iteration index based on delta
    iteration += iterationDelta;

    // Ensure iteration is within bounds
    if (iteration < 0) {
        iteration = 0;
    } else if (iteration > maxIterations || iteration == maxIterations) {
        iteration = (maxIterations - 1);
    }
    // Update text based on current iteration
    updateText();

    // Calculate position based on even or odd iteration
    if (iteration % 2 === 0) {
        circle.style.left = envelopeLeftPX + (iteration / 2) * distance + 'px';
        textbox.style.left = textboxLeftPX + (iteration / 2) * distance + 'px';
    } else {
        circle.style.left = distance + envelopeLeftPX - ((iteration - 1) / 2) * distance + 'px';
        textbox.style.left = distance + textboxLeftPX - ((iteration - 1) / 2) * distance + 'px';
    }

    // Restart animation if not paused
    if (!isPaused) {
        startTime = null;
        requestId = requestAnimationFrame(animate);
    }
}

function enableNextButton() {
    if (iteration >= (maxIterations - 1)) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

pauseResumeButton.addEventListener('click', pauseResumeAnimation);
replayButton.addEventListener('click', replayAnimation);
prevButton.addEventListener('click', () => moveToIteration(-1));
nextButton.addEventListener('click', () => moveToIteration(1));
requestId = requestAnimationFrame(animate);
