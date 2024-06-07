const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


const canvasWidth = 1968;
const canvasHeight = 560;

let gameActive = false;
let gameOver = false;



let background = document.getElementById('bgImg')
let bgImg = new Image();
bgImg.src = 'images/background-continuo.jpg';

// Adicione um evento de carregamento para garantir que a imagem seja carregada antes de atribuí-la ao elemento de fundo
bgImg.onload = function() {
    // Atribua a imagem carregada como o fundo do elemento HTML
    background.style.backgroundImage = `url('${images/background-continuo.jpg}')`;
}
    
let telaInicio = document.getElementById('telainicio');

let telaInicioImg = new Image();
telaInicioImg.src = 'images/tela-inicio-loop.gif';
telaInicioImg.onload = function() {
    // Atribua a imagem carregada como o conteúdo da tela de início
    telaInicio.appendChild(telaInicioImg);
};



    

function drawStartScreen() {
    ctx.drawImage(bgImg, 0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText = ("Pressione espaço para começar", 200, canvasHeight/2);
    
}


function gameLoop() {
    ctx.clearRect(0,0, canvasWidth, canvasHeight);

    if(!gameActive && !gameOver) {
        drawStartScreen();

    }

}

function main(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    gameLoop();
}

main();