window.addEventListener('load', run, false);

var canvas;
var ctx;

function run() {
    game_init();
    game_loop();
}

function game_init() {
    canvas = document.getElementById("game");
    ctx = canvas.getContext('2d');
}

function game_loop() {
    update();
    render();
    requestAnimationFrame(game_loop);
}

function update() {

}

function render() {
    ctx.clearRect(canvas.clientLeft, canvas.clientTop, canvas.clientWidth, canvas.clientHeight);    
    ctx.beginPath();
    ctx.rect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
}