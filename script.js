let display = document.getElementById('display');

// Append a number to the display
function appendNumber(number) {
    if (display.value === '0') {
        display.value = number;
    } else {
        display.value += number;
    }
}

// Append an operator to the display
function appendOperator(operator) {
    const lastChar = display.value[display.value.length - 1];
    
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/', '.'].includes(lastChar)) {
        return;
    }
    
    // Prevent operators at the start
    if (display.value === '') {
        return;
    }
    
    display.value += operator;
}

// Clear the display
function clearDisplay() {
    display.value = '0';
}

// Delete the last character
function deleteLast() {
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// Calculate the result
function calculate() {
    try {
        // Replace display symbols with JavaScript operators
        let expression = display.value.replace('÷', '/').replace('×', '*').replace('−', '-');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Handle floating point precision
        result = Math.round(result * 100000000) / 100000000;
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '0';
        }, 1500);
    }
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === '.') {
        appendOperator('.');
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});