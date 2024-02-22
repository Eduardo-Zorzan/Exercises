function main () {
    const timer = document.querySelector('.timer');
    const startButton = document.querySelector('.start');
    const stopButton = document.querySelector('.stop');
    const restartButton = document.querySelector('.restart');
    let timerJS = [0, 0, 0];
    let timerJSString;

    function timerFunction (list) {
        if (list[2] < 59) {
            list[2]++ 
            return list
        } else if (list[1] < 59) {
            list[1]++
            return list
        } else if (list[0] < 23) {
            list[0]++
            return list
        } else {
            return list
        }
    }


    function convertString (list) {
        list = [`${list[0]}`, `${list[1]}`, `${list[2]}`]
        if (list[2] < 10) {
            list[2] = `0${list[2]}`
        } 
        if (list[1] < 10) {
            list[1] = `0${list[1]}`
        } 
        if (list[0] < 10) {
            list[0] = `0${list[0]}`
        } 
        return list
    }


    startButton.addEventListener('click', function startFunction () { 
        const time = setInterval(function time () {
                timer.classList.remove('paused')
                timerJSString = convertString(timerFunction(timerJS))
                timer.innerHTML = `${timerJSString[0]}:${timerJSString[1]}:${timerJSString[2]}` 
            }, 900);
            stopButton.addEventListener('click', function () {
                setTimeout(function () {
                    clearInterval(time)
                }, 10);
                timer.classList.add('paused')
            })
        return             
    });
    restartButton.addEventListener('click', function () {
        timerJS = [0, 0, 0];
        timerJSString = ['00', '00', '00']
        timer.innerHTML = `${timerJSString[0]}:${timerJSString[1]}:${timerJSString[2]}`
        timer.classList.remove('paused')  
    })
}


main()