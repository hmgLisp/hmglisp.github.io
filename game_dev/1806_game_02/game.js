window.addEventListener("load", gameMain, false);

function gameMain() {
    var canvas = document.getElementById("my_game");
    var ctx = canvas.getContext("2d");   

    var score = 0;
    var x = canvas.clientWidth / 2;
    var y = canvas.clientHeight / 2;
    var w = 30;
    var h = 30;
    var speed = 2;    

    var dx = 0;
    var dy = 0;
   
    var barrelX = x + w / 2;
    var barrelY = y + h / 2;
    var barrelLen = -30;
    var barrelTHK = 5;
    
    var muzzleX = barrelX;
    var muzzleY = barrelY + barrelLen;
    
    var pressedUp = false;
    var pressedDown = false;
    var pressedLeft = false;
    var pressedRight = false;

    var pressedSpace = false;

    var bullets = [];
    var bulletManager = [];
    
    
    //gridMap map
    var rowCount = 20;
    var columnCount = 20;
    var cellWidth = 30;
    var cellHeight = 30;

    var gridMap = [];
    var bricks = [];
    
    //자이로 센서
    var beta = 0;
    var gamma = 0;

    for (var c = 0; c < columnCount; c++) {
        gridMap[c] = [];
        for (var r = 0; r < rowCount; r++) {
            gridMap[c][r] = {x: (c * cellWidth), y: (r * cellHeight), state: 0};            
        }
    }    

    if (window.DeviceOrientationEvent) { 
        window.addEventListener("deviceorientation", handleOrientation, false);
        document.getElementById("score").innerText = "ok!";
    }
    else {
        document.getElementById("score").innerText = "no!";
    }
    
    document.addEventListener("keydown", keyDownHandler, false);    
    document.addEventListener("keyup", keyUpHandler, false);
    

    function handleOrientation (e) {
        beta = e.beta;
        gamma = e.gamma;
    }

    function keyDownHandler(e) {
        // 32: space
        // 37: arrow left
        // 38: arrow up
        // 39: arrow right
        // 40: arrow down

        if (e.keyCode == 38) {
            pressedUp = true;            
        }
        else if (e.keyCode == 40) {
            pressedDown = true;            
        }
        else if (e.keyCode == 37) {
            pressedLeft = true;            
        }
        else if (e.keyCode == 39) {
            pressedRight = true;            
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

    function drawHUD () {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("x: " + beta, 8, 20);
        ctx.fillText("y: " + gamma, 8, 40);
        ctx.fillText("bullet count: " + bullets.length, 8, 60);
    }

    function drawTank() {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
        
        //draw barrel
        // ctx.beginPath();        
        // ctx.rect(barrelX - barrelT / 2, barrelY, barrelT, barrelLen);
        // ctx.fillStyle = "red";
        // ctx.fill();     
        // ctx.closePath(); 
        
        //draww barrel
        ctx.beginPath();
        ctx.moveTo(barrelX, barrelY);
        ctx.lineTo(muzzleX, muzzleY);
        ctx.lineWidth = barrelTHK;
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
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
        if (pressedUp == true) {
            dy = -speed;            
        }   
        else if (pressedDown == true) {
            dy = speed;
        }
        else if (pressedLeft == true) {
            dx = -speed;
        }
        else if (pressedRight == true) {
            dx = speed;
        }

        if (x + dx > 0 && x + dx + w < canvas.clientWidth) {
            x += dx;
        }   

        if (y + dy > 0 && y + dy < canvas.clientHeight) {
            y += dy;
        }

        if (pressedSpace == true) {
            bullets.forEach(bullet => {
                if ()
                
            }); 
            bullets.push(new cBullet(muzzleX, muzzleY, 5, [muzzleX - barrelX, muzzleY - barrelY]));
            pressedSpace = false;
            score++;
            document.getElementById('score').textContent = score;
        }

        barrelX = (x + w / 2);
        barrelY = y + h / 2;  

        if (pressedUp == true) {
            muzzleX = barrelX;
            muzzleY = barrelY + barrelLen;
        }
        else if (pressedDown == true) {
            muzzleX = barrelX;
            muzzleY = barrelY + -barrelLen;
        }
        else if (pressedLeft == true) {
            muzzleX = barrelX + barrelLen;
            muzzleY = barrelY;
        }
        else if (pressedRight == true) {
            muzzleX = barrelX + -barrelLen;
            muzzleY = barrelY;
        }        

        dx = 0;
        dy = 0;

        bullets.forEach(bullet => {
            if (bullet.show == true) {
                bullet.update();                
            }

            if (!(bullet.x - bullet.r > 0 
                && bullet.x + bullet.r < canvas.clientWidth
                && bullet.y - bullet.r > 0 
                && bullet.y + bullet.r < canvas.clientHeight)) {
                bullet.show = false;
            }
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        drawgridMap();
        drawTank();
        drawHUD();

        bullets.forEach(bullet => {
            bullet.render(ctx);
        });

            
    }
    
    function gameLoop () {
        update();
        render();
    }
    
    setInterval(gameLoop, 20);
}