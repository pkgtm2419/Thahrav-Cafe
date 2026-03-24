import { Component, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThreeViewerComponent } from '../../shared/three-viewer/three-viewer.component';
import { MenuCardComponent } from '../../shared/menu-card/menu-card.component';
import { MenuService, MenuItem, MENU_CATEGORIES } from '../../services/menu.service';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProductViewerDialogComponent } from '../../shared/product-viewer-dialog/product-viewer-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ThreeViewerComponent, MenuCardComponent,
    MatButtonModule, MatChipsModule, MatDialogModule,
  ],
  template: `
    <!-- HERO SECTION -->
    <section class="hero parchment-texture" id="hero-section">
      <div class="hero-content animate-fade-up" [class.visible]="true">
        <p class="hero-sub label-lg">Welcome to</p>
        <h1 class="hero-title devanagari">ठहराव</h1>
        <p class="hero-tagline headline-sm">चाय और सुकून का ठिकाना</p>
        <p class="hero-english body-lg">A place for chai &amp; tranquility</p>
        <div class="hero-ctas">
          <a routerLink="/menu" mat-flat-button class="cta-primary" id="hero-explore-menu">
            Explore Menu
          </a>
          <a routerLink="/order" mat-button class="cta-secondary" id="hero-order-now">
            Order Now <span class="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </div>

      <div class="hero-3d">
        <app-three-viewer modelType="chai" [autoRotate]="true" />
        <p class="viewer-label label-sm">Kullhad Chai — ₹30</p>
      </div>

      <div class="hero-image-overlay"></div>
    </section>

    <!-- STORY STRIP -->
    <section class="story-strip">
      <div class="page-container">
        <div class="story-inner animate-fade-up" [class.visible]="storyVisible()">
          <div class="story-text">
            <p class="label-lg story-eyebrow">Our Philosophy</p>
            <h2 class="headline-lg story-headline">Every cup tells a story.<br>Every pause, a refresh.</h2>
            <p class="body-lg story-body">
              At Thahrav, we believe the best conversations happen over a warm cup of chai.
              Rooted in tradition, brewed with intention — this is your moment to slow down.
            </p>
            <a routerLink="/about" mat-button class="story-link" id="story-read-more">
              Our Story <span class="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          <div class="story-image-placeholder">
            <img src="/assets/images/hero-cafe.webp" alt="Thahrav Cafe warm interior" class="story-img" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- MENU CATEGORIES -->
    <section class="categories-section section-padding">
      <div class="page-container">
        <div class="section-header animate-fade-up" [class.visible]="catsVisible()">
          <p class="label-lg section-eyebrow">What We Serve</p>
          <h2 class="headline-lg">Crafted with Care</h2>
        </div>

        <div class="categories-grid stagger-children animate-fade-up" [class.visible]="catsVisible()">
          @for (cat of categories; track cat.id) {
            <a [routerLink]="['/menu']" [queryParams]="{ cat: cat.id }" class="category-card" [id]="'cat-' + cat.id">
              <span class="cat-icon material-symbols-outlined">{{ cat.icon }}</span>
              <h3 class="title-md cat-label">{{ cat.label }}</h3>
              <p class="body-sm cat-desc">{{ cat.description }}</p>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- FEATURED ITEMS -->
    <section class="featured-section section-padding" style="background: var(--color-surface-container-low);">
      <div class="page-container">
        <div class="section-header animate-fade-up" [class.visible]="featuredVisible()">
          <p class="label-lg section-eyebrow">People's Choice</p>
          <h2 class="headline-lg">Best Sellers</h2>
        </div>

        <div class="featured-grid stagger-children animate-fade-up" [class.visible]="featuredVisible()">
          @for (item of featured; track item.id) {
            <app-menu-card [item]="item" (cardClick)="openViewer($event)" />
          }
        </div>

        <div class="featured-cta animate-fade-up" [class.visible]="featuredVisible()">
          <a routerLink="/menu" mat-flat-button class="cta-primary" id="featured-view-all">
            View Full Menu
          </a>
        </div>
      </div>
    </section>

    <!-- TAGLINE BREAK -->
    <section class="tagline-section parchment-texture">
      <div class="page-container">
        <blockquote class="tagline-quote animate-fade-up" [class.visible]="taglineVisible()">
          <p class="display-sm devanagari">दुहराव के साथ एक दुहराव</p>
          <cite class="body-sm">Visit us again, relive the calm.</cite>
        </blockquote>
      </div>
    </section>
  `,
  styles: [`
    // Hero
    .hero {
      min-height: 100svh;
      background: var(--color-surface-container-low);
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      padding: var(--space-24) var(--space-8);
      padding-top: calc(80px + var(--space-20));
      position: relative;
      overflow: hidden;
      max-width: 100%;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        padding: var(--space-20) var(--space-6);
        padding-top: calc(80px + var(--space-12));
        min-height: auto;
        gap: var(--space-12);
      }
    }

    .hero-image-overlay {
      position: absolute;
      right: 0; top: 0;
      width: 50%;
      height: 100%;
      background: radial-gradient(circle at 75% 50%, rgba(251, 236, 217, 0.6), transparent 80%);
      pointer-events: none;

      @media (max-width: 900px) { display: none; }
    }

    .hero-content {
      padding-left: var(--space-12);
      z-index: 1;
      max-width: 640px;

      @media (max-width: 900px) { padding-left: 0; max-width: 100%; text-align: center; }
    }

    .hero-sub {
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-size: 0.8rem;
      font-weight: 700;
      margin-bottom: var(--space-4);
      display: block;
    }

    .hero-title {
      font-size: clamp(4.5rem, 12vw, 8.5rem);
      color: var(--color-primary);
      line-height: 0.9;
      margin-bottom: var(--space-6);
      letter-spacing: -0.02em;
    }

    .hero-tagline {
      color: var(--color-on-surface);
      margin-bottom: var(--space-2);
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    .hero-english {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-12);
      max-width: 400px;
      line-height: 1.4;

      @media (max-width: 900px) { margin-inline: auto; }
    }

    .hero-ctas {
      display: flex;
      gap: var(--space-6);
      align-items: center;
      flex-wrap: wrap;

      @media (max-width: 900px) { justify-content: center; }
    }

    .cta-primary {
      background: var(--color-primary) !important;
      color: var(--color-on-primary) !important;
      border-radius: var(--radius-full) !important;
      height: 56px;
      padding: 0 var(--space-10) !important;
      font-family: var(--font-label);
      font-weight: 600;
      letter-spacing: 0.05em;
      text-decoration: none;
      box-shadow: var(--shadow-elevation-2);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;

      &:hover {
        transform: translateY(-4px) scale(1.05);
        box-shadow: var(--shadow-elevation-4);
      }
    }

    .cta-secondary {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--color-primary) !important;
      font-family: var(--font-label);
      font-weight: 700;
      text-decoration: none;
      letter-spacing: 0.05em;
      transition: all 0.3s ease;

      &:hover {
        gap: var(--space-3);
        opacity: 0.8;
      }

      .material-symbols-outlined { font-size: 20px; }
    }

    .hero-3d {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      height: min(600px, 60vw);
      position: relative;

      app-three-viewer {
        width: 100%;
        height: 100%;
        border-radius: var(--radius-xl);
      }

      @media (max-width: 900px) {
        height: 380px;
        width: 100%;
      }
    }

    .viewer-label {
      color: var(--color-on-surface-variant);
      text-align: center;
      background: var(--color-surface-container-highest);
      padding: 4px 16px;
      border-radius: var(--radius-full);
      font-weight: 600;
      box-shadow: var(--shadow-elevation-1);
    }

    // Story
    .story-strip {
      background: var(--color-surface-container);
      padding: var(--space-24) var(--space-8);

      @media (max-width: 768px) { padding: var(--space-16) var(--space-6); }
    }

    .story-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-20);
      align-items: center;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--space-10);
      }
    }

    .story-eyebrow {
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-size: 0.8rem;
      font-weight: 700;
      margin-bottom: var(--space-4);
    }

    .story-headline {
      color: var(--color-on-surface);
      margin-bottom: var(--space-6);
      line-height: 1.2;
    }

    .story-body {
      color: var(--color-on-surface-variant);
      line-height: 1.8;
      max-width: 520px;
      margin-bottom: var(--space-10);
      font-size: 1.1rem;
    }

    .story-link {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--color-primary) !important;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 0 !important;
      transition: gap 0.3s ease;

      &:hover { gap: var(--space-3); }

      .material-symbols-outlined { font-size: 20px; }
    }

    .story-image-placeholder {
      border-radius: var(--radius-xl);
      overflow: hidden;
      aspect-ratio: 16/10;
      background: var(--color-surface-container-high);
      box-shadow: var(--shadow-elevation-2);
    }

    .story-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: scale 0.8s cubic-bezier(0.33, 1, 0.68, 1);
      
      .story-inner:hover & {
        scale: 1.05;
      }
    }

    // Categories
    .section-header {
      margin-bottom: var(--space-12);
      text-align: center;
    }

    .section-eyebrow {
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-size: 0.8rem;
      font-weight: 700;
      margin-bottom: var(--space-3);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-6);

      @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 600px)  { grid-template-columns: repeat(2, 1fr); }
    }

    .category-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: var(--space-4);
      padding: var(--space-10) var(--space-6);
      background: var(--color-surface-container-low);
      border-radius: var(--radius-lg);
      text-decoration: none;
      color: var(--color-on-surface);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: var(--shadow-elevation-1);

      &:hover {
        background: var(--color-surface-container-highest);
        transform: translateY(-8px);
        box-shadow: var(--shadow-elevation-3);

        .cat-icon { 
          color: var(--color-primary);
          transform: scale(1.15) rotate(5deg);
        }
      }
    }

    .cat-icon {
      font-size: 40px;
      color: var(--color-secondary);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .cat-label { 
      color: var(--color-on-surface); 
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .cat-desc { 
      color: var(--color-on-surface-variant); 
      font-size: 0.75rem; 
      line-height: 1.4;
      opacity: 0.8;
    }

    // Featured
    .featured-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-8);
      margin-bottom: var(--space-12);

      @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 540px)  { grid-template-columns: 1fr; }
    }

    .featured-cta { text-align: center; }

    // Tagline break
    .tagline-section {
      background: var(--color-surface-container-high);
      padding: var(--space-24) var(--space-8);
      text-align: center;

      @media (max-width: 768px) { padding: var(--space-16) var(--space-6); }
    }

    .tagline-quote {
      max-width: 800px;
      margin: 0 auto;

      p {
        color: var(--color-primary);
        margin-bottom: var(--space-6);
        font-size: clamp(2rem, 5vw, 3.5rem);
        line-height: 1.1;
      }
      cite { 
        color: var(--color-on-surface-variant); 
        font-style: italic; 
        font-weight: 500;
        letter-spacing: 0.02em;
      }
    }
  `]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  categories = MENU_CATEGORIES;
  featured: MenuItem[] = [];

  storyVisible = signal(false);
  catsVisible = signal(false);
  featuredVisible = signal(false);
  taglineVisible = signal(false);

  private observers: IntersectionObserver[] = [];

  constructor(private menuService: MenuService, private dialog: MatDialog) {
    this.featured = this.menuService.getFeatured();
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  private setupScrollAnimations(): void {
    const io = (selector: string, signal: any) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) signal.set(true); },
        { threshold: 0.15 }
      );
      obs.observe(el);
      this.observers.push(obs);
    };

    io('.story-inner', this.storyVisible);
    io('.categories-grid', this.catsVisible);
    io('.featured-grid', this.featuredVisible);
    io('.tagline-quote', this.taglineVisible);

    // Trigger `animate-fade-up` CSS class toggling on scroll
    const allAnimatable = document.querySelectorAll('.animate-fade-up:not(.visible)');
    const globalObs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      },
      { threshold: 0.12 }
    );
    allAnimatable.forEach(el => globalObs.observe(el));
    this.observers.push(globalObs);
  }

  openViewer(item: MenuItem): void {
    this.dialog.open(ProductViewerDialogComponent, {
      data: item,
      panelClass: 'product-viewer-panel',
      maxWidth: '90vw',
      width: '800px',
    });
  }

  ngOnDestroy(): void {
    this.observers.forEach(o => o.disconnect());
  }
}
