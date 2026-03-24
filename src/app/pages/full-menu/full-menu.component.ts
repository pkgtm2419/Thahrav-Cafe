import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService, MENU_CATEGORIES } from '../../services/menu.service';

@Component({
  selector: 'app-full-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Print-style Menu Header -->
    <header class="full-menu-header parchment-texture">
      <div class="header-ornament">— ✦ —</div>
      <h1 class="display-sm header-brand devanagari">ठहराव</h1>
      <p class="label-lg header-sub">चाय और सुकून का ठिकाना</p>
      <div class="header-ornament">— Cafe Menu —</div>
    </header>

    <!-- Menu Categories & Items -->
    <main class="full-menu-main page-container">
      @for (cat of categories; track cat.id) {
        <section class="menu-category" [id]="'section-' + cat.id">
          <div class="cat-header">
            <span class="material-symbols-outlined cat-icon">{{ cat.icon }}</span>
            <h2 class="headline-lg cat-title">{{ cat.label }}</h2>
            <p class="body-sm cat-desc">{{ cat.description }}</p>
          </div>

          <div class="items-list">
            @for (item of getByCategory(cat.id); track item.id) {
              <div class="menu-row">
                <div class="item-info">
                  <span class="item-name title-md">{{ item.name }}</span>
                  @if (item.tag) {
                    <span class="item-tag label-sm">{{ item.tag === 'bestseller' ? '★' : '' }}</span>
                  }
                </div>
                <div class="item-dots"></div>
                <span class="item-price title-md">₹{{ item.price }}</span>
              </div>
            }
          </div>
        </section>
      }

      <!-- Footer tagline -->
      <div class="menu-footer-tagline">
        <div class="ornament">— ✦ —</div>
        <p class="body-sm devanagari" style="font-size: 1rem;">दुहराव के साथ एक दुहराव</p>
      </div>
    </main>

    <div class="full-menu-actions page-container">
      <a routerLink="/menu" class="back-link body-md">
        <span class="material-symbols-outlined">arrow_back</span>
        Back to interactive menu
      </a>
      <a routerLink="/order" class="order-link body-md">
        Order Now <span class="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>
  `,
  styles: [`
    .full-menu-header {
      background: var(--color-surface-container-low);
      padding: calc(72px + var(--space-10)) var(--space-6) var(--space-10);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
    }

    .header-ornament {
      font-family: var(--font-display);
      color: var(--color-outline);
      letter-spacing: 0.2em;
      font-size: 0.85rem;
    }

    .header-brand { color: var(--color-primary); }
    .header-sub { color: var(--color-on-surface-variant); letter-spacing: 0.05em; }

    .full-menu-main {
      padding: var(--space-12) var(--space-6);
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-2) var(--space-16);
      align-items: start;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: var(--space-8) var(--space-4);
      }
    }

    .menu-category {
      padding: var(--space-8) 0;
    }

    .cat-header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-1);
      margin-bottom: var(--space-5);
      padding-bottom: var(--space-4);
      background: var(--color-surface-container-low);
      margin: 0 calc(-1 * var(--space-4));
      padding: var(--space-5) var(--space-4);
      margin-bottom: var(--space-5);
    }

    .cat-icon {
      font-size: 28px;
      color: var(--color-secondary);
      margin-bottom: var(--space-2);
    }

    .cat-title { color: var(--color-primary); }
    .cat-desc { color: var(--color-on-surface-variant); }

    .items-list { display: flex; flex-direction: column; gap: 0; }

    .menu-row {
      display: flex;
      align-items: baseline;
      gap: var(--space-2);
      padding: var(--space-3) 0;
      border-bottom: 1px solid var(--color-surface-container-high);

      &:last-child { border-bottom: none; }
    }

    .item-info {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      flex-shrink: 0;
    }

    .item-name { color: var(--color-on-surface); }

    .item-tag {
      color: var(--color-secondary);
      font-size: 0.75rem;
    }

    .item-dots {
      flex: 1;
      border-bottom: 2px dotted var(--color-outline-variant);
      margin: 0 var(--space-2);
      margin-bottom: 4px;
    }

    .item-price {
      color: var(--color-primary);
      font-weight: 600;
      flex-shrink: 0;
    }

    .menu-footer-tagline {
      grid-column: 1/-1;
      text-align: center;
      padding: var(--space-12) 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      align-items: center;
      color: var(--color-on-surface-variant);
    }

    .ornament { letter-spacing: 0.2em; color: var(--color-outline); }

    .full-menu-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-8) var(--space-6);
      border-top: 1px solid var(--color-surface-container-high);

      a {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        text-decoration: none;
        color: var(--color-primary);
        font-weight: 500;
        transition: opacity 0.2s;

        &:hover { opacity: 0.7; }
        .material-symbols-outlined { font-size: 18px; }
      }

      @media (max-width: 480px) {
        flex-direction: column;
        gap: var(--space-4);
        align-items: flex-start;
      }
    }
  `]
})
export class FullMenuComponent {
  categories = MENU_CATEGORIES;

  constructor(private menuService: MenuService) {}

  getByCategory(catId: string) {
    return this.menuService.getByCategory(catId as any);
  }
}
