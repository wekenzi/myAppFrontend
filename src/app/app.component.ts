import { Component , OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {callRtlStyle , removeRtlStyle} from 'src/app/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private translate: TranslateService) {
    translate.addLangs(['en','ar','fr', 'es', 'ru'])
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
  }
  lang = localStorage.getItem('lang');
  ngOnInit(){
    if(!!this.lang){
      this.translate.use(this.lang)
      document.getElementsByTagName('html')[0].lang=this.lang;
      if(this.lang == 'ar'){
        callRtlStyle();
      }else{
        removeRtlStyle();
      }
    }else{
      this.translate.use('en');
      removeRtlStyle();
    }
  }

}
