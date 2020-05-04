const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var stopped = false;
var time = 10;
var frame = 0;
const CENTER_X = c.width / 1.722;
const CENTER_Y = c.height / 2.0698;
var greenRadiusX = c.width / 8.458;
var greenRadiusY = c.height / 2.314;
var button = document.getElementById('scan');
var button2 = document.getElementById('gameover');

var score = 0;
var timer = '00:30';
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
    ctx.lineWidth = 4;
    ctx.ellipse(center_x, center_y, radiusX, radiusY,  90 * Math.PI/180, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    ctx.closePath();
}

// draw

const drawRectShape = (ctx, x, y, width, height, color) => {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.fillStyle = color;
    ctx.lineWidth = 5;
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.fill();
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
        if(player.radiusY >=  c.height / 1.72){    // if pulsating radius is greater than the outer oval
            player.direction *= -1;                // decrease size
        } else if (player.radiusY <= 1){    
            player.direction *= -1;             // increase the size
        }
    }


    frame++;
    if(frame == 60){
        frame = 0;
        time--;
    }

    if(time == 30){
        timer = '00:30'
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
    ctx.clearRect(0,0,c.width,c.height);
    const bg = new Image();
    bg.src = "assets/bg1.png";
    ctx.drawImage(bg,0,0,c.width,c.height);
    const sun = new Image();
    button2.style.visibility = 'hidden';


    if(score == 0){
        // width 1920
        // height 979
        DrawText(ctx, c.width /  9.23 , c.height / 3.78, 'Orbitron', 'normal', c.width / 60, 'white', '000');
    } else {
        DrawText(ctx, c.width /  9.23 , c.height / 3.78, 'Orbitron', 'normal', c.width / 60, 'white', score);
    }
    DrawText(ctx, c.width / 1.2, c.height / 7.59, 'Orbitron', 'normal', c.width / 64, 'white', timer);   // drawing the timer

    if(accuracy == '0' + '%'){
    DrawText(ctx, c.width / 8.495, c.height / 2.33, 'Orbitron', 'normal', c.width / 76.8, 'white', '00%');   // drawing the accuracy 
    }
    else{
        DrawText(ctx, c.width / 8.495, c.height / 2.33, 'Orbitron', 'normal', c.width / 76.8, 'white', accuracy);
    }

    // drawing for the pulsating circles
    drawOvalShape(ctx, CENTER_X, CENTER_Y, player.radiusX, player.radiusY, "white", 1, "transparent");
    drawRectShape(ctx, CENTER_X - player.radiusY - 7, CENTER_Y, 15, 1, 'white');
    drawRectShape(ctx, CENTER_X + player.radiusY - 7, CENTER_Y, 15, 1, 'white');
    drawRectShape(ctx, CENTER_X, CENTER_Y - player.radiusX - 7, 1, 15, 'white');
    drawRectShape(ctx, CENTER_X, CENTER_Y + player.radiusX - 7 , 1, 15, 'white'); 


    drawOvalShape(ctx, CENTER_X, CENTER_Y, greenRadiusX, greenRadiusY, "white", .1, "green"); // movable green oval
    drawOvalShape(ctx, CENTER_X, CENTER_Y, 134, 252, "white", .09, "blue"); // white one before green


    sun.src = "assets/sun.png";
    ctx.drawImage(sun, c.width / 1.8445, c.height / 2.45, c.width / 12.8, c.height / 6.526667);
    
    // timer stopped
    if(timer == `00:00`){
        ctx.clearRect(0,0,c.width,c.height);
        const GOscreen = new Image();
        GOscreen.src = 'assets/gameover.png';
        ctx.drawImage(GOscreen,0,0,c.width,c.height);
        DrawText(ctx, c.width / 1.873, c.height / 1.637, 'Orbitron', 'normal', c.width / 66.206, 'white', score);  // display score
        button.style.visibility ='hidden';
        button2.style.visibility = 'visible';
    }
 }


const CheckScore = () => {

if(player.radiusY < c.height / 3.885 && player.radiusY >= 0){
    accuracyPercentage = Math.ceil((player.radiusY / (c.height / 3.885)) * 100);  // compares radius of the white to the minGreenRadiusY
    accuracy = accuracyPercentage + '%';
}
else if( (player.radiusY > c.height / 3.885 ) && (player.radiusY < greenRadiusY)){
    score += 150;
    accuracyPercentage = 100;
    accuracy = accuracyPercentage + '%';

    if(greenRadiusX >= (c.width / 14.328) && greenRadiusY >= c.height / 3.885){  // makes sure the green circle doesn't get smaller than the white one
    greenRadiusX -= 5;  // decrease the green radius everytime player hits green zone
    greenRadiusY -= 10;
    }
}
else{
   accuracyPercentage = Math.ceil((greenRadiusY / player.radiusY) * 100); // player radius divided by max greenRadiusY
   accuracy = accuracyPercentage + '%';
}
}



button.addEventListener("click", function (e){

    if(!stopped){
        CheckScore();
        player.radiusX = 1;
        player.radiusY = 1;
        player.direction = 1;

        if(setter < 10){            // increase speed
            player.speed += 1.5;
            setter++;
        }
        else{
            console.log('Move on to next screen.');
        }
    }
});

button2.addEventListener("click", function (e){
    location.reload();
});

// Draw at 60fps
setInterval(() => {
   Update();
   Draw();
}, 1000/60);




