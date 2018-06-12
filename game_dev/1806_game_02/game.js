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

    class cBullet {
        constructor(x, y, dir) {
            this.x = x;
            this.y = y;
            this.r = 5;              
            this.speed = 5;          
            this.dir = dir;
        }

        update() {
            let dy = this.y + -this.speed;
            if (dy - this.r < 0) {
                delete this;
            }
            if (this.dir[0] == 0) {
                if (this.dir[1] > 0) {
                    this.y += this.speed;                          
                }
                else {
                    this.y += -this.speed;         
                }
            }
            else {
                if (this.dir[0] > 0) {
                    this.x += this.speed;
                }
                else {
                    this.x += -this.speed;
                }
            }            
        }            

        render(ctx) {
            this.update();

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();            
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);    
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("deviceorientation", handleOrientation, false);

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

    function render() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        drawgridMap();
        drawTank();
        drawHUD();

        bulletManager.forEach(bullet => {
            bullet.render(ctx);
        });

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
            bulletManager.push(new cBullet(muzzleX, muzzleY, [muzzleX - barrelX, muzzleY - barrelY]));
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
        
        //requestAnimationFrame(render);
    }
    // render();

    //setInterval(update, 20);
    setInterval(render, 20);
}