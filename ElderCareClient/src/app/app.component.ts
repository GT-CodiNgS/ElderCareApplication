import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ElderCareClient';
  currentLanguage!: string;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });

    // Initialize current language
    this.currentLanguage = this.translate.currentLang || 'english';
  }
}
