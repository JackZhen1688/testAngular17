import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'; 


const makeId = () => Math.floor(Math.random() * 100);

@Component({
  selector: 'app-nested-formarray',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nested-formarray.component.html',
  styleUrl: './nested-formarray.component.css'
})
export class NestedFormarrayComponent implements OnInit, AfterViewChecked {

  public types = [
    { id: makeId(), name: 'cell' },
    { id: makeId(), name: 'home' }
  ];  

  formDummyData = 
  {                                                                 
    txtField:'Test',                                                
    users:[
            {name:'akassh', 
             phones:[{num:'9517532486',type:this.types[0].name},{num:'9517532684',type:this.types[1].name}]
            },    
            {name:'jainwt', 
             phones:[{num:'9517532412',type:this.types[0].name},{num:'9517532643',type:this.types[1].name}]
            }
          ]    
  }                                                                   
                                                                   
  public form: FormGroup = new FormGroup({});                       

  addUserFlag: boolean = false;   // for second nested-formarry
  
  constructor(private fb: FormBuilder,
              private readonly changeDetectorRef: ChangeDetectorRef) 
  {
    this.buildForm();
  }

  ngOnInit() {
    if (this.formDummyData) {
        this.form.patchValue({
          txtTest: this.formDummyData.txtField
        });
        this.formDummyData.users.forEach(userItem => {
          this.addUser(userItem);
        });
    } else {
        this.addUser();
    }
    /* Loop for controls
    this.users.controls.forEach((user:any) => {
      //console.log("obj=="+user['controls'].phones['controls'])
      //user.controls.phones.controls.forEach((phone:any) => {
      //  console.log("phone num="+phone.get("txtNum").value)
      //});
      //user['controls'].phones['controls'].forEach((phone:any) => {
      //  console.log("phone num="+phone.get("txtNum").value)
      //});
      <FormArray>user.get("phones").value.forEach((phone:any) => {
        console.log("phone num==="+phone.txtNum);
      });
    });*/
    
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  //#1. loop in HTML: let user of users.controls
  get users() {
    return this.form.get("users") as FormArray;
    //return this.form.controls['users'] as FormArray;
  }

  //#2. loop in HTML: let phone of phones(i).controls
  phones(userIndex: number) {
    return this.users.at(userIndex).get('phones') as FormArray;
  }

  buildForm() {                                 //#1. Dynamic define new main reactiveForm
    this.form = this.fb.group({
      txtTest: this.fb.control(''),  
      users: this.fb.array([]),   
    });
  }

  addPhone(userIndex: number, phoneItem?: any)  //#3. Dynamic define new phones array   
  {
      const phone = this.fb.group({ 
         'txtNum': [phoneItem?phoneItem.num:''],
         'txtType': [phoneItem?phoneItem.type:''],
      });
      (<FormArray>(<FormGroup>(<FormArray>this.users)
          .controls[userIndex]).controls['phones']).push(phone);
  
  }

  delPhone(userIndex: number, index: number) 
  {
      console.log('userIndex', userIndex, '-------', 'index', index);
      (<FormArray>(<FormGroup>(<FormArray>this.users)
          .controls[userIndex]).controls['phones']).removeAt(index);
  }

  addUser(userItem?: any)                      //#2. Dynamic define new user object
  {
      const user = this.fb.group({ 
        'txtName':[userItem?userItem.name:''], //[]
        'phones': this.fb.array([]),           //formArrayName="phones"
      });
      this.users.push(user);
    
      let userIndex = this.users.length-1;
      if (!userItem) {    //No Data:UserItem 
          this.addPhone(userIndex);
          this.addUserFlag = true;
      } else {
          userItem.phones.forEach((phoneItem:string) => {
            this.addPhone(userIndex, phoneItem);
          });
      }
  }

  delUser(index: number) {
      this.users.removeAt(index);
  }

  onCancle() {
      this.form.reset();
      console.log(this.form, this.form.value);
  }

  onSubmit(formValue:any) {
      console.log(JSON.stringify(formValue));
  }


}
