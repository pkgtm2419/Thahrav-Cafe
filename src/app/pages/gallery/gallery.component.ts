import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="gallery-header parchment-texture">
      <div class="page-container">
        <p class="label-lg eyebrow">Our Vibe</p>
        <h1 class="display-sm header-title">Feel the Atmosphere</h1>
        <p class="body-lg header-sub">Warm mornings. Good conversations. Tea in hand.</p>
      </div>
    </header>

    <main class="gallery-main section-padding">
      <div class="page-container">
        <div class="gallery-masonry animate-fade-up stagger-children" [class.visible]="true">
          @for (photo of photos; track photo.src) {
            <div class="gallery-item" [class]="'item-' + photo.size">
              <div class="gallery-img-wrap">
                <img [src]="photo.src" [alt]="photo.caption" loading="lazy" class="gallery-img" />
                <div class="gallery-overlay">
                  <p class="label-md overlay-text">{{ photo.caption }}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </main>

    <section class="vibe-cta parchment-texture section-padding" style="text-align: center;">
      <div class="page-container">
        <h2 class="headline-lg">Come, experience it yourself.</h2>
        <p class="body-lg cta-sub">The photos don't do justice to the aroma of fresh chai.</p>
        <a routerLink="/visit" class="visit-btn body-md">
          <span class="material-symbols-outlined">location_on</span>
          Find Our Cafe
        </a>
      </div>
    </section>
  `,
  styles: [`
    .gallery-header {
      background: var(--color-surface-container-low);
      padding: calc(72px + var(--space-12)) var(--space-6) var(--space-12);
      text-align: center;

      .eyebrow {
        color: var(--color-secondary);
        text-transform: uppercase;
        letter-spacing: 0.15em;
        font-size: 0.75rem;
        margin-bottom: var(--space-3);
      }

      .header-title { color: var(--color-primary); margin-bottom: var(--space-3); }
      .header-sub { color: var(--color-on-surface-variant); }
    }

    .gallery-masonry {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-auto-rows: 240px;
      gap: var(--space-4);

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 200px;
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .gallery-item {
      overflow: hidden;
      border-radius: var(--radius-sm);

      &.item-wide  { grid-column: span 8; }
      &.item-tall  { grid-column: span 4; grid-row: span 2; }
      &.item-small { grid-column: span 4; }
      &.item-med   { grid-column: span 6; }

      @media (max-width: 768px) {
        &.item-wide, &.item-tall, &.item-small, &.item-med {
          grid-column: span 1;
          grid-row: span 1;
        }
      }
    }

    .gallery-img-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;

      &:hover .gallery-overlay { opacity: 1; }
      &:hover .gallery-img { transform: scale(1.05); }
    }

    .gallery-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      display: block;
    }

    .gallery-overlay {
      position: absolute;
      inset: 0;
      background: rgba(50, 25, 11, 0.45);
      display: flex;
      align-items: flex-end;
      padding: var(--space-5);
      opacity: 0;
      transition: opacity 0.35s ease;
    }

    .overlay-text {
      color: var(--color-on-primary);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .vibe-cta {
      background: var(--color-surface-container-low);
      text-align: center;

      h2 { color: var(--color-on-surface); margin-bottom: var(--space-3); }
      .cta-sub { color: var(--color-on-surface-variant); margin-bottom: var(--space-8); }
    }

    .visit-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      font-family: var(--font-label);
      transition: opacity 0.2s;

      &:hover { opacity: 0.7; }
      .material-symbols-outlined { font-size: 18px; }
    }
  `]
})
export class GalleryComponent {
  photos = [
    { src: '/assets/images/hero-cafe.webp',      caption: 'Our warm interior',       size: 'wide' },
    { src: '/assets/images/kullhad-chai.webp',   caption: 'Kullhad Chai',            size: 'tall' },
    { src: '/assets/images/masala-chai.webp',    caption: 'Masala Chai magic',       size: 'small' },
    { src: '/assets/images/breakfast-spread.webp', caption: 'Morning breakfast',     size: 'small' },
    { src: '/assets/images/cold-coffee.webp',    caption: 'Cold Coffee vibes',       size: 'med' },
    { src: '/assets/images/cheese-maggi.webp',   caption: 'Cheesy Maggi',            size: 'med' },
    { src: '/assets/images/cheese-sandwich.webp', caption: 'Grilled Cheese',         size: 'small' },
    { src: '/assets/images/white-sauce-pasta.webp', caption: 'White Sauce Pasta',    size: 'wide' },
  ];
}
