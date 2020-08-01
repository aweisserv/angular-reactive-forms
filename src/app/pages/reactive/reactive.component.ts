import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;


  constructor( private fb: FormBuilder ) { 

    this.crearFormulario();
    this.cargarDataAlFormulario();

   }

  ngOnInit(): void {
  }

  get nombreNoValido(){
    //retorna booleano para usar en la clase de validación del template
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  crearFormulario(){

    this.forma = this.fb.group({
      nombre:   [ '', [ Validators.required, Validators.minLength(3) ] ],
      apellido: [ '', Validators.required ],
      correo:   [ '', [ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required ] ],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad  : ['', Validators.required]
      })
    });

  }

  cargarDataAlFormulario(){

    //this.forma.setValue({
      this.forma.reset({
      nombre: "Allan",
      apellido: "Weisser",
      correo: "tuabue@tagua.cl",
      direccion: {
        distrito: "Ohana",
        ciudad: "Familia"
      }
    });

   }


  guardar(){
    console.log( this.forma );

    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {

        if( control instanceof FormGroup ){
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }

      });

    }

    //posteo de información
    this.forma.reset(
    /*  {
        nombre: 'Sin nombre'
      } */
    );
  }


}
