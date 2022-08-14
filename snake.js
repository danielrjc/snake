var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const width = 10
const height = 5
var x_velocity = 1
var y_velocity = 0
var x=Math.floor(Math.random() * (canvas.width /2))
var y= Math.floor(Math.random() * (canvas.height/2))
var x_food=Math.floor(Math.random() * (canvas.width /2))
var y_food= Math.floor(Math.random() * (canvas.height/2))
myInterval = setInterval(update, 150);
var isDead =0

body = [[x,y]] 

function update(){
    if(isDead ===0){
        isCollison();
        clear();
        draw();
    }
    else{
        clear()
        gameOver()
    }


}
function isCollison(){
    if(body[0][0] > x_food - width && body[0][0]<x_food+width &&
        body[0][1]>y_food - height && body[0][1]<y_food+height){
            ctx.fillStyle = "black";
            ctx.fillRect(x_food, y_food, canvas.width, canvas.height);
            x_food=Math.floor(Math.random() * (canvas.width /2))
            y_food= Math.floor(Math.random() * (canvas.height/2))
            eat();
        
        }
    if(body[0][0]>canvas.width || body[0][0]<0 ||body[0][1]>canvas.height ||body[0][1]<0){
        isDead = 1
    }
}
function gameOver(){
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("You Lose", canvas.width/2, canvas.height/2);
    ctx.font = "10px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Press Enter to Play Again", canvas.width/2, canvas.height/2+15);
    clearInterval(myInterval)
}
function eat(){
    if(x_velocity==1){
        body.push([x - width*body.length,y])

    }
    else if(x_velocity == -1){
        body.push([x + width*body.length,y])

    }
    else if(y_velocity ==1){
        body.push([x, y - height*body.length])

    }
    else if(y_velocity == -1){
        body.push([x ,y+ height*body.length])

    }

}


function clear(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    ctx.fillStyle = "white";
    for(let i=body.length-1; i>0;i--){
        body[i][0] =body[i-1][0]
        body[i][1] = body[i-1][1]
        
        ctx.fillRect(body[i][0] , body[i][1], width, height);
    }
    body[0][0] += x_velocity*width
    body[0][1] += y_velocity*height
    ctx.fillRect(body[0][0] , body[0][1], width, height);
    food()
}

function food(){
    ctx.fillStyle = "red";
    ctx.fillRect(x_food , y_food, width, height);
}

document.onkeydown = function (event) {
    switch (event.keyCode) {
       case 13:
        x=Math.floor(Math.random() * (canvas.width /2))
        y= Math.floor(Math.random() * (canvas.height/2))
        body = [[x,y]]
        x_velocity = 1
        y_velocity = 0
        isDead = 0
        clear()  
        myInterval = setInterval(update, 150);


       case 37:
           x_velocity = -1
           y_velocity = 0
          console.log("Left key is pressed.");
          break;
       case 38:
        x_velocity = 0
        y_velocity = -1
          console.log("Up key is pressed.");
          break;
       case 39:
        x_velocity = 1
        y_velocity = 0
          console.log("Right key is pressed.");
          break;
       case 40:
        x_velocity = 0
        y_velocity = 1
          console.log("Down key is pressed.");
          break;
    }
 };