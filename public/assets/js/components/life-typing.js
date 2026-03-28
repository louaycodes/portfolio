function initLifeTyping(name) {
    name = name || 'Louay';

    const codeContent = document.querySelector('.life-code-content');
    if (!codeContent) return;

    // Cancel any previous animation
    if (codeContent._lifeTypingTimeout) {
        clearTimeout(codeContent._lifeTypingTimeout);
        codeContent._lifeTypingTimeout = null;
    }

    // Clear existing content
    codeContent.innerHTML = '';

    const codeLines = [
        {
            parts: [
                { text: 'while', class: 'keyword' },
                { text: '(', class: 'plain' },
                { text: name, class: 'variable' },
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

    let currentLineIndex = 0;
    let currentPartIndex = 0;
    let currentCharIndex = 0;
    let currentLineElement = null;
    let currentSpanElement = null;
    let cursorElement = null;

    function createCursor() {
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        cursor.textContent = '▊';
        return cursor;
    }

    function typeCharacter() {
        if (currentLineIndex >= codeLines.length) {
            if (cursorElement) cursorElement.remove();
            codeContent._lifeTypingTimeout = setTimeout(() => {
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

        if (currentPartIndex === 0 && currentCharIndex === 0) {
            currentLineElement = document.createElement('div');
            currentLineElement.className = 'code-line';
            if (currentLine.indent) {
                currentLineElement.classList.add(currentLine.indent);
            }
            codeContent.appendChild(currentLineElement);
        }

        const currentPart = currentLine.parts[currentPartIndex];

        if (currentCharIndex === 0) {
            currentSpanElement = document.createElement('span');
            currentSpanElement.className = currentPart.class;
            currentLineElement.appendChild(currentSpanElement);
        }

        if (currentCharIndex < currentPart.text.length) {
            currentSpanElement.textContent += currentPart.text[currentCharIndex];
            currentCharIndex++;

            if (cursorElement) cursorElement.remove();
            cursorElement = createCursor();
            currentLineElement.appendChild(cursorElement);

            let delay = 50 + Math.random() * 80;
            const char = currentPart.text[currentCharIndex - 1];
            if (char === '(' || char === ')' || char === '{' || char === '}') {
                delay += Math.random() * 100;
            } else if (char === ' ') {
                delay += Math.random() * 50;
            } else if (char === ',' || char === ';') {
                delay += Math.random() * 80;
            }

            codeContent._lifeTypingTimeout = setTimeout(typeCharacter, delay);
        } else {
            currentCharIndex = 0;
            currentPartIndex++;

            if (currentPartIndex >= currentLine.parts.length) {
                currentPartIndex = 0;
                currentLineIndex++;

                if (cursorElement) {
                    cursorElement.remove();
                    cursorElement = null;
                }

                codeContent._lifeTypingTimeout = setTimeout(typeCharacter, currentLine.pauseAfter);
            } else {
                codeContent._lifeTypingTimeout = setTimeout(typeCharacter, 20);
            }
        }
    }

    codeContent._lifeTypingTimeout = setTimeout(typeCharacter, 800);
}
