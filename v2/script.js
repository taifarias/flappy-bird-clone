const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const canvasWidth = canvas.width = 1968;
const canvasHeight = canvas.height = 560;

let gameActive = false;
let gameOver = false;



let bgImg = document.getElementById('bgImg')
bgImg = new Image();
bgImg.src = "images/bgImg.jpg";

// ñ sei se é necessario   Adicione um evento de carregamento para garantir que a imagem seja carregada antes de atribuí-la ao elemento de fundo
bgImg.onload = function() {
    // Atribua a imagem carregada como o fundo do elemento HTML
    background.style.backgroundImage = `url('${images/background-continuo.jpg}')`;
}
    
const startScreen = new Image();
startScreen.src = "images/startScreen.png";   
const startScreen2 = new Image();
startScreen2.src = "images/startScreen2.png";


    

function drawStartScreen() {
    ctx.clearRect(0,0, canvas.width, canvas.height, canvasWidth, canvasHeight);
    
            //seria bom adicionar um fundo meio transparente pra ficar melhor a visibilidade
    ctx.drawImage(bgImg, 0, 0); //background
    ctx.drawImage(startScreen, canvas.width/3.5, canvas.height/8, 256*3, 93*3);   // title
    ctx.drawImage(startScreen2, canvas.width/2.5, canvas.height/1.5, 170*1.8, 85*1.5); //press start
}


function gameLoop() {
    
    if(!gameActive && !gameOver) {
        ctx.clearRect(0,0, canvas.width, canvas.height);

        drawStartScreen();
    
        requestAnimationFrame(gameLoop);
    }
    
    
    

}



gameLoop();
