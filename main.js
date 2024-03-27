var dino;
var pepa;
var piwicho;
var gameOver = false;
var valor;
var puntaje = 0;
var muertes = 0; // Contador de muertes
var mifuente;


function preload() {
    mifuente = loadFont("./images/GeBody.ttf");
}
function setup() {
    createCanvas(600, 400);
    dino = new Dinosaurios();
    pepa = new Cactus();
    piwicho = new Aves();
    pepa.crear();
    dino.crear();
    piwicho.crear();
    youLose = loadImage("./images/gameOver.png");
    valor = 1
    puntaje = 0;
    recuperarMuertes();
}

function draw() {

    if (valor == 2) { dino.crear(); valor++; }
    dino.movimiento(gameOver);
    dino.fondo(gameOver);

    pepa.movimiento(dino);
    dino.muerte(pepa, piwicho);
    piwicho.movimiento(dino);
    pepa.muerte(dino);
    piwicho.muerte(dino);
    if (gameOver == false && dino.partida == true) {
        puntaje++;
    } else { puntaje = puntaje; }

    // Incrementar el contador de muertes si el juego termina
    if (gameOver) {
        muertes++;
        guardarMuertes();
    }

    //todo lo relacionado al texto de puntaje
    textFont(mifuente);
    textSize(26);
    textStyle(BOLD);
    fill(90);
    text(puntaje, dino.lagartija.position.x + 350, 50, 200, 40);
    text("Puntos", dino.lagartija.position.x + 250, 50, 200, 40)
    //
    drawSprites();
    //Puedes validar la posición del dino
    //console.log(dino.lagartija.position.y);

}

function juegoTerminado() {

    dino.partida = false;
    dino.lagartija.changeAnimation("muerto");
    dino.lagartija.animation.rewind();
    gameOver = true;
    updateSprites(false);
    valor = 1;

    guardarPuntaje(); // Llamada para guardar el puntaje en localStorage
    if (gameOver) {
        muertes++; // Incrementar el contador de muertes solo si el juego termina
        guardarMuertes(); // Llamada para guardar el contador de muertes en localStorage
    }
}

function juegoNuevo() {
    pepa.tunaArray.removeSprites();
    piwicho.palomaArray.removeSprites();
    dino.lagartija.remove();
    gameOver = false;
    valor = 2;
    updateSprites(true);
    dino.lagartija.position.x = 30;
    dino.lagartija.position.y = 360;
    dino.lagartija.changeAnimation("quieto");
    dino.lagartija.animation.rewind();
    dino.reset.hide();
    puntaje = 0;
    recuperarPuntaje(); // Llamada para recuperar el puntaje del localStorage
}







//LocalStorage
//MUERTES
// Función para guardar el contador de muertes en el localStorage
function guardarMuertes() {
    localStorage.setItem('muertes', muertes);
}

// Función para recuperar el contador de muertes del localStorage
function recuperarMuertes() {
    var storedDeaths = localStorage.getItem('muertes');
    if (storedDeaths) {
        muertes = parseInt(storedDeaths); // Convertir a número si hay muertes almacenadas
    } else {
        muertes = 0; // Establecer el contador de muertes en 0 si no hay ninguno almacenado
    }
}




//PUNTOS
// Función para guardar el puntaje en el localStorage
function guardarPuntaje() {
    localStorage.setItem('puntos', puntaje);
    console.log(puntaje);
}

// Función para recuperar el puntaje del localStorage
function recuperarPuntaje() {
    var storedScore = localStorage.getItem('puntos');
    if (storedScore) {
        puntaje = parseInt(storedScore); // Convertir a número si hay un puntaje almacenado
    } else {
        puntaje = 0; // Establecer el puntaje en 0 si no hay ninguno almacenado
    }
}


//---------------------------------------------------------
