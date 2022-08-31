// function for currrent date
function date() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    document.querySelector('.date').innerHTML = `${day}.${month}.${year}`
}
date();

// function for current time
setInterval(function () {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    document.querySelector('.time').innerHTML = `${hours}:${minutes}:${seconds}`
})

// Listeners for stopwatch
let hours = document.querySelector('.hours');
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');
let milliseconds = document.querySelector('.milliseconds');
let button1 = document.querySelector('.button1');
let button2 = document.querySelector('.button2');
let button3 = document.querySelector('.button3');
let button4 = document.querySelector('.button4');
let forLoops = document.querySelector('.forLoops');

let hr = 0;
let min = 0;
let sec = 0;
let mil = 0;
let intervalID;

// stopwatch start event
button1.addEventListener('click', () => {
    intervalID = setInterval(startStopWatch, 10);
    button1.disabled = true;
    button3.disabled = false;
    button4.disabled = false;

})

// startStopWatch function 
function startStopWatch() {
    mil++;
    if (mil < 10) {
        milliseconds.textContent = `0${mil}`;
    }
    if (mil >= 10) {
        milliseconds.textContent = `${mil}`;
    }
    if (mil == 99) {
        sec++;
        mil = 0;
    }
    if (sec < 10) {
        seconds.textContent = `0${sec}`;
    }
    if (sec >= 10) {
        seconds.textContent = `${sec}`;
    }
    if (sec == 59) {
        min++;
        sec = 0;
    }
    if (min < 10) {
        minutes.textContent = `0${min}`;
    }
    if (min >= 10) {
        minutes.textContent = `${min}`;
    }
    if (min == 59) {
        hr++;
        min = 0;
    }
    if (hr < 10) {
        hours.textContent = `0${hr}`;
    }
    if (hr >= 10) {
        hours.textContent = `${hr}`;
    }
}

// stopwatch stop event
button3.addEventListener('click', () => {
    clearInterval(intervalID);
    button1.disabled = false;
    button3.disabled = true;
})

// stopwatch loop event
button2.addEventListener('click', () => {
    let newLoop = document.createElement('div');
    let warning = document.createElement('div');
    newLoop.textContent = `${hours.textContent}:${minutes.textContent}:${seconds.textContent}:${milliseconds.textContent}`;
    warning.textContent = 'Max number of loops is reached';
    if (forLoops.children.length < 10) {
        forLoops.append(newLoop);
    }
    if (forLoops.children.length == 10) {
        forLoops.append(warning);
    }
})

// stopwatch reset event
button4.addEventListener('click', () => {
    clearInterval(intervalID);
    hours.textContent = `00`;
    minutes.textContent = `00`;
    seconds.textContent = `00`;
    milliseconds.textContent = `00`;
    forLoops.innerHTML = '';
    button1.disabled = false;
    button3.disabled = true;
    button4.disabled = true;
})

// timer event to +- minutes
let timerNumber = document.querySelector('.timerMinutes');
timerNumber.innerHTML = 25;
let plus = document.querySelector('.plus');
let minus = document.querySelector('.minus');

plus.addEventListener('click', () => {
    timerNumber.innerHTML++;
    if (timerNumber.innerHTML < 10) {
        timerNumber.innerHTML = `0${timerNumber.innerHTML}`
    }
})
minus.addEventListener('click', () => {
    if (timerNumber.innerHTML > 0) {
        timerNumber.innerHTML--;
        if (timerNumber.innerHTML < 10) {
            timerNumber.innerHTML = `0${timerNumber.innerHTML}`
        }
    }
})

// Listeners for timer
let timerMin = document.querySelector('.timerMin');
let timerSec = document.querySelector('.timerSec');
let timerStart = document.querySelector('.timerStart');
let timerStop = document.querySelector('.timerStop');
let timerReset = document.querySelector('.timerReset');
let timerID;
let check = true;
let check2 = true;

// functions and event + setInterval to start timer
function timer() {
    if (+timerMin.innerHTML == 0 && +timerSec.innerHTML == 0) {
        check = false;
        reset();
    }

    if (check) {
        if (+timerSec.innerHTML == 0) {
            timerSec.innerHTML = 60;
            timerMin.innerHTML--;
            if (timerMin.innerHTML < 10) {
                timerMin.innerHTML = `0${timerMin.innerHTML}`
            }
        }
        if (+timerSec.innerHTML > 0) {
            timerSec.innerHTML--;
        }
        if (+timerSec.innerHTML < 10) {
            timerSec.innerHTML = `0${timerSec.innerHTML}`
        }
    }

}
timerStart.addEventListener('click', () => {
    if (check2) {
        timerMin.innerHTML = timerNumber.innerHTML;
    }
    if (!check2) {
        timerMin.innerHTML = timerMin.innerHTML;
    }
    timerStart.disabled = true;
    timerStop.disabled = false;
    plus.disabled = true;
    minus.disabled = true;
    timerID = setInterval(timer, 1000);
    check = true;
})

// stop timer event
timerStop.addEventListener('click', () => {
    check2 = false;
    clearInterval(timerID);
    timerStart.disabled = false;
})

// reset function
function reset() {
    clearInterval(timerID);
    timerMin.innerHTML = `00`;
    timerSec.innerHTML = `00`;
    timerNumber.innerHTML = 25;
    check2 = true;
    plus.disabled = false;
    minus.disabled = false;
    timerStop.disabled = true;
    timerStart.disabled = false;
}

// reset event
timerReset.addEventListener('click', reset)