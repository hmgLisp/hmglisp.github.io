class Player extends GameObj{
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    update() {

    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}