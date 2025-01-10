import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShareService } from './../services/share.service';
import { EditSliderComponent } from './edit-slider-component'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { NgxMaskDirective, provideNgxMask, initialConfig } from 'ngx-mask';
import { CommonModule } from '@angular/common';                              //for pipe  | json

interface Page {
  csuname: string;
  changed: boolean;
};

@Component({
  selector: 'app-inherit-class',
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, CommonModule ],
  providers: [provideNgxMask()],
  templateUrl: './inherit-class.component.html',
  styleUrl: './inherit-class.component.css'
})
export class InheritClassComponent extends EditSliderComponent {

  checked: boolean = false;
  inheritForm: FormGroup;

  specialCharacters = [...initialConfig.specialCharacters];

  //This parameter property must have an 'override' modifier 
  //#1. overrider the parent method (override key avariable in ts+)
  //    override onSubmit()
  //#2. inherit the parent method
  //    super.getPopupResults(); or this.getPopupResults();
  constructor(public override shareService: ShareService,  
              public override dialog: MatDialog,
              private formBuilder: FormBuilder) 
  { 
    super(shareService, dialog);

    this.inheritForm = this.formBuilder.group({
      'txtTest': this.formBuilder.control('123456.789'),
    });
  }

  ngOnInit(): void {
    this.behaviorReactNext();  //Initial BehaviorSubject mehtod call
    //this.asyncMethod();
  }

  behaviorReactNext() {
    this.shareService.changedVar.subscribe((page: Page)  => {
      console.log("page.csuname=="+page.csuname);
      if (page.csuname==='WP128' && page.changed) {
          if (this.isEditable) {
              this.checked = true;
              console.log("setLock...action")
          }else{
              this.checked = false;
              console.log("checkFromChanged....action=="+this.checkFromChanges())  
              if (this.checkFromChanges()) {
                  this.callValueChangedPopup();
              } else {
                  console.log("form....No changed (unlock)")
              }
              
          }
      }
    });
  }

  checkFromChanges(){
    if (this.inheritForm.dirty) {
        console.log("checkFromChanges....");
        return true;
    } else {
        return false;
    }
  }

  async callValueChangedPopup() {
    this.getPopupResults();     //or super.getPopupResults();
    await this.waitFor(3000);   //Have to wait for a few sec to sync result from getPopupResults()
    if (this.result == 0) {  //cancle
        console.log("Cancel....setTogleBack")
        this.checked = true;
        this.isEditable = true;
    }
    if (this.result == 1) {  //save
        console.log("Save....reloadData");
        this.checked = true;
        this.isEditable = true; 
    }
    if (this.result == 2) {  //continue
        console.log("Continue...reloadData/unLock");
        this.isEditable = false;
    }

  }

  waitFor(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) )
  }
  
  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
         resolve("I promise to return after one second!");
      }, 5000);
    });
  }

  
  async asyncMethod() {
    console.log("befor this.resut=="+this.result);
    const value = await this.getPopupResults();
    //const value = await this.waitForOneSecond();
    console.log("value==="+value);
    console.log("after this.resut=="+this.result);
  }

  formValue: any;
  onSubmit() {
    this.formValue = this.inheritForm.value;
    console.log("formValue=="+JSON.stringify(this.formValue));   // {{formValue | json}}
    this.shareService.setServiceData(JSON.stringify(this.formValue));
  }

  onBlur(event:any){
    if(event.target.value !== '')
       event.target.value = parseFloat(event.target.value).toFixed(2)
  }

}
