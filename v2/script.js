const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const canvasWidth = canvas.width = 1968;
const canvasHeight = canvas.height = 560;

let gameActive = false;
let gameOver = false;


const bgImg = new Image();
bgImg.src = "images/bgImg.jpg";

 
const startScreen = new Image();
startScreen.src = "images/startScreen.png";   // 253:93
const startScreen2 = new Image();
startScreen2.src = "images/startScreen2.png"; // 170:85

const gameOverScreen = new Image();
gameOverScreen.src = "images/gameOverScreen.png";  //256:59
const gameOverScreen2 = new Image();
gameOverScreen2.src = "images/gameOverScreen2.png"; //256:83


const birdImg = new Image();
birdImg.src = "images/birdImg.png";  // 4:3    
const bird = {
    img : birdImg,
    x: 650,
    y: 150,
    width: 112,
    height: 84,
    velocityY: 0,
    velocityX: 0,
    gravity: 1,
};


const topPipeImg = new Image();
topPipeImg.src = "images/top-pipe.png" // 67:525
const bottomPipeImg = new Image();
bottomPipeImg.src = "images/bottom-pipe.png"


let pipes = [];
const pipeInterval = 2000;

function createPipes() {                              //criado top e bottom Pipe
    let topPipeY = Math.random() * (-620 + 350) -350; // essa variavel é o que controla o posicionamento dos pipes na tela
    let spaceBetweenPipes = 160; // essa variavel controla o espaço pra bird passar DIFCULDADE DO JOGO
    let pipeSpeed = 2;

    let topPipe = {
        img: topPipeImg,
        x: canvasWidth,
        y: topPipeY,
        width: 67*1.3,
        height: 525*1.3,
        speed: pipeSpeed };
    

    let bottomPipe = {
        img: bottomPipeImg,
        x: canvasWidth,
        y: topPipe.height + topPipeY + spaceBetweenPipes,
        width: 67*1.3,
        height: 525*1.3,
        speed: pipeSpeed };
    

    pipes.push(topPipe, bottomPipe);
}

function drawPipes() {
    for (let i = 0; i < pipes.length; i += 2) {
        let topPipe = pipes[i];
        let bottomPipe = pipes[i + 1];

        ctx.drawImage(topPipe.img, topPipe.x, topPipe.y, topPipe.width, topPipe.height);
        ctx.drawImage(bottomPipe.img, bottomPipe.x, bottomPipe.y, bottomPipe.width, bottomPipe.height);
    }       
}


function drawStartScreen() {
       
            //seria bom adicionar um fundo meio transparente pra ficar melhor a visibilidade
    ctx.drawImage(bgImg, 0, 0); //background
    ctx.drawImage(startScreen, canvas.width/3.5, canvas.height/8, 253*3, 93*3);   // title
    ctx.drawImage(startScreen2, canvas.width/2.5, canvas.height/1.5, 170*1.5, 85*1.5); //press start

}

function drawGameOverScreen() {
    ctx.drawImage(bgImg, 0, 0); //background
    ctx.drawImage(gameOverScreen, canvas.width/3.5, canvas.height/7, 256*4, 59*4);   // title
    ctx.drawImage(gameOverScreen2, canvas.width/2.5, canvas.height/2, 256*1.8, 83*1.5); //press start

}



function drawBird() {
       
    ctx.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);
}



function update() {
    if(gameActive && !gameOver) {
        bird.velocityY += bird.gravity;
        bird.y += bird.velocityY;
        bird.x +=bird.velocityX;

       for(let i = 0; i < pipes.length; i++) {
            pipes[i].x -= pipes[i].speed;
       }
       pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);

       if (checkCollision(bird, pipes)) {
        gameOver = true;
    }
    }       
}


function checkCollision(bird, pipes) {
    // Itera sobre o array pipes em passos de 2 para pegar pares de canos (topPipe e bottomPipe)
    for (let i = 0; i < pipes.length; i += 2) {
        let topPipe = pipes[i];         // Cano superior
        let bottomPipe = pipes[i + 1];  // Cano inferior

        // Verifica colisão com o cano superior
        if (bird.x < topPipe.x + topPipe.width &&
            bird.x + bird.width > topPipe.x &&
            bird.y < topPipe.y + topPipe.height &&
            bird.y + bird.height > topPipe.y) {
            return true; // Colisão detectada
        }

        // Verifica colisão com o cano inferior
        if (bird.x < bottomPipe.x + bottomPipe.width &&
            bird.x + bird.width > bottomPipe.x &&
            bird.y < bottomPipe.y + bottomPipe.height &&
            bird.y + bird.height > bottomPipe.y) {
            return true; // Colisão detectada
        }
    }
    return false; // Nenhuma colisão detectada
}


function handleKeyDown(event){

    if(event.code === "Space" && !gameActive && !gameOver) {
        gameActive = true;
        setInterval(createPipes, pipeInterval);
    }
    if(event.code === "Space" && gameOver) {
        gameActive = true;
        gameOver = false;

    
    }


    if((event.code === "Space" || event.code === "ArrowUp") && !gameOver) {   // DIFCULDADE DO JOGO -> quando maior o pulo maior a dificuldade
        bird.velocityY = - 8;

    }
   
    if(event.code === "ArrowRight" && !gameOver) {
        bird.velocityX = +11;   
        }

    if(event.code === "ArrowLeft" && !gameOver) {
        bird.velocityX = -11;
    }
}

function handleKeyUp(event){
    if(event.code === "ArrowRight" || event.code === "ArrowLeft" && !gameOver) {    //está funcionando, mas não está tão fluido
        bird.velocityX = 0
    }
   
}



function gameLoop() {   
    ctx.clearRect(0,0, canvas.width, canvas.height);

    if(!gameActive && !gameOver) {        
        drawStartScreen();    
    }  else if(gameActive && !gameOver) {

        ctx.drawImage(bgImg, 0, 0); //adicionar movimento do background
        
        drawBird();
        drawPipes();
        
        update();             
 
    } else if(gameOver){
        ctx.drawImage(bgImg, 0, 0); //adicionar movimento do background
        
        drawBird();
        drawPipes();

        drawGameOverScreen();
    }

   
     requestAnimationFrame(gameLoop);   // inicia o jogo

}



gameLoop();

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
