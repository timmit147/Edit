const textarea = document.querySelector('textarea');
const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', function () {
    let text = textarea.value;
    function removeComments(code) {
        let result = '';
        let i = 0;
        let insideSingleLineComment = false;
        let insideMultiLineComment = false;
        let insideString = false;
        let stringDelimiter = '';
        let escaped = false;
        while (i < code.length) {
            if (!insideSingleLineComment && !insideMultiLineComment && (code[i] === '"' || code[i] === "'")) {
                if (!insideString) {
                    insideString = true;
                    stringDelimiter = code[i];
                } else if (code[i] === stringDelimiter && !escaped) {
                    insideString = false; 
                }
                result += code[i]; 
                i++;
                escaped = false; 
            }
            else if (!insideString && !insideMultiLineComment && code[i] === '/' && code[i + 1] === '/') {
                insideSingleLineComment = true;
                i += 2; 
            }
            else if (!insideString && !insideSingleLineComment && code[i] === '/' && code[i + 1] === '*') {
                insideMultiLineComment = true;
                i += 2; 
            }
            else if (insideMultiLineComment && code[i] === '*' && code[i + 1] === '/') {
                insideMultiLineComment = false;
                i += 2; 
            }
            else if (insideSingleLineComment && code[i] === '\n') {
                insideSingleLineComment = false;
                result += '\n'; 
                i++; 
            }
            else if (insideString && code[i] === '\\') {
                escaped = true; 
                result += code[i]; 
                i++; 
            }
            else if (insideSingleLineComment || insideMultiLineComment) {
                i++; 
            } else {
                if (i < code.length - 1 && code[i] === '/' && code[i + 1] === '/') {
                    insideSingleLineComment = true; 
                } else {
                    result += code[i]; 
                }
                i++;
            }
        }
        result = result
            .replace(/\n\s*\n/g, '\n') 
            .replace(/^\s+|\s+$/g, ''); 
        return result;
    }
    text = removeComments(text);
    navigator.clipboard.writeText(text).then(() => {
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});