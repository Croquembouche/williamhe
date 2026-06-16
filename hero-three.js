const canvas = document.querySelector(".hero-network");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (canvas) {
  initHeroNetwork(canvas);
}

async function initHeroNetwork(target) {
  try {
    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js");
    const renderer = new THREE.WebGLRenderer({
      canvas: target,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 4;

    const nodes = [
      [-0.92, 0.62, 0], [-0.7, 0.32, 0], [-0.42, 0.46, 0],
      [-0.22, 0.14, 0], [0.08, 0.26, 0], [0.36, 0.02, 0],
      [0.68, 0.2, 0], [0.88, -0.08, 0], [-0.82, -0.28, 0],
      [-0.5, -0.12, 0], [-0.16, -0.38, 0], [0.22, -0.24, 0],
      [0.54, -0.5, 0], [0.92, -0.38, 0],
    ];
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
      [8, 9], [9, 10], [10, 11], [11, 12], [12, 13],
      [1, 9], [3, 10], [5, 11], [7, 13], [2, 9], [4, 11],
    ];

    const linePositions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], index) => {
      linePositions.set(nodes[a], index * 6);
      linePositions.set(nodes[b], index * 6 + 3);
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: 0x276c8f,
        transparent: true,
        opacity: 0.22,
      }),
    );

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(nodes.flat()), 3),
    );
    const points = new THREE.Points(
      pointGeometry,
      new THREE.PointsMaterial({
        color: 0x2f7d5b,
        size: 0.018,
        transparent: true,
        opacity: 0.64,
      }),
    );

    scene.add(lines, points);

    function resize() {
      const { width, height } = target.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(Math.max(1, width), Math.max(1, height), false);
      camera.left = -width / height;
      camera.right = width / height;
      camera.updateProjectionMatrix();
    }

    function render(time = 0) {
      const drift = Math.sin(time * 0.00045) * 0.018;
      lines.rotation.z = drift;
      points.rotation.z = drift;
      points.rotation.y = Math.sin(time * 0.00028) * 0.08;
      renderer.render(scene, camera);
      target.setAttribute("data-renderer", "three");
      if (!reducedMotion.matches) {
        requestAnimationFrame(render);
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    render();
  } catch {
    target.setAttribute("data-renderer", "css-fallback");
  }
}
