class Player extends GameObj{
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.inputMag = null;
        this.forword = new Vector(0, -1);
        this.right = new Vector(1, 0);
    }

    // 32: space
    // 37: arrow left
    // 38: arrow up
    // 39: arrow right
    // 40: arrow down
    update() {
        if(this.inputMag){
            this.inputMag.keyCodes[39]
        }        
    }

    render(ctx) {
        let len = 30;
        let points =[3];
        points[0] = {x: this.x + this.forword.x * len, y: this.y + this.forword.y * len};
        points[1] = {x: this.x + -1 * len / 2, y: this.y + 0 * len / 2};
        points[2] = {x: this.x +  1 * len / 2, y: this.y + 0 * len / 2};

        ctx.beginPath();
        //ctx.moveTo(this.x, this.y);
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        //ctx.rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}