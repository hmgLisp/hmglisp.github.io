class Input {
    constructor() {
        this.keyCodes = [];   
        
        document.addEventListener('keydown',this.handleKeyDown, false);
        document.addEventListener('keyup', this.handleKeyUp, false);
    }
    
    handleKeyDown(e) {        
        this.keyCodes[e.keyCode] = true;
    }

    handleKeyUp(e) {
        this.keyCodes[e.keyCode] = false;        
    }
}