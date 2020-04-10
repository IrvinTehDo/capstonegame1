const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");
var stopped = false;
var score = 0;
const CENTER_X = 592;
const CENTER_Y = 329;

const scoreText = document.getElementById('scoreText');

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
    ctx.lineWidth = 2;
    ctx.ellipse(center_x, center_y, radiusX, radiusY,  90 * Math.PI/180, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}

const drawRectShape = (ctx, x, y, width, height, color) => {
    ctx.beginPath();
    ctx.strokeColor = color;
    ctx.lineWidth = 2;
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.closePath()
}

// updates the line movement
const Update = () => {
    if(!stopped){
        player.radiusX += ((player.speed * (658/1184)) * player.direction);
        player.radiusY += (player.speed * player.direction);
        if(player.radiusY >= 590){
            player.direction *= -1;
        } else if (player.radiusY <= 1){
            player.direction *= -1;
        }
    }

    if(score == 0){
        // display 0000
        scoreText.innerText = '0000';
    } else{
        // display score
        scoreText.innerText = `${score}`;
    }
}

const Draw = () => {
    ctx.clearRect(0,0,1400,800);

    drawOvalShape(ctx, CENTER_X, CENTER_Y, player.radiusX, player.radiusY, "white");
    drawRectShape(ctx, CENTER_X - player.radiusY - 7, CENTER_Y, 15, 1);
    drawRectShape(ctx, CENTER_X + player.radiusY - 7, CENTER_Y, 15, 1);

    drawRectShape(ctx, CENTER_X, CENTER_Y - player.radiusX - 7, 1, 15);
    drawRectShape(ctx, CENTER_X, CENTER_Y + player.radiusX - 7 , 1, 15);
 }


const CheckScore = () => {
if(player.radiusY < 100 && player.radiusY >= 0){
    console.log("HOT ZONE");
    score += 1000;
}
else if(player.radiusY > 100 && player.radiusY < 175){
    console.log("NICE ZONE");
    score += 1500;
}
else{
    console.log("COLD ZONE");
    score += 1000;
}
}

window.addEventListener("keypress", (e) => {
    if(!stopped){
        CheckScore()
        stopped = true;

        if(setter < 10){
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




