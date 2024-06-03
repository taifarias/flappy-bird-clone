// variaveis board

let board;
let boardWidth = 1200;
let boardHeight = 734;
let context;

//variaveis bird

let birdWidth = 80; // pega as medidas do bird encontra MDC é 4/3
let birdHeight = 60; // 38/24 é 4/3
let birdX = boardWidth/3;
let birdY = boardHeight/3;
let birdImg;

let bird = {   // cria o objeto bird e coloca as variaveis dentro dele
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight,

}

//variaveris dos pipes
let pipeArray = []; //array porque sao varios pipes
let pipeWidth = 97; // calcular o MDC e a proporçao da imagem
let pipeHeight = 525;
let pipeX = boardWidth;
let pipeY = 0; //inicia posicionado fora do canvas

let topPipeImg;
let bottomPipeImg;

// game physics

let velocityX = -2; //movendo pra esquerda
let velocityY = 0; //movendo pra cima pulando
let gravity = 0.4;

let gameOver = false;
let score = 0;


window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //usado pra desenhar no canvas



    //carraga a imagem 
    birdImg = new Image();
    birdImg.src = "images/bird.png";
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }
    topPipeImg = new Image();
    topPipeImg.src = "images/top-pipe-bw.png"

    bottomPipeImg = new Image();
    bottomPipeImg.src = "images/bottom-pipe-bw.png"


    requestAnimationFrame(update);
    setInterval(placePipe, 2000); // 1500 ms = 1.5s

    document.addEventListener("keydown", moveBird);
       
}




//gameloop de atualizaçao do bird


function update() { //vai redesenhar o canvas over and over
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height) //apagar a frame anterior 

    //desenha o bird over and over em cada frame
    velocityY += gravity;
    bird.y += velocityY;
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if(bird.y > board.height){
        gameOver = true;
    }



    //pipes nas frames

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
   
        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; //porque tem 2 pipes
            pipe.passed = true;
        }
        if(detectCollision(bird,pipe)) {
            gameOver = true;
        }
    }

        //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //elimina o 1º elemento do array
    }




    //score
    context.fillStyle = "white";
    context.font="40px sans-serif";
    context.fillText(score, 5, 45)

    if(gameOver) {
        context.fillText("Game Over", 500, 250);
        context.fillText("Sua pontuação: " + score, 450, 350);
    }
}


function placePipe(){
    if (gameOver) {
        return
    }
  
    let radomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;
  
  
    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : radomPipeY,
        width : pipeWidth,
        height : pipeHeight,

        passed : false, // booliano passou do bird

    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : radomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp") {
        //jump
        velocityY = -6;

        //reset game
        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
            
        );

}