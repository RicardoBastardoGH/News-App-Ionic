import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  
  @Input() article!: Article;
  @Input() index!: number;
  constructor(
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController
  ) { }
  
  async onClickMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [
        {
          text: 'Share',
          icon: 'share-outline',
          handler: () => {
            this.onShareArticle()
          }
        },
        {
          text: 'Favorite',
          icon: 'heart-outline',
          // cssClass: 'action-dark',
          handler: () => {
            this.onToogleFavorite()
          }
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })

    actionSheet.present();
  }

  onShareArticle(){
    console.log('onShareArticle()');
  }
  onToogleFavorite(){
    console.log('onToogleFavorite()');
  }
  openArticle() {

    // if (this.platform.is('mobile') || this.platform.is('hybrid')) {
      if (this.platform.is('ios') || this.platform.is('android')) {
      // console.log('Platform: ', this.platform.is('ios') ? 'iOS' : 'Android');
      Browser.open({ url: this.article.url });
      return;
    }

    window.open(this.article.url, '_blank');

    // const openCapacitorSite = async () => {
    //   await Browser.open({ url: this.article.url });
    // };
  }

  
}
