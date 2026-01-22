// Terminal Typing Animation
// Simulates live typing effect for terminal commands

function initTerminalTyping() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;

    // Terminal lines to type
    const lines = [
        { text: 'Initializing Cloud Environment...', class: 'typing-line', delay: 100 },
        { text: 'Provisioning Terraform modules...', class: 'typing-line', delay: 800 },
        { text: 'Deploying Kubernetes cluster [||||||||||] 100%', class: 'typing-line', delay: 1200 },
        { text: 'Connection established: louay@cloud-node-01', class: 'typing-line', delay: 600 },
        { text: 'System ready.', class: 'typing-line success', delay: 400 }
    ];

    // Clear existing content
    terminalBody.innerHTML = '';

    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let currentLineElement = null;

    function typeCharacter() {
        if (currentLineIndex >= lines.length) {
            // Animation complete, show cursor
            const cursorLine = document.createElement('div');
            cursorLine.className = 'cursor-line';
            cursorLine.innerHTML = '> <span class="blink">_</span>';
            terminalBody.appendChild(cursorLine);
            return;
        }

        const currentLine = lines[currentLineIndex];

        // Create new line element if needed
        if (currentCharIndex === 0) {
            currentLineElement = document.createElement('div');
            currentLineElement.className = currentLine.class;
            terminalBody.appendChild(currentLineElement);
        }

        // Type next character
        if (currentCharIndex < currentLine.text.length) {
            currentLineElement.textContent += currentLine.text[currentCharIndex];
            currentCharIndex++;

            // Continue typing current line
            setTimeout(typeCharacter, 30 + Math.random() * 40); // 30-70ms per character
        } else {
            // Line complete, move to next line after delay
            currentCharIndex = 0;
            currentLineIndex++;
            setTimeout(typeCharacter, currentLine.delay);
        }
    }

    // Start typing animation after a short delay
    setTimeout(typeCharacter, 500);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminalTyping);
} else {
    initTerminalTyping();
}
