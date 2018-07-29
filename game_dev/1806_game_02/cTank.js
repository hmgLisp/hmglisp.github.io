class Tank {
    constructor (x, y) {
        this.position = {x: x, y: y};
        this.w = 30;
        this.h = 30;  
        this.forword = {x: 0, y: -1};
        this.moveSpeed = 1; 
        this.barrelLen = 30;          
    }

    get centerPos() {
        return {x: this.position.x + this.w / 2, y: this.position.y + this.h / 2};
    }

    get muzzlePos() {        
        return {x: this.centerPos.x + this.forword.x * this.barrelLen, y: this.centerPos.y + this.forword.y * this.barrelLen};
    }   

    update(canvas) {
        let dx = this.position.x;
        let dy = this.position.y;

        dx += (this.forword.x * this.moveSpeed);
        dy += (this.forword.y * this.moveSpeed);

        if (dx < 0) dx = 0;
        if (dy < 0) dy = 0;
        if (dx > canvas.clientWidth - this.w) dx = canvas.clientWidth - this.w;
        if (dy > canvas.clientHeight - this.h) dy = canvas.clientHeight - this.h;

        this.position.x = dx;
        this.position.y = dy;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.w, this.h);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();        

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(this.centerPos.x, this.centerPos.y);
        ctx.lineTo(this.muzzlePos.x, this.muzzlePos.y);
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
    } 
}

class Block {
    constructor(x, y, mat) {
        this.x = x;
        this.y = y;
        this.w = 30;
        this.h = 30;
        this.mat = mat;
        this.show = true;             
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        let r = Math.random() * 255 + 1;
        let g = Math.random() * 255 + 1;
        let b = Math.random() * 255 + 1;
        ctx.fillStyle = `rgb(${r},${g},${b})`;//#dd3a00";
        ctx.fill();
        ctx.closePath();
    }    
}

class Bullet {
    constructor(x, y, r, dir) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.forword = dir;
        this.moveSpeed = 3;
        this.show = true;
    }    

    update() {
        let dx = this.x;
        let dy = this.y;
        dx += this.forword.x * this.moveSpeed;
        dy += this.forword.y * this.moveSpeed;

        if (dx < 0 - this.r || dy < 0 - this.r || dx > GAME_AREA.W + this.r || dy > GAME_AREA.H + this.r) {
            this.explosion();
            this.show = false;
        }
        else {
            this.x = dx;
            this.y = dy;
        }        
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }

    explosion() {
        EFFECT_MAG.add(new EffectOfExplosion(this.x, this.y, 50));
    }

    collisionCheck(gameObj) {        
        if(this.x < gameObj.x - this.r) return false;
        if(this.y < gameObj.y - this.r) return false;
        if(this.x > gameObj.x + gameObj.w + this.r) return false;
        if(this.y > gameObj.y + gameObj.h + this.r) return false;
        
        this.show = false;
        this.explosion();
        return true;
    }
}