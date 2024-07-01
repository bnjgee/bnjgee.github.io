const oneWrapper = document.getElementById('one');
const twoWrapper = document.getElementById('two');
const threeWrapper = document.getElementById('three');
const fourWrapper = document.getElementById('four');
const fiveWrapper = document.getElementById('five');
const sixWrapper = document.getElementById('six');
const sevenWrapper = document.getElementById('seven');
const eightWrapper = document.getElementById('eight');
const textbox = document.getElementById('textbox');
const IPClient = document.getElementById('IP-client');
const IPServer = document.getElementById('IP-server');
const circle = document.getElementById('envelope');
const pauseResumeButton = document.getElementById('pauseResumeButton');
const replayButton = document.getElementById('replayButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const graphicContainer = document.querySelector('.graphic-container');

const envelopeLeftPX = 55;
const textboxLeftPX = 25;
const DHCPFirstName = "DHCPDISCOVER";
let animationDuration;
let iteration = 0;
let isPaused = false;
let startTime;
let elapsedTime = 0;
let requestId;
let DHCPMessageNumber = 0;
let maxIterations = 0;
let checkRight = false;


window.onload = function() {
    animationDuration = 2000;
    if (oneWrapper) {
        // Simulate a click event
        oneWrapper.click();
    }
};

maxIterations = DHCPMessage();

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
        

        if (progress >= 1 && circleMoveDistance === circleDistance) {
            iteration++;
            console.log("iteration:",iteration);
            DHCPMessage(DHCPMessageNumber);
        }

    } else {
        // Move left
        circle.style.left = circleDistance + envelopeLeftPX - circleMoveDistance + 'px';
        textbox.style.left = textboxDistance + textboxLeftPX - textboxMoveDistance + 'px';
    
        if (progress >= 1 && circleMoveDistance === circleDistance) {
            iteration++;
            console.log("iteration:",iteration);
            DHCPMessage(DHCPMessageNumber);
        }

    }
    
    if (progress < 1) {
        requestId = requestAnimationFrame(animate);
    
    } else {
        startTime = null;
        elapsedTime = 0;
        if (iteration < maxIterations) {
            //iteration++;
            requestId = requestAnimationFrame(animate);
        }
        
    }
    
}


function DHCPMessage(funcNumber) {
    switch (funcNumber) {
        case 1:
            defaultDHCPMessage();
            maxIterations = 4;
            checkRight = false;
            return maxIterations;
        case 2:
            DHCPMessageNAK();
            maxIterations = 4;
            checkRight = false;
            return maxIterations;
        case 3:
            DHCPMessageDecline();
            maxIterations = 3;
            checkRight = true;
            return maxIterations;
        case 4:
            DHCPMessageRelease();
            maxIterations = 1;
            checkRight = true;
            return maxIterations;
        case 5:
            DHCPMessageInform();
            maxIterations = 1;
            checkRight = true;
            return maxIterations;
        default:
            console.log("Invalid function number");
            defaultDHCPMessage();
    }
}

function defaultDHCPMessage() {
    const unselectedMessages = [fiveWrapper, sixWrapper, sevenWrapper, eightWrapper]; 
    const selectedMessages = [oneWrapper, twoWrapper, threeWrapper, fourWrapper];

    switch (iteration) {
        case 1:
            textbox.innerText = 'DHCPOFFER';
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            twoWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            IPClient.innerText = "IP: 169.254.65.23";
            break;
        case 2:
            textbox.innerText = 'DHCPREQUEST';
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            threeWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            IPClient.innerText = "IP: 169.254.65.23";
            break;
        case 3:
            textbox.innerText = 'DHCPACK';
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            fourWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            IPClient.innerText = "IP: 169.254.65.23";
            break;
        case 4:
            IPClient.innerText = "IP: 192.168.0.2";
            break;
        case 0:
            textbox.innerText = DHCPFirstName;
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            oneWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            IPClient.innerText = "IP: 169.254.65.23";
            break;
        default:
            // Optional: handle other cases if necessary
            break;
    }
}

function DHCPMessageNAK() {
    const unselectedMessages = [fourWrapper, sixWrapper, sevenWrapper, eightWrapper]; 
    const selectedMessages = [oneWrapper, twoWrapper, threeWrapper, fiveWrapper];

    switch (iteration) {
        case 1:
            textbox.innerText = 'DHCPOFFER';
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            twoWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            IPClient.innerText = "IP: 169.254.65.23";
            break;
        case 2:
            textbox.innerText = 'DHCPREQUEST';
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            threeWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            IPClient.innerText = "IP: 169.254.65.23";
            break;
        case 3:
            textbox.innerText = 'DHCPNACK';
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            fiveWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            IPClient.innerText = "IP: 169.254.65.23";
            break;
        case 4:
            IPClient.innerText = "IP: 169.254.65.23";
            break;
        case 0:
            textbox.innerText = DHCPFirstName;
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            oneWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            IPClient.innerText = "IP: 169.254.65.23";
            break;
        default:
            // Optional: handle other cases if necessary
            break;
    }
}

function DHCPMessageDecline() {
    const unselectedMessages = [threeWrapper, fourWrapper, fiveWrapper, sevenWrapper, eightWrapper]; 
    const selectedMessages = [oneWrapper, twoWrapper, sixWrapper];

    switch (iteration) {
        case 1:
            textbox.innerText = 'DHCPOFFER';
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            twoWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            IPClient.innerText = "IP: 169.254.65.23";
            break;
        case 2:
            textbox.innerText = 'DHCPDECLINE';
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            sixWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            //iteration = maxIterations;
            IPClient.innerText = "IP: 169.254.65.23";
            break;

        case 0:
            textbox.innerText = DHCPFirstName;
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            oneWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            IPClient.innerText = "IP: 169.254.65.23";
            break;
        default:
            // Optional: handle other cases if necessary
            break;
    }
}

function DHCPMessageRelease() {
    const unselectedMessages = [oneWrapper, twoWrapper, threeWrapper, fourWrapper, fiveWrapper, sixWrapper, eightWrapper]; 
    const selectedMessages = [sevenWrapper];
    IPClient.innerText = "IP: 192.168.0.2";

    switch (iteration) {
        case 0:
            textbox.innerText = "DHCPRELEASE";
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            sevenWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            setTimeout(() => {
                IPClient.innerText = "IP: 169.254.65.23";
            }, 500);
            break;
        default:
            // Optional: handle other cases if necessary
            IPClient.innerText = "IP: 169.254.65.23"
            break;
    }
}

function DHCPMessageInform() {
    const unselectedMessages = [oneWrapper, twoWrapper, threeWrapper, fourWrapper, fiveWrapper, sixWrapper, sevenWrapper]; 
    const selectedMessages = [eightWrapper];

    switch (iteration) {
        case 0:
            textbox.innerText = "DHCPINFORM";
            selectedMessages.forEach(btn => btn.classList.add('message-selected'));
            eightWrapper.classList.replace('message-selected','message-pointed');

            unselectedMessages.forEach(btn => btn.classList.remove('message-selected','message-pointed'));
            IPClient.innerText = "IP: 192.168.0.2";
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
    iteration = 0;
    DHCPMessage(DHCPMessageNumber);
    cancelAnimationFrame(requestId);
    pauseResumeButton.disabled = false;
    circle.style.left = `${envelopeLeftPX}px`;
    circle.style.left = `${textboxLeftPX}px`;
    //textbox.innerText = DHCPFirstName;
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
    DHCPMessage(DHCPMessageNumber);

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

pauseResumeButton.addEventListener('click', pauseResumeAnimation);
replayButton.addEventListener('click', replayAnimation);
prevButton.addEventListener('click', () => moveToIteration(-1));
nextButton.addEventListener('click', () => moveToIteration(1));
requestId = requestAnimationFrame(animate);