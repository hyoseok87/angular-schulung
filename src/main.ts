import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,  // appConfig 안의 모든 속성을 펼쳐서 포함시킴
  providers: [
    ...(appConfig.providers || []), // 기존 providers 배열을 포함하고,
    provideHttpClient()              // 여기에 HttpClient 제공자를 추가함
  ]
})
.catch((err) => console.error(err));
