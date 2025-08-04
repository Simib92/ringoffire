import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [FormsModule, MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent implements OnInit, OnChanges  {
cardAction = [
  { title: 'Ass', description: 'Wasserfall – Alle trinken nacheinander' },
  { title: '2', description: 'You – Du bestimmst, wer trinken muss' },
  { title: '3', description: 'Me – Du musst trinken' },
  { title: '4', description: 'Floor – Alle fassen den Boden an, der Letzte trinkt' },
  { title: '5', description: 'Guys – Alle Männer trinken' },
  { title: '6', description: 'Chicks – Alle Frauen trinken' },
  { title: '7', description: 'Heaven – Hände hoch! Der Langsamste trinkt' },
  { title: '8', description: 'Mate – Wähle einen Trinkpartner. Ihr trinkt immer gemeinsam' },
  { title: '9', description: 'Rhyme – Du sagst ein Wort, alle müssen reimen. Wer hängen bleibt, trinkt' },
  { title: '10', description: 'Categories – Wähle eine Kategorie, alle sagen Begriffe. Wer’s nicht kann, trinkt' },
  { title: 'Bube', description: 'Rule – Denke dir eine neue Regel aus. Wer sie bricht, trinkt' },
  { title: 'Dame', description: 'Question Master – Wer deine Fragen beantwortet, muss trinken' },
  { title: 'König', description: 'King – Gieße etwas in das Glas in der Mitte. Letzter King trinkt alles!' }
];
title = '';
description = '';
@Input() card: string | undefined = '';

ngOnInit() {
};

ngOnChanges(): void {
  if (this.card) {
    let cardNumber = +this.card.split('_')[0];
    this.title = this.cardAction[cardNumber -1].title;
    this.description = this.cardAction[cardNumber -1].description;
  }  
}
}
