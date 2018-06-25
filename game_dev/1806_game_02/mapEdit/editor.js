window.addEventListener('load', editorMain, false);

function editorMain () {
    var canvas = document.querySelector('#editor');
    //var canvas = document.getElementById('editor');
    var ctx = canvas.getContext('2d');
    var but1 = document.querySelector('#but1');
    but1.addEventListener('click', but1ClickHandler, false);

    function but1ClickHandler(e) {
        if(!grid) {
            console.log('grid empty!!');
        }

        
    }

    let grid = [];
    let rowCount = 20;
    let colCount = 20;
    let cellWidth = 30;
    let cellHeight = 30;

    function initGrid() {
        for (let r = 0; r < rowCount; r++) {
            grid[r] = [];
            for (let c = 0; c < colCount; c++) {
                grid[r][c] = {x: (c * cellWidth), y: (r * cellHeight)};
            }            
        }
    }

    function drawGrid() {
        for(let r = 0; r < rowCount; r++) {
            for(let c = 0; c < colCount; c++) {
                ctx.beginPath();
                ctx.rect(grid[r][c].x, grid[r][c].y, cellWidth, cellHeight);
                ctx.strokeStyle = "#0095DD";
                ctx.lineWidth = 0.3;
                ctx.stroke();
                ctx.closePath();
            }
        }
        // grid.forEach(cell => {
            
        // });
    }

    function update() {
        
    }
    
    function render() {
        ctx.clearRect(canvas.clientLeft, canvas.clientTop, canvas.clientWidth, canvas.clientHeight);
        drawGrid();
    }

    function gameLoop() {
        update();
        render();
        requestAnimationFrame(gameLoop);
    }

    initGrid();
    gameLoop();
}