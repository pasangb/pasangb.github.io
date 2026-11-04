import * as THREE from './vendor/three/three.module.js';
import { OBJLoader } from './vendor/three/OBJLoader.js';
import { MTLLoader } from './vendor/three/MTLLoader.js';
import { OrbitControls } from './vendor/three/OrbitControls.js';

const sourcePromises = new Map();
function loadSources(directory) {
  if (!sourcePromises.has(directory)) {
    const promise = Promise.all(['model.obj', 'model.mtl'].map(async name => {
      const response = await fetch(new URL('../assets/' + directory + '/' + name, import.meta.url));
      if (!response.ok) throw new Error('Could not load the CAD files.');
      return response.text();
    })).catch(error => { sourcePromises.delete(directory); throw error; });
    sourcePromises.set(directory, promise);
  }
  return sourcePromises.get(directory);
}

export async function mountCADViewer(panel) {
  const viewport = panel.querySelector('.cad-viewport');
  const status = panel.querySelector('.cad-status');
  const toolbar = panel.querySelector('.cad-controls');
  const [objText, mtlText] = await loadSources(panel.dataset.cadDirectory);
  if (!panel.isConnected) return () => {};

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Interactive ' + panel.dataset.cadName + ' CAD model. Drag to rotate, scroll or pinch to zoom. Arrow keys pan. Use the buttons to zoom or reset.');
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x777b92, 2.4));
  const keyLight = new THREE.DirectionalLight(0xffffff, 3);
  keyLight.position.set(4, 6, 5);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xffffff, 1.8);
  fillLight.position.set(-4, 2, -3);
  scene.add(fillLight);

  const materials = new MTLLoader().parse(mtlText, '');
  materials.preload();
  // Fusion's Pine material has no texture in this export; use a wood-like base color.
  if (materials.materials.Pine) materials.materials.Pine.color.set('#cfa873');
  const model = new OBJLoader().setMaterials(materials).parse(objText);
  model.rotation.x = -Math.PI / 2; // Fusion uses Z as the vertical axis.
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const maxSize = Math.max(size.x, size.y, size.z);
  if (!Number.isFinite(maxSize) || maxSize <= 0) throw new Error('The model contains no visible geometry.');
  model.position.sub(box.getCenter(new THREE.Vector3()));
  const group = new THREE.Group();
  group.add(model);
  group.scale.setScalar(2.5 / maxSize);
  scene.add(group);

  const normalizedBox = new THREE.Box3().setFromObject(group);
  const grid = new THREE.GridHelper(6, 24, 0x9a91a3, 0xc1bdcc);
  grid.position.y = normalizedBox.min.y - 0.025;
  grid.material.transparent = true;
  grid.material.opacity = 0.22;
  scene.add(grid);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 100);
  camera.position.set(3.6, 2.5, 3.6);
  const controls = new OrbitControls(camera, canvas);
  controls.minDistance = 1.3;
  controls.maxDistance = 14;
  controls.enableDamping = false;
  controls.target.set(0, 0, 0);
  controls.update();
  controls.saveState();
  controls.listenToKeyEvents(canvas);

  let disposed = false;
  function render() {
    if (!disposed && panel.isConnected) renderer.render(scene, camera);
  }
  function resize() {
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  }
  function setBackground() {
    scene.background = new THREE.Color(document.documentElement.dataset.theme === 'dark' ? '#20283a' : '#edf0f6');
    render();
  }
  function zoom(factor) {
    const offset = camera.position.clone().sub(controls.target);
    offset.multiplyScalar(factor).clampLength(controls.minDistance, controls.maxDistance);
    camera.position.copy(controls.target).add(offset);
    controls.update();
    render();
  }
  const onControls = event => {
    const action = event.target.closest('[data-cad-action]')?.dataset.cadAction;
    if (action === 'reset') controls.reset();
    if (action === 'in') zoom(0.8);
    if (action === 'out') zoom(1.25);
    render();
  };
  toolbar.addEventListener('click', onControls);
  controls.addEventListener('change', render);
  const observer = new ResizeObserver(resize);
  observer.observe(viewport);
  const themeObserver = new MutationObserver(setBackground);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  viewport.replaceChildren(canvas);
  toolbar.hidden = false;
  viewport.setAttribute('aria-busy', 'false');
  status.textContent = 'Drag to rotate · Scroll or pinch to zoom · Right-drag or arrow keys to pan';
  panel.dataset.loaded = 'true';
  setBackground();
  resize();
  canvas.focus({ preventScroll: true });

  return () => {
    disposed = true;
    observer.disconnect();
    themeObserver.disconnect();
    controls.dispose();
    toolbar.removeEventListener('click', onControls);
    const geometries = new Set();
    const materialSet = new Set(Object.values(materials.materials));
    scene.traverse(object => {
      if (object.geometry) geometries.add(object.geometry);
      if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materialSet.add(material));
    });
    geometries.forEach(geometry => geometry.dispose());
    materialSet.forEach(material => material.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
  };
}
