import { Component, inject, signal, AfterViewInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MenuService, MenuItem, MenuCategory, MENU_CATEGORIES } from '../../services/menu.service';
import { MenuCardComponent } from '../../shared/menu-card/menu-card.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProductViewerDialogComponent } from '../../shared/product-viewer-dialog/product-viewer-dialog.component';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuCardComponent, MatDialogModule, MatChipsModule],
  template: `
    <!-- Page Header -->
    <header class="menu-header parchment-texture">
      <div class="page-container">
        <p class="label-lg eyebrow">Our Menu</p>
        <h1 class="display-sm header-title devanagari">खाने की फ़ेहरिस्त</h1>
        <p class="body-lg header-sub">Everything made fresh, every day.</p>
      </div>
    </header>

    <!-- Category Filter Chips -->
    <div class="filter-bar" role="navigation" aria-label="Filter by category">
      <div class="page-container filter-inner">
        <button class="filter-chip label-md" [class.active]="activeCategory() === 'all'"
                (click)="setCategory('all')" id="filter-all">
          All
        </button>
        @for (cat of categories; track cat.id) {
          <button class="filter-chip label-md" [class.active]="activeCategory() === cat.id"
                  (click)="setCategory(cat.id)" [id]="'filter-' + cat.id">
            <span class="material-symbols-outlined">{{ cat.icon }}</span>
            {{ cat.label }}
          </button>
        }
      </div>
    </div>

    <!-- Menu Grid -->
    <main class="menu-main section-padding">
      <div class="page-container">
        <!-- Category Title -->
        @if (activeCategory() !== 'all') {
          <div class="category-header">
            <h2 class="headline-md">{{ currentCategoryLabel() }}</h2>
            <p class="body-md cat-count">{{ filteredItems().length }} items</p>
          </div>
        }

        <div class="menu-grid animate-fade-up stagger-children" [class.visible]="true">
          @for (item of filteredItems(); track item.id) {
            <app-menu-card [item]="item" (cardClick)="openViewer($event)" />
          }
          @empty {
            <p class="body-lg no-items">No items found.</p>
          }
        </div>
      </div>
    </main>
  `,
  styles: [`
    .menu-header {
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

      .header-title {
        color: var(--color-primary);
        margin-bottom: var(--space-3);
      }

      .header-sub { color: var(--color-on-surface-variant); }
    }

    .filter-bar {
      position: sticky;
      top: 72px;
      z-index: 100;
      background: rgba(255, 248, 243, 0.9);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--color-outline-variant);
      padding: var(--space-3) 0;
    }

    .filter-inner {
      display: flex;
      gap: var(--space-2);
      overflow-x: auto;
      padding-bottom: 2px;
      scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
    }

    .filter-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: var(--space-2) var(--space-4);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-full);
      background: transparent;
      color: var(--color-on-surface-variant);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      font-family: var(--font-label);

      .material-symbols-outlined { font-size: 16px; }

      &:hover {
        background: var(--color-surface-container);
        color: var(--color-primary);
        border-color: var(--color-outline);
      }

      &.active {
        background: var(--color-primary);
        color: var(--color-on-primary);
        border-color: var(--color-primary);
      }
    }

    .menu-main { min-height: 60vh; }

    .category-header {
      display: flex;
      align-items: baseline;
      gap: var(--space-4);
      margin-bottom: var(--space-8);

      .cat-count { color: var(--color-on-surface-variant); }
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-5);

      @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 540px)  { grid-template-columns: 1fr; }
    }

    .no-items {
      grid-column: 1/-1;
      text-align: center;
      color: var(--color-on-surface-variant);
      padding: var(--space-16) 0;
    }
  `]
})
export class MenuComponent implements OnInit {
  private menuService = inject(MenuService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  categories = MENU_CATEGORIES;
  activeCategory = signal<string>('all');
  allItems = this.menuService.getAll();

  filteredItems = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') return this.allItems;
    return this.allItems.filter(i => i.category === cat as MenuCategory);
  });

  currentCategoryLabel = computed(() => {
    const cat = MENU_CATEGORIES.find(c => c.id === this.activeCategory());
    return cat?.label ?? 'All';
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['cat']) this.activeCategory.set(params['cat']);
    });
  }

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  openViewer(item: MenuItem): void {
    this.dialog.open(ProductViewerDialogComponent, {
      data: item,
      maxWidth: '90vw',
      width: '800px',
      panelClass: 'product-viewer-panel',
    });
  }
}

import { OnInit } from '@angular/core';
