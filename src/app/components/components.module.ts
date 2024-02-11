import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { IonicStorageModule } from '@ionic/storage-angular';



@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicStorageModule,
  ],
  exports: [
    ArticlesComponent
  ]
})
export class ComponentsModule { }
