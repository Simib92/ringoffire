import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { MatCardModule } from '@angular/material/card';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  getDoc,
  doc,
  setDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { appConfig } from '../app.config';
import { initializeApp } from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    DialogAddPlayerComponent,
    MatDialogModule,
    GameInfoComponent,
    MatCardModule,
    AsyncPipe,
  ],

  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {

  game: Game = new Game();   // <-- Initialisiert ein leeres Spiel
  gameId!: string;

  private router = inject(ActivatedRoute);

  firestore: Firestore = inject(Firestore);

  unsubGame: any;

  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log(this.gameId);

      const gameRef = doc(this.firestore, 'games', this.gameId);
      
      this.unsubGame = onSnapshot(gameRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as Game;

          this.game.currentPlayer = data.currentPlayer;
          this.game.playedCard = data.playedCard;
          this.game.players = data.players;
          this.game.stack = data.stack;
          this.game.currentCard = data.currentCard;
          this.game.pickCardAnimation = data.pickCardAnimation;
          console.log('Aktuelles Spiel:', this.game);
        }
      });
    });
  }



  ngOnDestroy(): void {
    if (this.unsubGame) {
      this.unsubGame();
    }
  }

  async updateGame() {
     if (!this.gameId) return;

    const gameRef = doc(this.firestore, 'games', this.gameId);
    await setDoc(gameRef, this.game.toJson());

    console.log('Game neu gespeichert:', this.game);
  }

  async newGame() {
    this.game = new Game();
  }

  takeCard() {
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;

    this.game.currentPlayer++;
    this.game.currentPlayer =
    this.game.currentPlayer % this.game.players.length;
    this.updateGame();

    setTimeout(() => {
      this.game.playedCard.push(this.game.currentCard!);
      this.game.pickCardAnimation = false;
      this.updateGame();
    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((playerName: string) => {
      if (playerName && playerName.length > 0) {
        this.game.players.push(playerName);
        this.updateGame();
      }
    });
  }
}
