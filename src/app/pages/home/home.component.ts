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
      grid-template-columns: 1fr 1fr;
      align-items: center;
      padding: var(--space-16) var(--space-6);
      padding-top: calc(72px + var(--space-16));
      position: relative;
      overflow: hidden;
      max-width: 100%;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        padding-top: calc(72px + var(--space-10));
        min-height: auto;
        gap: var(--space-8);
      }
    }

    .hero-image-overlay {
      position: absolute;
      right: 0; top: 0;
      width: 50%;
      height: 100%;
      background: radial-gradient(circle at 70% 50%, rgba(251, 236, 217, 0.4), transparent 70%);
      pointer-events: none;

      @media (max-width: 900px) { display: none; }
    }

    .hero-content {
      padding-left: var(--space-8);
      z-index: 1;
      max-width: 580px;

      @media (max-width: 900px) { padding-left: 0; max-width: 100%; text-align: center; }
    }

    .hero-sub {
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-size: 0.75rem;
      margin-bottom: var(--space-3);
    }

    .hero-title {
      font-size: clamp(4rem, 10vw, 7rem);
      color: var(--color-primary);
      line-height: 1.0;
      margin-bottom: var(--space-4);
    }

    .hero-tagline {
      color: var(--color-on-surface);
      margin-bottom: var(--space-2);
    }

    .hero-english {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-10);
    }

    .hero-ctas {
      display: flex;
      gap: var(--space-4);
      align-items: center;
      flex-wrap: wrap;

      @media (max-width: 900px) { justify-content: center; }
    }

    .cta-primary {
      background: var(--color-primary) !important;
      color: var(--color-on-primary) !important;
      border-radius: var(--radius-sm) !important;
      height: 48px;
      padding: 0 var(--space-8) !important;
      font-family: var(--font-label);
      font-weight: 500;
      letter-spacing: 0.03em;
      text-decoration: none;
    }

    .cta-secondary {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--color-primary) !important;
      font-family: var(--font-label);
      font-weight: 500;
      text-decoration: none;

      .material-symbols-outlined { font-size: 18px; }
    }

    .hero-3d {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
      height: min(500px, 50vw);

      app-three-viewer {
        width: 100%;
        height: 100%;
        border-radius: var(--radius-md);
      }

      @media (max-width: 900px) {
        height: 320px;
        width: 100%;
      }
    }

    .viewer-label {
      color: var(--color-on-surface-variant);
      text-align: center;
    }

    // Story
    .story-strip {
      background: var(--color-surface-container);
      padding: var(--space-20) var(--space-6);

      @media (max-width: 768px) { padding: var(--space-12) var(--space-4); }
    }

    .story-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-16);
      align-items: center;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
    }

    .story-eyebrow {
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-size: 0.75rem;
      margin-bottom: var(--space-3);
    }

    .story-headline {
      color: var(--color-on-surface);
      margin-bottom: var(--space-5);
    }

    .story-body {
      color: var(--color-on-surface-variant);
      line-height: 1.8;
      max-width: 480px;
      margin-bottom: var(--space-8);
    }

    .story-link {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--color-primary) !important;
      font-weight: 500;
      padding: 0 !important;

      .material-symbols-outlined { font-size: 18px; }
    }

    .story-image-placeholder {
      border-radius: var(--radius-md);
      overflow: hidden;
      aspect-ratio: 4/3;
      background: var(--color-surface-container-high);
    }

    .story-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    // Categories
    .section-header {
      margin-bottom: var(--space-10);
    }

    .section-eyebrow {
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-size: 0.75rem;
      margin-bottom: var(--space-2);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-4);

      @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 600px)  { grid-template-columns: repeat(2, 1fr); }
    }

    .category-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: var(--space-3);
      padding: var(--space-8) var(--space-4);
      background: var(--color-surface-container-low);
      border-radius: var(--radius-sm);
      text-decoration: none;
      color: var(--color-on-surface);
      transition: background 0.22s ease, transform 0.22s ease;

      &:hover {
        background: var(--color-surface-container-high);
        transform: translateY(-2px);

        .cat-icon { color: var(--color-primary); }
      }
    }

    .cat-icon {
      font-size: 32px;
      color: var(--color-secondary);
      transition: color 0.22s ease;
    }

    .cat-label { color: var(--color-on-surface); }
    .cat-desc { color: var(--color-on-surface-variant); font-size: 0.75rem; }

    // Featured
    .featured-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-5);
      margin-bottom: var(--space-10);

      @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 540px)  { grid-template-columns: 1fr; }
    }

    .featured-cta { text-align: center; }

    // Tagline break
    .tagline-section {
      background: var(--color-surface-container-high);
      padding: var(--space-20) var(--space-6);
      text-align: center;

      @media (max-width: 768px) { padding: var(--space-12) var(--space-4); }
    }

    .tagline-quote {
      p {
        color: var(--color-primary);
        margin-bottom: var(--space-4);
        font-size: clamp(1.5rem, 4vw, 2.25rem);
      }
      cite { color: var(--color-on-surface-variant); font-style: italic; }
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
