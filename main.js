// Variables
var dino;
var pepa;
var piwicho;
var gameOver = false;
var valor;
var puntaje = 0;
var muertes = 0;
var mifuente;

// Preload function
function preload() {
    mifuente = loadFont("./images/GeBody.ttf");
}

// Setup function
function setup() {
    createCanvas(600, 400);
    dino = new Dinosaurios();
    pepa = new Cactus();
    piwicho = new Aves();
    pepa.crear();
    dino.crear();
    piwicho.crear();
    youLose = loadImage("./images/gameOver.png");
    valor = 1;
    puntaje = 0;
    recuperarMuertes();
}

// Draw function
function draw() {
    if (valor == 2) {
        dino.crear();
        valor++;
    }
    dino.movimiento(gameOver);
    dino.fondo(gameOver);
    pepa.movimiento(dino);
    dino.muerte(pepa, piwicho);
    piwicho.movimiento(dino);
    pepa.muerte(dino);
    piwicho.muerte(dino);
    if (gameOver == false && dino.partida == true) {
        puntaje++;
    } else {
        puntaje = puntaje;
    }

    if (gameOver) {
        juegoTerminado();
    }

    // Text display for points
    textFont(mifuente);
    textSize(26);
    textStyle(BOLD);
    fill(90);
    text(puntaje, dino.lagartija.position.x + 350, 50, 200, 40);
    text("Puntos", dino.lagartija.position.x + 250, 50, 200, 40)
    //
    drawSprites();
}

// Function when game is over
function juegoTerminado() {
    if (!gameOver) {
        muertes++;
        guardarMuertes();
        gameOver = true;
    }

    dino.partida = false;
    dino.lagartija.changeAnimation("muerto");
    dino.lagartija.animation.rewind();
    updateSprites(false);
    valor = 1;

    guardarPuntaje();
}

// Function to start a new game
// Function to start a new game
// Function to start a new game
function juegoNuevo() {
    if (!gameOver) {
        var playerName = prompt("Introduce tu nombre:");
        if (playerName) {
            var players = JSON.parse(localStorage.getItem("players")) || [];
            var existingPlayerIndex = players.findIndex(function (player) {
                return player.nombre === playerName;
            });

            if (existingPlayerIndex !== -1) {
                // Update existing player's score and deaths
                players[existingPlayerIndex].puntaje += puntaje;
                players[existingPlayerIndex].muertes += muertes;
            } else {
                // Add new player to the list
                players.push({
                    nombre: playerName,
                    puntaje: puntaje,
                    muertes: muertes
                });
            }

            // Reset game variables
            puntaje = 0;
            muertes = 0;

            // Save updated player scores to localStorage
            localStorage.setItem("players", JSON.stringify(players));

            // Update ranking table after saving player data
            updateRankingTable();
        }
    }
}


// Function to save deaths in LocalStorage
function guardarMuertes() {
    localStorage.setItem('muertes', muertes);
}

// Function to recover deaths from LocalStorage
function recuperarMuertes() {
    var storedDeaths = localStorage.getItem('muertes');
    if (storedDeaths) {
        muertes = parseInt(storedDeaths);
    } else {
        muertes = 0;
    }
}

// Function to save score in LocalStorage and JSON
function guardarPuntaje() {
    localStorage.setItem('puntos', puntaje);
    guardarDatosEnJson(puntaje, muertes, 'Nombre'); // Change 'Nombre' to the actual player's name
    console.log(puntaje);
}

// Function to recover score from LocalStorage
function recuperarPuntaje() {
    var storedScore = localStorage.getItem('puntos');
    if (storedScore) {
        puntaje = parseInt(storedScore);
    } else {
        puntaje = 0;
    }
}

// Function to save data in JSON format
function guardarDatosEnJson(puntaje, muertes, nombre) {
    const data = {
        "Puntos": puntaje,
        "Muertes": muertes,
        "Nombre": nombre
    };

    const json = JSON.stringify(data);

    const fileName = `${nombre}.json`;
    // No need to save in a file, just saving to LocalStorage
    localStorage.setItem(fileName, json);
}
