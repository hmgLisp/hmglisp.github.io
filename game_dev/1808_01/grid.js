class Grid {
    constructor(canvas, offset, r, c) {
        this.x = canvas.clientLeft + offset;
        this.y = canvas.clientTop + offset;
        this.w = (canvas.clientWidth - offset * 2) / c;
        this.h = (canvas.clientHeight - offset * 2) / r;
        this.row = r;
        this.col = c;
    }    

    render(ctx) {        
        let x = 0;
        let y = 0;

        for(let r = 0; r < this.row; r++) {
            y = r * this.h + this.y;
            for(let c = 0; c < this.col; c++) {
                x = c * this.w + this.x;
                ctx.beginPath();
                ctx.lineWidth = 0.3;
                ctx.rect(x, y, this.w, this.h);
                ctx.strokeStyle = '#0090dd';
                ctx.stroke();
                ctx.closePath();
            }
            x = 0;
        }
    }
}