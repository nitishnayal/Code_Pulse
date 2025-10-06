import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)
  
);



// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient } from '@angular/common/http';
// import { importProvidersFrom } from '@angular/core';
// import { MarkdownModule } from 'ngx-markdown';
// import { HttpClient } from '@angular/common/http';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     importProvidersFrom(MarkdownModule.forRoot({ loader: HttpClient }))
//   ]
// }).catch((err) => console.error(err));



// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config';
// import { provideHttpClient } from '@angular/common/http';
// import { importProvidersFrom } from '@angular/core';
// import { MarkdownModule } from 'ngx-markdown';
// import { HttpClient } from '@angular/common/http';

// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     provideHttpClient(),
//     importProvidersFrom(MarkdownModule.forRoot({ loader: HttpClient }))
//   ]
// }).catch((err) => console.error(err));

