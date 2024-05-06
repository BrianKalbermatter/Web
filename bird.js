class Aves{
    constructor(){
        this.paloma;
        this.imagenPaloma1;
        this.imagenPaloma2;
        this.palomaArray;
        this.posicionY=335;
    }

    crear(){
        this.imagenPaloma1=loadImage("./images/bird0.png");
        this.imagenPaloma2=loadImage("./images/bird1.png");
        this.palomaArray= new Group();
    }

    movimiento(dino){
        if(dino.partida){

            if(frameCount%102==0){
                var probabilidad=parseInt(random(0, 30));
                this.paloma=createSprite(dino.lagartija.position.x+width,this.posicionY+probabilidad);
                this.paloma.addAnimation("volar",this.imagenPaloma1,this.imagenPaloma2);
                this.paloma.setCollider("rectangle",0,-2,this.imagenPaloma1.width,20);
              //  this.paloma.debug=true;
                this.palomaArray.add(this.paloma);
            }
        }
        
    }

    muerte(dino){
        for ( var i=0; i<this.palomaArray.length;i++){
            if(this.palomaArray[i].position.x<dino.lagartija.position.x-width/2){
                this.palomaArray[i].remove();
            }
        }
    }


}