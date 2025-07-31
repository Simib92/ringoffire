import { NgModel } from '@angular/forms';
import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    {path: 'game', component: StartScreenComponent},
    {path: '', component: GameComponent}
];
