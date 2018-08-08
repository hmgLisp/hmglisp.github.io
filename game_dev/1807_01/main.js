let tnak;
let grid;

function init() {
    //canvas.setAttribute('height', '100');
    set_background("rgb(0, 0, 0)");
    grid = new Game_grid(50, 50, 500, 500, 10, 10);
    tank = new Tank(300, 300, 30, 30, "rgb(250, 150, 50)");    
}

function update() {
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
        super(x - w * 0.5, y - h * 0.5, w, h);       
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
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}