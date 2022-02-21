import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../shared/model/usuario';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  formGroup: FormGroup;

  tiposDeDocumento = [
    {id: "CC", descripcion: "Cédula de ciudadanía"},
    {id: "TI", descripcion: "Tarjeta de identidad"}
  ]

  usuario: Usuario = new Usuario();

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.construirFormularioUsuario();
  }

  construirFormularioUsuario(): void {
    this.formGroup = this.formBuilder.group({
      'telefonoCelular': ['', [Validators.required]],
      'nombres': ['', [Validators.required]],
      'apellidos': ['', [Validators.required]],
      'correoElectronico': ['', [Validators.required]],
      'tipoDocumento': ['', [Validators.required]],
      'numeroDocumento': ['', [Validators.required]]
    });
  }

  crear() {
    this.usuario.telefonoCelular = this.formGroup.get('telefonoCelular').value;
    this.usuario.nombres = this.formGroup.get('nombres').value;
    this.usuario.apellidos = this.formGroup.get('apellidos').value;
    this.usuario.correoElectronico = this.formGroup.get('correoElectronico').value;
    this.usuario.tipoDocumento = this.formGroup.get('tipoDocumento').value;
    this.usuario.numeroDocumento = this.formGroup.get('numeroDocumento').value;
    console.log(this.usuario);
  }

}
