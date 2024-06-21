const textbox = document.getElementById('textbox');
const circle = document.getElementById('envelope');
const pauseResumeButton = document.getElementById('pauseResumeButton');
const replayButton = document.getElementById('replayButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const graphicContainer = document.querySelector('.graphic-container');
const animationDuration = 2000; // Duration of the animation in milliseconds
const maxIterations = 4; // 4 complete back and forth
const envelopeLeftPX = 55;
const textboxLeftPX = 25;
const firstMessage = "DHCPDISCOVER"
let iteration = 0;
let isPaused = false;
let startTime;
let elapsedTime = 0;
let requestId;

// Insert the string into the div
textbox.textContent = firstMessage;

function calculateDistance() {
    const containerWidth = graphicContainer.clientWidth - 40;
    const envelopeWidth = circle.clientWidth;
    const textboxWidth = textbox.clientWidth;
    const circleDistance = containerWidth - envelopeWidth - envelopeLeftPX; // 50px padding on both sides
    const textboxDistance = containerWidth - textboxWidth - textboxLeftPX - 10; // Adjust 50px padding as needed
    return { circleDistance, textboxDistance };
}


let { circleDistance, textboxDistance } = calculateDistance();

// Function to observe changes in width
function observeWidthChange() {
    if (!graphicContainer) {
        console.error('Element with class "graphic-container" not found');
        return;
    }

    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            console.log('Width changed to:', entry.contentRect.width);
            ({ circleDistance, textboxDistance} = calculateDistance());
        }
    });

    resizeObserver.observe(graphicContainer);
}
  
// Call the function to start observing
observeWidthChange();

function animate(time) {
    if (!startTime) startTime = time;
    const progress = (time - startTime + elapsedTime) / animationDuration;
    const circleMoveDistance = Math.min(progress * circleDistance, circleDistance);
    const textboxMoveDistance = Math.min(progress * textboxDistance, textboxDistance);

    if (iteration % 2 === 0) {
        // Move right
        circle.style.left = envelopeLeftPX + circleMoveDistance + 'px';
        textbox.style.left = textboxLeftPX + textboxMoveDistance + 'px';
    } else {
        // Move left
        circle.style.left = circleDistance + envelopeLeftPX - circleMoveDistance + 'px';
        textbox.style.left = textboxDistance + textboxLeftPX - textboxMoveDistance + 'px';
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

function updateText() {
    switch (iteration) {
        case 1:
            textbox.innerText = 'DHCPOFFER';
            break;
        case 2:
            textbox.innerText = 'DHCPREQUEST';
            break;
        case 3:
            textbox.innerText = 'DHCPACK';
            break;
        case 0:
            textbox.innerText = firstMessage;
            break;
        default:
            // Optional: handle other cases if necessary
            break;
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
    pauseResumeButton.disabled = false;
    circle.style.left = `${envelopeLeftPX}px`;
    circle.style.left = `${textboxLeftPX}px`;
    textbox.innerText = firstMessage;
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
        circle.style.left = envelopeLeftPX + (iteration / 2) * circleDistance + 'px';
        textbox.style.left = textboxLeftPX + (iteration / 2) * textboxDistance + 'px';
    } else {
        circle.style.left = circleDistance + envelopeLeftPX - ((iteration - 1) / 2) * circleDistance + 'px';
        textbox.style.left = textboxDistance + textboxLeftPX - ((iteration - 1) / 2) * textboxDistance + 'px';
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