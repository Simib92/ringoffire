import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { inject } from '@angular/core';


interface DialogData {
  name: string; // oder was du brauchst
}

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, 
      MatIconModule, MatInputModule, FormsModule, 
      MatFormFieldModule,  ],
    changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
name: string = ''
readonly dialogRef = inject(MatDialogRef<DialogAddPlayerComponent>);
constructor() {

}

onNoClick() : void {
  this.dialogRef.close();
}
}
