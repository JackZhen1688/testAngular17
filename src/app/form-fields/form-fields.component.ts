import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';     //for [formGroup]="panelForm"
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';    //for [formGroup]="panelForm"
import { MatFormFieldModule } from '@angular/material/form-field';     //for mat-form-field 
import { MatInputModule } from '@angular/material/input';              //for mat-form-field
import { MatSelectModule } from '@angular/material/select';            //for mat-option/mat-optgroup
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';                        //for *ngIf/ngFor


interface Options {
  value: string;
  viewValue: string;
  extra: string;
}

interface OptionGroup {
  disabled?: boolean;
  name: string;
  options: Options[];
}

@Component({
  selector: 'app-form-fields',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, 
            MatSelectModule, MatMenuModule, CommonModule],
  templateUrl: './form-fields.component.html',
  styleUrl: './form-fields.component.css'
})
export class FormFieldsComponent {
  value = 'Clear me';
  disabled = false;
  show: boolean = false;
  buttonName: any = 'Show';

  form: FormGroup = new FormGroup({});

  data = {
    name:'Jack',
    amount:'233045.12',
    Comps: [{stratifiedAm:'$1020256.23', fundedAm:'$57892.50', obligatedAm:'$6489244.96', paidAm:'$5894233.00', billFY:'2020', collectAcctNm:'1456421'},
            {stratifiedAm:'$82s5256.96', fundedAm:'$23592.45', obligatedAm:'$8349244.61', paidAm:'$2232233.15', billFY:'2021', collectAcctNm:'5642122'}]
  }

  optionGroups: OptionGroup[] = [
    {
      name: 'Validate Lease',
      options: [
        {value: 'VALID-VL', viewValue: 'Validate Lease', extra:'111ex'},
      ],
    },
    {
      name: 'DFAS',
      options: [
        {value: 'DFAS-CC', viewValue: 'Cancellation Co.', extra:'222ex'},
      ],
    }
  ];
 
  objectKeys = Object.keys;
  //my_menu {
  my_menu: {[index: string]:any} = {
    'main1': ['sub1', 'sub2'],
    'main2': [{label:'sub1', action:'test1()', disabled: this.show}, {label:'sub2', action:'test2', disabled: !this.show}, {label:'sub3', action:'test3', disabled: this.show}],
  };
    
  info = {"serviceId":"C"};

  constructor(private formBuilder: FormBuilder) { 

    this.buildTestForm();
  }

  ngOnInit(): void {
    this.patchData(this.data);
  }

  get COMPs() {
    return this.form.get('COMPs') as FormArray;
  }

  buildTestForm() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(''),  //[ '', !this.disabled ]
      amount: this.formBuilder.control(''),//[new FormControl("")]
      txtOption: this.formBuilder.control('A'),
      COMPs: this.formBuilder.array([]),   //new FormArray()
    });
  }

  patchData(data: any) {
    this.COMPs.clear();
    this.form.patchValue({
      name: data.name,
      amount: data.amount,
    });
    data.Comps.forEach((compItem:any) => {
      //console.log("compItem==="+JSON.stringify(compItem));
      this.addComp(compItem);      
    });
  }

  addComp(compItem: any) {
    const comp = this.formBuilder.group({ 
      'txtStratifiedAm': compItem.stratifiedAm,
      'txtFundedAm': compItem.fundedAm,
      'txtObligatedAm': compItem.obligatedAm,
      'txtPaidAm': compItem.paidAm,
      'txtBillFY': compItem.billFY,
      'txtCollectAcctNm': compItem.collectAcctNm,
    });
    this.COMPs.push(comp);
  }

  get txtOption() {
    return this.form.controls['txtOption'];
  }
  onChange() {
    let opts:string[] = (this.txtOption.value).split('@')
    console.log("opts[0]=="+opts[0]+" opts[1]="+opts[1])
    switch (opts[0]) {
      case 'VALID-VL': {
        alert("call method(): validation release");
        break;
      }
      case 'DFAS-CC': {
        this.optionAct();
        break;
      }
    }
  }
  optionAct() {
    alert("call method(): cancellation");
  }

  getAction(action: string) {
    if (action==='test1()')
        this.test1();   
  }
  test1(){
    alert("menu sub1==>111")
  }

  btnClick() {
    this.show = !this.show;
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

}
