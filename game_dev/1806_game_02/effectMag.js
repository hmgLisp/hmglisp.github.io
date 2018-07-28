class EffectMag {
    constructor() {
        this.effects = [];
    }

    add(effect) {
        this.effects.push(effect);
    }

    update() {
        this.effects.forEach(element => {
            if(element.show) {
                element.update();
            }
        });        
    }

    render(ctx) {
        this.effects.forEach(element => {
            if(element.show) {
                element.render(ctx);                
            }   
        });
    }
}

var EFFECT_MAG = new EffectMag();

class EffectOfExplosion {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.aniTime = 1000;
        this.dt = 0;
        this.show = true;     
    }

    update() {
        this.dt += TIMER.deltaTime;    
        
        if(this.dt > this.aniTime) {
            this.show = false;
        }
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "yellow";
        ctx.stroke();
        ctx.closePath();
    }
}