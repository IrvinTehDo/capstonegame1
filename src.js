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

const DrawStrokeRect = (x, width, color) => {
    ctx.beginPath();
    ctx.rect(x, 250, width, 25);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

const DrawFillRect = (x, width, color) => {
    ctx.beginPath();
    ctx.rect(x, 250, width, 25);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

const DrawPlayer = (x, width, color) => {
    ctx.beginPath();
    ctx.rect(x, 250, width, 25);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

const Draw = () => {
    ctx.clearRect(0,0,900,600);

    // X-pos, Width, stroke/fill color
    DrawStrokeRect(100, 700, "black");
    DrawFillRect(350, 400, "red");
    DrawFillRect(475, 150, "yellow");
    DrawFillRect(525, 50, "green");

    DrawPlayer(player.x, player.width, "black");
}

const CheckScore = () => {
    console.log(`key pressed with player x pos: ${player.x}`);
}

window.addEventListener("keypress", (e) => {
    CheckScore();
});

//Draw at 60fps
setInterval(() => {
    Update();
    Draw();
}, 1000/60);