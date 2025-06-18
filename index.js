// DOM elements mapped to our HTML structure
const passwordEl = document.getElementById('generatedPassword');
const lengthEl = document.getElementById('lengthSlider');
const lengthVal = document.getElementById('lengthValue');
const copyBtn = document.getElementById('copyBtn');
const generateBtn = document.getElementById('generateBtn');
const lowercaseEl = document.querySelector('#lowercase');
const uppercaseEl = document.querySelector('#uppercase');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
const excludeDupEl = document.querySelector('#excludeDuplicate');
const includeSpacesEl = document.querySelector('#includeSpaces');

// Character sets
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()-_=+[]{};:,.<>?/\\|';
const spaceChar = ' ';

// Update length value display when slider changes
lengthEl.addEventListener('input', () => {
    lengthVal.textContent = lengthEl.value;
});

// Copy to clipboard function
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordEl.textContent);
    
    // Visual feedback with our existing SVG icon
    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
    `;
    copyBtn.style.color = '#28a745';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.color = '#666';
    }, 1500);
});

// Generate password event listener
generateBtn.addEventListener('click', generatePassword);

// Generate password function
function generatePassword() {
    let charPool = '';
    let password = '';
    const length = +lengthEl.value;
    
    // Debug: log checkbox states
    console.log('Checkbox states:', {
        lowercase: lowercaseEl.checked,
        uppercase: uppercaseEl.checked,
        numbers: numbersEl.checked,
        symbols: symbolsEl.checked,
        includeSpaces: includeSpacesEl.checked,
        excludeDup: excludeDupEl.checked
    });
    
    if (lowercaseEl.checked) charPool += lowercaseChars;
    if (uppercaseEl.checked) charPool += uppercaseChars;
    if (numbersEl.checked) charPool += numberChars;
    if (symbolsEl.checked) charPool += symbolChars;
    if (includeSpacesEl.checked) charPool += spaceChar.repeat(3);
    
    console.log('Character pool:', charPool);
    
    if (!charPool) return (passwordEl.textContent = 'Select at least one option');
    
    const usedChars = new Set();
    for (let i = 0; i < length; i++) {
        const char = charPool.charAt(Math.floor(Math.random() * charPool.length));
        if (excludeDupEl.checked && usedChars.has(char)) {
            i--;
            continue;
        }
        password += char;
        usedChars.add(char);
    }
    
    passwordEl.textContent = password;
}

// Generate initial password on page load
window.addEventListener('load', generatePassword);