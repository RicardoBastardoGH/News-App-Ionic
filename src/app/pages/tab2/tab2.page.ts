import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, SegmentChangeEventDetail } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent, IonSegmentCustomEvent } from '@ionic/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: true}) InfiniteScroll: IonInfiniteScroll = null!;

  public categories = ['business','entertainment','general','health','science','sports','technology',];
  public selectedCategory = this.categories[0];
  public articles: Article[] = []

  constructor( private newsService: NewsService) {}
  ngOnInit(): void {
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory)
    .subscribe( articles => {
      this.articles = [ ...this.articles, ...articles];
    })
  }

  // segmentChanged($event: IonSegmentCustomEvent<SegmentChangeEventDetail>) {
  segmentChanged(event: Event) {
    this.selectedCategory = (event as CustomEvent).detail.value;

    this.newsService.getTopHeadlinesByCategory(this.selectedCategory)
    .subscribe( articles => {
      this.articles = [ ...articles];
    });
  }

  // loadData($event: IonInfiniteScrollCustomEvent<void>) {
  loadData() {
    // console.log($event.target.nodeValue);
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory, true)
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
