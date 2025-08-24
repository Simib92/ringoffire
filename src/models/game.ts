export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playedCard: string[] = [];
  public currentPlayer: number = 0;
  public pickCardAnimation = false;
  public currentCard: string | undefined = '';

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push(i + '_clubs');
      this.stack.push(i + '_diamonds');
      this.stack.push(i + '_hearts');
      this.stack.push(i + '_spades');
    }
    shuffle(this.stack);
  }  

  toJson() {
    return {
      players: this.players,
      stack: this.stack,
      playedCard: this.playedCard,
      currentPlayer: this.currentPlayer,
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard
    }
  }

}

function shuffle(array: string[] = []) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
