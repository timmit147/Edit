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

    // Replace newlines with <br> for HTML output
    // Escape HTML to prevent rendering
    const output = text.replace(/&/g, '&amp;') // Escape ampersand
                       .replace(/</g, '&lt;')  // Escape less than
                       .replace(/>/g, '&gt;')  // Escape greater than
                       .replace(/\n/g, '<br>'); // Replace newlines with <br>

    // Set the output
    outputDiv.innerHTML = output;
});
