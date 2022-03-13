var cnv = document.getElementById("game")
var context = cnv.getContext('2d');

var bg = new Image()
var fg = new Image()
var bird = new Image()
var pipeBottom = new Image()
var pipeUp = new Image()

var fly = new Audio()
var count = new Audio()


bg.src = "src/img/bg.png"
fg.src = "src/img/fg.png"
bird.src = "src/img/bird.png"
pipeBottom.src = "src/img/pipeBottom.png"
pipeUp.src = "src/img/pipeUp.png"

fly.src = "src/audio/fly.mp3"
count.src = "src/audio/score.mp3"

var score = 0

var posX = 10
var posY = 150
var grave = 2

var pipe = []

pipe[0] = {
    x: cnv.height,
    y: 0
}

document.addEventListener("keydown", isMoveUp)

function isMoveUp(){
    if(event.keyCode == 32 && posY !== 0) {
        posY -= 50
        fly.play();
    }
}

function isCollisium(x, y){
    if((x <= bird.width + posX && posX <= x + pipeUp.width && y + pipeUp.height >= bird.height + posY)
        || (x <= bird.width + posX && posX <= x + pipeUp.width && y + pipeUp.height + 90 <= bird.height + posY)
        || (bird.height + posY >= cnv.height - fg.height)){
            location.reload()
        }
}

function isDraw(){ 
    context.drawImage(bg, 0, 0);
    
    context.drawImage(bird, posX, posY)

    posY += grave


    for(let i = 0; i < pipe.length; i++){
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + 90);
        pipe[i].x --;

        if(pipe[i].x == 125){
            pipe.push({
                x: cnv.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        if(pipe[i].x == 5){
            score++
            count.play()
        }

        if(pipe[i].x + pipeUp.width <= 0){
            pipe.shift()
        }

        isCollisium(pipe[i].x, pipe[i].y)
    }

    context.drawImage(fg, 0, cnv.height - fg.height)


    context.font = "30px Arial";
    context.strokeText(`Score:${score}`,5, cnv.height-20);

    
    requestAnimationFrame(isDraw)
}
