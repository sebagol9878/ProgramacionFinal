import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from 'src/app/producto/producto-service.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {
  //Creamos una variable del tipo FormGroup
  // ! ==> Con esto le decimos a TS, que sabemos que la variable no esta inicializada
  //          y que estamos seguro que cuando se ejecute no será null
  productForm!: FormGroup;
  // Generalmente se usa una interface, sin embargo para jugar utilizaremos  una clase
  producto: ClProducto = {
    idProducto: 0,
    codigo: '09-G01',
    nombreprod: '',
    precio: 0,
    cantidad: 0, // Nueva propiedad
    fechaNacimiento: '', // Nueva propiedad
    rut:'0',
    dv: '0', // Nueva propiedad
    enfermedad: '0', // Nueva propiedad
    fonocontacto: 0, // Nueva propiedad
    categoria: '0', // Nueva propiedad
    editorial: '0', // Nueva propiedad
    raza: '0', // Nueva propiedad
    edad: 0, // Nueva propiedad
    altura: 0, // Nueva propiedad
    hrini: '0', // Nueva propiedad
    hrfin: '0', // Nueva propiedad
    direccion: '', // Nueva propiedad
    fCreacion: '', // Nueva propiedad
  };


  // Injectamos FormBuilder, el cual nos permitirá realizar validaciones                        
  constructor(private formBuilder: FormBuilder,
    // Injectamos las librerías necesarias
    private loadingController: LoadingController,
    private restApi: ProductServiceService,
    private router: Router,
  ) { }


  // Antes que inicie en pantalla
  // especificamos las validaciones,
  //    por medio de formBuilder injectado en el constructor
  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
    this.productForm = this.formBuilder.group({
      "nombreprod": [null, Validators.required],
      'direccion': [null, Validators.required],
      'precio': [null, Validators.required]
    });
  }
  // se ejecutará cuando presione el Submit
  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit del Product ADD")


    // Creamos un Loading Controller, Ojo no lo muestra
    console.log("Contenido de this.producto:", this.producto);




    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    // Muestra el Loading Controller
    await loading.present();






    // Antes de realizar la solicitud
console.log("Datos que se van a enviar:", this.producto);


    // Ejecuta el método del servicio y los suscribe
    await this.restApi.addProduct(this.producto)
      .subscribe({
        next: (res) => {
          console.log("Next AddProduct Page",res)
          loading.dismiss(); //Elimina la espera
          if (res== null){ // No viene respuesta del registro
            console.log("Next No Agrego, Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Next Agrego SIIIIII Router saltaré ;",this.router);
          this.router.navigate(['/product-list']);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error AddProduct Página",err);
          loading.dismiss(); //Elimina la espera
        }
      });
    console.log("Observe que todo lo del suscribe sale después de este mensaje")
  }


}




