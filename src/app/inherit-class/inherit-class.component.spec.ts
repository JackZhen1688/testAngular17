import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InheritClassComponent } from './inherit-class.component';

describe('InheritClassComponent', () => {
  let component: InheritClassComponent;
  let fixture: ComponentFixture<InheritClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InheritClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InheritClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
