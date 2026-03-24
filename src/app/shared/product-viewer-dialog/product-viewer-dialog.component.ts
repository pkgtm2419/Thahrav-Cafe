import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ThreeViewerComponent } from '../three-viewer/three-viewer.component';
import { MenuItem } from '../../services/menu.service';

@Component({
  selector: 'app-product-viewer-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ThreeViewerComponent],
  template: `
    <div class="dialog-container">
      <button class="close-btn" (click)="close()" aria-label="Close 3D viewer">
        <span class="material-symbols-outlined">close</span>
      </button>

      <div class="dialog-inner">
        <!-- 3D Viewer -->
        <div class="viewer-panel">
          <app-three-viewer
            [modelType]="modelType"
            [autoRotate]="true"
          />
        </div>

        <!-- Product Info -->
        <div class="info-panel">
          @if (data.tag) {
            <span class="tag label-sm">{{ data.tag === 'bestseller' ? '★ Best Seller' : data.tag }}</span>
          }
          <h2 class="headline-md product-name">{{ data.name }}</h2>
          <p class="display-sm price">₹{{ data.price }}</p>
          <p class="body-lg description">{{ data.description }}</p>

          <div class="viewer-hint body-sm">
            <span class="material-symbols-outlined">360</span>
            Drag to rotate · Scroll to zoom
          </div>

          <a routerLink="/order" mat-flat-button class="order-cta label-md" (click)="close()">
            <span class="material-symbols-outlined">add_shopping_cart</span>
            Add to Order
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .dialog-container {
      background: var(--color-surface-container-lowest);
      border-radius: var(--radius-sm);
      overflow: hidden;
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      z-index: 10;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      background: var(--color-surface-container);
      color: var(--color-on-surface-variant);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;

      &:hover { background: var(--color-surface-container-high); }
      .material-symbols-outlined { font-size: 20px; }
    }

    .dialog-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;

      @media (max-width: 600px) { grid-template-columns: 1fr; }
    }

    .viewer-panel {
      height: 400px;
      background: radial-gradient(circle at 50% 40%, #fbecd9 0%, #f5e6d3 100%);

      app-three-viewer { width: 100%; height: 100%; }

      @media (max-width: 600px) { height: 260px; }
    }

    .info-panel {
      padding: var(--space-10);
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      justify-content: center;

      @media (max-width: 600px) { padding: var(--space-6); }
    }

    .tag {
      display: inline-block;
      background: var(--color-primary);
      color: var(--color-on-primary);
      padding: 2px 10px;
      border-radius: var(--radius-sm);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.65rem;
      width: fit-content;
    }

    .product-name {
      color: var(--color-on-surface);
      font-family: var(--font-display);
    }

    .price {
      color: var(--color-primary);
      font-size: 2rem;
      font-weight: 700;
      line-height: 1;
    }

    .description {
      color: var(--color-on-surface-variant);
      line-height: 1.7;
    }

    .viewer-hint {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--color-outline);
      .material-symbols-outlined { font-size: 16px; }
    }

    .order-cta {
      display: flex !important;
      align-items: center;
      gap: var(--space-2);
      background: var(--color-primary) !important;
      color: var(--color-on-primary) !important;
      border-radius: var(--radius-sm) !important;
      height: 48px;
      padding: 0 var(--space-6) !important;
      font-family: var(--font-label);
      font-weight: 500;
      text-decoration: none;
      width: fit-content;
      margin-top: var(--space-2);

      .material-symbols-outlined { font-size: 18px; }
    }
  `]
})
export class ProductViewerDialogComponent {
  get modelType(): 'chai' | 'coffee' | 'food' | 'default' {
    if (this.data.category === 'drinks') {
      return this.data.id.includes('coffee') ? 'coffee' : 'chai';
    }
    return 'food';
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MenuItem,
    private dialogRef: MatDialogRef<ProductViewerDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
