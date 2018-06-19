class cBullet {
    constructor (x, y, dir) {
        this.x = x;
        this.y = y;
        this.r = 5;         
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

class  {
    constructor () {
        this.bullets = [];
    }

    fire (x, y, dir) {
        this.bullets.push(new cBullet(x, y, dir));
    }

    update () {
        this.bullets.forEach(element => {
            element.update();
        });
    }

    render (ctx) {
        this.bullets.forEach(element => {
            element.render(ctx);
        });
    }
}