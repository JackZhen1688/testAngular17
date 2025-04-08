import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';      
import { MatInputModule } from '@angular/material/input';   
import { CommonModule } from '@angular/common';  


export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  F1_KEY = 112
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  credentials = {username: 'Jack', password: '123'};
  
  disabled: boolean = false;
  keepGoing: boolean = true;
  isShowTrainingBilling: boolean = true;
  isShowTrainingFunding: boolean = true;
  
  obj = { a: 1 };
  info = {"serviceId":"C"};

  map = new Map();
  groups: any[] = ["dsams-group","111", "Billing", "ABC"];
  menus: any[]  = [{"serviceId":"A","groupName":"Case",   "menuName":"Case"}, 
                   {"serviceId":"A","groupName":"Billing","menuName":"Training Billing"},
                   {"serviceId":"A","groupName":"Funding","menuName":"Training Funding"}];

  navigationSubscription: any;
  testForm: FormGroup = new FormGroup({});

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { 
  
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) 
          this.initLoad(event);
    });
  }

  ngOnInit(): void {
    this.map.set("Billing","isShowTrainingBilling");
    this.map.set("Funding","isShowTrainingFunding");

    //this.breakLoop();
    //this.groupsLoop();
    //this.changeObjValue(this.info);
    //this.cloneObj(this.obj);
    this.addObject("testing");

    this.breakLoop2();
    console.log("return==="+this.test());
  }

  initLoad(e:any) {
    console.log("$$$$$load===="+this.route.snapshot.paramMap.get('id'));

  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
    }
  }

  setPassword() { 
    this.credentials.password = '456'; 
  }
  getPassword() { 
    alert("Password="+this.credentials.password);
  }
 

  groupsLoop() {  //not work => ES2022
  //console.log("Hello..."+(<any>this.groups).length+" value="+(<any>this.groups)[1]);
    (<any>this.groups).forEach((element:string, index:number) => {
      console.log(index+" value..."+element);
    });
  }
  breakLoop() {
    this.groups.forEach(group => {
      if(this.keepGoing) {
         if (group ==='111')
             this.keepGoing = false;
         console.log("group=="+group)
      }  
    });
  }

  breakLoop2() {
    this.groups.forEach(group => {
      if(this.keepGoing) {
        for(let i = 0; i < this.menus.length; i++) {
          if (this.menus[i].serviceId=="A" && this.menus[i].groupName === group){
              console.log("menuName=="+ this.menus[i].menuName+"*** groupName=="+this.map.get(this.menus[i].groupName));
              //Element implicitly has an 'any' type because expression of type 'any' can't be used to index type
              //this[this.map.get(this.menus[i].groupName)]=false   <==> this.isShowTrainingBilling = false;
              (this as any)[this.map.get(this.menus[i].groupName)] = false;
              this.keepGoing = false;
              break;
          } else {
              this.isShowTrainingBilling = true;
          }
        }
      }
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log("event=="+event.keyCode);
    if (event.keyCode === KEY_CODE.F1_KEY) {
        window.open('assets/sample.pdf','_blank');
    }  
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
        this.increment();
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        this.decrement();
    }
  }
  num:number = 0;
  increment() {
    this.num++;
  }
  decrement() {
    this.num--;
  }

  getRandomNumber(pRange: number): number {
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);
    return Math.floor(byteArray[0] % pRange);
  }
 
  changeObjValue(info:any) {
    console.log("before=="+info.serviceId)
    info.serviceId = 'A';      //{"serviceId":"A"}
    //info['serviceId'] = 'B';   {"serviceId":"B"}
    console.log("after=="+info.serviceId)
  }

  cloneObj(obj:any){
    const copy = Object.assign({}, obj);
    console.log("Clone Ojb=="+JSON.stringify(copy));
  }
  addObject(test1:any) {                 //1. test as name 2. name = "name"
    var myJson = { "name": "mamad", family: "mirzaei" }
    //let x = { ...myJson, "test":"testing"};
    var newObj = { ...myJson, test1};    //2. Add property
    console.log("new Ojbect==="+JSON.stringify(newObj))
  }

  test () {
    let x: any = 'a';
    let y: any = 'b';
    if (x && y) {
        console.log("=====inside the function");
        return true;
    } 
    return false;
  }
}
