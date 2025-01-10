import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup, NgForm} from '@angular/forms';


@Component({
  selector: 'app-child',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {

  @ViewChild('myForm') ngForm: NgForm | null=null;

  @Input() parentData: any;
  @Input() isEditable: any;
  @Output() newDataEvent = new EventEmitter<string>();

  test: string = "";
  @Input() set assign(value: string) {
    this.test = value;
    console.log("### Test: " + this.test);
  }

  childForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) 
  { 
    this.childForm = this.formBuilder.group({
      txtChild: this.formBuilder.control({value:'', disabled: false}),
    });
  }

  ngOnChanges(changes: any) {
    //console.log(this.isEditable+" ===## changes.isEditable=="+JSON.stringify(changes.isEditable))
    if (changes.isEditable ==undefined) 
        console.log("changes.isEditable ==undefined")
    if (changes.parentData ==undefined)
        console.log("changes.parentData ==undefined")

    if (changes.isEditable !=undefined) { 
      if (!changes.isEditable.currentValue) 
          this.childForm.controls["txtChild"].disable(); 
      else 
          this.childForm.controls["txtChild"].enable();
    } 
    if (changes.parentData !=undefined && changes.parentData.currentValue==='111')
        console.log("value=="+changes.parentData.currentValue)
  }

  //HTML <--(click)="appChild.passDataToParent()";
  passDataToParent() {
    this.newDataEvent.emit(this.childForm.value); //-->{"txtChild":"11"}
    console.log("childForm.value=="+JSON.stringify(this.childForm.value))
  }
  
  onSubmit() {

  }

  onClickSubmit() {
    if (this.ngForm !=null)
        console.log("value==="+JSON.stringify(this.ngForm.form.value));
  }
    
}
