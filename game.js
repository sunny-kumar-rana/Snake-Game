window.addEventListener("keydown",(evnt)=>{
    direction = evnt.key;
});

const arena = document.querySelector(".arena");
let box = 80;
const row = (arena.clientHeight/box)-1;
const column = (arena.clientWidth/box)-1;
const blocks = [];
let snake = [{y:4,x:10}];
let food = [{y:Math.floor(Math.random()*column),x:Math.floor(Math.random()*row)}];
let head = null;
let direction = "ArrowLeft";

for(let i = 0; i < row; i++){
    for(let j = 0; j < column;j++){
        const block = document.createElement("div");
        block.textContent = `${i},${j}`;
        arena.appendChild(block).setAttribute("class","block");
        blocks[`${i}-${j}`] = block;
    }
}

function play(){
    snake.forEach((body)=>{
        blocks[`${body.y}-${body.x}`].classList.add("snake");
    });
    
    food.forEach((body)=>{
        blocks[`${body.y}-${body.x}`].classList.add("food");
    })
}
function foodRespawn(){
    food = [{y:Math.floor(Math.random()*column),x:Math.floor(Math.random()*row)}];
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

setInterval(()=>{
    remove();
    console.log(head.y,food.y);
    getDirection();
    snake.unshift(head);
    snake.pop();
    play();
},500);