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

export interface HeroSlide {
  id: number;
  titleHindi: string;
  tagline: string;
  english: string;
  image: string;
  modelType: 'chai' | 'coffee' | 'food';
  priceLabel: string;
}

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
      <!-- Background Slider -->
      <div class="hero-slider">
        @for (slide of slides; track slide.id; let i = $index) {
          <div class="hero-slide" 
               [class.active]="currentSlideIndex() === i"
               [style.backgroundImage]="'url(' + slide.image + ')'">
            <div class="hero-overlay"></div>
          </div>
        }
      </div>

      <div class="hero-content-wrapper page-container">
        <div class="hero-content animate-fade-up" [class.visible]="true">
          <p class="hero-sub label-lg">Welcome to</p>
          <div class="title-container">
             <h1 class="hero-title devanagari">{{ currentSlide().titleHindi }}</h1>
          </div>
          <p class="hero-tagline headline-sm">{{ currentSlide().tagline }}</p>
          <p class="hero-english body-lg">{{ currentSlide().english }}</p>
          
          <div class="hero-ctas">
            <a routerLink="/menu" mat-flat-button class="cta-primary" id="hero-explore-menu">
              Explore Menu
            </a>
            <a routerLink="/order" mat-button class="cta-secondary" id="hero-order-now">
              Order Now <span class="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>

          <!-- Slider Dots -->
          <div class="slider-dots">
            @for (slide of slides; track slide.id; let i = $index) {
              <button class="dot" [class.active]="currentSlideIndex() === i" (click)="setSlide(i)" [attr.aria-label]="'Go to slide ' + (i+1)"></button>
            }
          </div>
        </div>

        <div class="hero-3d">
          <app-three-viewer [modelType]="currentSlide().modelType" [autoRotate]="true" />
          <p class="viewer-label label-sm">{{ currentSlide().priceLabel }}</p>
        </div>
      </div>
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
      position: relative;
      overflow: hidden;
      max-width: 100%;
      display: flex;
      align-items: center;
    }

    .hero-slider {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .hero-slide {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
      
      &.active {
        opacity: 1;
      }
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, rgba(50, 25, 11, 0.45) 0%, rgba(50, 25, 11, 0.1) 100%);
      z-index: 1;
    }

    .hero-content-wrapper {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      padding: var(--space-24) var(--space-8);
      padding-top: calc(80px + var(--space-12));
      z-index: 2;
      width: 100%;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        padding: var(--space-20) var(--space-6);
        padding-top: calc(80px + var(--space-8));
        gap: var(--space-10);
      }
    }

    .hero-content {
      padding-left: var(--space-8);
      max-width: 640px;
      color: #ffffff; // High contrast for slider

      @media (max-width: 900px) { padding-left: 0; max-width: 100%; text-align: center; }
    }

    .hero-sub {
      color: var(--color-on-primary-container);
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-size: 0.8rem;
      font-weight: 700;
      margin-bottom: var(--space-4);
      display: block;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .hero-title {
      font-size: clamp(4rem, 11vw, 8rem);
      color: #ffffff;
      line-height: 0.9;
      margin-bottom: var(--space-6);
      letter-spacing: -0.01em;
      text-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }

    .hero-tagline {
      color: #ffffff;
      margin-bottom: var(--space-2);
      font-weight: 600;
      letter-spacing: 0.01em;
      font-size: 1.5rem;
      text-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    .hero-english {
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: var(--space-12);
      max-width: 440px;
      line-height: 1.4;
      font-size: 1.125rem;
      text-shadow: 0 1px 4px rgba(0,0,0,0.2);

      @media (max-width: 900px) { margin-inline: auto; }
    }

    .slider-dots {
      display: flex;
      gap: var(--space-3);
      margin-top: var(--space-12);
      
      @media (max-width: 900px) { justify-content: center; }
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1.5px solid #ffffff;
      background: transparent;
      padding: 0;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.active {
        background: #ffffff;
        width: 24px;
        border-radius: var(--radius-full);
      }
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
      color: #ffffff !important;
      border-radius: var(--radius-full) !important;
      height: 56px;
      padding: 0 var(--space-10) !important;
      font-family: var(--font-label);
      font-weight: 600;
      letter-spacing: 0.05em;
      text-decoration: none;
      box-shadow: var(--shadow-elevation-3);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;

      &:hover {
        transform: translateY(-4px) scale(1.05);
        box-shadow: var(--shadow-elevation-5);
      }
    }

    .cta-secondary {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: #ffffff !important;
      font-family: var(--font-label);
      font-weight: 700;
      text-decoration: none;
      letter-spacing: 0.05em;
      transition: all 0.3s ease;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);

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
      color: var(--color-primary);
      text-align: center;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(8px);
      padding: 6px 20px;
      border-radius: var(--radius-full);
      font-weight: 700;
      box-shadow: var(--shadow-elevation-2);
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

  slides: HeroSlide[] = [
    {
      id: 1,
      titleHindi: 'ठहराव',
      tagline: 'चाय और सुकून का ठिकाना',
      english: 'Where every cup holds a piece of tranquility.',
      image: '/assets/images/hero-cafe.webp',
      modelType: 'chai',
      priceLabel: 'Kullhad Chai — ₹30'
    },
    {
      id: 2,
      titleHindi: 'ताज़गी',
      tagline: 'दिन की नई शुरुआत',
      english: 'Start your morning with our handcrafted breakfast.',
      image: '/assets/images/breakfast-spread.webp',
      modelType: 'food',
      priceLabel: 'Breakfast Platter — ₹49'
    },
    {
      id: 3,
      titleHindi: 'नज़ाकत',
      tagline: 'स्वाद की कलाकारी',
      english: 'The perfect spice, brewed to perfection.',
      image: '/assets/images/masala-chai.webp',
      modelType: 'chai',
      priceLabel: 'Masala Chai — ₹25'
    }
  ];

  currentSlideIndex = signal(0);
  currentSlide = computed(() => this.slides[this.currentSlideIndex()]);

  storyVisible = signal(false);
  catsVisible = signal(false);
  featuredVisible = signal(false);
  taglineVisible = signal(false);

  private observers: IntersectionObserver[] = [];
  private slideInterval: any;

  constructor(private menuService: MenuService, private dialog: MatDialog) {
    this.featured = this.menuService.getFeatured();
  }

  ngAfterViewInit(): void {
    this.startSlider();
    this.setupScrollAnimations();
  }

  private startSlider(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 8000);
  }

  nextSlide(): void {
    this.currentSlideIndex.update(i => (i + 1) % this.slides.length);
  }

  setSlide(index: number): void {
    this.currentSlideIndex.set(index);
    clearInterval(this.slideInterval);
    this.startSlider();
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
    if (this.slideInterval) clearInterval(this.slideInterval);
    this.observers.forEach(o => o.disconnect());
  }
}

import { computed } from '@angular/core';
