const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");
var stopped = false;
const CENTER_X = 592;
const CENTER_Y = 378;
let setter = 1;

const player = {
    radiusX: 1,
    radiusY: 1,
    direction: 1,
    speed: 3
};

const drawOvalShape = (ctx, center_x, center_y, radiusX, radiusY, color) =>{
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.ellipse(center_x, center_y, radiusX, radiusY,  90 * Math.PI/180, 0, 2 * Math.PI);

    ctx.stroke();
    ctx.closePath();
}

// updates the line movement
const Update = () => {
    if(!stopped){
        player.radiusX += ((player.speed * (756/1184)) * player.direction);
        player.radiusY += (player.speed * player.direction);
        if(player.radiusY >= 590){
            player.direction *= -1;
        } else if (player.radiusY <= 1){
            player.direction *= -1;
        }
    }
}

const Draw = () => {
    ctx.clearRect(0,0,1400,800);

    drawOvalShape(ctx, CENTER_X, CENTER_Y, player.radiusX, player.radiusY, "green");


    // drawOvalShape(ctx, CENTER_X, CENTER_Y, 250, 250, "blue");
    // drawOvalShape(ctx, CENTER_X, CENTER_Y, 200, 200, "blue");
    // drawOvalShape(ctx, CENTER_X, CENTER_Y, 150, 150, "green");
    // drawOvalShape(ctx, CENTER_X, CENTER_Y, 100, 100, "red");
    // drawOvalShape(ctx, CENTER_X, CENTER_Y, 50, 50, "red");
 }


const CheckScore = () => {
if(player.radiusY < 100 && player.radiusY >= 0){
    console.log("HOT ZONE");
}
else if(player.radiusY > 100 && player.radiusY < 175){
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

        if(setter < 4){
            player.speed += 1.5;
            setter++;
        }
        else{
            console.log('Move on to next screen.');
        }
    } else {
        stopped = false;
        player.radiusX = 1;
        player.radiusY = 1;
        player.direction = 1;
    }
});

// Draw at 60fps
setInterval(() => {
   Update();
    Draw();
}, 1000/60);




