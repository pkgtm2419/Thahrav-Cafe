import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService, MenuItem, MENU_CATEGORIES, MenuCategory } from '../../services/menu.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="order-header parchment-texture">
      <div class="page-container">
        <p class="label-lg eyebrow">Order Your Pause</p>
        <h1 class="display-sm header-title">What shall it be today?</h1>
        <p class="body-lg header-sub">Browse, choose, and let us take care of the rest.</p>
      </div>
    </header>

    <div class="order-layout section-padding page-container">
      <!-- Browse Panel -->
      <div class="browse-panel">
        <!-- Dine In / Takeaway Toggle -->
        <div class="order-type-toggle">
          <button class="toggle-btn label-md" [class.active]="orderType() === 'dine-in'"
                  (click)="setOrderType('dine-in')" id="toggle-dine-in">
            <span class="material-symbols-outlined">table_restaurant</span>
            Dine In
          </button>
          <button class="toggle-btn label-md" [class.active]="orderType() === 'takeaway'"
                  (click)="setOrderType('takeaway')" id="toggle-takeaway">
            <span class="material-symbols-outlined">takeout_dining</span>
            Takeaway
          </button>
        </div>

        <!-- Category Tabs -->
        <div class="category-tabs">
          @for (cat of categories; track cat.id) {
            <button class="cat-tab label-sm" [class.active]="browseCategory() === cat.id"
                    (click)="browseCategory.set(cat.id)" [id]="'order-cat-' + cat.id">
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Items -->
        <div class="order-items-list">
          @for (item of browseItems(); track item.id) {
            <div class="order-item" [id]="'order-item-' + item.id">
              <img [src]="item.image" [alt]="item.name" class="order-item-img" loading="lazy"
                   (error)="onImgError($event)" />
              <div class="order-item-info">
                <span class="item-name title-md">{{ item.name }}</span>
                @if (item.tag === 'bestseller') {
                  <span class="bestseller-badge label-sm">★ Best Seller</span>
                }
                <p class="item-desc body-sm">{{ item.description }}</p>
              </div>
              <div class="order-item-right">
                <span class="item-price title-md">₹{{ item.price }}</span>
                <button class="add-btn" (click)="addItem(item)" [id]="'add-' + item.id"
                        [attr.aria-label]="'Add ' + item.name">
                  <span class="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Order Summary Panel -->
      <aside class="order-summary">
        <h2 class="headline-sm summary-title">Your Order</h2>
        <p class="body-sm order-type-label">
          <span class="material-symbols-outlined">{{ orderType() === 'dine-in' ? 'table_restaurant' : 'takeout_dining' }}</span>
          {{ orderType() === 'dine-in' ? 'Dine In' : 'Takeaway' }}
        </p>

        @if (orderItems().length === 0) {
          <div class="empty-order">
            <span class="material-symbols-outlined empty-icon">local_cafe</span>
            <p class="body-sm">Your order is empty.<br>Add something delicious!</p>
          </div>
        }

        @if (orderItems().length > 0) {
          <div class="summary-items">
            @for (entry of orderItems(); track entry.item.id) {
              <div class="summary-row">
                <span class="summary-name body-md">{{ entry.item.name }}</span>
                <div class="qty-controls">
                  <button class="qty-btn" (click)="removeItem(entry.item)" [attr.aria-label]="'Remove ' + entry.item.name">−</button>
                  <span class="label-md qty">{{ entry.qty }}</span>
                  <button class="qty-btn" (click)="addItem(entry.item)" [attr.aria-label]="'Add more ' + entry.item.name">+</button>
                </div>
                <span class="summary-price body-md">₹{{ entry.item.price * entry.qty }}</span>
              </div>
            }
          </div>

          <div class="summary-total">
            <span class="title-md">Total</span>
            <span class="title-md total-amount">₹{{ total() }}</span>
          </div>

          <button class="place-order-btn label-md" id="place-order-btn">
            <span class="material-symbols-outlined">check_circle</span>
            Place Order (Demo)
          </button>

          <button class="clear-btn label-sm" (click)="clearOrder()">Clear all</button>
        }
      </aside>
    </div>
  `,
  styles: [`
    .order-header {
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

    .order-layout {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: var(--space-10);
      align-items: start;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
      }
    }

    .order-type-toggle {
      display: flex;
      gap: var(--space-2);
      margin-bottom: var(--space-6);
      background: var(--color-surface-container);
      padding: var(--space-1);
      border-radius: var(--radius-sm);
      width: fit-content;
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-3) var(--space-5);
      border: none;
      border-radius: var(--radius-sm);
      background: transparent;
      color: var(--color-on-surface-variant);
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: var(--font-label);

      .material-symbols-outlined { font-size: 18px; }

      &.active {
        background: var(--color-primary);
        color: var(--color-on-primary);
      }
    }

    .category-tabs {
      display: flex;
      gap: var(--space-2);
      overflow-x: auto;
      padding-bottom: var(--space-1);
      margin-bottom: var(--space-6);
      scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
    }

    .cat-tab {
      padding: var(--space-2) var(--space-4);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-full);
      background: transparent;
      color: var(--color-on-surface-variant);
      cursor: pointer;
      white-space: nowrap;
      font-family: var(--font-label);
      transition: all 0.2s ease;

      &.active {
        background: var(--color-primary-fixed);
        color: var(--color-primary);
        border-color: var(--color-primary);
        font-weight: 600;
      }
    }

    .order-items-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .order-item {
      display: grid;
      grid-template-columns: 72px 1fr auto;
      gap: var(--space-4);
      align-items: center;
      padding: var(--space-4);
      background: var(--color-surface-container-low);
      border-radius: var(--radius-sm);
      transition: background 0.2s;

      &:hover { background: var(--color-surface-container); }
    }

    .order-item-img {
      width: 72px;
      height: 72px;
      object-fit: cover;
      border-radius: var(--radius-sm);
      background: var(--color-surface-container);
    }

    .order-item-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .item-name { color: var(--color-on-surface); }
      .item-desc { color: var(--color-on-surface-variant); }
    }

    .bestseller-badge {
      color: var(--color-secondary);
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .order-item-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--space-2);

      .item-price { color: var(--color-primary); font-weight: 600; }
    }

    .add-btn {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: var(--radius-sm);
      background: var(--color-primary);
      color: var(--color-on-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s;

      &:hover { opacity: 0.8; }
      .material-symbols-outlined { font-size: 20px; }
    }

    // Summary Panel
    .order-summary {
      position: sticky;
      top: calc(72px + var(--space-6));
      background: var(--color-surface-container-low);
      border-radius: var(--radius-sm);
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      gap: var(--space-4);

      @media (max-width: 1024px) {
        position: static;
        order: -1;
      }
    }

    .summary-title { color: var(--color-on-surface); }

    .order-type-label {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--color-secondary);
      .material-symbols-outlined { font-size: 16px; }
    }

    .empty-order {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-10) var(--space-4);
      color: var(--color-on-surface-variant);
      text-align: center;

      .empty-icon { font-size: 48px; color: var(--color-outline); }
    }

    .summary-items { display: flex; flex-direction: column; gap: var(--space-3); }

    .summary-row {
      display: flex;
      align-items: center;
      gap: var(--space-3);

      .summary-name { flex: 1; color: var(--color-on-surface); }
      .summary-price { color: var(--color-primary); font-weight: 600; min-width: 50px; text-align: right; }
    }

    .qty-controls {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      .qty { min-width: 20px; text-align: center; }
    }

    .qty-btn {
      width: 28px;
      height: 28px;
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-sm);
      background: transparent;
      color: var(--color-on-surface);
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;

      &:hover { background: var(--color-surface-container); }
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      padding-top: var(--space-4);
      border-top: 1px solid var(--color-outline-variant);
      color: var(--color-on-surface);

      .total-amount { color: var(--color-primary); }
    }

    .place-order-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      padding: var(--space-4);
      background: var(--color-primary);
      color: var(--color-on-primary);
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-family: var(--font-label);
      font-size: 0.875rem;
      font-weight: 500;
      transition: opacity 0.2s;
      width: 100%;

      &:hover { opacity: 0.85; }
      .material-symbols-outlined { font-size: 18px; }
    }

    .clear-btn {
      background: none;
      border: none;
      color: var(--color-outline);
      cursor: pointer;
      font-family: var(--font-label);
      font-size: 0.75rem;
      text-align: center;
      width: 100%;
      text-decoration: underline;
      transition: color 0.2s;

      &:hover { color: var(--color-on-surface-variant); }
    }
  `]
})
export class OrderComponent {
  private menuService = inject(MenuService);

  categories = MENU_CATEGORIES;
  orderType = signal<'dine-in' | 'takeaway'>('dine-in');
  browseCategory = signal<MenuCategory>('drinks');
  orderItems = signal<{ item: MenuItem; qty: number }[]>([]);

  browseItems = computed(() => this.menuService.getByCategory(this.browseCategory()));
  total = computed(() => this.orderItems().reduce((sum, e) => sum + e.item.price * e.qty, 0));

  setOrderType(type: 'dine-in' | 'takeaway'): void {
    this.orderType.set(type);
  }

  addItem(item: MenuItem): void {
    this.orderItems.update(items => {
      const existing = items.find(e => e.item.id === item.id);
      if (existing) {
        return items.map(e => e.item.id === item.id ? { ...e, qty: e.qty + 1 } : e);
      }
      return [...items, { item, qty: 1 }];
    });
  }

  removeItem(item: MenuItem): void {
    this.orderItems.update(items => {
      const updated = items.map(e =>
        e.item.id === item.id ? { ...e, qty: e.qty - 1 } : e
      ).filter(e => e.qty > 0);
      return updated;
    });
  }

  clearOrder(): void {
    this.orderItems.set([]);
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = '/assets/images/placeholder-food.webp';
  }
}
