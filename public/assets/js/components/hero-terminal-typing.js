function initHeroTerminalTyping(name) {
    name = name || 'louay';
    const nameLower = name.toLowerCase();

    const terminal = document.getElementById('hero-terminal');
    if (!terminal) return;

    // Clear any previous animation
    terminal.innerHTML = '';

    const lines = [
        {
            text: nameLower + '@cloud:~/infrastructure$ terraform apply -auto-approve',
            color: '#7dd3fc',
            type: 'command'
        },
        {
            text: '✓ Network ready',
            icon: '✓ ',
            iconColor: '#22c55e',
            textColor: '#cbd5e1',
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
            iconColor: '#f59e0b',
            textColor: '#fef3c7',
            type: 'final'
        }
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId = null;

    // Store timeout id on the terminal element so Angular can cancel it on re-call
    if (terminal._heroTypingTimeout) {
        clearTimeout(terminal._heroTypingTimeout);
        terminal._heroTypingTimeout = null;
    }

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
        if (lineIndex >= lines.length) {
            terminal._heroTypingTimeout = setTimeout(() => {
                terminal.innerHTML = '';
                lineIndex = 0;
                charIndex = 0;
                tick();
            }, 2500);
            return;
        }

        const currentLine = lines[lineIndex];
        const fullText = currentLine.text;

        terminal.innerHTML = '';

        for (let i = 0; i < lineIndex; i++) {
            renderLine(lines[i], lines[i].text.length, false);
        }

        if (charIndex <= fullText.length) {
            renderLine(currentLine, charIndex, true);
            charIndex++;
            const delay = 40 + Math.random() * 40;
            terminal._heroTypingTimeout = setTimeout(tick, delay);
        } else {
            renderLine(currentLine, fullText.length, false);
            lineIndex++;
            charIndex = 0;
            const interLinePause = 600 + Math.random() * 400;
            terminal._heroTypingTimeout = setTimeout(tick, interLinePause);
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
            span.textContent = lineData.text.slice(0, length);
            lineElement.appendChild(span);
        } else {
            const iconLength = lineData.icon.length;
            if (length > 0) {
                const iconSpan = document.createElement('span');
                iconSpan.style.color = lineData.iconColor;
                iconSpan.textContent = lineData.icon.slice(0, Math.min(length, iconLength));
                lineElement.appendChild(iconSpan);
            }
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

    terminal._heroTypingTimeout = setTimeout(tick, 500);
}
