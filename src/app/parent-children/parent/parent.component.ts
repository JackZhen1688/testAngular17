import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup} from '@angular/forms';
import { EditSliderComponet } from './edit-slider-component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSlideToggleModule, ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent extends EditSliderComponet {

  parentForm: FormGroup = new FormGroup({});

  parentData: any;                      //<-- pass to Child
  childData: any;                       //<-- get from Child 

  constructor(private formBuilder: FormBuilder) 
  { 
    super();                    //<-- extends parent editSlider
    this.buildTestForm();
  }

  buildTestForm() {
    this.parentForm = this.formBuilder.group({
      txtParent: this.formBuilder.control(''),
      txtEdit: this.formBuilder.control(''),
    });
  }

  get txtEdit() {
    return this.parentForm.controls['txtEdit']
  }

  // HTML <--[parentData] = "parentData" 
  passDataToChild() {  
    this.parentData = this.parentForm.controls["txtParent"].value;
  }
  
  //HTML <--(newDataEvent) = "getDataFromChild($event)"
  getDataFromChild(event: any) {
    this.childData = event.txtChild;
  }
  
  override onSubmit(): void {
    console.log("Parent onSubmit()..override Child onSubmit()=="+JSON.stringify(this.parentForm.value));
  }

  /*  
  <-- extends the same method from parent editSlider
  onToggleEdit(event: any) {
       console.log("onToggleEdit from parent component...")
        if (event.checked) {
            this.isEditable = true;
            ...
            ...
  }
  <-- over write the same method from parent editSlider
  onToggleEdit(event: any) {   
    console.log("over write onToggleEdit from children");
    super.onToggleEdit(event);
      console.log("Childre super.getEditabled()=="+super.getEditabled());
  }
  */
 
}
