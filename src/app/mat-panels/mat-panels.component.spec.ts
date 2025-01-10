import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPanelsComponent } from './mat-panels.component';

describe('MatPanelsComponent', () => {
  let component: MatPanelsComponent;
  let fixture: ComponentFixture<MatPanelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatPanelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
