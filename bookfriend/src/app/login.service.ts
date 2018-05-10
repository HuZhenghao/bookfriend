import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  public isShowTop = true;
  public isLogin = false;
  public username = "";
  public user;
  public searchType = 'post';
  constructor() {}
}
