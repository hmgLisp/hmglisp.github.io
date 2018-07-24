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
        const timer = new cTimer();

        //gridMap map
        const rowCount = 20;
        const columnCount = 20;
        const cellWidth = 30;
        const cellHeight = 30;
        
        let blocks = [];

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
    
        function update() {      
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


            timer.update();            
            tank.update();                    
        }        

        function drawGrid() {
            for(let r = 0; r < rowCount; r++) {
                for(let c = 0; c <columnCount; c++) {
                    let x = c * cellWidth;
                    let y = r * cellHeight;

                    ctx.beginPath();
                    ctx.rect(x, y, cellWidth, cellHeight);            
                    ctx.lineWidth = 0.1;
                    ctx.strokeStyle = "gray";
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

