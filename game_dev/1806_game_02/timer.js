class TimeMag {
    constructor() {
        this.timers = [];
    }

    update() {

    }
}

const timeMag = new TimeMag();

class Timer {
    constructor() {
        this.lastTime;
        this.time = 0;        
        this.frame = 0;
        this.fps = 0;
        this.tick;
        this.deltaTime = 0;
    }   

    update() {
        if(!this.lastTime) {
            this.lastTime = Date.now();
        }
        this.deltaTime = Date.now() - this.lastTime;

        this.time += this.deltaTime;           
        this.lastTime = Date.now();
        
        // if(this.time > 1000) {
        //     this.time = 0;
        //     this.fps = this.frame;
        //     this.frame = 0;
        // }
        // this.frame++;        
    }
}

const timer = new Timer();