class cTank {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.w = 30;
        this.h = 30;        
    }

    update () {

    }

    render (ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "blue";
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
}