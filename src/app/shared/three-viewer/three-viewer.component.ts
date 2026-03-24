import {
  Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, signal, PLATFORM_ID, Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThreeModelType = 'chai' | 'coffee' | 'food' | 'default';

@Component({
  selector: 'app-three-viewer',
  standalone: true,
  template: `
    <div class="viewer-container" [class.loaded]="loaded()">
      <canvas #canvasRef class="three-canvas" aria-label="3D product viewer"></canvas>
      @if (!loaded()) {
        <div class="viewer-placeholder">
          <span class="material-symbols-outlined spin">rotate_3d</span>
          <p class="label-sm">Loading 3D View...</p>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }

    .viewer-container {
      width: 100%;
      height: 100%;
      position: relative;
      background: radial-gradient(circle at 50% 40%, #fbecd9 0%, #f5e6d3 100%);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }

    .three-canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }

    .viewer-placeholder {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-3);
      color: var(--color-on-surface-variant);

      .material-symbols-outlined {
        font-size: 48px;
        color: var(--color-secondary);
        opacity: 0.6;
      }

      p { opacity: 0.6; }
    }

    .spin {
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class ThreeViewerComponent implements AfterViewInit, OnDestroy {
  @Input() modelType: ThreeModelType = 'default';
  @Input() autoRotate = true;
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  loaded = signal(false);

  private renderer: any;
  private scene: any;
  private camera: any;
  private animationId: number | null = null;
  private mesh: any;
  private particles: any;
  private controls: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.isBrowser) return;
    await this.initThree();
  }

  private async initThree(): Promise<void> {
    const THREE = await import('three');

    const canvas = this.canvasRef.nativeElement;
    const width = canvas.parentElement?.clientWidth || 400;
    const height = canvas.parentElement?.clientHeight || 400;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 1.5, 4);
    this.camera.lookAt(0, 0, 0);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff8f3, 0.8);
    this.scene.add(ambientLight);

    const warmLight = new THREE.DirectionalLight(0xfdc39a, 1.5);
    warmLight.position.set(3, 5, 3);
    warmLight.castShadow = true;
    this.scene.add(warmLight);

    const fillLight = new THREE.DirectionalLight(0xeabda6, 0.4);
    fillLight.position.set(-3, 2, -2);
    this.scene.add(fillLight);

    // Build model based on type
    if (this.modelType === 'chai' || this.modelType === 'default') {
      this.buildKullhadScene(THREE);
    } else if (this.modelType === 'coffee') {
      this.buildCoffeeScene(THREE);
    } else {
      this.buildGenericFoodScene(THREE);
    }

    // Steam particles
    this.buildSteamParticles(THREE);

    // Platform surface
    const platformGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.05, 32);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x4b2e1e,
      roughness: 0.9,
      metalness: 0.05,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -1.1;
    platform.receiveShadow = true;
    this.scene.add(platform);

    // Handle resize
    const resizeObserver = new ResizeObserver(() => this.onResize(THREE));
    resizeObserver.observe(canvas.parentElement!);

    this.loaded.set(true);
    this.animate();
  }

  private buildKullhadScene(THREE: any): void {
    // Kullhad (clay cup) — inverted truncated cone
    const chaliceGeo = new THREE.CylinderGeometry(0.55, 0.38, 0.9, 32);
    const clayMat = new THREE.MeshStandardMaterial({
      color: 0x8b4513,
      roughness: 0.85,
      metalness: 0.0,
    });
    this.mesh = new THREE.Mesh(chaliceGeo, clayMat);
    this.mesh.position.set(0, -0.05, 0);
    this.mesh.castShadow = true;
    this.scene.add(this.mesh);

    // Chai liquid inside
    const liquidGeo = new THREE.CylinderGeometry(0.48, 0.38, 0.1, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0xb5651d,
      roughness: 0.1,
      metalness: 0.2,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = 0.35;
    this.mesh.add(liquid);

    // Handle
    const handleGeo = new THREE.TorusGeometry(0.25, 0.04, 12, 24, Math.PI);
    const handle = new THREE.Mesh(handleGeo, clayMat);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(0.52, 0.05, 0);
    this.mesh.add(handle);
  }

  private buildCoffeeScene(THREE: any): void {
    // Coffee mug — simpler cylinder with handle
    const mugGeo = new THREE.CylinderGeometry(0.5, 0.45, 0.85, 32);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0xfff8f3, roughness: 0.7, metalness: 0.0 });
    this.mesh = new THREE.Mesh(mugGeo, mugMat);
    this.mesh.position.set(0, -0.05, 0);
    this.mesh.castShadow = true;
    this.scene.add(this.mesh);

    // Coffee liquid
    const liquidGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.08, 32);
    const liquidMat = new THREE.MeshStandardMaterial({ color: 0x32190b, roughness: 0.05, metalness: 0.1 });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = 0.34;
    this.mesh.add(liquid);

    // Handle
    const handleGeo = new THREE.TorusGeometry(0.28, 0.045, 12, 24, Math.PI);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xfff8f3, roughness: 0.7 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(0.56, 0.0, 0);
    this.mesh.add(handle);
  }

  private buildGenericFoodScene(THREE: any): void {
    // Generic bowl
    const bowlGeo = new THREE.SphereGeometry(0.65, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const bowlMat = new THREE.MeshStandardMaterial({ color: 0xfff8f3, roughness: 0.6, metalness: 0.1 });
    this.mesh = new THREE.Mesh(bowlGeo, bowlMat);
    this.mesh.rotation.x = Math.PI;
    this.mesh.position.y = -0.2;
    this.scene.add(this.mesh);
  }

  private buildSteamParticles(THREE: any): void {
    const count = 80;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 1] = 0.5 + Math.random() * 1.8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xfbecd9,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    const t = performance.now() * 0.001;

    // Auto-rotate mesh
    if (this.mesh && this.autoRotate) {
      this.mesh.rotation.y = t * 0.4;
    }

    // Float animation
    if (this.mesh) {
      this.mesh.position.y = -0.05 + Math.sin(t * 1.2) * 0.06;
    }

    // Steam
    if (this.particles) {
      const positions = this.particles.geometry.attributes['position'];
      for (let i = 0; i < positions.count; i++) {
        positions.setY(i, positions.getY(i) + 0.003);
        if (positions.getY(i) > 2.4) {
          positions.setY(i, 0.45);
        }
        positions.setX(i, positions.getX(i) + Math.sin(t + i) * 0.0005);
      }
      positions.needsUpdate = true;
      this.particles.material.opacity = 0.35 + Math.sin(t) * 0.15;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onResize(THREE: any): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas?.parentElement) return;
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  ngOnDestroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer?.dispose();
    this.scene?.clear();
  }
}
