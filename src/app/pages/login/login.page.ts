import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  protected isToastOpen : boolean = false;
  valor = "";

  constructor(private auth: AuthService, private router: Router, private toastController: ToastController) {}

  ngOnInit() {
  }

  btnLogin() {
    // this.auth.registerNewUser(newUser);
    if (this.email && this.password) {
      this.auth.signIn(this.email, this.password);
    } else {
      this.toast('¡Por favor completa todos los campos!', 'warning');
    }

    this.auth.signIn(this.email,this.password).
    then( Response => {
      console.log("inicio de sesion exitoso");
      this.email = "";
      this,this.password = "";
      this.valor = "";
      this.router.navigate(['home']);
    }).catch( Error => {
      console.error("error al iniciar sesion", Error);
      this.toast('error al iniciar sesion', 'danger');
    })
  } // end of loginUser
  
  btnUser(user: any){
    if(user.srcElement.ariaChecked != "true"){
      switch(user.srcElement.innerHTML){
        case "Jaco":
          this.email = "jacoluna@gmail.com";
          this.password = "123456";
          break;
          case "Tomás":
          this.email = "tomaspierini@gmail.com";
          this.password = "123456";
          break;
        case "Carlos":
          this.email = "carlos@gmail.com";
          this.password = "123456";
          break;
      }
    }else{
      this.email = "";
      this.password = "";
    }
  }

  async toast(message, status) {
    try {
      const toast = await this.toastController.create({
        icon: 'log-in-outline',
        message: message,
        color: status,
        position: 'middle',
        duration: 2000,
      });
      toast.present();
    } catch (error) {
      console.log(error.message);
    }
  }
}
