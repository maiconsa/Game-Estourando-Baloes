
const gameInfo = {
    isStarted : false,
    dificulty: 0,
    time: 0,
    initialBall:0,
    exploded: 0,
    timerObject: null
}

var controlRef =  document.getElementById('controls');

function startGame(){

    let dificulty =  document.getElementById("dificulty").value;
    
    document.getElementById('controls').setAttribute('class','invisible');
    document.getElementById('info').setAttribute('class','visible');
    gameInfo.isStarted = true;
    gameInfo.initialBall = dificulty*30;
    gameInfo.dificulty= dificulty;
    gameInfo.time =  dificulty*5;
    createBalls();
    timer();
    changeBallInfo();
 }

 function createBalls(){
    document.getElementById('container').innerHTML = '';
     for(let i = 0; i <gameInfo.initialBall;i++){
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src','../imagens/balao_azul_pequeno.png');
        imgElement.setAttribute('data-estourado',false);
        imgElement.onclick = handlerClickBall;
        document.getElementById('container').appendChild(imgElement);
    
    }
 }

function handlerClickBall(ev){
    if(!gameInfo.isStarted) {return;}
    let img = ev.target;
    let estourado = img.getAttribute('data-estourado');
    if(estourado == 'false'){
        img.setAttribute('data-is-estourado',true);
        img.setAttribute('src','../imagens/balao_azul_pequeno_estourado.png');
        img.setAttribute('onclick',null);
        gameInfo.exploded++;
        changeBallInfo();
    }
}

function changeBallInfo(){
    document.getElementById('info-exploded').innerHTML = gameInfo.exploded;
    document.getElementById('info-not-exploded').innerHTML =gameInfo.initialBall - gameInfo.exploded;

}

function changeTimerText(){
    document.getElementById('timer-span').innerHTML = 'Timer:'+ gameInfo.time.toFixed(2);
}

function tick(){
    if(!gameInfo.isStarted) return;
    gameInfo.time-=0.1;

    if(gameInfo.time <= 0 && gameInfo.exploded < gameInfo.initialBall){
        clearInterval(gameInfo.timerObject);
        gamerOver();
    }

    changeTimerText();
}
function timer(){
    document.getElementById('timer-span').innerHTML = gameInfo.time;
    gameInfo.timerObject  = setInterval((ev)=>{
        tick();
    },100);
}
function gamerOver(){
    document.getElementById('container').innerHTML = '';

    let h3Element  = document.createElement('h3');
    h3Element.appendChild(document.createTextNode('Game Over'));
    h3Element.setAttribute('class','text-game-over text-red');
    controlRef.appendChild(h3Element);
    document.getElementById('container').appendChild(controlRef);
    gameInfo.isStarted = false;
    gameInfo.time = 0;
    gameInfo.dificulty = 0;
    gameInfo.exploded = 0;
    gameInfo.initialBall = 0;
    gameInfo.timerObject = null;

   
}
var startRef = document.getElementById('start-button');
   
startRef.onclick = function(ev){
    startGame();
}










