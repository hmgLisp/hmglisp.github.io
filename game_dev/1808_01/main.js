window.addEventListener('load', main, false);

function main() {
    let w = 600;
    let h = 800;
    
    
    const game = new Game(w, h, 'red');
    game.inputMag = new Input();
    game.player = new Player(w/2, 650, 30, 30);

    game.run();
}