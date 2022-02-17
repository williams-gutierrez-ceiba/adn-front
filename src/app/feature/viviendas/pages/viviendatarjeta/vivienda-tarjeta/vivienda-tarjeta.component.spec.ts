import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViviendaTarjetaComponent } from './vivienda-tarjeta.component';

describe('ViviendaTarjetaComponent', () => {
  let component: ViviendaTarjetaComponent;
  let fixture: ComponentFixture<ViviendaTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViviendaTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViviendaTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
