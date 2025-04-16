import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogFormComponent } from './home/blog-form/blog-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' 
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'neuer-eintrag',
    component: BlogFormComponent,
  },

  {
    path: 'kontakt',
    loadComponent: () =>
      import('./contact/contact.component').then(m => m.ContactComponent)
  },

  {
    path: '**',
    redirectTo: 'home'
  }
];