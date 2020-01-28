const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");

const player = {
    x: 100,
    height: 25,
    width: 5
}

const Update = () => {
    player.x += 5;
    if(player.x > 795){
        player.x = 100;
    }
}

const Draw = () => {
    ctx.clearRect(0,0,900,600);

    ctx.beginPath();
    ctx.rect(100, 250, 700, 25);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(player.x, 250, player.width, 25);
    ctx.fill();
    ctx.closePath();
}

setInterval(() => {
    Update();
    Draw();
}, 1000/60);