import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article, NewsResponse } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public articles: Article[] = [];
  @ViewChild(IonInfiniteScroll, {static: true}) InfiniteScroll: IonInfiniteScroll = null!;

  constructor(
    private newsService: NewsService,
  ) {}

  ngOnInit(): void {

    this.newsService.getTopHeadlines()
    .subscribe( articles => {
      this.articles.push(...articles); 
      console.log(this.articles);
    })
  }

  loadData() {
    // console.log($event.target.nodeValue);
    this.newsService.getTopHeadlinesByCategory('business', true)
    .subscribe( articles => {

      if (articles.length === this.articles.length) {
        // $event.target.disabled = true;
        this.InfiniteScroll.disabled = true;
        return;
      }
      this.articles = articles;
      // $event.target.complete();
      this.InfiniteScroll.complete();
    })
  }

}
