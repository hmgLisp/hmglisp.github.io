class cBullet {
    constructor (x, y, dir) {
        this.x = x;
        this.y = y;
        this.r = 5;         
        this.dir = dir;     //{x, y};
        this.moveSpeed = 5;
        this.show = true;        
    }

    update () {
        if (this.show == true) {
            this.x += (this.dir.x * this.moveSpeed);
            this.y += (this.dir.y * this.moveSpeed);
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

class cManagerBullet {
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