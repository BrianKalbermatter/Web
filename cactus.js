class Cactus{
    constructor(){
        this.tuna;
        this.img1;
        this.img2;
        this.img3;
        this.tunaArray;
        this.posicionY=358;


    }
    crear(){
        this.img1=loadImage("./images/cactusbig1.png");
        this.img2=loadImage("./images/cactus2.png");
        this.img3=loadImage("./images/cactus3.png");
        this.tunaArray= new Group();
    }

    movimiento(dino,condicion){
        /***********Lógica de movimiento
         * Establecemos un intervalo y cada número entero de ese intervalo representa una imagen
         * establecemos un condicional donde se evalua el intervalo, dependiendo del valor
         * ruta tomará la ruta de imagen, así también al ser diferentes hará un
         * calibración del collider.
         */
        if(dino.partida){
            var intervalo=parseInt(random(1, 4));
            var ruta;
            var variaY=0;
            if(intervalo==1){ruta=this.img1; variaY=2;}
            else if(intervalo==2){ruta=this.img2; variaY=7;}
            else{ruta=this.img3; variaY=7;}
    
            /********************************************* */
            if(frameCount%65==0){
                this.tuna=createSprite(dino.lagartija.position.x+width,this.posicionY+variaY);
                this.tuna.addImage(ruta);
                this.tuna.setCollider("rectangle",0,0,ruta.width,ruta.height);
                this.tuna.immovable=true;
              // this.tuna.debug=true;
                this.tunaArray.add(this.tuna);
            }
        }

    }

    //Siempre hay que eliminar los elementos del array sino este  llenará la RAM
    muerte(dino){
        for( var i=0; i<this.tunaArray.length;i++){
            if(this.tunaArray[i].position.x<dino.lagartija.position.x-width/2){
                this.tunaArray[i].remove();
            }
        }
       // console.log(this.tunaArray.length);
    }

}