window.addEventListener("load", main, false);

function main() {
    var canvas = document.getElementById("my_game");
    var ctx = canvas.getContext("2d");
    
    var tank = new cTank(canvas.clientWidth / 2, canvas.clientHeight / 2);
    var managerBullet = new cManagerBullet();

    document.addEventListener("keydown", keyDownHandler, false);    
    document.addEventListener("keyup", keyUpHandler, false);

    var pressedUp = false;
    var pressedDown = false;
    var pressedLeft = false;
    var pressedRight = false;
    var pressedSpace = false;
    
    function keyDownHandler(e) {
        // 32: space
        // 37: arrow left
        // 38: arrow up
        // 39: arrow right
        // 40: arrow down

        if (e.keyCode == 38) {
            tank.cnangeForword({x: 0, y: -1});            
        }
        else if (e.keyCode == 40) {
            tank.cnangeForword({x: 0, y: 1});
        }
        else if (e.keyCode == 37) {
            tank.cnangeForword({x: -1, y: 0});
        }
        else if (e.keyCode == 39) {
            tank.cnangeForword({x: 1, y: 0});
        }

        if (e.keyCode == 32) {
            pressedSpace = true;
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode == 38) {
            pressedUp = false;
        }
        else if (e.keyCode == 40) {
            pressedDown = false;
        }
        else if (e.keyCode == 37) {
            pressedLeft = false;
        }
        else if (e.keyCode == 39) {
            pressedRight = false;
        }        
    }

    function run() {        
        
        //gridMap map
        var rowCount = 20;
        var columnCount = 20;
        var cellWidth = 30;
        var cellHeight = 30;
    
        var gridMap = [];      
    
        for (var c = 0; c < columnCount; c++) {
            gridMap[c] = [];
            for (var r = 0; r < rowCount; r++) {
                gridMap[c][r] = {x: (c * cellWidth), y: (r * cellHeight), state: 0};            
            }
        }    
        
        function drawgridMap () {        
            for (let c = 0; c < columnCount; c++) {
                for (let r = 0; r < rowCount; r++) {
                    ctx.beginPath();
                    ctx.rect(gridMap[c][r].x, gridMap[c][r].y, cellWidth, cellHeight);
                    ctx.strokeStyle = "gray";
                    ctx.lineWidth = 0.3;
                    ctx.stroke();
                    ctx.closePath();            
                }
            }    
            
        }
    
        function update () {      
            tank.update();
            managerBullet.update();        
        }
    
        function render() {
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            drawgridMap();        
            
            tank.render(ctx);
            managerBullet.render(ctx);
        }
        
        function gameLoop () {
            update();
            render();
        }
        
        setInterval(gameLoop, 30);
    }

    run();    
}

