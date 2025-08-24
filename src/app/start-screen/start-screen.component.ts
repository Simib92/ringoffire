import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Firestore, addDoc, collection  } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [AppComponent ],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);



constructor(private router: Router){
}


async newGame() {
  let game = new Game();
  const docRef = await addDoc(collection(this.firestore, 'games'), game.toJson());
  let gameId = docRef.id
  console.log(gameId);
  this.router.navigateByUrl('/game/' + gameId);
};
};


