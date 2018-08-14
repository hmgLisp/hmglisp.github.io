class Input {
    constructor() {
        this.keyCodes = [];

        document.addEventListener('keydown',() => this.handleKeyDown(this), false);
        document.addEventListener('keyup', () => this.handleKeyUp(this), false);
    }
    
    handleKeyDown(e) {  
        this.keyCodes[e.keyCode] = true;
    }

    handleKeyUp(e) {
        this.keyCodes[e.keyCode] = false;
    }
}