const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");
var stopped = false;
const CENTER_X = 500;
const CENTER_Y = 300;

const player = {
    radius: 1,
    direction: 1,
    speed: 3
};

const drawOvalShape = (ctx, center_x, center_y, radius, color) =>{
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.ellipse(center_x, center_y, radius, radius,  90 * Math.PI/180, 0, 2 * Math.PI);

    ctx.stroke();
    ctx.closePath();
}


// updates the line movement
const Update = () => {
    if(!stopped){
        player.radius += (player.speed * player.direction);
        if(player.radius >= 250){
            player.direction *= -1;
        } else if (player.radius <= 1){
            player.direction *= -1;
        }
    }
}

const Draw = () => {
    ctx.clearRect(0,0,1000,600);

    drawOvalShape(ctx, CENTER_X, CENTER_Y, player.radius, "black");


    drawOvalShape(ctx, CENTER_X, CENTER_Y, 250, "blue");
    drawOvalShape(ctx, CENTER_X, CENTER_Y, 200, "blue");
    drawOvalShape(ctx, CENTER_X, CENTER_Y, 150, "green");
    drawOvalShape(ctx, CENTER_X, CENTER_Y, 100, "red");
    drawOvalShape(ctx, CENTER_X, CENTER_Y, 50, "red");
 }


const CheckScore = () => {
if(player.radius < 100 && player.radius >= 0){
    console.log("HOT ZONE");
}
else if(player.radius > 100 && player.radius < 175){
    console.log("NICE ZONE");
}
else{
    console.log("COLD ZONE");
}
}

window.addEventListener("keypress", (e) => {
    if(!stopped){
        CheckScore()
        stopped = true;
    } else {
        stopped = false;
        player.radius = 1;
        player.direction = 1;
    }
});

// Draw at 60fps
setInterval(() => {
   Update();
    Draw();
}, 1000/60);




