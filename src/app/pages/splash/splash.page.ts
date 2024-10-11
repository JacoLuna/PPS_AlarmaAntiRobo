import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import anime from 'animejs/lib/anime.es.js';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  // constructor(
  //   private router: Router,
  //   private route: ActivatedRoute,
  //   private platform: Platform
  // ) {
  //   this.initializeApp();
  // }

  // ngOnInit() {
  //   setTimeout(() => {
  //     this.router.navigateByUrl('login');
  //   }, 2500);
  //   var textWrapper = document.querySelectorAll('.ml11 .letters');
  //   for (let i = 0; i < textWrapper.length; i++) {
  //     const textW = textWrapper[i];
  //     textW.innerHTML = textW.textContent.replace(
  //       /([^\x00-\x80]|\w)/g,
  //       "<span class='letter'>$&</span>"
  //     );
  //   }

  //   anime
  //     .timeline({ loop: true })
  //     .add({
  //       targets: '.ml11 .line',
  //       scaleY: [0, 1],
  //       opacity: [0.5, 1],
  //       easing: 'easeOutExpo',
  //       duration: 700,
  //     })
  //     .add({
  //       targets: '.ml11 .line',
  //       translateX: [
  //         0,
  //         document.querySelector('.ml11 .letters').getBoundingClientRect()
  //           .width - 10,
  //       ],
  //       easing: 'easeOutExpo',
  //       duration: 700,
  //       delay: 100,
  //     })
  //     .add({
  //       targets: '.ml11 .letter',
  //       opacity: [0, 1],
  //       easing: 'easeOutExpo',
  //       duration: 600,
  //       offset: '-=775',
  //       delay: (el, i) => 34 * (i + 1),
  //     })
  //     .add({
  //       targets: '.ml11',
  //       opacity: 0,
  //       duration: 1000,
  //       easing: 'easeOutExpo',
  //       delay: 1000,
  //     });
  // }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     SplashScreen.hide();
  //   });
  // }
  
  ngOnInit() {}
  
  constructor(private platform:Platform, private router: Router,) { }

  ionViewDidEnter()
  {
    this.platform.ready().then(() => 
    {
      SplashScreen.hide().then(()=>
      {
        setTimeout(() => 
        {
          this.router.navigate(['/login']);
        }, 2000);
      })
    });
  }
}
