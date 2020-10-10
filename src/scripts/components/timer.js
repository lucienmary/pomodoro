const timeset = {
    longBreak: 10,
    shortBreak: 5,
    pomodoro: 1
};

var position = {
    longBreakCount: 1,
    shortBreakCount: 3,
    pomodoroCount: 4
}

var active = false;
var isPaused = false;

var completed = 0;

var step = 'pomodoro';

var minutes;
var seconds;
var minutesRescue;
var secondsRescue;

var completedAllTime;

if (localStorage.getItem("completedAllTime") === null) {
    completedAllTime = localStorage.setItem("completedAllTime", 0);
}else {
    completedAllTime = localStorage.getItem('completedAllTime');
}

console.log(completedAllTime);

export function timer () {

    document.getElementById('play').addEventListener('click', () => {

        document.getElementById('play').disabled = true;
        document.getElementById('stop').disabled = false;

        if (isPaused == false) timerLoop();
        else{
            minutes = minutesRescue;
            seconds = secondsRescue;
            timerLoop();
        }
    })

    document.getElementById('stop').addEventListener('click', () => {
        document.getElementById('play').disabled = false;
        document.getElementById('stop').disabled = true;

        if (minutesRescue == null) {
            minutesRescue = minutes;
            secondsRescue = seconds;
            minutes  = 0;
            seconds = 0;

            isPaused = true;
        }

        console.log('Time: '+ minutesRescue +':'+ secondsRescue);
    })

    document.getElementById('reset').addEventListener('click', () => {
        reset();
    })

}

function timerLoop(){
    active = true;
    minutes;
    seconds = -1;

    if (isPaused == false) {
        switch (step) {
            case 'pomodoro':
                minutes = timeset.pomodoro;
                counter();
                break;
            case 'longBreak':
                minutes = timeset.longBreak;
                counter();
                break;
            case 'shortBreak':
                minutes = timeset.shortBreak;
                counter();
                break;
            default: minutes = timeset.pomodoro;
        }
    }else{
        minutes = minutesRescue;
        seconds = secondsRescue;

        minutesRescue = null;
        secondsRescue = null;
        counter();

        isPaused = false;
    }

    function counter(){
        if (seconds == -1) {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            }
        }

        if (seconds > -1) {
            setTimeout(function() {

            document.getElementById('outputTimer').innerHTML = clockView();

            document.querySelector('title').innerHTML = '[ '+ clockView() +' ] Compteur pomodoro ⏲️';

            seconds--;
            counter();
            }, 1000);
        }else{
            active = false;

            if (isPaused == false) {

                new Audio('../assets/sound/boxe.mp3').play()

                if (step === 'pomodoro') {

                    document.getElementById('stop').disabled = true;
                    document.getElementById('play').disabled = false;

                    completedAllTime++;
                    completedAllTime = localStorage.setItem("completedAllTime", completedAllTime);

                    completed++;
                    document.getElementById('completedAllTime').innerHTML = localStorage.getItem("completedAllTime");
                    document.getElementById('completed').innerHTML = completed;
                    document.getElementById('pomodoroRest').innerHTML = 4 - completed % 4;

                    if (position.shortBreakCount > 0) {
                        step = 'shortBreak';
                        document.querySelector('h1').innerHTML = 'Courte pause';
                        position.shortBreakCount--;

                        minutes = timeset.shortBreak;
                        seconds = '0';
                        document.getElementById('outputTimer').innerHTML = clockView();
                    }else{
                        step = 'longBreak';
                        position.shortBreakCount = 4;
                        position.pomodoroCount = 4;
                        document.querySelector('h1').innerHTML = 'Longue pause';

                        minutes = timeset.longBreak;
                        seconds = '0';
                        document.getElementById('outputTimer').innerHTML = clockView();
                    }
                }else if (step === 'longBreak' || step === 'shortBreak') {
                    step = 'pomodoro';
                    document.querySelector('h1').innerHTML = 'Pomodoro';

                    minutes = timeset.pomodoro;
                    seconds = '0';
                    document.getElementById('outputTimer').innerHTML = clockView();
                }
            }
        }
    }

    function clockView() {

        if (isPaused == false) {
            if (minutes >= 10) {
                if (seconds >= 10) {
                    var test = minutes + ':' + seconds;
                }else{
                    var test = minutes + ':0' + seconds;
                }
            }else{
                if (seconds >= 10) {
                    var test = '0' + minutes + ':' + seconds;
                }else{
                    var test = '0' + minutes + ':0' + seconds;
                }
            }
        }else{
            if (minutesRescue >= 10) {
                if (secondsRescue >= 10) {
                    var test = minutesRescue + ':' + secondsRescue;
                }else{
                    var test = minutesRescue + ':0' + secondsRescue;
                }
            }else{
                if (secondsRescue >= 10) {
                    var test = '0' + minutesRescue + ':' + secondsRescue;
                }else{
                    var test = '0' + minutesRescue + ':0' + secondsRescue;
                }
            }
        }
        return test;
    }

}

function reset(){
    window.location.reload();
}
