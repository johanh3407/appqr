import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarPassPage } from './cambiar-pass.page';

describe('CambiarPassPage', () => {
  let component: CambiarPassPage;
  let fixture: ComponentFixture<CambiarPassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
