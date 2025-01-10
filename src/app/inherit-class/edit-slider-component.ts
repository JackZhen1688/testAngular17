
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ShareService } from './../services/share.service';
import { DialogMessageYesnoComponent } from './../utilitis/dialog-message-yesno/dialog-message-yesno.component';

@Component({
    template: ''
  })
export class EditSliderComponent {

  isEditable: boolean = false;
  result: number = 0;

  constructor(public shareService: ShareService,
              public dialog: MatDialog) { }

  onToggleChange(event: any) {
    console.log(event.source.checked+"<==toggleChanged==>"+event.checked)
    if (event.checked) {
        this.isEditable = true;
        this.shareService.changeVar("WP128", true);  //assign Page:{csuname:"WP128",changed:true} ==>_page$(BehaviorSubject)
    } else {                                         //meanwhile triggle method: changedVar.subscribe()
        this.isEditable = false;
        console.log("isEditable=="+this.isEditable)
        this.shareService.changeVar("WP128", true)
    }      
  }

  getPopupResults() {   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "550px"; 
    dialogConfig.data = {message: "You have unsaved changed. Would you like to save the changes\n or continue without saving?", indecator: 'Save'};
    const dialogRef = this.dialog.open(DialogMessageYesnoComponent, dialogConfig);
       dialogRef.afterClosed().subscribe((result:number) => {
          this.result = result
       });
    //Auto close with 3 sec.
    const timeout = 3000;
    dialogRef.afterOpened().subscribe((_:any) => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout)
    })
  }
  
}