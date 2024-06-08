// Variáveis globais
let canvas, ctx;
const canvasW idth = 800;
const canvasHe ight = 600;

let bird, pipeTopImg, pipeBottomImg, bgImg, startImg;
let gravity = 0.5;
let gameActive = false;
let gameOver = false;
let score = 0;
let moveRight = false;
let moveLeft = false; // Adicionando variável de controle para movimento para a esquerda

// Função para iniciar o jogo
function startGame() {
    gameActive = true;
    gameOver = false;
    score = 0;
    bird = { x: 100, y: canvasHeight / 2, width: 50, height: 50, velocity: 0, img: new Image() };
    bird.img.src = "images/bird.png";
    pipeTopImg = new Image();
    pipeTopImg.src = "images/pipe-top.png";
    pipeBottomImg = new Image();
    pipeBottomImg.src = "images/pipe-bottom.png";
    bgImg = new Image();
    bgImg.src = "images/background.png";
    startImg = new Image();
    startImg.src = "images/start.png";
}

// Função para desenhar o pássaro
function drawBird() {
    ctx.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);
}

// Função para desenhar os canos
function drawPipes() {
    for (let pipe of pipes) {
        ctx.drawImage(pipeTopImg, pipe.x, pipe.topY, pipe.width, pipe.height);
        ctx.drawImage(pipeBottomImg, pipe.x, pipe.bottomY, pipe.width, pipe.height);
    }
}

// Função para desenhar a tela de início
function drawStartScreen() {
    ctx.drawImage(startImg, 0, 0, canvasWidth, canvasHeight);
}

// Função para verificar colisões
function checkCollisions() {
    if (bird.y - bird.height <= 0 || bird.y + bird.height >= canvasHeight) {
        gameOver = true;
    }
    for (let pipe of pipes) {
        if (bird.x + bird.width >= pipe.x && bird.x <= pipe.x + pipe.width) {
            if (bird.y <= pipe.topY + pipe.height || bird.y + bird.height >= pipe.bottomY) {
                gameOver = true;
            }
        }
    }
}

// Função para atualizar a posição do pássaro e dos canos
function update() {
    if (gameActive && !gameOver) {
        bird.velocity += gravity;
        bird.y += bird.velocity;

        if (moveRight) {
            bird.x += 2;
        }
        if (moveLeft) { // Movimento para a esquerda
            bird.x -= 2;
        }

        for (let pipe of pipes) {
            pipe.x -= 2;
        }

        if (pipes[0].x <= -pipe.width) {
            pipes.shift();
            score++;
            generatePipe();
        }

        checkCollisions();
    }
}

// Função principal do jogo
function gameLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (!gameActive && !gameOver) {
        drawStartScreen();
    }

    if (gameActive && !gameOver) {
        update();
        drawBird();
        drawPipes();
    }

    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", 350, canvasHeight / 2);
        ctx.fillText("Pontuação: " + score, 350, canvasHeight / 2 + 50);
        ctx.fillText("Pressione espaço para reiniciar", 200, canvasHeight / 2 + 100);
    }

    requestAnimationFrame(gameLoop);
}

// Função para lidar com eventos de teclado
function handleKeyPress(event) {
    if (event.code === "Space" && !gameActive && !gameOver) {
        startGame();
    }
    if (event.code === "Space" && gameOver) {
        startGame();
    }
    if (event.code === "Space" && !gameOver) {
        bird.velocity = -8;
    }
    if (event.code === "ArrowRight") {
        moveRight = true; // Inicia movimento para a direita
    }
    if (event.code === "ArrowLeft") {
        moveLeft = true; // Inicia movimento para a esquerda
    }
}

// Função para lidar com eventos de teclado (quando uma tecla é solta)
function handleKeyRelease(event) {
    if (event.code === "ArrowRight") {
        moveRight = false; // Interrompe movimento para a direita
    }
    if (event.code === "ArrowLeft") {
        moveLeft = false; // Interrompe movimento para a esquerda
    }
}

// Função principal
function main() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease); // Adiciona evento para lidar com a soltura das teclas

    gameLoop();
}

// Iniciar o jogo
main();
