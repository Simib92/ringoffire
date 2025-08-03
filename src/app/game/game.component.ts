import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, 
    PlayerComponent, 
    MatButtonModule, 
    MatIconModule, 
    DialogAddPlayerComponent, MatDialogModule,
  GameInfoComponent,
MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  game!: Game;

  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;

    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

    setTimeout(() => {
      this.game.playedCard.push(this.currentCard!);
      this.pickCardAnimation = false;
    }, 1000);
  }

    openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((playerName: string) => {
      if (playerName && playerName.length > 0) {
          this.game.players.push(playerName)      
      }
    });
  }

}
