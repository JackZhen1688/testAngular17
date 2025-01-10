import { Component, OnInit } from '@angular/core';

@Component({
    template: ''
  })

//extends from children component (parent)
export class EditSliderComponet implements OnInit  {

    isEditable: boolean  = false;
    checked:boolean = false;

    constructor() {}

    ngOnInit(): void {
        console.log("editSlider onInit isEditable=="+this.isEditable)  //call parent's isEditable value
    }

    onToggleEdit(event: any, param?:string) {
        console.log("onToggleEdit from parent component...")
        if (event.checked) {
            this.isEditable = true;
            this.checked = true;
            console.log(param+"===Supper =="+this.isEditable);
            this.onSubmit();
            this.test();
            if (param)
                console.log("Yes param!!!");
            else 
                 console.log("No param!!!");
        } else {
            this.isEditable = false;
            console.log("Supper =="+this.isEditable);
        }
    }

    getEditabled() {
        console.log("this.isEditabled==="+this.isEditable)
        return this.isEditable;
    }

    setEditToggle() {
        console.log("EditToggle status=="+this.checked);
        this.checked = false;
    }

    //#1. if children component has the same method, 
    //    then call chirldren's method.
    onSubmit() {   
        console.log("Child onSubmit()...");
    }
    //#2. if children component hasn't the same method, 
    //    then call parent's method.
    test() {
        console.log("Child test()...");
    }
}