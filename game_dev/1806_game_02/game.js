window.addEventListener("load", gameMain, false);

function gameMain() {
    var canvas = document.getElementById("my_game");
    var ctx = canvas.getContext("2d");

    
    var x = canvas.clientWidth / 2;
    var y = canvas.clientHeight / 2;
    var w = 30;
    var h = 35;

    

    function drawTank() {
        ctx.rect(x, y, w, h);
        ctx.fillStyle = "blue";
        ctx.fill();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.beginPath();
        drawTank();
        ctx.closePath();
    }

    draw();

    

    // setInterval(draw);
}