/**
 * Hero Terminal Typing Animation
 * Strictly follows the 2-index (lineIndex, charIndex) accumulation logic.
 */

function initHeroTerminalTyping() {
    const terminal = document.getElementById('hero-terminal');
    if (!terminal) return;

    const lines = [
        {
            text: 'louay@cloud:~/infrastructure$ terraform apply -auto-approve',
            color: '#7dd3fc', // cyan
            type: 'command'
        },
        {
            text: '✓ Network ready',
            icon: '✓ ',
            iconColor: '#22c55e', // green
            textColor: '#cbd5e1', // gray
            type: 'success'
        },
        {
            text: '✓ Kubernetes cluster online',
            icon: '✓ ',
            iconColor: '#22c55e',
            textColor: '#cbd5e1',
            type: 'success'
        },
        {
            text: '✓ 7 compute nodes running',
            icon: '✓ ',
            iconColor: '#22c55e',
            textColor: '#cbd5e1',
            type: 'success'
        },
        {
            text: '✓ Storage attached',
            icon: '✓ ',
            iconColor: '#22c55e',
            textColor: '#cbd5e1',
            type: 'success'
        },
        {
            text: '✓ Load balancer active',
            icon: '✓ ',
            iconColor: '#22c55e',
            textColor: '#cbd5e1',
            type: 'success'
        },
        {
            text: '🚀 Infrastructure deployed successfully',
            icon: '🚀 ',
            iconColor: '#f59e0b', // orange/amber
            textColor: '#fef3c7', // off-white
            type: 'final'
        }
    ];

    // State persisted outside the tick function
    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId = null;

    // Helper to create the cursor
    function createCursor() {
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor-blink';
        cursor.textContent = '▍';
        cursor.style.cssText = `
            display: inline-block;
            animation: terminal-blink 1s step-end infinite;
            margin-left: 2px;
            color: #cbd5e1;
            vertical-align: middle;
        `;
        return cursor;
    }

    // Add cursor animation if missing
    if (!document.getElementById('terminal-cursor-style')) {
        const style = document.createElement('style');
        style.id = 'terminal-cursor-style';
        style.textContent = `
            @keyframes terminal-blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    function tick() {
        // 1. Check if we finished all lines
        if (lineIndex >= lines.length) {
            const pauseBeforeRestart = 2000 + Math.random() * 500;
            timeoutId = setTimeout(() => {
                terminal.innerHTML = '';
                lineIndex = 0;
                charIndex = 0;
                tick();
            }, pauseBeforeRestart);
            return;
        }

        const currentLine = lines[lineIndex];
        const fullText = currentLine.text;

        // 2. Clear terminal and redraw all completed lines + current partial line
        // (This ensures layout matches exactly and we use slice(0, charIndex) correctly)
        terminal.innerHTML = '';

        // Render completed lines
        for (let i = 0; i < lineIndex; i++) {
            renderLine(lines[i], lines[i].text.length, false);
        }

        // Render current line with slice
        if (charIndex <= fullText.length) {
            renderLine(currentLine, charIndex, true);

            // Logic: Increment charIndex
            charIndex++;

            // Speeded up typing speed 40-80ms
            const delay = 40 + Math.random() * 40;
            timeoutId = setTimeout(tick, delay);
        } else {
            // Line complete
            // Finalize this line and move to next
            renderLine(currentLine, fullText.length, false);

            lineIndex++;
            charIndex = 0;

            // Speeded up inter-line pause 600-1000ms
            const interLinePause = 600 + Math.random() * 400;
            timeoutId = setTimeout(tick, interLinePause);
        }
    }

    function renderLine(lineData, length, showCursor) {
        const lineElement = document.createElement('div');
        lineElement.style.cssText = `
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Consolas', monospace;
            font-size: 14px;
            line-height: 1.6;
            margin: 2px 0;
            min-height: 1.6em;
            display: flex;
            align-items: center;
            white-space: pre-wrap;
        `;

        if (lineData.type === 'command') {
            const span = document.createElement('span');
            span.style.color = lineData.color;
            // For command, we just slice the full text including the prompt
            span.textContent = lineData.text.slice(0, length);
            lineElement.appendChild(span);
        } else {
            // Success or Final logic: Icon + Text
            // The text in lineData.text actually contains the icon already in the data array
            // but we want separate colors.
            const iconLength = lineData.icon.length;

            // Icon span
            if (length > 0) {
                const iconSpan = document.createElement('span');
                iconSpan.style.color = lineData.iconColor;
                iconSpan.textContent = lineData.icon.slice(0, length);
                lineElement.appendChild(iconSpan);
            }

            // Text span
            if (length > iconLength) {
                const textSpan = document.createElement('span');
                textSpan.style.color = lineData.textColor;
                textSpan.textContent = lineData.text.slice(iconLength, length);
                lineElement.appendChild(textSpan);
            }
        }

        if (showCursor) {
            lineElement.appendChild(createCursor());
        }

        terminal.appendChild(lineElement);
    }

    // Cleanup logic
    function cleanup() {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }

    // Start
    timeoutId = setTimeout(tick, 500);

    // Persist cleanup
    window.addEventListener('beforeunload', cleanup);

    // Return cleanup for manual calls if needed
    return cleanup;
}

// Initialization and re-initialization protection
(function () {
    let currentCleanup = null;

    function start() {
        if (currentCleanup) currentCleanup();
        currentCleanup = initHeroTerminalTyping();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
