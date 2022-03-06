const bts = document.querySelectorAll('.timer__button');
const display = document.querySelector('.display');
const submit = document.querySelector('#custom');
let countdown;

function timer(time) {
    clearInterval(countdown);
    //获取当前时间戳的两种方式 
    const now = Date.now();
    //const nowTime = +new Date();
    //时间戳是毫秒数
    const then = now + time * 1000;
    displayEndLeft(then);
    displayTimeLeft(time);

    //定时器实现倒计时
    countdown = setInterval(()=>{
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000);
}

function displayTimeLeft(time){
    let min = Math.floor(time / 60);
    min = min >= 10 ? min : '0' + min;
    let sec = time % 60;
    sec = sec >= 10 ? sec : '0' + sec;
    display.children[0].textContent = `${min}:${sec}`
}

function displayEndLeft(timestamp){
    const end = new Date(timestamp);
    let hour = end.getHours();
    hour = hour >= 10 ? hour : '0'+hour;
    let min = end.getMinutes();
    min = min >= 10 ? min : '0' + min;
    //console.log(hour,min);
    display.children[1].textContent = `Be Back At ${hour}:${min}`
}

function startTimer(){
    const time = this.dataset.time;
    timer(time);
}
bts.forEach(button => button.addEventListener('click', startTimer));
submit.addEventListener('submit',function(e){
    e.preventDefault();
    const time = this.minutes.value;
    //console.log(time);
    //timer的参数是秒数
    timer(time * 60);
    //重置input
    this.reset();
})