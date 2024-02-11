import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage.service';

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
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageService,
  ) { }
  
  async onClickMenu() {

    const articleInFavorite = this.storageService.articleInFavorites(this.article);

    console.log('onClickMenu()');

    const actionSheetbtns = [
      {
        text: articleInFavorite ? 'Unfavorite' : 'Favorite',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
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
    ];

    const shareBtn = {
      text: 'Share',
      icon: 'share-outline',
      handler: () => {
        this.onShareArticle()
      }
    };

    if (this.platform.is('capacitor')) {
      actionSheetbtns.unshift(shareBtn);
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: actionSheetbtns,
    })

    actionSheet.present();
  }

  async onShareArticle(){
    await Share.share({
      title: this.article.title,
      text: this.article.source.name,
      url: this.article.url,
      dialogTitle: undefined,
    }); 
  }
  onToogleFavorite(){
    this.storageService.saveRemoveArticle(this.article);
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
