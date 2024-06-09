# flappy-bird-game

clone de flappy bird

-fazer sua propria versao do jogo flappy bird como atividade avaliativa para o curso de programação FANTech/FGV

-HTML, CSS e JavaScript



+07/06/2024

Após passar a semana pesquisando e experimentando com o chatgpt, ontem a noite acho que virei a chave na lógica do processo de escrever o jogo.
Montei um plano/roteiro meu com as coisas que quero implementar.

-> controles
    Space - começar o jogo (tela de inicio) ✔
    Space - reiniciar o jogo (tela game over)
    Space - voar ✔
    ArrowUp - voar ✔
    ArrowRight - ir pra frente ✔
    ArrowLeft - ir pra tras ✔

-> Objetos 
    bird ✔
    pipes ✔
        top ✔
        bottom ✔
        gerar pipes infinitos ✔
        gerar pipes de forma aleatoria ✔

    Inicia : Tela de Inicio ✔
        -> bg estatico no fundo ✔
        -> banner de inicio ✔
        -> *Space* pra iniciar ✔

    Jogo : 
        -> bg dinamico
        -> bird posição inicial ✔
        -> pipe posição inicial ✔

        ->check se tem score salvo se {true => return scoreSavo e seguir em frente } ; se {false => seguir em frente };
        

        -> movimento/gravidade é aplicada ao bird ✔
        -> movimento/velocidade é aplicada aos pipes ✔
        -> check Colisão (bird, pipe) se {true => vai ativa a tela de Game Over}; se {false => volta a aplicar gravidade e movimento }

        -> adicionar 1 ponto a Pontuação cade vez que passar pelos pipes sem Colisão

    Game Over : Tela de Game Over
        -> bg estatico no fundo
        -> banner de Fim de Jogo c/ Pontuação
            "Sua Pontuaão: " + score;
            *Input => "Coloque seu nome: " + namePlayer c/c *Botão => salvar nome e score;
            *"Ou aperte *Space* para recomeçar"


    Conteudo Adicional :
                        StartScreen em .gif -> titulo com efeito

                         Som
                        -> musica de jogo
                        -> efeito sonoro ao voar/ir p frente/ir p tras
                        -> efeito sonoro ao morrer
                        
                        Créditos
                        - credito do background
                        - credito do bird
                        - credito da musica     
                        



RELATORIO

 +08/06/2024 00:20
 -> commit novo
 -> startScreen ✔
    => criada função gameLoop {clear, drawStartScreen, requestAnimationFrame}
    => criada startScreen;
    => let bgImg; const startScreen; constStartScreen2;

+13:00
-> Controles de movimento ✔
-> transição StartScreen>gameLoop ✔

+15:40
-> criação do pipes
-> aleatoriedade dos pipes
-> NEXT: gerar pipes de forma infinita


+08/06/24 22:40
-> gera pipes de forma infinita
-> posicionamento inicial dos pipes fora da tela
-> apagar pipes que sairem da tela
-> NEXT: criar check Collision
