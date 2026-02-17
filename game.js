window.addEventListener("keydown",(evnt)=>{
    direction = evnt.key;
});

const timeElapsed = document.querySelector("#time-elapsed");
const score = document.querySelector("#score");
const bestScore = document.querySelector("#bestscore");
const arena = document.querySelector(".arena");
const overlay = document.querySelector(".overlay");
const button = document.querySelector(".start");


let box = 30;
const row = (arena.clientHeight/box)-1;
const column = (arena.clientWidth/box)-1;
let currentScore = 0;
let highestScore = 0;
let time = 0;
const blocks = [];
let snake = [{y:4,x:10}];
let food = [{y:Math.floor(Math.random()*column),x:Math.floor(Math.random()*row)}];
let direction = "ArrowLeft";
let head = null;
let start = null;
let timer = null;


button.addEventListener("click",() => {
    overlay.style.display = "none";

    snake = [{y:4,x:10}];
    direction = "ArrowLeft";
    currentScore = 0;
    time = 0;
    let iter = 0;
    start = setInterval(()=>{
        if(iter !== 0){
            remove();
        }
        getDirection();
        collision();
        snake.unshift(head);
        if(snake[0].y === food[0].y && snake[0].x === food[0].x){
            foodRespawn();
        }else{
            snake.pop();
        }
        play();
        iter++;
    },300);

    timer = setInterval(() => {
        timeElapsed.textContent = `${++time} seconds`;
    }, 1000);
});


for(let i = 0; i < row; i++){
    for(let j = 0; j < column;j++){
        const block = document.createElement("div");
        arena.appendChild(block).setAttribute("class","block");
        blocks[`${i}-${j}`] = block;
    }
}

function play(){
    snake.forEach((body)=>{
        blocks[`${body.y}-${body.x}`].classList.add("snake");
    });
    
    blocks[`${food[0].y}-${food[0].x}`].classList.add("food");
}
function foodRespawn(){
    blocks[`${food[0].y}-${food[0].x}`].classList.remove("food");

    score.textContent = ++currentScore;
    if(currentScore>highestScore){
        highestScore = currentScore;
    }
    bestScore.textContent = highestScore;

    food = [{y:Math.floor(Math.random()*row),x:Math.floor(Math.random()*column)}];
}
function remove(){
    snake.forEach((body)=>{
        blocks[`${body.y}-${body.x}`].classList.remove("snake");
    });
}
const getDirection = function(){
    if(direction === "ArrowLeft"){
        head = {y:snake[0].y,x:snake[0].x-1};
    }
    if(direction === "ArrowRight"){
        head = {y:snake[0].y,x:snake[0].x+1};
    }
    if(direction === "ArrowUp"){
        head = {y:snake[0].y-1,x:snake[0].x};
    }
    if(direction === "ArrowDown"){
        head = {y:snake[0].y+1,x:snake[0].x};
    }
}
function collision(){
    const hitSelf = snake.some(part => part.x === head.x && part.y === head.y);

if (head.x < 0 || head.x >= column || head.y < 0 || head.y >= row || hitSelf) {
    gameOver();
    return;
}
}
function gameOver(){
    clearInterval(start);
    clearInterval(timer);
    overlay.firstChild.textContent = "Game Over";
    overlay.style.display = "";
}