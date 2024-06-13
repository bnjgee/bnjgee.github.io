    const terminal = document.getElementById('terminal-display');
    const input = document.getElementById('input');
    const cursor = document.getElementById('cursor');
    input.addEventListener('keydown', handleKeyPress);
    const text = 'echo Dont be afraid to use this command line!'; // Text to be typed
    const speed = 100; // Typing speed in milliseconds

    let index = 0;
    let typingComplete = false;

    function typeText() {
        if (index < text.length) {
            input.value += text.charAt(index);
            index++;
            setTimeout(typeText, speed);
        } else {
            typingComplete = true;
            input.removeAttribute('disabled');
            input.focus();
            simulateEnter();
        }
    }

    function simulateEnter() {
        const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
        });
        input.dispatchEvent(enterEvent);
    }

    input.setAttribute('disabled', 'disabled');
    setTimeout(typeText, 1000); // Delay start of typing animation by 1 second

    input.addEventListener('keydown', function(event) {
        if (!typingComplete) {
            event.preventDefault();
        }
    });

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = input.value.trim();
            input.value = '';
            appendToTerminal('>' + command);
            executeCommand(command);
        }
    }

    function executeCommand(command) {
        // Add your command execution logic here
        // This is just a basic example
        if (command === 'help') {
            appendToTerminal('Available commands:');
            appendToTerminal('- help: Display available commands');
            appendToTerminal('- date: Show current date');
            appendToTerminal('- echo [text]: Echo the given text');
        } else if (command === 'date') {
            const currentDate = new Date().toLocaleDateString();
            appendToTerminal('Current date: ' + currentDate);
        } else if (command.startsWith('echo ')) {
            const text = command.substring(5);
            appendToTerminal(text);
        } else {
            appendToTerminal('Command not found: ' + command);
        }
    }

    function appendToTerminal(text) {
        const line = document.createElement('p');
        line.textContent = text;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }