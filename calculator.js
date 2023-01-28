function operate(a,b,operator) {
    switch (operator) {
        case '+':
            return a + b;

        case '-':
            return a-b;
        
        case '*':
            return a * b;

        case '/':
            return a / b;

        default:
            return NaN;

    }
}

function displayMessage(msg) {
    var display = document.querySelector('.display');
    display.textContent = msg;
}


var a;
var aPresent = false;
var b;
var bPresent = false;

displayMessage("Testing!!!");

