// Life.js Code Window Typing Animation
// Simulates live typing effect for the life.js code snippet

function initLifeTyping() {
    const codeContent = document.querySelector('.life-code-content');
    if (!codeContent) return;

    // The code to type with syntax highlighting classes
    const codeLines = [
        {
            parts: [
                { text: 'while', class: 'keyword' },
                { text: '(', class: 'plain' },
                { text: 'Louay', class: 'variable' },
                { text: ' == ', class: 'plain' },
                { text: 'ALIVE', class: 'constant' },
                { text: ') {', class: 'plain' }
            ],
            pauseAfter: 400
        },
        {
            parts: [
                { text: '  ', class: 'plain' },
                { text: 'eat', class: 'function' },
                { text: '();', class: 'plain' }
            ],
            pauseAfter: 300,
            indent: 'indent-1'
        },
        {
            parts: [
                { text: '  💻 ', class: 'plain' },
                { text: 'code', class: 'function' },
                { text: '(', class: 'plain' },
                { text: '24', class: 'number' },
                { text: ', ', class: 'plain' },
                { text: '7', class: 'number' },
                { text: ');', class: 'plain' }
            ],
            pauseAfter: 300,
            indent: 'indent-1'
        },
        {
            parts: [
                { text: '  🌍 ', class: 'plain' },
                { text: 'live', class: 'function' },
                { text: '(', class: 'plain' },
                { text: '0xEXP10RE', class: 'hex' },
                { text: ');', class: 'plain' }
            ],
            pauseAfter: 300,
            indent: 'indent-1'
        },
        {
            parts: [
                { text: '}', class: 'plain' }
            ],
            pauseAfter: 0
        }
    ];

    // Clear existing content
    codeContent.innerHTML = '';

    let currentLineIndex = 0;
    let currentPartIndex = 0;
    let currentCharIndex = 0;
    let currentLineElement = null;
    let currentSpanElement = null;
    let cursorElement = null;

    // Create blinking cursor
    function createCursor() {
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        cursor.textContent = '▊';
        return cursor;
    }

    function typeCharacter() {
        // Animation complete - restart after a pause
        if (currentLineIndex >= codeLines.length) {
            if (cursorElement) {
                cursorElement.remove();
            }
            // Wait 2 seconds, then restart the animation
            setTimeout(() => {
                codeContent.innerHTML = '';
                currentLineIndex = 0;
                currentPartIndex = 0;
                currentCharIndex = 0;
                currentLineElement = null;
                currentSpanElement = null;
                cursorElement = null;
                typeCharacter();
            }, 2000);
            return;
        }

        const currentLine = codeLines[currentLineIndex];

        // Create new line element if needed
        if (currentPartIndex === 0 && currentCharIndex === 0) {
            currentLineElement = document.createElement('div');
            currentLineElement.className = 'code-line';
            if (currentLine.indent) {
                currentLineElement.classList.add(currentLine.indent);
            }
            codeContent.appendChild(currentLineElement);
        }

        const currentPart = currentLine.parts[currentPartIndex];

        // Create new span for this part if needed
        if (currentCharIndex === 0) {
            currentSpanElement = document.createElement('span');
            currentSpanElement.className = currentPart.class;
            currentLineElement.appendChild(currentSpanElement);
        }

        // Type next character
        if (currentCharIndex < currentPart.text.length) {
            currentSpanElement.textContent += currentPart.text[currentCharIndex];
            currentCharIndex++;

            // Add cursor at the end
            if (cursorElement) cursorElement.remove();
            cursorElement = createCursor();
            currentLineElement.appendChild(cursorElement);

            // Variable typing speed with occasional pauses
            let delay = 50 + Math.random() * 80; // 50-130ms base speed

            // Add longer pauses after certain characters for realism
            const char = currentPart.text[currentCharIndex - 1];
            if (char === '(' || char === ')' || char === '{' || char === '}') {
                delay += Math.random() * 100; // Extra pause after brackets
            } else if (char === ' ') {
                delay += Math.random() * 50; // Slight pause after spaces
            } else if (char === ',' || char === ';') {
                delay += Math.random() * 80; // Pause after punctuation
            }

            setTimeout(typeCharacter, delay);
        } else {
            // Part complete, move to next part
            currentCharIndex = 0;
            currentPartIndex++;

            if (currentPartIndex >= currentLine.parts.length) {
                // Line complete, move to next line
                currentPartIndex = 0;
                currentLineIndex++;

                // Remove cursor before line break
                if (cursorElement) {
                    cursorElement.remove();
                    cursorElement = null;
                }

                setTimeout(typeCharacter, currentLine.pauseAfter);
            } else {
                // Continue with next part
                setTimeout(typeCharacter, 20);
            }
        }
    }

    // Start typing animation after a short delay
    setTimeout(typeCharacter, 800);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLifeTyping);
} else {
    initLifeTyping();
}
