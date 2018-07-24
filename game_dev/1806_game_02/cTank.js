class Tank {
    constructor (x, y) {
        this.position = {x: x, y: y};
        this.w = 30;
        this.h = 30;  
        this.forword = {x: 0, y: -1};
        this.moveSpeed = 2; 
        this.barrelLen = 30;          
    }

    get centerPos() {
        return {x: this.position.x + this.w / 2, y: this.position.y + this.h / 2};
    }

    get muzzlePos() {
        return {x: (this.centerPos.x + this.forword.x) * this.barrelLen, y: (this.centerPos.y + this.forword.y) * this.barrelLen};
    }

    update() {
        this.position.x = (this.position.x + this.forword.x) * this.moveSpeed;
        this.position.y = (this.position.y + this.forword.y) * this.moveSpeed;        
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.w, this.h);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();        

        ctx.beginPath();
        ctx.moveTo(this.centerPos.x, this.centerPos.y);
        ctx.lineTo(this.muzzlePos.x, this.muzzlePos.y);
        ctx.stroke();
        ctx.closePath();
    }
    
    cnangeForword(vecForword) {
        this.forword = vecForword;
    }    
}

class Block {
    constructor(x, y, mat) {
        this.x = x;
        this.y = y;
        this.w = 30;
        this.h = 30;
        this.mat = mat;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "#dd3a00";
        ctx.fill();
        ctx.closePath();
    }    
}