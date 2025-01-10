import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ShareService } from './../services/share.service';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent {

  frmCtlname = new FormControl('Jack');
  reactiveForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private shareService: ShareService) 
  { 
    this.buildReactiveForm();
  }


  buildReactiveForm() {
    this.reactiveForm = this.formBuilder.group({
      name: this.formBuilder.control(''),  
      phones: this.formBuilder.array([]), 
    });
  }
  get phones () {
    return this.reactiveForm.get('phones') as FormArray
  }

  updatefrmCtlname() {
    this.frmCtlname.setValue('Nancy');
  }
  
  getServiceData() {
    console.log("getServiceData=="+this.shareService.getServiceData());

  }
  onSubmit() {
    console.log("frmValue=="+JSON.stringify(this.reactiveForm.value));
  }

}
