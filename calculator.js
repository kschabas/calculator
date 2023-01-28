function operate(a,b,operator) {
    aint = parseInt(a);
    bint = parseInt(b);
    switch (operator) {
        case '+':
            return aint + bint;

        case '-':
            return aint-bint;
        
        case '*':
            return aint * bint;

        case '/':
            return aint / bint;

        default:
            return NaN;

    }
}

function displayMessage(msg) {
    var display = document.querySelector('.display');
    display.textContent = msg;
}


var a = "";
var aPresent = false;
var b = "";
var operator = "";
var fluxMode = false;

initializeCalc();

function processKey(key) {
    if (key >='0' && key <='9') {
        if (fluxMode) {
            a = "";
            b = "";
            aPresent = false;
        }
        if (!aPresent) {
            a += key;
            displayMessage(a);
        }
        else {
            b += key;
            displayMessage(b);
        }
    }
    if (key == '+' || key == '-' || key == '*' || key == '/') {
        processOperator(key);
    }
    if (key == '=') {
        processEquals();
    }
    if (key == 'Clear') {
        clear();
    }
    fluxMode = false;
}

function processOperator(key) {
    if (!aPresent) {
        aPresent = true;
        operator = key;
    }
    else {
        var num = operate(a,b,operator);
        displayMessage(num);
        a = num;
        b = "";
        operator = key;
    }
}

function processEquals() {
    if (!a || !b || !operator) displayMessage("ERROR!");
    var num = operate(a,b,operator);
    displayMessage(num);
    a = num;
    b = "";
    aPresent = false;
    fluxMode = true;
}

function initializeCalc() {
    var buttons = document.querySelectorAll('button');
    buttons.forEach( button => {
        button.addEventListener('click', (e) =>processKey(`${button.getAttribute('data-key')}`));
    });
}


