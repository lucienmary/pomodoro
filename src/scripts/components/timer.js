const timeset = {
    longBreak: 3,
    shortBreak: 1,
    pomodoro: 2
};

var position = {
    longBreakCount: 1,
    shortBreakCount: 4,
    pomodoro: 4
}

var active = false;

var step = 'pomodoro';

export function timer () {

    document.getElementById('play').addEventListener('click', () => {
        if (active == false) {
            console.log('Play');
            timerLoop();
        }
    })

    document.getElementById('stop').addEventListener('click', () => {
        if (active == false) {
            console.log('Stop');
            timerLoop();
        }
    })

    document.getElementById('reset').addEventListener('click', () => {
        if (active == false) {
            console.log('Reset');
            timerLoop();
        }
    })

}

function timerLoop(){
    active = true;
    var minutes;
    var seconds = -1;
    switch (step) {
        case 'pomodoro':
            console.log('go p');
            minutes = timeset.pomodoro;
            counter();
            break;
        case 'longBreak':
            console.log('go l');
            minutes = timeset.longBreak;
            counter();
            break;
        case 'shortBreak':
            console.log('go s');
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

            document.getElementById('minutes').innerHTML = minutes;
            document.getElementById('seconds').innerHTML = seconds;

            seconds--;
            counter();
            }, 1000);
        }else{
            console.log('Timeout!');

            active = false;

            if (step === 'pomodoro') {
                if (position.shortBreakCount > 0) {
                    step = 'shortBreak';
                    position.shortBreakCount--;
                    document.getElementById('minutes').innerHTML = timeset.shortBreak;
                    document.getElementById('seconds').innerHTML = '00';
                }else{
                    step = 'longBreak';
                    position.shortBreakCount == 4;
                    position.pomodoro == 4;
                    document.getElementById('minutes').innerHTML = timeset.longBreak;
                    document.getElementById('seconds').innerHTML = '00';
                }
            }else if (step === 'longBreak' || step === 'shortBreak') {
                step = 'pomodoro';
                document.getElementById('minutes').innerHTML = timeset.pomodoro;
                document.getElementById('seconds').innerHTML = '00';
            }

            console.log('Step:' + step);
        }
    }

}
