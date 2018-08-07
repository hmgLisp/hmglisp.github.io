let tnak;
let tank2;

function init() {
    //canvas.setAttribute('height', '100');
    set_background("rgb(0,0,0)");
    tank = new Tank(300,300,30,30, "rgb(100,100,100)");
    tank2 = new Tank(400,300, 40, 40, "rgb(255, 0, 0)");
}

function update() {
    tank.update();
    tank2.update();
}

class Tank extends game_obj{
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
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}