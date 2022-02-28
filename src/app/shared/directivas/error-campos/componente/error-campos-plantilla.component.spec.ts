import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCamposPlantillaComponent } from './error-campos-plantilla.component';

describe('ErrorCamposPlantillaComponent', () => {
  let component: ErrorCamposPlantillaComponent;
  let fixture: ComponentFixture<ErrorCamposPlantillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorCamposPlantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCamposPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#set -> se valida cumplimiento condicion if', () => {
    component.mensajeError = true;
    const value = false;
    component.text = false;
    expect(component.mensajeError).toBe(value);
    expect(component.ocultar).not.toBe(value);
  });

});
