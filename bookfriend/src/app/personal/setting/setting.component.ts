import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { Http } from '@angular/http';
import { flyIn } from '../../animation/fly-in';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { LoginService } from '../../login.service'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  animations: [flyIn]
})
export class SettingComponent implements OnInit {
  chooseIndex = 0;
  myself;
  avatar;
  avatarFile;
  info = "";

  constructor(
    public http: Http,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    this.myself = JSON.parse(localStorage.getItem('user'));
    this.info = this.myself.info;
    this.avatar = `http://localhost:3000${this.myself.avatar}`
  }

  private getBase64(img: File, callback: (img: any) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  upload(e) {
    this.avatarFile = e.target.files[0];
    this.getBase64(this.avatarFile, (img) => {
      this.avatar = img;
    })
  }
  save() {
    let data = new FormData;
    data.append('avatar', this.avatarFile);
    data.append('info', this.info);
    data.append('id',this.myself._id);
    this.http.post(`http://localhost:3000/users/updateInfo`, data)
    .subscribe(
      data => {
        let user = data.json().data;
        user.info = this.info;
        this.myself = user;
        localStorage.setItem('user',JSON.stringify(user));
        this.loginService.user = user;
      },
      error => {
        console.error(error);
      }
    )
  }
  infoChange(e){
    this.info = e.target.value;
  }
}
