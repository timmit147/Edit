const textarea = document.querySelector('textarea');
        const copyButton = document.getElementById('copyButton');

        copyButton.addEventListener('click', function() {
            let text = textarea.value;

            // Remove single-line comments (//)
            text = text.replace(/\/\/.*(?=\n|$)/g, '');

            // Remove multi-line comments (/* ... */)
            text = text.replace(/\/\*[\s\S]*?\*\//g, '');

            // Normalize new lines: remove extra new lines while keeping at least one
            text = text.replace(/(\n\s*\n)+/g, '\n\n');

            // Trim leading/trailing whitespace
            text = text.trim();

            function escapeHtml(html) {
                const textArea = document.createElement('textarea');
                textArea.textContent = html;
                return textArea.innerHTML;
            }

            const escapedText = escapeHtml(text);

            // Copy to clipboard
            navigator.clipboard.writeText(escapedText).then(() => {
                alert('Copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });