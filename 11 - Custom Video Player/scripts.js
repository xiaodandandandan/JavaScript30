// 获取元素
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const toggle = document.querySelector('.toggle');
const sliders = document.querySelectorAll('.player__slider');
const skipBtns = document.querySelectorAll('[data-skip]');

function togglePlay(){
    //const method = video.paused ? 'play' : 'paused';
    //video[method]();//用字符串来执行属性方法
    video.paused ? video.play() : video.pause();
}

function pausePlay(e){
    if(e.code === 'Space'){
        video.paused ? video.play() : video.pause();
    }
}

//更改暂停播放标签
function updateIcon(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handleProgress(){
    //当前时间/视频总时间 计算当前百分比
    const cur_time = (video.currentTime / video.duration) * 100;
    progress.children[0].style.flexBasis = `${cur_time}%`
}

function skip(){
    //获取自定义属性方法
    //console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); 
}
/* input 的 name 值和 video 对象中的属性名是一样的，
可以看到在 handleRangeUpdate 函数中我们利用了 this.name 的写法来代表属性，
，这里的 this 一样是 addEventListener 的调用者，即 range。
volume 属性可设置媒体播放时的音量。
playbackRate 属性设置媒体文件播放时的速率。这用于实现让用户控制快放、慢放等。 
*/
function handleRangeUpdate(){
    video[this.name] = this.value;
}
function scrub(e){
    //console.log(e,progress.offsetWidth);
    // offsetWidth是测量包含元素的边框(border)、水平线上的内边距(padding)、
    // 竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateIcon);
video.addEventListener('pause',updateIcon);
// 当currentTime更新时会触发timeupdate事件。改变进度条显示
video.addEventListener('timeupdate',handleProgress);

toggle.addEventListener('click',togglePlay);

//绑定前进后退按钮事件
skipBtns.forEach(btn => btn.addEventListener('click',skip));

//绑定音量和倍速播放进度条事件
sliders.forEach(range => range.addEventListener('change',handleRangeUpdate));
sliders.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));

//进度条事件绑定
// 进度条还要求可以拖动，这个操作我们可以通过设置一个标志来判断当前是否出于拖动状态，
// 然后配合 mousedown、mouseup 事件来更新这个标志：
let mouseDown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=>mouseDown && scrub(e));
progress.addEventListener('mousedown',()=>mouseDown = true);
progress.addEventListener('mouseup',()=>mouseDown = false);

//空格控制播放暂停
window.addEventListener('keyup',(e)=>{
    if(e.code === 'Space'){
        togglePlay();
    }
});
//左右箭头控制前进后退
window.addEventListener('keyup',(e)=>{
    if(e.code === 'ArrowLeft'){
        video.currentTime += parseFloat(-10);
    }
    if(e.code === 'ArrowRight'){
        video.currentTime += parseFloat(25);
    }
});