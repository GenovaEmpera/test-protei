import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from '../_models/article.model';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model';
import { Comment } from '../_models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Article[]> {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    return this.http.get<Article[]>(url);
  }

  getAllUsers(): Observable<User[]> {
    const url = `https://jsonplaceholder.typicode.com/users`;
    return this.http.get<User[]>(url);
  }

  getUserById(id: number): Observable<User> {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    return this.http.get<User>(url);
  }

  getCommentsByArticleId(postId: number): Observable<Comment[]> {
    const url = `https://jsonplaceholder.typicode.com/comments/`;
    const params = new HttpParams()
      .append('postId', postId.toString());
    return this.http.get<Comment[]>(url, {params});
  }
}
