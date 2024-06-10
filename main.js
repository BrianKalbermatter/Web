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

    // Iniciar detección de movimiento del dispositivo
    iniciarDeteccionDeMovimiento();
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

    if (!gameOver && dino.partida) {
        puntaje++;
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
    text("Puntos", dino.lagartija.position.x + 250, 50, 200, 40);

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

    // Activar la vibración si la API está disponible
    if (navigator.vibrate) {
        console.log("¡El dispositivo está vibrando!");
        navigator.vibrate(300);  // Vibra durante 300 ms
    }
    // Lanza un mensaje en la consola indicando que el dispositivo está vibrando
    console.log("¡El dispositivo está vibrando!");
}

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
            touchCount = 0; // Reinicia el contador de toques

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

// Detectar la inclinación del dispositivo para hacer saltar al jugador
function iniciarDeteccionDeMovimiento() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', manejarOrientacionDelDispositivo, true);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('deviceorientation', manejarOrientacionDelDispositivo, true);
    }
}

function manejarOrientacionDelDispositivo(evento) {
    const beta = evento.beta;   // Inclinación adelante-atrás en grados

    // Detectar inclinación hacia adelante
    if (beta > 30 && !gameOver) { // Ajusta el umbral según tus necesidades
        jugadorSalta();
    }
}

// Función para manejar el salto del jugador
function jugadorSalta() {
    console.log("¡El jugador ha saltado!");
    // Lógica para hacer saltar al jugador
    // Aquí puedes actualizar la posición del personaje o activar una animación de salto
    dino.saltar();
}

// Verificar si la API de vibración está disponible
if ("vibrate" in navigator) {
    console.log("La API de vibración está disponible");
} else {
    console.log("La API de vibración NO está disponible");
}

// Variable para rastrear el estado del juego (iniciado o reiniciado)
var juegoIniciado = false;

// Función para manejar los toques en la pantalla
function touchStarted() {
    // Si el juego no ha sido iniciado, inicia el juego con un toque
    if (!juegoIniciado) {
        iniciarJuego();
        juegoIniciado = true;
    } else {
        // Si el juego ya ha sido iniciado, cuenta los toques para reiniciar
        reiniciarJuego();
    }
    
    // Evita que se realice un desplazamiento en la página al tocar la pantalla
    return false;
}

// Función para iniciar el juego con un solo toque
function iniciarJuego() {
    jugadorSalta(); // Llama a la función para que el jugador salte
}

// Función para reiniciar el juego con dos toques
function reiniciarJuego() {
    // Incrementa el contador de toques
    touchCount++;

    // Si se detectan dos toques consecutivos, reinicia el juego
    if (touchCount === 2) {
        juegoNuevo(); // Llama a la función para reiniciar el juego
        touchCount = 0; // Reinicia el contador de toques
    }
}



