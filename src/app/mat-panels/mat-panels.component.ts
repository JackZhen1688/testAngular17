import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';     //for mat-form-field 
import { MatInputModule } from '@angular/material/input';              //for mat-form-field
import { MatAccordion } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';  
import { MatExpansionModule } from '@angular/material/expansion'; 

@Component({
  selector: 'app-mat-panels',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatExpansionModule],
  templateUrl: './mat-panels.component.html',
  styleUrl: './mat-panels.component.css'
})
export class MatPanelsComponent {

    //*ngIf="accordion !=null"
    @ViewChild(MatAccordion) accordion: MatAccordion | null=null;

    panelOpenState = false;
    panel2Expand: boolean = true;
  
    panelForm: FormGroup = new FormGroup({});
  
    constructor(private formBuilder: FormBuilder,
                private cd: ChangeDetectorRef) 
    { 
      this.buildTestForm();
    }
  
    ngOnInit(){
  
    }
  
    //Fix:Expression has changed after it was checked.
    ngAfterViewChecked(){
      this.cd.detectChanges();
    }
  
    buildTestForm() {
      this.panelForm = this.formBuilder.group({
        txtTest1: this.formBuilder.control(''),  
        txtTest2: this.formBuilder.control(''),
      });
    }
  
    closePanel() {
      this.panel2Expand = false;
    }
    
    changeData(){
      console.log("helloo...")
    }
  
    onSubmit() {
      console.log("formValue===="+JSON.stringify(this.panelForm.value))
    }

}
