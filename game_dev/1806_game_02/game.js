window.addEventListener("load", gameMain, false);

function gameMain() {
    var canvas = document.getElementById("my_game");
    var ctx = canvas.getContext("2d");
    
    var x = canvas.clientWidth / 2;
    var y = canvas.clientHeight / 2;
    var w = 30;
    var h = 30;
    var speed = 2;
    var ang = 90;

    var dx = 0;
    var dy = 0;
   
    var barrelX = 0;
    var barrelY = 0;
    var barrelLen = -30;
    var barrelT = 5;

    var muzzleX = 0;
    var muzzleY = 0;
    
    var pressedUp = false;
    var pressedDown = false;
    var pressedLeft = false;
    var pressedRight = false;

    var pressedSpace = false;

    var bulletManager = [];

    class cBullet {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.r = 5;  
            this.speed = 5;          
        }

        update() {
            let dy = this.y + -this.speed;
            if (dy - this.r < 0) {
                delete this;
            }
            this.y += -this.speed;         
        }            

        render(ctx) {
            this.update();

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.closePath();            
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);    
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        // 32: space
        // 37: arrow left
        // 38: arrow up
        // 39: arrow right
        // 40: arrow down

        if (e.keyCode == 38) {
            pressedUp = true;
            ang = 90;
        }
        else if (e.keyCode == 40) {
            pressedDown = true;
            ang = 270;
        }
        else if (e.keyCode == 37) {
            pressedLeft = true;
            ang = 180;
        }
        else if (e.keyCode == 39) {
            pressedRight = true;
            ang = 0;
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

    function bullet() {

    }

    function drawTank() {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
        
        //draw barrel
        ctx.beginPath();        
        ctx.rect(barrelX - barrelT / 2, barrelY, barrelT, barrelLen);
        ctx.fillStyle = "red";
        ctx.fill();     
        ctx.closePath();        
    }

    function update() {
        
    }

    function render() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        drawTank();

        bulletManager.forEach(bullet => {
            bullet.render(ctx);
        });

        if (pressedUp == true) {
            dy = -speed;
        }        

        if (pressedDown == true) {
            dy = speed;
        }

        if (pressedLeft == true) {
            dx = -speed;
        }

        if (pressedRight == true) {
            dx = speed;
        }

        if (x + dx > 0 && x + dx + w < canvas.clientWidth) {
            x += dx;
        }   

        if (y + dy > 0 && y + dy < canvas.clientHeight) {
            y += dy;
        }

        if (pressedSpace == true) {
            bulletManager.push(new cBullet(muzzleX, muzzleY));
            pressedSpace = false;
        }

        barrelX = (x + w / 2);
        barrelY = y + h / 2;  
        muzzleX = barrelX;
        muzzleY = barrelY + barrelLen;

        dx = 0;
        dy = 0;
        
        //requestAnimationFrame(render);
    }
    // render();

    //setInterval(update, 20);
    setInterval(render, 20);
}