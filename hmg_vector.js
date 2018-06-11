class cVector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }   

    static plus(a, b) {
        return new cVector(a.x + b.x, a.y + b.y);
    }

    static minus(a, b) {
        return new cVector(a.x - b.x, a.y - b.y);
    }
}

function degreeToRadian (d) {
    return d * Math.PI / 180;
}