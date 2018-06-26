window.addEventListener('load', editorMain, false);

function editorMain () {
    var canvas = document.querySelector('#editor');
    //var canvas = document.getElementById('editor');
    var ctx = canvas.getContext('2d');
    var but1 = document.querySelector('#but1');
    
    let grid = [];
    let rowCount = 20;
    let colCount = 20;
    let cellWidth = 30;
    let cellHeight = 30;

    canvas.addEventListener('mousedown', but1ClickHandler, false);
    
    //캔버스위에서 우클릭시 메뉴 생성 하지 않는다.
    //기본 메뉴 대신 커스텀 메뉴를 보이게 할 수 있다.
    canvas.oncontextmenu = function() {
        return false;
    }
    function but1ClickHandler(e) {
        if(!grid) {
            console.log('grid empty!!');
        }
        
        if(e.button == 0) {
            let x = e.clientX - canvas.offsetLeft;
            let y = e.clientY - canvas.offsetTop;              
            grid[Math.floor(y / cellHeight)][Math.floor(x / cellWidth)].state = 1;
        }
        else if(e.button == 2) {
            console.log('jfkld');
            let x = e.clientX - canvas.offsetLeft;
            let y = e.clientY - canvas.offsetTop;              
            grid[Math.floor(y / cellHeight)][Math.floor(x / cellWidth)].state = 0;
        }
    }

    function initGrid() {
        for (let r = 0; r < rowCount; r++) {
            grid[r] = [];
            for (let c = 0; c < colCount; c++) {
                grid[r][c] = {x: (c * cellWidth), y: (r * cellHeight), state: 0};
            }            
        }
    }

    function drawGrid() {
        for(let r = 0; r < rowCount; r++) {
            for(let c = 0; c < colCount; c++) {
                ctx.beginPath();
                ctx.rect(grid[r][c].x, grid[r][c].y, cellWidth, cellHeight);
                if(grid[r][c].state == 1) {
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                }
                else if(grid[r][c].state == 1) {
                    ctx.fillStyle = "red";
                    ctx.fill();
                }
                else {
                    ctx.strokeStyle = "#0095DD";
                    ctx.lineWidth = 0.3;
                    ctx.stroke();
                }

                ctx.closePath();
            }
        }
        // grid.forEach(cell => {
            
        // });
    }

    function update() {
        
    }
    
    function render() {
        ctx.clearRect(canvas.clientLeft, canvas.clientTop, canvas.clientWidth, canvas.clientHeight);
        drawGrid();
    }

    function gameLoop() {
        update();
        render();
        requestAnimationFrame(gameLoop);
    }

    initGrid();
    gameLoop();
}