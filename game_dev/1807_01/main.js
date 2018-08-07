let tnak;

function init() {
    //canvas.setAttribute('height', '100');
    set_background("rgb(0,0,0)");
    tank = new Tank(300,300,30,30, "#00dd1d");    
}

function update() {
    tank.update();    
}

class Tank extends game_obj{
    constructor(x, y, w, h, color) {
        super(x, y, w, h);  
        this.move_speed = 3;     
        this.color = color; 
    }

    update() {
        let dx = this.x;
        let dy = this.y;

        if(input_manager.is_down_key(37)) {
            dx -= this.move_speed;
        }
        if(input_manager.is_down_key(39)) {
            dx += this.move_speed;
        }
        if(input_manager.is_down_key(38)) {
            dy -= this.move_speed;
        }
        if(input_manager.is_down_key(40)) {
            dy +=this.move_speed;
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