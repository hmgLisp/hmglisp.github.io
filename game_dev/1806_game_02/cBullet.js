class cBullet {
    constructor (x, y, r, dir) {
        this.x = x;
        this.y = y;
        this.r = r;         
        this.dir = dir;     //[x, y];
        this.show = true;        
    }

    update () {
        if (this.show == true) {
            this.x += (this.dir[0] * 0.2);
            this.y += (this.dir[1] * 0.2);
        }        
    }

    render (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}