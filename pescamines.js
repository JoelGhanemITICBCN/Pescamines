let files;
let columnes;

function mida() {
    if (files < 10 ){ files = 10;} 

    else if (files > 30 ){files = 30;}
    
    if (columnes < 10 ){columnes = 10;} 

    else if (columnes > 30 ){columnes = 30;}
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
    console.log("funciona obre casella");
    if (esMina(x,y)) {
        mostraTotesLesMines();
    } else {
        calculaAdjacents(x,y);
    }
}

function calculaAdjacents(x,y){

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
function iniciarPartida() {
    files = prompt("Quantes files vols? (10 minim i 30 maxim)");
    columnes = prompt("Quantes columnes vols? (10 minim i 30 maxim)");
    mida();
    crearTaulell();
}