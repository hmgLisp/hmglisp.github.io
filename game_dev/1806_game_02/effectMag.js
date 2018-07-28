class EffectMag {
    constructor() {
        this.effects = [];
    }

    add(effect) {
        this.effects.push(effect);
    }

    update() {
        this.effects.filter(x => {
            x.show === true;
        }).forEach(element => {
            x.update();
        });        
    }

    render(ctx) {
        this.effects.forEach(element => {
            element.render(ctx);
        });
    }
}

var effectMag = new EffectMag();

class EffectOfExplosion {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.aniTime = 1000;
        this.show = true;     
    }

    update() {

    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.strokeStyle = "yellow";
        ctx.stroke();
        ctx.closePath();
    }
}