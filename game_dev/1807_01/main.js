
function init() {
    //canvas.setAttribute('height', '100');
    set_background("rgb(0,0,0)");
    let tank = new Tank(300,300,30,30, "rgb(100,100,100)");
    let tank2 = new Tank(400,300, 40, 40, "rgb(255, 0, 0)");
}

function update() {

}

class Tank extends game_obj{
    constructor(x, y, w, h, color) {
        super(x, y, w, h);       
        this.color = color; 
    }

    update() {

    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}