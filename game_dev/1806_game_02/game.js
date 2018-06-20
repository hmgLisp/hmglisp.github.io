window.addEventListener("load", main, false);

function main() {
    var canvas = document.getElementById("my_game");
    var ctx = canvas.getContext("2d");
    
    var inputKeys = [];

    document.addEventListener("keydown", keyDownHandler, false);    
    document.addEventListener("keyup", keyUpHandler, false);

    // 32: space
    // 37: arrow left
    // 38: arrow up
    // 39: arrow right
    // 40: arrow down
    function keyDownHandler(e) {        
        inputKeys[e.keyCode] = true;               
    }

    function keyUpHandler(e) {
        inputKeys[e.keyCode] = false;
    }

    function run() {
        var playArea = {minX: 0, minY: 0, maxX: canvas.clientWidth, maxY: canvas.clientHeight};
        var tank = {x:canvas.clientWidth/2, y:canvas.clientHeight/2, w:30, h:30, forword:{x:0, y:-1}, moveSpeed:2};
        
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
            if(inputKeys[37]) {
                tank.forword = {x: -tank.moveSpeed, y: 0};
            }
            else if(inputKeys[38]) {
                tank.forword = {x: 0, y: -tank.moveSpeed};
            } 
            else if(inputKeys[39]) {
                tank.forword = {x: tank.moveSpeed, y: 0};
            }
            else if(inputKeys[40]) {
                tank.forword = {x: 0, y: tank.moveSpeed};
            }
            
            let dx = tank.x + tank.forword.x;
            let dy = tank.y + tank.forword.y;

            if(dx > playArea.minX && dx + tank.w < playArea.maxX
            && dy > playArea.minY && dy + tank.h < playArea.maxY) {
                tank.x = dx;
                tank.y = dy;
            }
        }
    
        function render() {
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            drawgridMap();     
            ctx.beginPath();
            ctx.rect(tank.x, tank.y, tank.w, tank.h);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();       
            
            
        }
        
        function gameLoop () {
            update();
            render();
        }
        
        setInterval(gameLoop, 30);
    }

    run();    
}

