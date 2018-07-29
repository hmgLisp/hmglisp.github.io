window.addEventListener("load", run, false);

let inputKeys = [];
let GAME_AREA = {X:0, Y:0, W:0, H:0};
let BLOCKS = [];
//grid
const rowCount = 20;
const columnCount = 20;
const cellWidth = 30;
const cellHeight = 30;
const gridColor = "white";
const gridLineWidth = 0.3;

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
    const canvas = document.getElementById("my_game");
    const ctx = canvas.getContext("2d"); 
    GAME_AREA.X = canvas.clientX;
    GAME_AREA.Y = canvas.clientY;
    GAME_AREA.W = canvas.clientWidth;
    GAME_AREA.H = canvas.clientHeight;

    const tank = new Tank(canvas.clientWidth / 2, canvas.clientHeight / 2);
    
    

    //bullet
    let bullets = [];
    const fireInterval = 1000;
    let deltaT = 1000;

    document.addEventListener("mousedown", mouseDownHandler, false);

    //마우스 우클릭 메뉴사용 안함
    canvas.oncontextmenu = function() {
        return false;
    }

    function mouseDownHandler(e) {
        let x = Math.floor((e.clientX - canvas.offsetLeft) / cellWidth);
        let y = Math.floor((e.clientY - canvas.offsetTop) / cellHeight);

        BLOCKS.push(new Block(x * cellWidth, y * cellHeight,'brick'));
    }      
    
    function updateBullets() {
        bullets.forEach(bullet => {    
            if(bullet.show) {
                bullet.update();
            }
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
        deltaT += TIMER.deltaTime;
        if(inputKeys[32] && deltaT > fireInterval) {
            bullets.push(new Bullet(tank.muzzlePos.x, tank.muzzlePos.y, 5, tank.forword));
            deltaT = 0;
        }
    }

    function collicionCheck() {

    }

    function update() {      
        TIMER.update();    
        
        rotateTank();        
        tank.update(canvas);                    

        fireTank();
        updateBullets();
        for(let i = 0; i < bullets.length; i++) {
            if(bullets[i].show){                
                for(let j = 0; j < BLOCKS.length; j++) {
                    if(BLOCKS[j].show) {
                        if(bullets[i].collisionCheck(BLOCKS[j])) {
                            BLOCKS[j].show = false;
                            break;
                        }                    
                    }
                }
            }
        }


        EFFECT_MAG.update();        

    }        

    function drawBullets() {
        bullets.forEach(bullet => {
            if(bullet.show) {
                bullet.render(ctx);
            }
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
        BLOCKS.forEach(o => {
            if(o.show) {
                o.render(ctx);
            }
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        drawGrid();   
        drawBlock();           
        
        drawBullets();
        
        EFFECT_MAG.render(ctx);

        tank.render(ctx);
    }
    
    function gameLoop() {
        update();
        render();
        requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
}  