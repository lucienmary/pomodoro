const timeset = {
    longBreak: 1,
    shortBreak: 1,
    pomodoro: 1
};

var position = {
    longBreakCount: 1,
    shortBreakCount: 3,
    pomodoroCount: 4
}

var active = false;

var completed = 0;

var step = 'pomodoro';

export function timer () {

    document.getElementById('play').addEventListener('click', () => {
        if (active == false) timerLoop();
    })

    document.getElementById('stop').addEventListener('click', () => {
        if (active == false) timerLoop();
    })

    document.getElementById('reset').addEventListener('click', () => {
        if (active == false) timerLoop();
    })

}

function timerLoop(){
    active = true;
    var minutes;
    var seconds = -1;
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

            if (step === 'pomodoro') {

                completed++;
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

    function clockView() {

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
        return test;
    }

}
