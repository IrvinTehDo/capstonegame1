const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var stopped = false;
var time = 60;
var frame = 0;
const CENTER_X = 1107;
const CENTER_Y = 540;
var greenRadiusX = 243;
var greenRadiusY = 417;
var button = document.getElementById('button');

var score = 0;
var timer = '01:00';
var accuracy = '0%';

let setter = 1;

const player = {
    radiusX: 1,
    radiusY: 1,
    direction: 1,
    speed: 3,
};

const drawOvalShape = (ctx, center_x, center_y, radiusX, radiusY, strokeColor, alpha, fillColor) =>{
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 2;
    ctx.ellipse(center_x, center_y, radiusX, radiusY,  90 * Math.PI/180, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    ctx.closePath();
}

// draw

const drawRectShape = (ctx, x, y, width, height, color) => {
    ctx.beginPath();
    ctx.strokeColor = color;
    ctx.lineWidth = 2;
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.closePath()
}

// draws text
const DrawText = (ctx, x, y, font, type, size, style, text) => {
    ctx.font = `${type} ${size}px ${font}`;
    ctx.fillStyle = style;
    ctx.fillText(text, x, y, 140);
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

    frame++;
    if(frame == 60){
        frame = 0;
        time--;
    }

    if(time == 60){
        timer = '01:00'
    } else if(time < 60 && time >= 10){
        timer = `00:${time}`;
    } else if(time < 10 && time > 0){
        timer =`00:0${time}`;
    } else if (time <= 0){
        timer = `00:00`;
    }

    if(time <= 0){
        stopped = true;
    }
}

const Draw = () => {
    ctx.clearRect(0,0,1920,1080);

    const bg = new Image();
    bg.src = "assets/bg.png";
    ctx.drawImage(bg,0,0,1900,1080);


    if(score == 0){
        DrawText(ctx, 210, 310, 'Orbitron', 'normal', 40, 'white', '000');
    } else {
        DrawText(ctx, 210, 310, 'Orbitron', 'normal', 40, 'white', score);
    }
    DrawText(ctx, 1590, 170, 'Orbitron', 'normal', 30, 'white', timer);   // drawing the timer

    if(accuracy == '0' + '%'){
    DrawText(ctx, 225, 480, 'Orbitron', 'normal', 25, 'white', '00%');   // drawing the accuracy 
    }
    else{
        DrawText(ctx, 225, 480, 'Orbitron', 'normal', 25, 'white', accuracy);
    }

    // drawing for the circles
    drawOvalShape(ctx, CENTER_X, CENTER_Y, player.radiusX, player.radiusY, "white", 1, "transparent");
    drawRectShape(ctx, CENTER_X - player.radiusY - 7, CENTER_Y, 15, 1);
    drawRectShape(ctx, CENTER_X + player.radiusY - 7, CENTER_Y, 15, 1);
    drawRectShape(ctx, CENTER_X, CENTER_Y - player.radiusX - 7, 1, 15);
    drawRectShape(ctx, CENTER_X, CENTER_Y + player.radiusX - 7 , 1, 15); 


    drawOvalShape(ctx, CENTER_X, CENTER_Y, greenRadiusX, greenRadiusY, "white", .1, "green"); // movable green oval
    drawOvalShape(ctx, CENTER_X, CENTER_Y, 145, 249, "white", .09, "blue"); // white one before green
    
 }


const CheckScore = () => {

if(player.radiusY < 249 && player.radiusY >= 0){
   // console.log("HOT ZONE");
    score += 100;
    accuracyPercentage = Math.ceil((player.radiusY / (249)) * 100);  // compares radius of the white to the minGreenRadiusY
    accuracy = accuracyPercentage + '%';
}
else if( (player.radiusY > 249 ) && (player.radiusY < greenRadiusY)){
    console.log("NICE ZONE");
    score += 150;
    accuracyPercentage = 100;
    accuracy = accuracyPercentage + '%';

    if(greenRadiusX >= 145 && greenRadiusY >= 249){  // makes sure the green circle doesn't get smaller than the white one
    greenRadiusX -= 10;  // decrease the green radius everytime player hits green zone
    greenRadiusY -= 18;
    }

}
else{
   // console.log("COLD ZONE");
   accuracyPercentage = Math.ceil((greenRadiusY / player.radiusY) * 100); // player radius divided by max greenRadiusY
   accuracy = accuracyPercentage + '%';
    score += 100;
}
}



button.addEventListener("click", function (e){

    if(!stopped){
        CheckScore()
        stopped = true;

        if(setter < 10){            // increase speed
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




