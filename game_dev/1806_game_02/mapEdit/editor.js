window.addEventListener('load', editorMain, false);

function editorMain () {
    var canvas = document.querySelector('#editor');
    //var canvas = document.getElementById('editor');
    var ctx = canvas.getContext('2d');

    function draw () {
        ctx.beginPath();
        ctx.rect(canvas.clientWidth / 2, canvas.clientHeight / 2, 100, 100);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
    draw();
}