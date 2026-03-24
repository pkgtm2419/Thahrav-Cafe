import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="footer">
      <div class="footer-inner page-container">
        <div class="footer-brand">
          <span class="footer-logo devanagari">ठहराव</span>
          <p class="footer-tagline body-sm">चाय और सुकून का ठिकाना</p>
          <p class="footer-slogan body-sm italic">दुहराव के साथ एक दुहराव</p>
        </div>

        <div class="footer-links">
          <div class="link-group">
            <h3 class="label-lg group-title">Explore</h3>
            <nav>
              <a routerLink="/" class="footer-link body-sm">Home</a>
              <a routerLink="/menu" class="footer-link body-sm">Menu</a>
              <a routerLink="/menu/full" class="footer-link body-sm">Full Menu</a>
              <a routerLink="/vibe" class="footer-link body-sm">Our Vibe</a>
            </nav>
          </div>
          <div class="link-group">
            <h3 class="label-lg group-title">Visit</h3>
            <nav>
              <a routerLink="/visit" class="footer-link body-sm">Find Us</a>
              <a routerLink="/about" class="footer-link body-sm">Our Story</a>
              <a routerLink="/order" class="footer-link body-sm">Order</a>
            </nav>
          </div>
          <div class="link-group">
            <h3 class="label-lg group-title">Hours</h3>
            <p class="body-sm hours-text">Mon – Sat<br>7:00 AM – 9:00 PM</p>
            <p class="body-sm hours-text">Sunday<br>8:00 AM – 8:00 PM</p>
          </div>
        </div>
      </div>

      <div class="footer-bottom page-container">
        <p class="body-sm copyright">© 2025 Thahrav Cafe. All rights reserved.</p>
        <p class="body-sm made-with">Made with ☕ and care</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--color-inverse-surface);
      color: var(--color-inverse-on-surface);
      margin-top: var(--space-20);
    }

    .footer-inner {
      padding: var(--space-16) var(--space-6);
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: var(--space-12);

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--space-8);
        padding: var(--space-10) var(--space-4);
      }
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .footer-logo {
      font-size: 2.25rem;
      color: var(--color-inverse-primary);
      display: block;
    }

    .footer-tagline {
      color: rgba(254, 239, 219, 0.7);
      margin-top: var(--space-1);
    }

    .footer-slogan {
      color: rgba(254, 239, 219, 0.5);
      font-style: italic;
      margin-top: var(--space-4);
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-8);

      @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .link-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);

      nav {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }
    }

    .group-title {
      color: var(--color-inverse-primary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.7rem;
    }

    .footer-link {
      text-decoration: none;
      color: rgba(254, 239, 219, 0.65);
      transition: color 0.2s ease;

      &:hover { color: var(--color-inverse-on-surface); }
    }

    .hours-text {
      color: rgba(254, 239, 219, 0.65);
      line-height: 1.8;
    }

    .footer-bottom {
      padding: var(--space-4) var(--space-6);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(254, 239, 219, 0.12);

      @media (max-width: 480px) {
        flex-direction: column;
        gap: var(--space-2);
        text-align: center;
      }
    }

    .copyright, .made-with {
      color: rgba(254, 239, 219, 0.4);
    }
  `]
})
export class FooterComponent {}
