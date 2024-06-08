const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const canvasWidth = canvas.width = 1968;
const canvasHeight = canvas.height = 560;

let gameActive = true;
let gameOver = false;




bgImg = new Image();
bgImg.src = "images/bgImg.jpg";

// ñ sei se é necessario   Adicione um evento de carregamento para garantir que a imagem seja carregada antes de atribuí-la ao elemento de fundo
bgImg.onload = function() {
    // Atribua a imagem carregada como o fundo do elemento HTML
    background.style.backgroundImage = `url('${images/background-continuo.jpg}')`;
};
    
const startScreen = new Image();
startScreen.src = "images/startScreen.png";   // 253:93
const startScreen2 = new Image();
startScreen2.src = "images/startScreen2.png"; // 170:85


let birdImg = new Image();
birdImg.src = "images/birdImg.png";  //32x24 4:3
    
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
birdImg.onload = function() { 
    // A imagem do pássaro foi carregada
    console.log("Bird image loaded");
};




function drawStartScreen() {
       
            //seria bom adicionar um fundo meio transparente pra ficar melhor a visibilidade
    ctx.drawImage(bgImg, 0, 0); //background
    ctx.drawImage(startScreen, canvas.width/3.5, canvas.height/8, 256*3, 93*3);   // title
    ctx.drawImage(startScreen2, canvas.width/2.5, canvas.height/1.5, 170*1.8, 85*1.5); //press start
}

function drawBird() {
       
    ctx.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);
}

function update() {
    if(gameActive && !gameOver) {
        bird.velocityY += bird.gravity;
        bird.y += bird.velocityY;
        bird.x +=bird.velocityX;

    }
   
     
}

function handleKeyDown(event){
    if(event.code === "Space" || event.code === "ArrowUp" && !gameOver) {
        bird.velocityY = - 10;
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
    
    if(!gameActive && !gameOver) {
        ctx.clearRect(0,0, canvas.width, canvas.height);

        drawStartScreen();
    
    } 
    
    else if(gameActive && !gameOver) {
        ctx.clearRect(0,0, canvas.width, canvas.height);

        ctx.drawImage(bgImg, 0, 0); //adicionar movimento do background
        
        drawBird();

        update(); // tem que ser criada
        
       //drawPipes();//tem que ser criada

       

    }
    
     requestAnimationFrame(gameLoop);

}



gameLoop();
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
