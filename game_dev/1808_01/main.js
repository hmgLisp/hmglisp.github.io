window.addEventListener('load', run, false);

let canvas;
let ctx;

function run() {    
    let body = document.querySelector('body');
    canvas = document.createElement('canvas');
    canvas.style.width = '600px';
    canvas.style.height = '800px';      
    canvas.style.border = '1px solid gray';
    
    body.insertBefore(canvas, body[0]);
    ctx = canvas.getContext('2d');

    loop();    
}

function loop() {
    update();
    render();
    requestAnimationFrame(loop);
}

function update() {

}

function render() {

}