class cTimer {
    constructor() {
        this.lastTime;
        this.deltaTime = 0;
        this.frame = 0;
        this.fps = 0;
    }

    update() {
        if(!this.lastTime) {
            this.lastTime = Date.now();
        }
        this.deltaTime += (Date.now() - this.lastTime);
        this.lastTime = Date.now();
        
        if(this.deltaTime > 1000) {
            this.deltaTime = 0;
            this.fps = this.frame;
            this.frame = 0;
        }
        this.frame++;
    }
}