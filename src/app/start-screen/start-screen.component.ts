import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [AppComponent ],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

constructor(private router: Router){
}


newGame() {
this.router.navigateByUrl('/game');
};
};


