import { Component } from '@angular/core';
import { Router } from 'express';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [AppComponent ],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

//  constructor(private router: Router){
//  }


//newGame() {
  //start game
  //this.router.navigateByUrl('/game');
//};
};


