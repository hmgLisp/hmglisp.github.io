window.addEventListener('load', run, false);

function run() {
    let game = new Game(600, 800, 'black');
    game.loop();
}