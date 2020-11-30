var listadoPalabras = [
    "esternocleidomastoideo",
    "tranca",
    "segismundo",
    "batracio",
    "recesvinto",
    "ornitorrinco",
    "anacoreta",
    "albondiga",
    "jipiar",
    "mamporrero",
    "murcielago",
    "gudalcanal",
    "burdegano"
];

let respuesta = '';
let fallosMaximos=6;
let fallo=0;
let palabra=[];
let wordStatus=null;

function palabraRandom(){
    respuesta = listadoPalabras[Math.floor(Math.random()*listadoPalabras.length)];
    
}

function generarBotones(){
    let buttonsHTML = 'abcdefghijklmnñopqrstuvwxyz'.split('').map(letra =>
        `
          <button
            class="btn btn-lg btn-primary m-2"
            id='` + letra + `'
            onClick="cogerLetra('` + letra + `')"
          >
            ` + letra + `
          </button>
        `).join('');
    
      document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function cogerLetra(letraElegida){
    palabra.indexOf(letraElegida) === -1 ? palabra.push(letraElegida) : null;
    document.getElementById(letraElegida).setAttribute('disabled',true);
    
    if(respuesta.indexOf(letraElegida)>=0){
        guessedWord();
        comprobarGanador();
    }else if (respuesta.indexOf(letraElegida) === -1){
        fallo++;
        actualizarFallos();
        comprobarPerdedor();
        actualizarImagen();
    }
}

function actualizarImagen(){
    document.getElementById('imagenColgado').src='icon/'+fallo+'.jpg';
}

function comprobarGanador(){
    if(wordStatus===respuesta){
        document.getElementById('imagenColgado').src='icon/win.jpg';
        document.getElementById('keyboard').innerHTML="Has ganado!!!"
    }
}

function comprobarPerdedor(){
    if(fallo>=fallosMaximos){
        document.getElementById('wordSpotlight').innerHTML='La respuesta era muy fácil: '+respuesta;
        document.getElementById('keyboard').innerHTML="Eres un perdedor!!!"
    }
}

function guessedWord(){
    wordStatus = respuesta.split('').map(letra =>(palabra.indexOf(letra)>=0 ? letra : " _ ")).join('');
    document.getElementById('wordSpotlight').innerHTML=wordStatus;
}

function actualizarFallos(){
    document.getElementById('mistakes').innerHTML=fallo;
}

function reset(){
    let fallo=0;
    let palabra=[];
    document.getElementById('imagenColgado').src="icon/0.jpg";
    palabraRandom();
    guessedWord();
    actualizarFallos();
    generarBotones();
}

document.getElementById('maxWrong').innerHTML=fallosMaximos;

palabraRandom();
generarBotones();
guessedWord();