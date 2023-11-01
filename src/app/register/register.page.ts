import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usuario: string = '';
  contrasena: string = '';
  correo: string = '';

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}

  enviarRegistro() {
    console.log(this.correo);

    if (this.usuario.length >= 3 && this.contrasena.length >= 8) {
      this.mostrarToast('Registro exitoso, gracias por registrarse en nuestra aplicacíon');
      this.navCtrl.navigateForward(['/login']);
    } else {
      this.mostrarToast('Error. por favor verifique sus datos y vuelva a intentarlo.');
    }
  }

  async mostrarToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}
