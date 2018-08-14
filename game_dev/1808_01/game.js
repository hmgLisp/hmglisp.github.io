class Game {
    constructor(w, h, color) {
        this.canvas;
        this.ctx;
        this.w = w;
        this.h = h;
        
        this.init();
    }

    init() {
        let body = document.querySelector('body');
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = this.w + 'px';
        this.canvas.style.height = this.h + 'px';      
        this.canvas.style.border = '1px solid gray';
        
        body.insertBefore(this.canvas, body[0]);
        this.ctx = this.canvas.getContext('2d');
    }

    loop() {
        this.update();
        this.render();
        requestAnimationFrame(this.loop);
    }

    update() {

    }

    render() {
        this.clearRect(0, 0, this.w, this.h);
    }
}