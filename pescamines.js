let files;
let columnes;

function mida() {
  if (files < 10) {
    files = 10;
  } else if (files > 30) {
    files = 30;
  }

  if (columnes < 10) {
    columnes = 10;
  } else if (columnes > 30) {
    columnes = 30;
  }
}

function crearTaulell() {
  const taulell = document.getElementById("taulell");
  let taula = "<table>";
  for (let i = 1; i <= files; i++) {
    taula += "<tr>";
    for (let j = 1; j <= columnes; j++) {
      taula += `<td style="height: 20px; width: 20px; background-image: url('img/fons20px.jpg'); "data-mina = false" "data-num-mines = 0" onclick = "obreCasella(${i}, ${j})" id ="${i}-${j}"></td>`;
    }
    taula += "</tr>";
  }
  taula += "</table>";
  taulell.innerHTML = taula;
  console.log("antes de calcula");
  setMines();
  calculaAdjacents();
}

function esMina(x, y) {
  let casella = document.getElementById(`${x}-${y}`);
  let valorCasella = casella.getAttribute("data-mina");
  if (valorCasella == "true") {
    return true;
  }
  return false;
}

function obreCasella(x, y) {
  if (esMina(x, y)) {
    mostraTotesLesMines();
  } else {
    mostraCasella(x, y);
  }
}
function mostraCasella(x, y) {
  let casella = document.getElementById(`${x}-${y}`);
  let valorCasella = casella.getAttribute("data-num-mines");
  if (valorCasella == 0) {
    casella.style.backgroundImage = "";
  } else {
    casella.style.backgroundImage = "";
    casella.innerText = valorCasella;
  }
}
function calculaAdjacents() {
    for (let i = 1; i <= files; i++) {
      for (let j = 1; j <= columnes; j++) {
        let contadorDeMinas = 0;
  
        for (let k = i - 1; k <= i + 1; k++) {
          for (let l = j - 1; l <= j + 1; l++) {
            // Asegúrate de no contar la casilla actual
            if (k !== i || l !== j) {
              // Verifica que la casilla adyacente esté dentro de los límites
              if (k >= 1 && k <= files && l >= 1 && l <= columnes) {
                console.log(`${k}-${l}`);
                casellaAnexa = document.getElementById(`${k}-${l}`);
                valorCasellaAnnexa = casellaAnexa.getAttribute("data-mina");
                if (valorCasellaAnnexa == "true") {
                  contadorDeMinas++;
                }
              }
            }
          }
        }
  
        // Actualiza el número de minas adyacentes en la casilla actual
        setMinesAdjacents(i, j, contadorDeMinas);
      }
    }
  }
  
function setMinesAdjacents(x, y, nMinesAdjacents) {
  let elemento = document.getElementById(`${x}-${y}`);
  elemento.setAttribute("data-num-mines", [nMinesAdjacents]);
  console.log(`${nMinesAdjacents}`);
}
function mouAAdjacent(x, y) {
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {}
  }
}

function setMines() {
  let totalCeldas = files * columnes;
  let numMines = Math.round(totalCeldas * 0.17);
  let celdas = new Array(totalCeldas).fill(false);
  for (let i = 0; i < numMines; i++) {
    celdas[i] = true;
  }
  celdas.sort(() => Math.random() - 0.5);
  for (let i = 1; i <= files; i++) {
    for (let j = 1; j <= columnes; j++) {
      let elemento = document.getElementById(`${i}-${j}`);
      elemento.setAttribute("data-mina", celdas[i * j]);
    }
  }
}
function mostraTotesLesMines() {
  for (let i = 1; i <= files; i++) {
    for (let j = 1; j <= columnes; j++) {
      let elemento = document.getElementById(`${i}-${j}`);
      let tieneBomba = elemento.getAttribute("data-mina");
      if (tieneBomba == "true") {
        elemento.style.backgroundImage = "url('img/mina20px.jpg')";
      }
    }
  }
  hasPerdut();
}

function hasPerdut() {
  setTimeout(function () {
    alert("Has perdut"), 3000;
  });
}
function iniciarPartida() {
  files = prompt("Quantes files vols? (10 minim i 30 maxim)");
  columnes = prompt("Quantes columnes vols? (10 minim i 30 maxim)");
  mida();
  crearTaulell();
}
