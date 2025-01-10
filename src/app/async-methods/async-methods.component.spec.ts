import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncMethodsComponent } from './async-methods.component';

describe('AsyncMethodsComponent', () => {
  let component: AsyncMethodsComponent;
  let fixture: ComponentFixture<AsyncMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncMethodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsyncMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
