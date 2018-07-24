window.addEventListener("load", main, false);

function main() {
    let canvas = document.getElementById("my_game");
    let ctx = canvas.getContext("2d");    
    
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
        let playArea = {minX: 0, minY: 0, maxX: canvas.clientWidth, maxY: canvas.clientHeight};
        //let tank = {x:canvas.clientWidth/2, y:canvas.clientHeight/2, w:30, h:30, forword:{x:0, y:-1}, moveSpeed:2, barrelLen: 30, muzzlePos: {x:0, y:0}};            
        let bullets = [];

        let tank2 = new Tank(canvas.clientWidth / 2, canvas.clientHeight / 2);

        const timer = new cTimer();

        let fireInterval = 800;
        let ft = 0;

        //gridMap map
        let rowCount = 20;
        let columnCount = 20;
        let cellWidth = 30;
        let cellHeight = 30;        
        
        let blocks = [];        

        document.addEventListener("mousedown", mouseDownHandler, false);
        canvas.oncontextmenu = function() {
            return false;
        }

        function mouseDownHandler(e) {
            let x = Math.floor((e.clientX - canvas.offsetLeft) / cellWidth);
            let y = Math.floor((e.clientY - canvas.offsetTop) / cellHeight);

            blocks.push(new Block(x * cellWidth, y * cellHeight,'brick'));   
        }
 
        function collisionCheck(dx, dy) {            
            //lt, 
            //lb
            //rt
            //rb

            let points = [
                {x:Number.parseInt(dx/tank.w), y:Number.parseInt(dy/tank.h)},
                {x:Number.parseInt(dx/tank.w), y:Number.parseInt((dy+tank.h)/tank.h)},
                {x:Number.parseInt((dx+tank.w)/tank.w), y:Number.parseInt(dy/tank.h)},
                {x:Number.parseInt((dx+tank.w)/tank.w), y:Number.parseInt((dy+tank.h)/tank.h)}            
            ];            

            return false;
        }

        function areaCheck(x, y, w, h) {
            if(playArea.minX > x - w) return true;
            if(playArea.maxX < x + w) return true;
            if(playArea.minY > y - h) return true;
            if(playArea.maxY < y + h) return true;
            
            return false;
        }        
    
        function update() {                
            timer.update();            
            tank2.update();                    
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

            tank2.render(ctx);            
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

