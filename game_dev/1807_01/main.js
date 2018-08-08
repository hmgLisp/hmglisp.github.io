let tnak;
let grid;
let potal;

function init() {
    //canvas.setAttribute('height', '100');
    set_background("rgb(0, 0, 0)");
    grid = new Game_grid(50, 50, 500, 500, 10, 10);
    potal = new Potal(grid.x + grid.w / 2, grid.y + 30, 20, 100);
    tank = new Tank(300, 300, 30, 30, "rgb(250, 150, 50)");    
    potal.set_target(tank);
}

function update() {
    potal.update();
    tank.update();
    if(tank.x < grid.x) tank.x = grid.x;
    if(tank.y < grid.y) tank.y = grid.y;
    if(tank.x + tank.w > grid.x + grid.w) tank.x = (grid.x + grid.w) - tank.w;
    if(tank.y + tank.h > grid.y + grid.h) tank.y = (grid.y + grid.h) - tank.h;
}

class Game_grid extends Game_obj{
    constructor(x, y, w, h, row_count, col_count) {
        super(x, y, w, h);        
        this.row_count = row_count;
        this.col_count = col_count;        
    }

    render(ctx) {
        let x = this.x;
        let y = this.y;
        let cw = this.w / this.col_count;
        let ch = this.h / this.row_count;

        for (let r = 0; r < this.row_count; r++) {
            for (let c = 0; c < this.col_count; c++) {                
                ctx.beginPath();
                ctx.rect(x, y, cw, ch);
                ctx.lineWidth = 1;
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.fill();
                ctx.strokeStyle = "rgb(100, 100, 100)";
                ctx.stroke();
                ctx.closePath();
                x += cw;
            }            
            y += ch;
            x = this.x;
        }
    }
}

class Tank extends Game_obj{
    constructor(x, y, w, h, color) {
        super(x, y, w, h);       
        this.color = color; 
    }

    update() {
        let dx = this.x;
        let dy = this.y;

        if(input_manager.is_down_key(37)) {
            dx -= 3;
        }
        if(input_manager.is_down_key(39)) {
            dx += 3;
        }
        if(input_manager.is_down_key(38)) {
            dy -= 3;
        }
        if(input_manager.is_down_key(40)) {
            dy +=3;
        }
        this.x = dx;
        this.y = dy;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x - this.w * 0.5, this.y - this.h * 0.5, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Potal extends Game_obj {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.target = null;
        this.forword = new Vector(0, 0);
    }

    set_target(obj) {
        this.target = obj;        
    }

    update() {
        this.forword.x = this.target.x - this.x;
        this.forword.y = this.target.y - this.y;        
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w, 0, Math.PI * 2, false);
        ctx.fillStyle = "#0095dd";
        ctx.fill();
        ctx.closePath();

        let len = 40;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.target.x, this.target.y);
        ctx.lineWidth = 0.3;
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(
            this.x + this.forword.get_normal.x * len,
            this.y + this.forword.get_normal.y * len,
            5, 0, Math.PI * 2, false);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
    }
}