class Dinosaurios {
    constructor() {
        this.lagartija;
        //Partida es un elemento crucial del desplazamiento, pues el juego original
        //el desplazamiento sólo inicia cuando se da el salto, es por ello que todos los 
        //demás comandos debe de estar a la escucha del valor que partida.
        this.partida = false;
        this.gravedad = 1;
        this.pantalla;
        this.salto = 15;
        this.desplazamiento = 0;
        this.lose;
        this.reset;
        this.posicionY = 360;
    }
    saltar() {
        // Lógica para hacer que el dinosaurio salte
        // Por ejemplo:
        this.lagartija.velocity.y = -10; // Cambia la velocidad vertical del dinosaurio para que salte
    }

    crear() {
        this.lagartija = createSprite(30, this.posicionY);
        //this.lagartija.setCollider("circle",0,0,22);
        //this.lagartija.debug=true;
        this.lagartija.addAnimation("quieto", "./images/init0.png");
        this.lagartija.addAnimation("mover", "./images/run0.png", "images/run1.png");
        this.lagartija.addAnimation("agachar", "./images/aba0.png", "./images/aba1.png");
        this.lagartija.addAnimation("muerto", "./images/dead.png");
        this.pantalla = loadImage("images/fondo.png");
        this.lose = loadImage("images/gameOver.png");
        this.reset = createImg("images/reset.png");
        this.reset.hide();
        //this.reset=loadImage("images/reset.png");
    }

    movimiento(condicion) {
        //el metodo keydown esta a la escucha mientras el boton esté presionado
        //en el setcollider sólo basta con variar el offset
        if (keyDown("s")) {
            this.lagartija.setCollider("rectangle", 0, 0, 35, 10);
        } else {
            this.lagartija.setCollider("rectangle", 0, 0, 20, 40);
        }

        //el objeto de fondo se desplaza cuando se da el primer salto.
        //el objeto siempre ha de querer ir hacia abajo
        this.lagartija.velocity.y += this.gravedad;
        //pero si es mayor que 250 será en Y =0;
        if (this.lagartija.position.y >= this.posicionY) {
            this.lagartija.velocity.y = 0;
        }


        if (keyWentDown(" ") && condicion == false) {
            this.partida = true;
            //Con esto condicionamos a que no se pueda saltar hasta que choque al suelo de nuevo
            if (this.lagartija.position.y >= this.posicionY) {
                this.lagartija.velocity.y -= this.salto;

            }
            //La velocidad siempre ha de ser 5 en x
            this.lagartija.velocity.x = 5;
            this.lagartija.changeAnimation("mover");
            this.lagartija.animation.rewind();
        }

        if (keyWentDown("s")) {
            if (this.partida) {
                this.lagartija.changeAnimation("agachar");
                this.lagartija.animation.rewind();

            }

        }
        if (keyWentUp("s")) {
            if (this.partida) {
                this.lagartija.changeAnimation("mover");
                this.lagartija.animation.rewind();
            }

        }


        //this.lagartija.debug=true;

    }

    fondo(condicion) {
        if (this.partida) { this.desplazamiento -= 2; }
        if (this.desplazamiento < -600) { this.desplazamiento = 0; }
        camera.position.x = this.lagartija.position.x + width / 3;
        camera.off();
        image(this.pantalla, this.desplazamiento, 0, 600, 400);

        image(this.pantalla, this.desplazamiento + width, 0, 600, 400);
        if (condicion == true) {
            image(this.lose, this.lagartija.velocity.x + width / 2, 90, 100, 30);

            this.reset.position(this.lagartija.velocity.x + width / 2 + 40, 140);
            this.reset.show();
            this.reset.mousePressed(juegoNuevo);

        }
        camera.on();
    }
    muerte(cactus, ave) {
        if (this.lagartija.collide(cactus.tunaArray)) { juegoTerminado(); }
        if (this.lagartija.collide(ave.palomaArray)) { juegoTerminado(); }

    }





}