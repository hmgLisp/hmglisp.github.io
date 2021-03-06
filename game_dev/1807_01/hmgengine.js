window.addEventListener('load', game_run, false);

var game_canvas;
var game_ctx;

var canvas_rect;
var canvas_background_color;
var game_grid;

var game_objs = [];

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
    timer.update();
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
    draw_game_objs();
}

function set_background(color) {
    canvas_background_color = color;
}

class Game_obj {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        game_objs.push(this);
    }

    update() {

    }

    render(ctx) {

    }
}

function draw_game_objs() {
    game_objs.forEach(element => {
        element.render(game_ctx);
    });
}

window.addEventListener('keydown', key_down_event_handler, false);
window.addEventListener('keyup', key_up_event_handler, false);

class Input_manager {
    constructor() {
        this.keys = [];
    }

    is_down_key(key) {
        return this.keys[key];
    }

    down_key(key) {
        this.keys[key] = true;
    }

    up_key(key) {
        this.keys[key] = false;
    }
}

var input_manager = new Input_manager();

function key_down_event_handler(e) {
    input_manager.down_key(e.keyCode);
}

function key_up_event_handler(e) {
    input_manager.up_key(e.keyCode);
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get get_normal() {
        return new Vector(this.x / this.length, this.y / this.length);
    }

    normalaze() {
        this.x = this.x / this.length;
        this.y = this.y / this.length;
    }
}

class Timer {
    constructor(requst_time) {
        this.prev_t;
        this.delta_t;
        this.requst_t = requst_time;
        this.alarm = false;        
        this.tmp_time = 0;
    }

    get time_check() {
        return this.alarm;
    }

    update() {
        let time = Date.now();
        this.delta_t = time - this.prev_t;
        this.prev_t = time;        
        this.tmp_time += this.delta_t;

        if(this.tmp_time >= this.requst_t) {
            this.alarm = true;
            this.tmp_time = 0;
        }
    }    
}

var timer = new Timer();