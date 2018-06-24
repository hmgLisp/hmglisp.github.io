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
        let playArea = {minX: 0, minY: 0, maxX: canvas.clientWidth, maxY: canvas.clientHeight};
        let tank = {x:canvas.clientWidth/2, y:canvas.clientHeight/2, w:30, h:30, forword:{x:0, y:-1}, moveSpeed:2, barrelLen: 30, muzzlePos: {x:0, y:0}};                
        let bullets = [];

        const timer = new cTimer();

        let fireInterval = 800;
        let ft = 0;

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

        function fireTank() {             
            ft += timer.deltaTime;
            if(ft > fireInterval) {
                bullets.push(new cBullet(tank.muzzlePos.x, tank.muzzlePos.y, tank.forword));
                ft = 0;
            }
        }

        function turnTank() {
            if(inputKeys[37]) {
                tank.forword = {x: -1, y: 0};
            }
            else if(inputKeys[38]) {
                tank.forword = {x: 0, y: -1};
            } 
            else if(inputKeys[39]) {
                tank.forword = {x: 1, y: 0};
            }
            else if(inputKeys[40]) {
                tank.forword = {x: 0, y: 1};
            }
        }
        
        function moveTank() {          
            let dx = tank.x + tank.forword.x * tank.moveSpeed;
            let dy = tank.y + tank.forword.y * tank.moveSpeed;

            if(dx > playArea.minX && dx + tank.w < playArea.maxX
            && dy > playArea.minY && dy + tank.h < playArea.maxY) {
                tank.x = dx;
                tank.y = dy;

                tank.muzzlePos.x = (tank.x + tank.w / 2) + (tank.forword.x * tank.barrelLen);
                tank.muzzlePos.y = (tank.y + tank.h / 2) + (tank.forword.y * tank.barrelLen);
            }
        }

        function areaCheck(x, y, w, h) {
            if(playArea.minX > x - w) return true;
            if(playArea.maxX < x + w) return true;
            if(playArea.minY > y - h) return true;
            if(playArea.maxY < y + h) return true;
            
            return false;
        }        
    
        function update() {    
            turnTank();
            moveTank();
            timer.update();
            fireTank();

            bullets.forEach(bullet => {
                let dx = bullet.deltaX;
                let dy = bullet.deltaY;
                if(areaCheck(dx, dy, bullet.r, bullet.r)) {
                    bullet.show = false;
                }
                bullet.update();
            });           
        }

        function drawHUD() {
            //ctx.font = "16px Arial";
            //ctx.fillStyle = "#0095DD";
            //ctx.fillText(timer.fps, 8, 20);
        }

        function drawgridMap() {        
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

        function drawTank() {            
            ctx.beginPath();
            ctx.rect(tank.x, tank.y, tank.w, tank.h);
            ctx.fillStyle = "rgb(0, 149, 221)";
            ctx.fill();
            ctx.closePath();

            //draw muzzle
            ctx.beginPath();
            ctx.arc(tank.muzzlePos.x, tank.muzzlePos.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = "rgb(0, 149, 221)";
            ctx.fill();
            ctx.closePath();
        }
    
        function render() {
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            drawgridMap();   
            drawTank();  
            drawHUD();
            
            bullets.forEach(element => {
                element.render(ctx);
            });
        }
        
        function gameLoop() {
            update();
            render();
            requestAnimationFrame(gameLoop);
        }
        
        gameLoop();
    }    
    run();    
}

