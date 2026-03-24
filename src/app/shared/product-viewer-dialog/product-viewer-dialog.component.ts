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
      border-radius: var(--radius-xl);
      overflow: hidden;
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: var(--space-6);
      right: var(--space-6);
      z-index: 10;
      width: 44px;
      height: 44px;
      border: none;
      border-radius: var(--radius-full);
      background: rgba(255, 248, 243, 0.8);
      backdrop-filter: blur(8px);
      color: var(--color-on-surface-variant);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      box-shadow: var(--shadow-elevation-1);

      &:hover { 
        background: var(--color-surface-container-high);
        transform: rotate(90deg);
      }
      .material-symbols-outlined { font-size: 22px; }
    }

    .dialog-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;

      @media (max-width: 768px) { grid-template-columns: 1fr; }
    }

    .viewer-panel {
      height: 500px;
      background: radial-gradient(circle at 50% 40%, #fbecd9 0%, #f5e6d3 100%);
      position: relative;

      app-three-viewer { width: 100%; height: 100%; }

      @media (max-width: 768px) { height: 320px; }
    }

    .info-panel {
      padding: var(--space-12);
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
      justify-content: center;

      @media (max-width: 768px) { padding: var(--space-8); }
    }

    .tag {
      display: inline-block;
      background: var(--color-primary);
      color: var(--color-on-primary);
      padding: 4px 14px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.7rem;
      font-weight: 700;
      width: fit-content;
      box-shadow: var(--shadow-elevation-1);
    }

    .product-name {
      color: var(--color-on-surface);
      font-family: var(--font-display);
      font-size: 2.25rem;
      letter-spacing: -0.01em;
    }

    .price {
      color: var(--color-primary);
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1;
    }

    .description {
      color: var(--color-on-surface-variant);
      line-height: 1.8;
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .viewer-hint {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      color: var(--color-outline);
      background: var(--color-surface-container-low);
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-sm);
      width: fit-content;
      font-size: 0.75rem;
      font-weight: 500;
      
      .material-symbols-outlined { font-size: 18px; }
    }

    .order-cta {
      display: flex !important;
      align-items: center;
      gap: var(--space-3);
      background: var(--color-primary) !important;
      color: var(--color-on-primary) !important;
      border-radius: var(--radius-full) !important;
      height: 56px;
      padding: 0 var(--space-10) !important;
      font-family: var(--font-label);
      font-weight: 600;
      letter-spacing: 0.05em;
      text-decoration: none;
      width: fit-content;
      margin-top: var(--space-4);
      box-shadow: var(--shadow-elevation-2);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;

      &:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: var(--shadow-elevation-4);
      }

      .material-symbols-outlined { font-size: 22px; }
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
