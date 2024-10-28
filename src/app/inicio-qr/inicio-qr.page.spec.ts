import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioQRPage } from './inicio-qr.page';

describe('InicioQRPage', () => {
  let component: InicioQRPage;
  let fixture: ComponentFixture<InicioQRPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
