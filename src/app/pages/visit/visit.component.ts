import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="visit-header parchment-texture">
      <div class="page-container">
        <p class="label-lg eyebrow">Find Us</p>
        <h1 class="display-sm header-title">Visit Thahrav</h1>
        <p class="body-lg header-sub">We're easy to find, hard to leave.</p>
      </div>
    </header>

    <main class="visit-main section-padding page-container">
      <div class="visit-grid">
        <!-- Info Cards -->
        <div class="info-col animate-fade-up visible">
          <!-- Location -->
          <div class="info-card">
            <div class="info-icon-wrap">
              <span class="material-symbols-outlined info-icon">location_on</span>
            </div>
            <div>
              <h2 class="title-lg info-title">Our Address</h2>
              <p class="body-md info-text">123 Chai Street, Near Old Market<br>Your City, PIN 000000</p>
            </div>
          </div>

          <!-- Hours -->
          <div class="info-card">
            <div class="info-icon-wrap">
              <span class="material-symbols-outlined info-icon">schedule</span>
            </div>
            <div>
              <h2 class="title-lg info-title">Opening Hours</h2>
              <table class="hours-table body-md">
                @for (row of hours; track row.day) {
                  <tr [class.today]="row.isToday">
                    <td class="hours-day">{{ row.day }}</td>
                    <td class="hours-time">{{ row.time }}</td>
                  </tr>
                }
              </table>
            </div>
          </div>

          <!-- Contact -->
          <div class="info-card">
            <div class="info-icon-wrap">
              <span class="material-symbols-outlined info-icon">call</span>
            </div>
            <div>
              <h2 class="title-lg info-title">Get in Touch</h2>
              <p class="body-md info-text">Call us: <a href="tel:+910000000000" class="contact-link">+91 00000 00000</a></p>
              <p class="body-md info-text">Email: <a href="mailto:hello@thahrav.cafe" class="contact-link">hello&#64;thahrav.cafe</a></p>
            </div>
          </div>

          <a routerLink="/order" class="order-visit-btn body-md">
            <span class="material-symbols-outlined">shopping_bag</span>
            Order Before You Arrive
          </a>
        </div>

        <!-- Map Placeholder -->
        <div class="map-col animate-fade-up visible">
          <div class="map-placeholder">
            <span class="material-symbols-outlined map-icon">map</span>
            <p class="title-md">Interactive map coming soon</p>
            <p class="body-sm map-sub">In the meantime, search "Thahrav Cafe" on Google Maps</p>
          </div>
          <div class="map-tagline">
            <p class="body-sm tagline-text">दुहराव के साथ एक दुहराव</p>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .visit-header {
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

    .visit-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-12);
      align-items: start;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
    }

    .info-col {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }

    .info-card {
      display: flex;
      gap: var(--space-4);
      align-items: flex-start;
      padding: var(--space-6);
      background: var(--color-surface-container-low);
      border-radius: var(--radius-sm);
    }

    .info-icon-wrap {
      width: 44px;
      height: 44px;
      background: var(--color-primary-fixed);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .info-icon { font-size: 22px; color: var(--color-primary); }
    .info-title { color: var(--color-on-surface); margin-bottom: var(--space-2); }
    .info-text { color: var(--color-on-surface-variant); line-height: 1.8; }

    .contact-link {
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      &:hover { text-decoration: underline; }
    }

    .hours-table {
      width: 100%;
      border-collapse: collapse;

      tr {
        border-bottom: 1px solid var(--color-surface-container-high);
        &:last-child { border-bottom: none; }
        &.today {
          .hours-day { color: var(--color-primary); font-weight: 600; }
        }
      }

      td {
        padding: var(--space-2) 0;
        color: var(--color-on-surface-variant);
      }

      .hours-day { padding-right: var(--space-6); }
      .hours-time { color: var(--color-on-surface); font-weight: 500; }
    }

    .order-visit-btn {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      background: var(--color-primary);
      color: var(--color-on-primary);
      padding: var(--space-4) var(--space-6);
      border-radius: var(--radius-sm);
      text-decoration: none;
      font-family: var(--font-label);
      font-weight: 500;
      transition: opacity 0.2s;
      justify-content: center;

      &:hover { opacity: 0.85; }
      .material-symbols-outlined { font-size: 20px; }
    }

    .map-col {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .map-placeholder {
      aspect-ratio: 4/3;
      background: var(--color-surface-container);
      border-radius: var(--radius-sm);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
      color: var(--color-on-surface-variant);
      border: 1px dashed var(--color-outline-variant);

      .map-icon { font-size: 56px; color: var(--color-outline); }
      p { text-align: center; max-width: 240px; }
      .map-sub { font-size: 0.8rem; }
    }

    .map-tagline {
      text-align: center;
      padding: var(--space-4);
      background: var(--color-surface-container-low);
      border-radius: var(--radius-sm);

      .tagline-text {
        color: var(--color-outline);
        font-style: italic;
        font-family: var(--font-display);
      }
    }
  `]
})
export class VisitComponent {
  hours = [
    { day: 'Monday',    time: '7:00 AM – 9:00 PM', isToday: false },
    { day: 'Tuesday',   time: '7:00 AM – 9:00 PM', isToday: false },
    { day: 'Wednesday', time: '7:00 AM – 9:00 PM', isToday: false },
    { day: 'Thursday',  time: '7:00 AM – 9:00 PM', isToday: false },
    { day: 'Friday',    time: '7:00 AM – 9:00 PM', isToday: false },
    { day: 'Saturday',  time: '7:00 AM – 9:00 PM', isToday: false },
    { day: 'Sunday',    time: '8:00 AM – 8:00 PM', isToday: false },
  ];

  constructor() {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const today = days[new Date().getDay()];
    this.hours.forEach(h => h.isToday = h.day === today);
  }
}
