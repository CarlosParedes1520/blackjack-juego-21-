import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  // Referencias del HTML
 btnPedir   = document.querySelector('#btnPedir');
 btnDetener = document.querySelector('#btnDetener');
 btnNuevo   = document.querySelector('#btnNuevo');

 resultado = "";

  ngOnInit(): void {
    this.crearDeck();
  }

  constructor(private renderer: Renderer2) {

  }

  @ViewChild('card') card: ElementRef | undefined;
  @ViewChild('card2') card2: ElementRef | undefined;

  title = 'juego21';



deck: any  [] = [];
tipos      = ['C','D','H','S'];
especiales = ['A','J','Q','K'];

puntosJugador = 0;
puntosComputadora = 0;

// imgCarta: string = "";

 divCartasJugador     = document.getElementById('jugador-cartas') || null || undefined;
 divCartasComputadora = document.getElementById('computadora-cartas') || null || undefined ;

 puntosHTML0: number = 0;
 puntosHTML1: number = 0;

// Esta función crea un nuevo deck
 crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of this.tipos ) {
            this.deck.push( i + tipo);
        }
    }

    for( let tipo of this.tipos ) {
        for( let esp of this.especiales ) {
            this.deck.push( esp + tipo);
        }
    }
    //  console.log( this.deck );
    for (var i = this.deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }

    return this.deck;
}

 
// Esta función me permite tomar una carta
 pedirCarta = () => {

    if ( this.deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = this.deck.pop();
    return carta;
}

 valorCarta = ( carta: any ) => {

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}

// turno de la computadora
 turnoComputadora = ( puntosJugador: number ) => {
  this.resultado=""
      // do {
        const carta = this.pedirCarta();
      
       ( this.puntosComputadora) = this.puntosComputadora + this.valorCarta( carta );
        console.log(this.puntosComputadora);
        
        this.puntosHTML1 = this.puntosComputadora;
        
        var imgCarta  = this.renderer.createElement('img');
        imgCarta.src  = `assets/cartas/${ carta }.png`;
      
        imgCarta.classList.add('carta');
        this.renderer.appendChild( this.card2!.nativeElement, imgCarta );
       
        this.calcularGanador(this.puntosComputadora, puntosJugador)

}



// Eventos
btnPedir2 = () => {

    const carta = this.pedirCarta();
    
    this.puntosJugador = this.puntosJugador + this.valorCarta( carta );
    this.puntosHTML0 = this.puntosJugador;

    
     var imgCarta  = this.renderer.createElement('img');
     imgCarta.src  = `assets/cartas/${ carta }.png`; //3H, JD
     imgCarta.classList.add('carta');
     console.log(imgCarta);
     this.renderer.appendChild( this.card!.nativeElement, imgCarta );
  

     this.turnoComputadora( this.puntosJugador );
  
};


btnDetener2 = () => {
  this.resultado = "";
  (document.querySelector('#btnPedir')as HTMLInputElement).disabled = true;
  // (document.querySelector('#btnNuevo')as HTMLInputElement).disabled = true;

  this.calcularGanador(this.puntosHTML1, this.puntosHTML0) 
};

btnNuevo2 = () => {
  (document.querySelector('#btnPedir')as HTMLInputElement).disabled = false;
  // (document.querySelector('#btnNuevo')as HTMLInputElement).disabled = true;

  while(this.card!.nativeElement?.firstChild){ 
    this.card!.nativeElement.removeChild(this.card!.nativeElement.firstChild); 
  }

  while(this.card2!.nativeElement?.firstChild){ 
    this.card2!.nativeElement.removeChild(this.card2!.nativeElement.firstChild); 
  }

    this.deck = [];
    this.deck = this.crearDeck();

    this.puntosJugador     = 0;
    this.puntosComputadora = 0;
    
    this.puntosHTML0 = 0;
    this.puntosHTML1 = 0;
};

calcularGanador(puntosComputadora: number, puntosJugador: number){
  
if (puntosComputadora > 20 || puntosJugador > 20) {
  (document.querySelector('#btnPedir')as HTMLInputElement).disabled = true;
}

  if(puntosComputadora == 21 && puntosJugador === 21  ) {
    this.resultado ='Nadie gana :(';
    console.log('Nadie gana :C');
    return;
  } 
   if (puntosJugador == 21 && puntosComputadora !== 21) {

    this.resultado ='Jugador Gana';
    console.log('Jugador Gana');
    return;
    
  }
   if (puntosComputadora  == 21 && puntosJugador!== 21) {
    
    this.resultado ='Computadora Gana';
    console.log('Computadora Gana');
    return;
  }
   if (puntosComputadora > 21 && puntosJugador < 21) {
    this.resultado ='Jugador Gana';
    console.log('Jugador Gana');
    return;
  }
   if (puntosJugador > 21 && puntosComputadora  < 21) {
    this.resultado ='Computadora Gana';
    console.log('Computadora Gana');
    return;
  }
   if (puntosJugador > 21 && puntosComputadora  > 21) {
    this.resultado ='Nadie Gana';
    console.log('Nadie Gana');
    return;
  }
   if (puntosJugador >  puntosComputadora  && puntosJugador < 21) {
    this.resultado ='jugador Gana';
    console.log('jugador Gana');
    return;
  }
   if (puntosComputadora >  puntosJugador  && puntosComputadora < 21) {
    this.resultado ='Computadora  Gana';
    console.log('Computadora Gana');
    return;
  }
}

}
