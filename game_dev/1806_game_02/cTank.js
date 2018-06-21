class cTank {
    constructor (x, y) {
        this.position = {x: x, y: y};
        this.w = 30;
        this.h = 30;  
        this.forword = {x: 0, y: -1};
        this.moveSpeed = 2;       
    }

    update() {
        
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.w, this.h);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();

        // //draww barrel
        // ctx.beginPath();
        // ctx.moveTo(barrelX, barrelY);
        // ctx.lineTo(muzzleX, muzzleY);
        // ctx.lineWidth = barrelTHK;
        // ctx.strokeStyle = "red";
        // ctx.stroke();
        // ctx.closePath();        
    }
    
    cnangeForword(vecForword) {
        this.forword = vecForword;
    }    
}