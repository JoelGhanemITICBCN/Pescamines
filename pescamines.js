let files;
let columnes;

function mida() {
    if (files < 10 ){ 
        files = 10;
    } else if (files > 30 ){
        files = 30;
    }
    
    if (columnes < 10){
        columnes = 10;
    } else if (columnes > 30) {
        columnes = 30;
    }
}

function crearTaulell(){
    const taulell = document.getElementById('taulell');
    let taula = "<table>";
    for (let i = 1; i <= files; i++) {
        taula += "<tr>";
        for(let j = 1; j <= columnes; j++){
            taula += `<td style="height: 20px; width: 20px; background-image: url('img/fons20px.jpg'); "data-mina = false" onclick = "obreCasella(${i}, ${j})" id ="${i}-${j}"></td>`;
        }
        taula += "</tr>";
    }
    taula += "</table>";
    taulell.innerHTML = taula;
    setMines();
}

function esMina(x,y) {
    let casella = document.getElementById(`${x}-${y}`);
    let valorCasella = casella.getAttribute('data-mina');
    if(valorCasella == "true"){return true;}
    return false;
}

function obreCasella(x,y) {
    if (esMina(x,y)) {
        mostraTotesLesMines();
    } else {
        console.log(`clikas la ${x}-${y}`);
        calculaAdjacents(x,y);
    }
}

function calculaAdjacents(x,y){
    let casella = document.getElementById(`${x}-${y}`);
    let valorCasella = casella.getAttribute('data-mina');
    let casellaAnexa;
    let valorCasellaAnnexa;
    let contadorDeMinas = 0;
    for(let i = x-1; i <= x+1; i++){
        for(let j = y-1; j <= y+1; j++){
            console.log(`${i}-${j}`);
             casellaAnexa = document.getElementById(`${i}-${j}`);
             valorCasellaAnnexa = casellaAnexa.getAttribute('data-mina');
             if(valorCasellaAnnexa == "true"){
                contadorDeMinas++;
             } 
        }
    }
    if(contadorDeMinas == 0){
        casella.style.backgroundImage =  "";
        for(naddasafsdhfjghasfkg)

    } else {
        casella.style.backgroundImage =  "";
        casella.innerText = contadorDeMinas;
    }
}


function setMines() {
let totalCeldas = files * columnes;
let numMines = Math.round(totalCeldas * 0.17);
let celdas = new Array(totalCeldas).fill(false);
for(let i = 0; i < numMines; i++) {
    celdas[i] = true;
}
celdas.sort(() => Math.random() - 0.5);
for(let i = 1; i <= files; i++) {
    for(let j = 1; j <= columnes; j++) {
        let elemento = document.getElementById(`${i}-${j}`);
        elemento.setAttribute('data-mina', celdas[i*j]);
    }
}
}
function mostraTotesLesMines() {
    for(let i = 1; i <= files; i++) {
        for(let j = 1; j <= columnes; j++) {
            let elemento = document.getElementById(`${i}-${j}`);
            let tieneBomba = elemento.getAttribute('data-mina');
            if(tieneBomba == "true"){
                elemento.style.backgroundImage =  "url('img/mina20px.jpg')";
            }
        }
    }
    hasPerdut();    
    }

function hasPerdut() {
    setTimeout(function(){alert("Has perdut"),3000});
}
function iniciarPartida() {
    files = prompt("Quantes files vols? (10 minim i 30 maxim)");
    columnes = prompt("Quantes columnes vols? (10 minim i 30 maxim)");
    mida();
    crearTaulell();
}