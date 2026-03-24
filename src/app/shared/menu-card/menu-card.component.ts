import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MenuItem } from '../../services/menu.service';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [CommonModule, MatRippleModule],
  template: `
    <article class="menu-card" matRipple [matRippleColor]="'rgba(50, 25, 11, 0.05)'"
             (click)="cardClick.emit(item)" tabindex="0"
             (keydown.enter)="cardClick.emit(item)" role="button"
             [attr.aria-label]="item.name + ' - ₹' + item.price">
      <!-- Image -->
      <div class="card-image-wrapper">
        <img [src]="item.image" [alt]="item.name" class="card-image" loading="lazy"
             (error)="onImageError($event)" />
        @if (item.tag) {
          <span class="card-tag label-sm">{{ tagLabel(item.tag) }}</span>
        }
      </div>

      <!-- Content -->
      <div class="card-content">
        <div class="card-header">
          <h3 class="card-name headline-sm">{{ item.name }}</h3>
          <span class="card-price title-md">₹{{ item.price }}</span>
        </div>
        <p class="card-description body-sm">{{ item.description }}</p>

        <div class="card-footer">
          <span class="view-3d label-sm">
            <span class="material-symbols-outlined">view_in_ar</span>
            View 3D
          </span>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .menu-card {
      background: var(--color-surface-container-low);
      border-radius: var(--radius-sm);
      overflow: hidden;
      cursor: pointer;
      transition: background 0.25s ease, box-shadow 0.25s ease;
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;

      &:hover {
        background: var(--color-surface-container-highest);
        box-shadow: var(--shadow-card);

        .card-image { transform: scale(1.03); }
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }
    }

    .card-image-wrapper {
      position: relative;
      overflow: hidden;
      aspect-ratio: 4/3;
      background: var(--color-surface-container);
    }

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: block;
    }

    .card-tag {
      position: absolute;
      top: var(--space-3);
      left: var(--space-3);
      background: var(--color-primary);
      color: var(--color-on-primary);
      padding: 2px 10px;
      border-radius: var(--radius-sm);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.625rem;
    }

    .card-content {
      padding: var(--space-4) var(--space-5);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      flex: 1;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: var(--space-2);
    }

    .card-name {
      color: var(--color-on-surface);
      font-size: 1.1rem;
    }

    .card-price {
      color: var(--color-primary);
      white-space: nowrap;
      font-weight: 600;
    }

    .card-description {
      color: var(--color-on-surface-variant);
      line-height: 1.5;
      flex: 1;
    }

    .card-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: var(--space-2);
    }

    .view-3d {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--color-secondary);
      opacity: 0.8;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;

      .material-symbols-outlined { font-size: 14px; }
    }
  `]
})
export class MenuCardComponent {
  @Input({ required: true }) item!: MenuItem;
  @Output() cardClick = new EventEmitter<MenuItem>();

  tagLabel(tag: string): string {
    const map: Record<string, string> = {
      bestseller: '★ Best Seller',
      spicy: '🌶 Spicy',
      new: 'New',
    };
    return map[tag] ?? tag;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/placeholder-food.webp';
  }
}
