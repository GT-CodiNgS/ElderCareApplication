import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
})
export class AnimationComponent implements OnInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true })
  rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;

  constructor(private ngZone: NgZone) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initScene();
      this.addMouseHoverEffect();
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initScene(): void {
    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setSize(width, height);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
  }

  private addMouseHoverEffect(): void {
    const hoverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const originalMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const onMouseMove = (event: MouseEvent) => {
      const rect = this.rendererContainer.nativeElement.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersects = this.raycaster.intersectObjects([this.cube]);

      if (intersects.length > 0) {
        this.cube.material = hoverMaterial; // Change to hover material
      } else {
        this.cube.material = originalMaterial; // Change to original material
      }
    };

    this.rendererContainer.nativeElement.addEventListener(
      'mousemove',
      onMouseMove,
      false
    );
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }
}
