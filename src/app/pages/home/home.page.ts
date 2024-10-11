import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import {
  DeviceMotion,
  DeviceMotionAccelerationData,
} from '@awesome-cordova-plugins/device-motion/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pressedButton: boolean = false;

  alarmaActivada: boolean = false;

  password: string;

  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;
  subscription: any;

  audioLeft = '../../../assets/sonidos/audioIzquierda.mp3';
  audioRight = '../../../assets/sonidos/audioDerecha.mp3';
  audioVertical = '../../../assets/sonidos/audioVertical.mp3';
  audioHorizontal = '../../../assets/sonidos/audioHorizontal.mp3';
  audio = new Audio();

  firstAdmission: boolean = true;
  firstAdmissionFlash: boolean = true;

  currentPositionCellPhone = 'actual';
  previousPositionCellPhone = 'anterior';

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashlight: Flashlight,
    private vibration: Vibration,
    private screenOrientation: ScreenOrientation,
    private deviceMotion: DeviceMotion,
    public toast: ToastController
  ) {}

  ngOnInit(): void {}

  logoutUser() {
    this.authService.signOut();
  } // end of logoutUser

  activarAlarma() {
    this.pressedButton = true;
    setTimeout(() => {
      this.alarmaActivada = true;
      this.start();
      // this.AlertSuccess('Alarma activada').then((alert: any) => {
      //   alert.present();
      //   
      // });
      this.pressedButton = false;
    }, 1000);
  } // end of activarAlarmaa

  desactivarAlarma() {
    if (this.password == '123456') {
      this.pressedButton = true;
      setTimeout(() => {
        this.alarmaActivada = false;

        this.subscription.unsubscribe();
        this.firstAdmission = true;
        this.audio.pause();

        // this.AlertSuccess('Alarma desactivada').then((alert: any) => {
        //   alert.present();
        // });
        this.pressedButton = false;
        this.password = '';
      }, 1000);
    } else {
      this.Alert('Contraseña incorrecta').then((alert: any) => {
        alert.present();
        this.moveVertical();
        this.moveHorizontal();
      });
    }
  } // end of desactivarAlarma

  start() {
    this.subscription = this.deviceMotion
      .watchAcceleration({ frequency: 300 })
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
        this.accelerationX = Math.floor(acceleration.x);
        this.accelerationY = Math.floor(acceleration.y);
        this.accelerationZ = Math.floor(acceleration.z);

        if (acceleration.x > 5) {
          //Inclinacion Izquierda

          this.currentPositionCellPhone = 'izquierda';
          this.moveLeft();
        } else if (acceleration.x < -5) {
          //Inclinacion Derecha

          this.currentPositionCellPhone = 'derecha';
          this.moveRight();
        } else if (acceleration.y >= 9) {
          //encender flash por 5 segundos y sonido
          this.currentPositionCellPhone = 'arriba';

          if (this.currentPositionCellPhone != this.previousPositionCellPhone) {
            this.audio.src = this.audioVertical;
            this.previousPositionCellPhone = 'arriba';
          }
          this.audio.play();
          this.moveVertical();
        } else if (
          acceleration.z >= 9 &&
          acceleration.y >= -1 &&
          acceleration.y <= 1 &&
          acceleration.x >= -1 &&
          acceleration.x <= 1
        ) {
          //acostado vibrar por 5 segundos y sonido
          this.currentPositionCellPhone = 'plano';
          this.moveHorizontal();
        }
      });
  } // end of start

  moveLeft() {
    this.firstAdmission = false;
    this.firstAdmissionFlash = true;
    if (this.currentPositionCellPhone != this.previousPositionCellPhone) {
      this.previousPositionCellPhone = 'izquierda';
      this.audio.src = this.audioLeft;
    }
    this.audio.play();
  } // end of moveLeft

  moveRight() {
    this.firstAdmission = false;
    this.firstAdmissionFlash = true;
    if (this.currentPositionCellPhone != this.previousPositionCellPhone) {
      this.previousPositionCellPhone = 'derecha';
      this.audio.src = this.audioRight;
    }
    this.audio.play();
  } // end of moveRight

  moveVertical() {
    if (this.firstAdmissionFlash) {
      this.firstAdmissionFlash ? this.flashlight.switchOn() : false;
      setTimeout(() => {
        this.firstAdmissionFlash = false;
        this.flashlight.switchOff();
      }, 5000);
      this.firstAdmission = false;
    }
  } // end of moveVertical

  moveHorizontal() {
    if (this.currentPositionCellPhone != this.previousPositionCellPhone) {
      this.previousPositionCellPhone = 'plano';
      this.audio.src = this.audioHorizontal;
    }

    this.firstAdmission ? null : this.audio.play();
    this.firstAdmission ? null : this.vibration.vibrate(5000);
    this.firstAdmission = true;
    this.firstAdmissionFlash = true;
  } // end of moveHorizontal

  Alert(message: string) {
    return this.toast.create({
      message: message,
      position: 'top',
      color: 'danger',
      duration: 2000,
    });
  } // end of Alert

  AlertSuccess(message: string) {
    return this.toast.create({
      message: message,
      position: 'top',
      color: 'success',
      duration: 2000,
    });
  } // end of AlertSuccess
}
