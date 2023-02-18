import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Referencias del HTML (Variables del dom)
  @ViewChild('btnPedir') btnPedir: ElementRef | undefined;
  @ViewChild('btnDetener') btnDetener: ElementRef | undefined;
  @ViewChild('btnNuevo') btnNuevo: ElementRef | undefined;
  @ViewChild('card') card: ElementRef | undefined;
  @ViewChild('card2') card2: ElementRef | undefined;

  // variables
  detenerJuego: boolean = false;
  resultado = "";
  title = 'juego21';
  deck: any  [] = [];
  tipos      = ['C','D','H','S'];
  especiales = ['A','J','Q','K'];
  puntosJugador = 0;
  puntosComputadora = 0;
  puntosHTML0: number = 0;
  puntosHTML1: number = 0;
 
   ngOnInit(): void {
     this.crearDeck();
   }
 
   constructor(private renderer: Renderer2) {
 
   }
 
 
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
      imgCarta.classList.add('carta', 'x');
      console.log(imgCarta);
      this.renderer.appendChild( this.card!.nativeElement, imgCarta );
   
 
      this.turnoComputadora( this.puntosJugador );
   
 };
 
 
 btnDetener2 = () => {
   this.resultado = "";
   (document.querySelector('#btnPedir')as HTMLInputElement).disabled = true;   
   this.detenerJuego = true;
   this.calcularGanador(this.puntosHTML1, this.puntosHTML0) ;


 };
 
 btnNuevo2 = () => {
  this.detenerJuego = false;
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
 
   if(puntosComputadora === 21 && puntosJugador === 21  ) {
     this.resultado ='Nadie gana :(';
     console.log('Nadie gana :C');
     Swal.fire('Resultado', 'Empates 😒', 'error').then((result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }
    })
     return;
   } 
    
   if (puntosJugador == 21 && puntosComputadora !== 21) {
     this.resultado ='Jugador Gana';
     console.log('Jugador Gana');
     Swal.fire('Resultado', 'Jugador Gana 😊', 'success').then((result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }
    })
     return;
     
   }

    if (puntosComputadora  == 21 && puntosJugador!== 21) {
     
     this.resultado ='Computadora Gana';
     console.log('Computadora Gana');
     Swal.fire('Resultado', 'Computadora Gana 😊', 'success').then((result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }
    })

     return;
   }
    if (puntosComputadora > 21 && puntosJugador < 21) {
     this.resultado ='Jugador Gana';
     console.log('Jugador Gana');
     Swal.fire('Resultado', 'Jugador Gana 😊', 'success').then((result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }
    })
     return;
   }
   
    if (puntosJugador > 21 && puntosComputadora  < 21) {
     this.resultado ='Computadora Gana';
     console.log('Computadora Gana');
     Swal.fire('Resultado', 'Computadora Gana 😊', 'success').then((result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }
    })
     return;
   }

    if (puntosJugador > 21 && puntosComputadora  > 21) {
     this.resultado ='Nadie Gana';
     console.log('Nadie Gana');
     Swal.fire('Resultado', 'Nadie Gana 😢', 'error')
     .then((result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }
    })
     return;
   }
   
    if (puntosJugador >  puntosComputadora  && puntosJugador < 21) {
     this.resultado ='jugador Gana';
     console.log('jugador Gana');
     
     if (this.detenerJuego) {
      Swal.fire('Resultado', 'Jugador Gana 😊', 'success')
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
     }
     return;
   }

    if (puntosComputadora >  puntosJugador  && puntosComputadora < 21) {
     this.resultado ='Computadora  Gana';
     console.log('Computadora Gana');
     
     if (this.detenerJuego) {
      Swal.fire('Resultado', 'Computadora Gana 😊', 'success')
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
      
     }
     
     return;
   }
    if (puntosComputadora < 21  && puntosComputadora < 21 &&  puntosComputadora === puntosComputadora) {
     this.resultado ='Empates';
     console.log('Empates');
   
    if (this.detenerJuego) {
      Swal.fire('Resultado', 'Empates 😒', 'error')
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
     }
     return;
   }
 }
}
