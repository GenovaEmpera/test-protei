import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { map, take, takeUntil } from 'rxjs/operators';
import { ApiService } from '../_services/api.service';
import { Article } from '../_models/article.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit, OnDestroy {

  inputText = '';

  articleList: Article[] = [];

  sortParam = 'username';
  sortOrderAB = false;
  popUpItem: Article;
  popUpOpen = false;


  userList$ = this.apiService.getAllUsers();

  private unsubscribe$ = new Subject();
  private articleList$ = this.apiService.getAllArticles().pipe(
    takeUntil(this.unsubscribe$),
    map( articles => articles.map( article => {
        this.apiService.getUserById(article.userId).subscribe(
          resUser => {
            article.username = resUser.username;
            article.city = resUser.address.city;
          }
        );
        this.apiService.getCommentsByArticleId(article.id).subscribe(
        comments => {
          article.comments = comments;
          article.commentCount = comments.length;
        }
      );
        return article;
    }
    ))
  );

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.articleList$.subscribe( res => this.articleList = res);
  }

  closePopup() {
    this.popUpOpen = false;
  }

  filterByUser(item: any) {
    if (!!item) {
      this.articleList$.pipe(
        map( articles => articles.filter( article =>
          article.userId === item.id))
      ).subscribe( res => this.articleList = res);
    } else {
      this.articleList$.subscribe( res => this.articleList = res);
    }
  }

  searchArticles() {
    this.articleList$.pipe(
      map( articles => articles.filter( article =>
        article.body.includes(this.inputText.toLocaleLowerCase())
      ))
    ).subscribe( res => this.articleList = res);
  }

  showArticleInfo(article: Article) {
    this.popUpItem = article;
    this.popUpOpen = true;
  }

  sortTable(param: string) {
    this.sortParam = param;
    if (this.sortOrderAB) {
      this.articleList.sort((a, b) => this.compare(a, b, param));
    } else {
      this.articleList.sort((b, a) => this.compare(a, b, param));
    }
    this.sortOrderAB = !this.sortOrderAB;
  }

  private compare(a, b, param) {
    return a[param].toString().localeCompare(b[param].toString());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
