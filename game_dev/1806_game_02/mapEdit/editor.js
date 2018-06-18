window.addEventListener('load', editorMain, false);

function editorMain () {
    var canvas = document.querySelector('#editor');
    var ctx = canvas.getContext2d('2d');

    function draw () {
        ctx.beginPath();
        ctx.rect(canvas.clientWidth / 2, canvas.clientHeight / 2, 100, 100);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
    draw();
}