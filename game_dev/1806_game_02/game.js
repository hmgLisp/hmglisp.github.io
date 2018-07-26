window.addEventListener("load", main, false);

function main() {
    const canvas = document.getElementById("my_game");
    const ctx = canvas.getContext("2d");    
    
    let inputKeys = [];

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
        const tank = new Tank(canvas.clientWidth / 2, canvas.clientHeight / 2);
        const timer = new Timer();

        //grid
        const rowCount = 20;
        const columnCount = 20;
        const cellWidth = 30;
        const cellHeight = 30;
        const gridColor = "white";
        const gridLineWidth = 0.3;
        
        let blocks = [];

        //bullet
        let bullets = [];
        const fireInterval = 1000;
        let deltaT = 0;

        let effects = [];

        document.addEventListener("mousedown", mouseDownHandler, false);

        //마우스 우클릭 메뉴사용 안함
        canvas.oncontextmenu = function() {
            return false;
        }

        function mouseDownHandler(e) {
            let x = Math.floor((e.clientX - canvas.offsetLeft) / cellWidth);
            let y = Math.floor((e.clientY - canvas.offsetTop) / cellHeight);

            blocks.push(new Block(x * cellWidth, y * cellHeight,'brick'));   
        }      
        
        function updateBullets() {
            bullets.forEach(bullet => {                
                if (bullet.x < 0 - bullet.r || 
                    bullet.y < 0 - bullet.r ||
                    bullet.x > canvas.clientWidth + bullet.r ||
                    bullet.y > canvas.clientHeight + bullet.r) {
                    bullet.show = false;   
                    effects.push(new effectOfExplosion(bullet.x, bullet.y));                 
                }
                else {
                    bullet.update();
                }
            });
        }

        function updateEffect() {
            effects.forEach(effect => {
                effect.update();                
            });
        }

        function rotateTank() {
            let tmpForword = tank.forword; 
            if(inputKeys[37]) {
                tmpForword = {x:-1, y: 0};
                //inputKeys[37] = false;
            }
            if(inputKeys[38]) {
                tmpForword = {x: 0, y:-1};
                //inputKeys[38] = false;
            }
            if(inputKeys[39]) {
                tmpForword = {x: 1, y: 0};
                //inputKeys[39] = false;
            }
            if(inputKeys[40]) {
                tmpForword = {x: 0, y: 1};
                //inputKeys[40] = false;
            }       
            
            tank.forword = tmpForword;           
        }

        function fireTank() {
            deltaT += timer.deltaTime;
            if(inputKeys[32] && deltaT > fireInterval) {
                bullets.push(new Bullet(tank.muzzlePos.x, tank.muzzlePos.y, 5, tank.forword));
                deltaT = 0;
            }
        }
    
        function update() {      
            timer.update();    
            
            rotateTank();        
            tank.update(canvas);                    

            fireTank();
            updateBullets();
            updateEffect();
        }        

        function drawBullets() {
            bullets.forEach(bullet => {
                bullet.render(ctx);
            });
        }

        function drawEffect() {
            effects.forEach(effect => {
                effect.render(ctx);
            });
        }
        

        function drawGrid() {
            for(let r = 0; r < rowCount; r++) {
                for(let c = 0; c <columnCount; c++) {
                    let x = c * cellWidth;
                    let y = r * cellHeight;

                    ctx.beginPath();
                    ctx.rect(x, y, cellWidth, cellHeight);            
                    ctx.lineWidth = gridLineWidth;
                    ctx.strokeStyle = gridColor;
                    ctx.stroke();            
                    ctx.closePath();                    
                }
            }                                
        }
       
        function drawBlock() {
            blocks.forEach(o => {
                o.render(ctx);
            });
        }
    
        function render() {
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            drawGrid();   
            drawBlock();           
            
            drawBullets();
            drawEffect();
            tank.render(ctx);
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

