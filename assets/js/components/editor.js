function initEditor() {
    const tabs = document.querySelectorAll('.tab');
    const fileItems = document.querySelectorAll('.file-item');
    const fileLists = document.querySelectorAll('.file-list-container');
    const contents = document.querySelectorAll('.file-content');

    // Icons
    const ICON_FILLED = 'assets/images/folder-filled.png';
    const ICON_OUTLINE = 'assets/images/folder-outline.png';

    // 1. Tab / Folder Switching Logic
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Deactivate all tabs
                tabs.forEach(t => {
                    t.classList.remove('active');
                    const icon = t.querySelector('.tab-icon-img');
                    if (icon) icon.src = ICON_OUTLINE;
                });

                // Activate clicked tab
                tab.classList.add('active');
                const icon = tab.querySelector('.tab-icon-img');
                if (icon) icon.src = ICON_FILLED;

                // Update Header Title
                const windowTitle = document.querySelector('.window-title');
                if (windowTitle) {
                    windowTitle.textContent = tab.innerText.trim();
                }

                // Switch Sidebar List
                const tabId = tab.getAttribute('data-tab');
                let activeList = null;

                fileLists.forEach(list => {
                    list.classList.remove('active');
                    if (list.id === `list-${tabId}`) {
                        list.classList.add('active');
                        activeList = list;
                    }
                });

                // Auto-select first file of the new list
                if (activeList) {
                    const firstFile = activeList.querySelector('.file-item');
                    if (firstFile) {
                        firstFile.click();
                    }
                }
            });
        });
    }

    // 2. File Switching Logic
    if (fileItems.length > 0) {
        fileItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update Sidebar Active State (for ALL lists to be safe, or just current)
                fileItems.forEach(f => f.classList.remove('active'));
                item.classList.add('active');

                // Update Main Content
                const fileId = item.getAttribute('data-file');
                contents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `content-${fileId}`) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
}
