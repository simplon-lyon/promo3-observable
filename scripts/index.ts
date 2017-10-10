import {Observable} from 'rxjs';

//On peut créer des observable à partir d'un peu n'importe
//quoi en utilisant Observable.of
const text$ = Observable.of('bloup');
//Les données seront transformées en flux de données
//sur lequel on pourra "s'inscrire" en observateur
//ça signifie que la fonction dans le subscribe sera
//déclenchée à chaque nouvelle émission de valeur de
//l'observable
text$.subscribe((val) => console.log(val));

//Observable.of([1,2,3]);
const blank$ = Observable.create((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
});

blank$.subscribe((val) => console.log(val));

//Faire un Observable sur le click du button avec
//Observable.fromEvent (puis  subscribe sur cet Observable
//et lui faire faire un console.log('click'))

const button = document.querySelector('button');
//Le fromEvent créera un Observable d'un event sur
//un élément (html ou non) qui emettra à chaque
//fois que l'event sera déclenché
const click$ = Observable.fromEvent(button, 'click');

click$.subscribe((event) => console.log(event));
//On peut créer un flux d'item à partir d'un tableau
//en utilisant Observable.from, l'observable créé emettra
//tous les items du tableau les uns après les autres
const tableau$ = Observable
.from(['ga', 'zo', 'bu', 'meu'])
.filter((item) => item.length <= 2)
.take(2);

tableau$.subscribe((item) => console.log(item));


//Faire un observable fromEvent sur un input type text
//sur le keyup et afficher le contenu de l'input avec
//un debounceTime de 300 ms
//debounceTime attendra le temps qu'on lui indique entre
//parenthèse pour émettre une donnée du flux, et annulera
//cette émission si d'autres informations sont émises 
//avant la fin du temps indiqué

const input = document.querySelector('input');

const keyup$ = Observable.fromEvent(input, 'keyup')
.map((event:KeyboardEvent) => event.keyCode)
.bufferTime(3000);

const combo = [37, 39, 38, 40, 65, 65, 66, 66];

keyup$.subscribe((value) => {
    if((value.length === combo.length) 
        && value.every((element, index) =>
         element === combo[index])) {
        alert('bravo');
    }else {
        console.log('fail');
    }
});
