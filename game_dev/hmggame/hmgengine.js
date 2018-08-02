window.addEventListener('load', game_run, false);

var game_canvas;
var game_ctx;

var canvas_rect;
var canvas_background_color;

function game_run() {
    game_init();
    game_loop();
}

function game_init() {
    game_canvas = document.getElementById("game");
    game_ctx = game_canvas.getContext('2d');
    
    canvas_rect = {x:game_canvas.clientLeft, y: game_canvas.clientTop, w: game_canvas.clientWidth, h: game_canvas.clientHeight};
    init();
}

function game_loop() {
    update();
    render();
    requestAnimationFrame(game_loop);
}

function render() {
    game_ctx.clearRect(canvas_rect.x, canvas_rect.y, canvas_rect.w, canvas_rect.h);    
    game_ctx.beginPath();
    game_ctx.rect(canvas_rect.x, canvas_rect.y, canvas_rect.w, canvas_rect.h);
    game_ctx.fillStyle = canvas_background_color;
    game_ctx.fill();
    game_ctx.closePath();

    
}

function set_background(color) {
    canvas_background_color = color;
}