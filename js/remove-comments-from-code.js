const textarea = document.querySelector('textarea');
const outputDiv = document.querySelector('.non-editable');

textarea.addEventListener('input', function() {
    let text = textarea.value;

    // Remove single-line comments (// comment)
    text = text.replace(/\/\/.*$/gm, '');

    // Remove multi-line comments (/* comment */)
    text = text.replace(/\/\*[\s\S]*?\*\//g, '');

    // Remove duplicate empty lines
    text = text.replace(/(\n\s*\n)+/g, '\n\n');

    // Escape HTML special characters
    function escapeHtml(html) {
        const textArea = document.createElement('textarea');
        textArea.textContent = html; // Use textContent to set the text
        return textArea.innerHTML; // Get the escaped HTML
    }

    // Escape the text to prevent HTML interpretation
    const escapedText = escapeHtml(text);

    // Replace newlines with <br> for HTML output
    const output = escapedText.replace(/\n/g, '<br>');

    // Set the output
    outputDiv.innerHTML = output;
});
