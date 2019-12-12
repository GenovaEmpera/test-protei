import { Comment } from './comment.model';

export class Article {
  constructor(
    public username: string,
    public city: string,
    public title: string,
    public comments: Comment[],
    public commentCount: number,
    public body?: string,
    public id?: number,
    public userId?: number
  ) {}
}
