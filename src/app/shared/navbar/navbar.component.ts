import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

interface NavLink {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled()">
      <div class="navbar-inner page-container">
        <!-- Logo -->
        <a routerLink="/" class="navbar-logo" aria-label="Thahrav Cafe Home">
          <span class="logo-hindi devanagari">ठहराव</span>
          <span class="logo-divider"></span>
          <span class="logo-sub label-md">Cafe</span>
        </a>

        <!-- Desktop Links -->
        <div class="navbar-links" role="navigation" aria-label="Main navigation">
          @for (link of navLinks; track link.path) {
            <a [routerLink]="link.path" routerLinkActive="active" class="nav-link body-md"
               [routerLinkActiveOptions]="{ exact: link.path === '/' }">
              {{ link.label }}
            </a>
          }
        </div>

        <!-- CTA Button -->
        <a routerLink="/order" mat-flat-button class="order-cta" id="navbar-order-btn" aria-label="Order now">
          <span class="material-symbols-outlined">shopping_bag</span>
          Order
        </a>

        <!-- Hamburger (mobile) -->
        <button mat-icon-button class="menu-toggle" (click)="toggleDrawer()" aria-label="Open menu" id="mobile-menu-btn">
          <span class="material-symbols-outlined">{{ drawerOpen() ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <div class="mobile-backdrop" [class.open]="drawerOpen()" (click)="toggleDrawer()"></div>
    <div class="mobile-drawer" [class.open]="drawerOpen()" role="navigation" aria-label="Mobile navigation">
      <div class="drawer-header">
        <span class="logo-hindi devanagari">ठहराव</span>
        <button mat-icon-button (click)="toggleDrawer()" aria-label="Close menu">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <nav class="drawer-links">
        @for (link of navLinks; track link.path) {
          <a [routerLink]="link.path" (click)="toggleDrawer()" routerLinkActive="active"
             class="drawer-link title-md" [routerLinkActiveOptions]="{ exact: link.path === '/' }">
            <span class="material-symbols-outlined">{{ link.icon }}</span>
            {{ link.label }}
          </a>
        }
      </nav>
      <div class="drawer-footer">
        <a routerLink="/order" mat-flat-button (click)="toggleDrawer()" class="order-cta-mobile">
          <span class="material-symbols-outlined">shopping_bag</span>
          Order Now
        </a>
        <p class="body-sm tagline">दुहराव के साथ एक दुहराव</p>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      padding-top: 5px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      
      // Default glass state for visibility over slider
      background: rgba(255, 248, 243, 0.15);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);

      @media (max-width: 768px) {
        padding-top: 0;
      }

      &.scrolled {
        background: rgba(255, 248, 243, 0.9);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        box-shadow: var(--shadow-elevation-2);
        
        .navbar-inner {
          height: 64px;
        }
      }
    }

    .navbar-inner {
      display: flex;
      align-items: center;
      gap: var(--space-6);
      height: 80px;
      transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .navbar-logo {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      text-decoration: none;
      color: var(--color-primary);
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);

      .logo-hindi {
        font-size: 1.85rem;
        letter-spacing: -0.01em;
        font-weight: 800;
        transition: all 0.4s ease;
      }
      
      .scrolled & .logo-hindi {
        font-size: 1.6rem;
      }

      .logo-divider {
        width: 1.5px;
        height: 24px;
        background: var(--color-primary);
        opacity: 0.3;
      }

      .logo-sub {
        color: var(--color-primary);
        text-transform: uppercase;
        letter-spacing: 0.15em;
        font-size: 0.75rem;
        font-weight: 700;
        opacity: 0.8;
      }
    }

    .navbar-links {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      margin-left: auto;
      background: rgba(255, 255, 255, 0.2);
      padding: 6px var(--space-6);
      border-radius: var(--radius-full);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: var(--shadow-elevation-1);

      @media (max-width: 768px) { display: none; }
    }

    .nav-link {
      padding: var(--space-2) var(--space-4);
      text-decoration: none;
      color: #32190b; // High contrast brown
      font-weight: 800;
      border-radius: var(--radius-full);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 0.95rem;

      &:hover {
        color: var(--color-primary);
        background: rgba(255, 255, 255, 0.4);
        transform: translateY(-1px);
      }

      &.active {
        color: var(--color-on-primary);
        background: var(--color-primary);
        box-shadow: var(--shadow-elevation-2);
      }
    }

    .order-cta {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      background: var(--color-primary) !important;
      color: var(--color-on-primary) !important;
      border-radius: var(--radius-full) !important;
      padding: 0 var(--space-6) !important;
      height: 48px;
      font-family: var(--font-label);
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.05em;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

      &:hover {
        transform: scale(1.05);
        box-shadow: var(--shadow-elevation-3);
      }
      
      &:active {
        transform: scale(0.95);
      }

      .material-symbols-outlined { font-size: 20px; }

      @media (max-width: 768px) { display: none; }
    }

    .menu-toggle {
      display: none !important;
      @media (max-width: 768px) { display: flex !important; margin-left: auto; }
      color: var(--color-primary) !important;
    }

    // Mobile Drawer
    .mobile-backdrop {
      display: none;
      position: fixed; inset: 0;
      background: rgba(50, 25, 11, 0.4);
      z-index: 1001;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;

      &.open {
        display: block;
        opacity: 1;
        pointer-events: auto;
      }

      @media (min-width: 769px) { display: none !important; }
    }

    .mobile-drawer {
      position: fixed;
      top: 0; right: -100%;
      width: min(80vw, 320px);
      height: 100vh;
      background: var(--color-surface-container-lowest);
      z-index: 1002;
      display: flex;
      flex-direction: column;
      transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      padding: var(--space-4);

      &.open { right: 0; }

      @media (min-width: 769px) { display: none !important; }
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: var(--space-6);
      border-bottom: 1px solid var(--color-surface-container-high);

      .logo-hindi {
        font-size: 1.75rem;
        color: var(--color-primary);
      }
    }

    .drawer-links {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
      padding: var(--space-6) 0;
      flex: 1;
    }

    .drawer-link {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-4) var(--space-3);
      text-decoration: none;
      color: var(--color-on-surface-variant);
      border-radius: var(--radius-sm);
      transition: background 0.2s ease, color 0.2s ease;

      .material-symbols-outlined { font-size: 20px; }

      &:hover { background: var(--color-surface-container); color: var(--color-primary); }
      &.active { color: var(--color-primary); background: var(--color-primary-fixed); font-weight: 600; }
    }

    .drawer-footer {
      border-top: 1px solid var(--color-surface-container-high);
      padding-top: var(--space-6);
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      align-items: center;

      .tagline {
        color: var(--color-outline);
        font-style: italic;
        text-align: center;
      }
    }

    .order-cta-mobile {
      display: flex !important;
      align-items: center;
      gap: var(--space-2);
      background: var(--color-primary) !important;
      color: var(--color-on-primary) !important;
      border-radius: var(--radius-sm) !important;
      width: 100%;
      justify-content: center;
      height: 48px;
      text-decoration: none;
      font-family: var(--font-label);
      font-weight: 500;
    }
  `]
})
export class NavbarComponent {
  scrolled = signal(false);
  drawerOpen = signal(false);

  navLinks: NavLink[] = [
    { path: '/',       label: 'Home',     icon: 'home' },
    { path: '/menu',   label: 'Menu',     icon: 'menu_book' },
    { path: '/about',  label: 'About',    icon: 'info' },
    { path: '/vibe',   label: 'Our Vibe', icon: 'photo_library' },
    { path: '/visit',  label: 'Visit Us', icon: 'location_on' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  toggleDrawer(): void {
    this.drawerOpen.update(open => !open);
    document.body.style.overflow = this.drawerOpen() ? 'hidden' : '';
  }
}
