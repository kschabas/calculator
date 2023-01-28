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
    var button = document.querySelector('#one');
    button.addEventListener('click',(e) => processKey('1'));

    button = document.querySelector('#two');
    button.addEventListener('click',(e) => processKey('2'));

    button = document.querySelector('#three');
    button.addEventListener('click',(e) => processKey('3'));

    button = document.querySelector('#four');
    button.addEventListener('click',(e) => processKey('4'));

    button = document.querySelector('#five');
    button.addEventListener('click',(e) => processKey('5'));

    button = document.querySelector('#six');
    button.addEventListener('click',(e) => processKey('6'));

    button = document.querySelector('#seven');
    button.addEventListener('click',(e) => processKey('7'));

    button = document.querySelector('#eight');
    button.addEventListener('click',(e) => processKey('8'));

    button = document.querySelector('#nine');
    button.addEventListener('click',(e) => processKey('9'));

    button = document.querySelector('#add');
    button.addEventListener('click',(e) => processKey('+'));

    button = document.querySelector('#subtract');
    button.addEventListener('click',(e) => processKey('-'));

    button = document.querySelector('#multiply');
    button.addEventListener('click',(e) => processKey('*'));

    var button = document.querySelector('#divide');
    button.addEventListener('click',(e) => processKey('/'));

    var button = document.querySelector('#equal');
    button.addEventListener('click',(e) => processKey('='));

}

