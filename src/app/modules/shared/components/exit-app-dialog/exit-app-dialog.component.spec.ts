import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitAppDialogComponent } from './exit-app-dialog.component';

describe('ExitAppDialogComponent', () => {
  let component: ExitAppDialogComponent;
  let fixture: ComponentFixture<ExitAppDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitAppDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
