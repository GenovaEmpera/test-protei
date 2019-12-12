export class User {
  constructor(
    public username: string,
    public address: {
      city: string
    },
    public id?: number
  ) {}
}
