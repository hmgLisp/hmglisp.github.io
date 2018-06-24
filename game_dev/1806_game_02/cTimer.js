class cTimer {
    constructor() {
        this.lastTime;
        this.time = 0;        
        this.frame = 0;
        this.fps = 0;
        this.tick;
    }    

    get deltaTime() {
        console.log('f');
        let dt = Date.now() - this.lastTime;
        return dt;
    }

    update() {
        if(!this.lastTime) {
            this.lastTime = Date.now();
        }

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