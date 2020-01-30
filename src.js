const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");
var stopped = false;

// the line properties
const player = {
    x: 100,
    height: 25,
    width: 5
}

// updates the line movement
const Update = () => {
    if(!stopped){
        player.x += 5;
        if(player.x > 795){
            player.x = 100;
        }
    }
}

// es the long rectangle stroke
const DrawStrokeRect = (x, width, color) => {
    ctx.beginPath();
    ctx.rect(x, 250, width, 25);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}
// es the long rectangle color
const DrawFillRect = (x, width, color) => {
    ctx.beginPath();
    ctx.rect(x, 250, width, 25);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// drawing the line
const DrawPlayer = (x, width, color) => {
    ctx.beginPath();
    ctx.rect(x, 250, width, 25);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
// draws the rect
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
     if(player.x <= 350 || player.x >= 750)
     {
       console.log('Selected WHITE Zone');
     }
     else if( (player.x > 350 && player.x < 475) || (player.x >= 625 && player.x < 750) ){
         console.log('Selected RED Zone');
     }
     else if( (player.x >= 475 && player.x < 525) || (player.x > 575 && player.x < 625)){
         console.log('Selected YELLOW Zone');
     }
     else{
         console.log('Selected GREEN Zone');
     }
    }

window.addEventListener("keypress", (e) => {
    if(!stopped){
        CheckScore()
        stopped = true;
    } else {
        stopped = false;
        player.x = 100;
    }
});

//Draw at 60fps
setInterval(() => {
    Update();
    Draw();
}, 1000/60);