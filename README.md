# PROJETO TRIVIA 

Este projeto foi feito em grupo durante o curso **Desenvolvedor Web Full-stack** na <a href="https://www.betrybe.com/?utm_source=trybe.com.br">Trybe</a> <img src="https://emoji.slack-edge.com/TMDDFEPFU/trybe/54202dc3a934a845.png" height="20px" width="20px">


## COLABORADORES:

[José Carlos](https://github.com/kalarruda)<br>

**Pedro Resck (eu ✌️)**<br>

[Rafael Cardoso](https://github.com/rafaelcardosotrybetruma10a)<br>

[Tiago Moreira](https://github.com/Tiagu99)<br> 

[Ygor Saturnino](https://github.com/YgorSaturnino)<br> 


## O que foi desenvolvido

Nesse projeto, nós enfrentamos o desafio de criar uma aplicação de perguntas e respostas, consumindo **API do Trivia** ( tipo um Show do Milhão :sweat_smile: ).<br>
Para vivenciarmos um cenário mais próximo do mercado de trabalho, utilizamos um quadro _Kanban_ , onde colocamos todos os requisitos pedidos para entregar o projeto na ordem (determinada pela Trybe).<br>
Ao cumprir as demandas, a aplicação permitirá que o usuário possa:

  - Logar no jogo e, se o email tiver cadastro no site [Gravatar](https://pt.gravatar.com/), ter sua foto associada ao perfil de usuária.
  - Acessar a página referente ao jogo, onde se deverá escolher uma das respostas disponíveis para cada uma das perguntas apresentadas. A resposta deve ser marcada antes do contador de tempo chegar a zero, caso contrário a resposta deverá ser considerada errada.
  - Ser redirecionada, após 5 perguntas respondidas, para a tela de score, onde o texto mostrado depende do número de acertos.
  - Visualizar a página de ranking, se quiser, ao final de cada jogo.
  - Configurar algumas opções para o jogo em uma tela de configuração acessível a partir do cabeçalho do app.

## Aprendizados

Fazendo esse projeto eu tive a oportunidade de:
- Vivenciar como é trabalhar em grupo dentro da área de programação 
- Realizar DM's para alinhar as decisões de como o projeto seria desenvolvido
- Ajudar e receber ajuda dos meus colegas através de **Pair programming**
- Entender como a organização das etapas de desenvolvimento são importantes para um bom andamento do projeto
- Respeitar opiniões diferentes da minha 
- Expor meus pensamentos e opiniões de maneira clara e respeitando os meus colegas de projeto
- Aprender com meus erros e me desenvolver um pouco mais como Programador

## Habilidades utilizadas 

  - Criar um store Redux em aplicações React

  - Criar reducers no Redux em aplicações React

  - Criar actions no Redux em aplicações React

  - Criar dispatchers no Redux em aplicações React

  - Conectar Redux aos componentes React

  - Criar actions assíncronas na sua aplicação React que faz uso de Redux
  
  - Consumir uma API externa
  
---


## :video_game: Para os interessados em jogar Trivia :video_game:

1. Clone o repositório
   `git clone git@github.com:PedroResck/projeto-trivia.git`
   
 2. Entre na pasta do repositório que você acabou de clonar:
     `cd sd-projeto-trivia`
  
3. Instale as dependências e inicialize o projeto
   `npm install`
   
4. Inicialize o projeto:
    `npm start` 


## API utilizada do Trivia

[API do Trivia](https://opentdb.com/api_config.php).

Primeiro, é necessário fazer um GET request para:

```
https://opentdb.com/api_token.php?command=request
```

Esse endpoint te retornará o token que vai ser utilizado nas requisições seguintes. A resposta dele será:

```
{
   "response_code":0,
   "response_message":"Token Generated Successfully!",
   "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}
```

Para pegar as perguntas, você deve realizar um GET request para o seguinte endpoint:

```
https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}
