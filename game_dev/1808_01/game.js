class Game {
    constructor(w, h, color) {
        this.canvas;
        this.ctx;
        this.w = w;
        this.h = h;        
        
        this.inputMag = null;
        this.player = null;
    }

    init() {
        let body = document.querySelector('body');
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'myCanvas';
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.canvas.style.border = '1px solid gray';
        
        body.insertBefore(this.canvas, body[0]);
        this.ctx = this.canvas.getContext('2d');        
    }

    update() {
        if(this.player) {
            
            this.player.update();            
        }
    }

    render() {
        this.ctx.clearRect(
            this.canvas.clientLeft,
            this.canvas.clientTop,
            this.canvas.clientWidth,
            this.canvas.clientHeight);

        if(this.player) {
            this.player.render(this.ctx);            
        }
    }

    loop() {
        this.update();
        this.render();  
        //requestAnimationFrame(this.loop.bind(this));        
        requestAnimationFrame(() => this.loop());        
    } 

    run() {
        this.init();
        this.loop();
    }
}