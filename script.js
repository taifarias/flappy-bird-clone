// Variáveis globais
let canvas, ctx;
const canvasWidth = 800;
const canvasHeight = 600;

let bird, pipes;
let gravity = 0.5;
let gameActive = false;
let gameOver = false;
let score = 0;

// Função para iniciar o jogo
function startGame() {
    gameActive = true;
    gameOver = false;
    score = 0;
    bird = { x: 100, y: canvasHeight / 2, size: 20, velocity: 0 };
    pipes = [];
    generatePipes();
}t

// Função para gerar canos
function generatePipes() {
    pipes.push({ x: canvasWidth, y: Math.random() * (canvasHeight - 200) + 100 });
}

// Função para desenhar o pássaro
function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.size, 0, Math.PI * 2);
    ctx.fill();
}

// Função para desenhar os canos
function drawPipes() {
    ctx.fillStyle = "green";
    for (let pipe of pipes) {
        ctx.fillRect(pipe.x, 0, 50, pipe.y - 50);
        ctx.fillRect(pipe.x, pipe.y + 150, 50, canvasHeight - pipe.y - 150);
    }
}

// Função para verificar colisões
function checkCollisions() {
    if (bird.y - bird.size <= 0 || bird.y + bird.size >= canvasHeight) {
        gameOver = true;
    }
    for (let pipe of pipes) {
        if (bird.x + bird.size >= pipe.x && bird.x - bird.size <= pipe.x + 50) {
            if (bird.y - bird.size <= pipe.y || bird.y + bird.size >= pipe.y + 150) {
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

        for (let pipe of pipes) {
            pipe.x -= 2; // Ajuste a velocidade dos canos conforme necessário
        }

        if (pipes[0].x <= -50) {
            pipes.shift();
            score++;
            generatePipes();
        }

        checkCollisions();
    }
}

// Função principal do jogo
function gameLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (!gameActive && !gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Pressione espaço para iniciar", 200, canvasHeight / 2);
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
        bird.velocity = -8; // Ajuste conforme necessário para controlar a altura do pulo
    }
}

// Função principal
function main() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    document.addEventListener("keydown", handleKeyPress);

    canvas.addEventListener("click", function() {
        if (gameOver) {
            startGame();
        }
    });

    gameLoop();
}

// Iniciar o jogo
main();
