class Player extends GameObj{
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.inputMag = null;
        this.forword = new Vector2d(0, -1);
    }

    update() {
        if(this.inputMag){
            
        }        
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}