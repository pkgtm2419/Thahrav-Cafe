import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Header -->
    <header class="about-header parchment-texture">
      <div class="page-container header-inner">
        <p class="label-lg eyebrow">About Us</p>
        <h1 class="display-sm header-title devanagari">हमारी कहानी</h1>
        <p class="body-lg header-sub">The story behind every sip</p>
      </div>
    </header>

    <!-- Brand Story -->
    <section class="brand-story section-padding">
      <div class="page-container story-grid">
        <div class="story-text animate-fade-up visible">
          <h2 class="headline-lg">Where Every Visit<br>Becomes a Memory</h2>
          <p class="body-lg para">
            Thahrav — meaning "to pause" — was born from a simple belief: that in our rush through life,
            we forget to stop. We forget the warmth of holding a kullhad between two palms. The comfort
            of a slow, steaming cup of masala chai. The quiet that comes after the first sip.
          </p>
          <p class="body-lg para">
            Our café is not just a place to eat — it's a place to breathe. To reconnect. To remember
            that some of the best moments in life are beautifully unhurried.
          </p>
          <p class="body-lg para">
            We serve simple food, made with honest ingredients and a lot of attention. From our handcrafted
            teas to our fresh morning breakfast — every item on our menu is an invitation to slow down.
          </p>
        </div>

        <div class="story-image animate-fade-up visible">
          <img src="/assets/images/hero-cafe.webp" alt="Inside Thahrav Cafe" loading="lazy" />
          <div class="image-caption label-sm">Our cozy corner — your second home</div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="values-section" style="background: var(--color-surface-container);">
      <div class="page-container section-padding">
        <h2 class="headline-lg values-title animate-fade-up visible">What We Stand For</h2>
        <div class="values-grid animate-fade-up visible stagger-children">
          @for (value of values; track value.icon) {
            <div class="value-card">
              <span class="material-symbols-outlined value-icon">{{ value.icon }}</span>
              <h3 class="title-lg value-name">{{ value.name }}</h3>
              <p class="body-md value-desc">{{ value.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Tagline -->
    <section class="about-tagline parchment-texture section-padding" style="text-align: center;">
      <div class="page-container">
        <p class="display-sm devanagari tagline-text animate-fade-up visible">ठहराव</p>
        <p class="headline-sm tagline-en animate-fade-up visible">चाय और सुकून का ठिकाना</p>
        <a routerLink="/visit" class="visit-cta body-md animate-fade-up visible">
          <span class="material-symbols-outlined">location_on</span>
          Find Us
        </a>
      </div>
    </section>
  `,
  styles: [`
    .about-header {
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

    .story-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-16);
      align-items: start;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
    }

    .story-text {
      h2 { color: var(--color-on-surface); margin-bottom: var(--space-6); }
    }

    .para {
      color: var(--color-on-surface-variant);
      line-height: 1.8;
      margin-bottom: var(--space-5);
    }

    .story-image {
      position: sticky;
      top: calc(72px + var(--space-6));

      img {
        width: 100%;
        border-radius: var(--radius-sm);
        aspect-ratio: 4/5;
        object-fit: cover;
        display: block;
      }

      .image-caption {
        margin-top: var(--space-3);
        color: var(--color-outline);
        text-align: center;
        font-style: italic;
      }

      @media (max-width: 768px) { position: static; }
    }

    .values-title {
      color: var(--color-on-surface);
      margin-bottom: var(--space-10);
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);

      @media (max-width: 768px) { grid-template-columns: 1fr; }
    }

    .value-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      padding: var(--space-8) var(--space-6);
      background: var(--color-surface-container-lowest);
      border-radius: var(--radius-sm);
    }

    .value-icon {
      font-size: 32px;
      color: var(--color-secondary);
    }

    .value-name { color: var(--color-on-surface); }
    .value-desc { color: var(--color-on-surface-variant); line-height: 1.6; }

    .tagline-text {
      color: var(--color-primary);
      font-size: clamp(2rem, 6vw, 3.5rem);
      margin-bottom: var(--space-3);
    }

    .tagline-en {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-8);
    }

    .visit-cta {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.2s;
      font-family: var(--font-label);

      &:hover { opacity: 0.7; }
      .material-symbols-outlined { font-size: 18px; }
    }
  `]
})
export class AboutComponent {
  values = [
    {
      icon: 'spa',
      name: 'Intentional Slowness',
      description: 'We design our space and our menu to encourage you to linger, pause, and be present.',
    },
    {
      icon: 'eco',
      name: 'Honest Ingredients',
      description: 'Simple, fresh, local. We believe food should be recognisable, not complicated.',
    },
    {
      icon: 'favorite',
      name: 'Warm Hospitality',
      description: 'Every person who walks in is greeted like a regular. That\'s just how we are.',
    },
  ];
}
