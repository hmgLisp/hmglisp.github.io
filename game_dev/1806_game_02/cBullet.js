class cBullet {
    constructor (x, y, dir) {
        this.x = x;
        this.y = y;
        this.r = 5;         
        this.dir = dir;     //{x, y};
        this.moveSpeed = 5;
        this.show = true;
    }   
    
    get deltaX() {
        return this.x + (this.dir.x * this.moveSpeed);
    }

    get deltaY() {
        return this.y + (this.dir.y * this.moveSpeed);
    }

    update() {
        if (this.show == true) {
            this.x += (this.dir.x * this.moveSpeed);
            this.y += (this.dir.y * this.moveSpeed);              
        }        
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}