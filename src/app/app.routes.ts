import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent),
  },
  {
    path: 'menu/full',
    loadComponent: () => import('./pages/full-menu/full-menu.component').then(m => m.FullMenuComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'vibe',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
  },
  {
    path: 'visit',
    loadComponent: () => import('./pages/visit/visit.component').then(m => m.VisitComponent),
  },
  {
    path: 'order',
    loadComponent: () => import('./pages/order/order.component').then(m => m.OrderComponent),
  },
  { path: '**', redirectTo: '' },
];
