function operate(a,b,operator) {
    aint = parseFloat(a);
    bint = parseFloat(b);
    switch (operator) {
        case '+':
            return aint + bint;

        case '-':
            return aint-bint;
        
        case '*':
            return aint * bint;

        case '/':
            if (bint == 0) return NaN;
            return Math.round(aint / bint * 10000000)/10000000;

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
        setTransition(key);
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
        fluxMode = false;
    }
    if (key == '+' || key == '-' || key == '*' || key == '/') {
        setTransition(key);
        processOperator(key);
        fluxMode = false;
    }
    if (key == '=' || key ==="Enter" ) {
        setTransition('=')
        processEquals();
    }
    if (key == 'clear' || key == 'c') {
        setTransition('clear');
        resetCalc();
    }
    if (key == 'Backspace') {
        if (!aPresent && a.length > 0) {
            a = a.substring(0,a.length-1);
            displayMessage(a);
        }
        else if (b.length>0)
        {
            b = b.substring(0,b.length-1);
            displayMessage(b);
        }
    }
}

function resetCalc() {
    a = "";
    b = "";
    operator = "";
    fluxMode = false;
    aPresent = false;
    displayMessage("");
}

function processOperator(key) {
    if (!aPresent) {
        aPresent = true;
        operator = key;
    }
    else {
        var num = operate(a,b,operator);
        if (num == NaN) displayMessage("ERROR!");
        else displayMessage(num);
        a = num;
        b = "";
        operator = key;
    }
}

function processEquals() {
    if (!a || !b || !operator) {
        displayMessage("ERROR!");
        return;
    }
    var num = operate(a,b,operator);
    if (isNaN(num)) displayMessage("ERROR!");
    else displayMessage(num);
    a = num;
    b = "";
    aPresent = false;
    fluxMode = true;
}

function initializeCalc() {
    var buttons = document.querySelectorAll('button');
    buttons.forEach( button => {
        button.addEventListener('click', (e) => {
            processKey(`${button.getAttribute('data-key')}`);
        });
        button.addEventListener('transitionend', (e) => endTransition(e.target) );
    });
    document.addEventListener('keydown', (e) => {
        processKey(e.key);
    });
}

function setTransition(key) {
    var button = document.querySelector(`[data-key="${key}"]`);
    button.classList.add('pushed');
}

function endTransition(button) {
    button.classList.remove('pushed');
}


