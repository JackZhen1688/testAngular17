import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

interface DialogMegs {
  message: string;
  indecator: string;
}

@Component({
  selector: 'app-dialog-message-yesno',
  standalone: true,
  imports: [],
  templateUrl: './dialog-message-yesno.component.html',
  styleUrl: './dialog-message-yesno.component.css'
})
export class DialogMessageYesnoComponent {

  constructor(public dialogRef: MatDialogRef<DialogMessageYesnoComponent>,
              @Inject(MAT_DIALOG_DATA) 
              public data: DialogMegs) { }

  onOk(): void {
  this.dialogRef.close(); 
  }

}
