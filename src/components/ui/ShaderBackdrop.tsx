import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { usePrefersReducedMotion } from '../../lib/hooks';

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

/**
 * Nappe de couleur animée : bruit fractal doublement déformé (domain warping),
 * teinté aux couleurs de la marque. C'est la version WebGL des « aurores » CSS :
 * mêmes teintes, mais un mouvement organique qu'un flou CSS ne sait pas produire.
 */
const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uIntensity;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.02;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    p *= 0.72; // structures larges : on veut des voiles, pas une texture

    float t = uTime * 0.04;

    // Double déformation du domaine : donne les volutes façon encre dans l'eau.
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(4.2, 1.7) - t * 0.8));
    vec2 r = vec2(
      fbm(p + 2.1 * q + vec2(1.7, 9.2) + t * 0.5),
      fbm(p + 2.1 * q + vec2(8.3, 2.8) + t * 0.42)
    );
    float f = fbm(p + 1.9 * r);

    vec3 ink    = vec3(0.016, 0.027, 0.059);
    vec3 orange = vec3(0.976, 0.451, 0.086);
    vec3 jade   = vec3(0.137, 0.702, 0.478);

    // Synthèse additive sur fond quasi noir : pas de demi-teintes boueuses,
    // seulement des filaments lumineux. Les puissances élevées resserrent
    // la lumière sur les crêtes du bruit.
    float ember = pow(clamp(f * 1.45, 0.0, 1.0), 4.0);
    float veil  = pow(clamp(r.y * 1.25, 0.0, 1.0), 5.0);

    // Atténuation : lumière en haut à gauche, extinction vers le bas.
    float vignette = smoothstep(1.9, 0.25, length(p * vec2(0.68, 1.05)));
    float topBias = smoothstep(-1.2, 1.0, -p.y);
    float falloff = vignette * mix(0.25, 1.0, topBias);

    vec3 col = ink;
    col += orange * ember * 1.15 * falloff;
    col += jade * veil * 0.45 * falloff;

    // Grain léger : casse le banding sur les grands aplats sombres.
    col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.010;

    gl_FragColor = vec4(col * uIntensity, 1.0);
  }
`;

/**
 * Fond animé WebGL.
 *
 * - `ogl` est importé à la demande : ~30 Ko qui ne pèsent pas sur le premier rendu.
 * - Repli sur un dégradé CSS si WebGL est indisponible ou si l'utilisateur
 *   a demandé à réduire les animations.
 * - La boucle de rendu s'arrête dès que le fond sort de l'écran ou que l'onglet
 *   passe en arrière-plan.
 */
export function ShaderBackdrop({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduced) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    void (async () => {
      let ogl: typeof import('ogl');
      try {
        ogl = await import('ogl');
      } catch {
        return;
      }
      if (cancelled || !hostRef.current) return;

      const { Mesh, Program, Renderer, Triangle } = ogl;

      let renderer: InstanceType<typeof Renderer>;
      try {
        renderer = new Renderer({
          alpha: false,
          antialias: false,
          dpr: Math.min(window.devicePixelRatio || 1, 1.5),
          powerPreference: 'low-power',
        });
      } catch {
        return; // Pas de contexte WebGL : le repli CSS reste affiché.
      }

      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      gl.canvas.style.display = 'block';
      host.appendChild(gl.canvas);

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [1, 1] },
          uIntensity: { value: intensity },
        },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const resize = () => {
        renderer.setSize(host.clientWidth, host.clientHeight);
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
      };
      resize();

      const sizeObserver = new ResizeObserver(resize);
      sizeObserver.observe(host);

      let onScreen = true;
      const visibility = new IntersectionObserver(
        ([entry]) => {
          onScreen = entry.isIntersecting;
        },
        { rootMargin: '120px' },
      );
      visibility.observe(host);

      const onTabChange = () => {
        onScreen = !document.hidden;
      };
      document.addEventListener('visibilitychange', onTabChange);

      let frame = 0;
      const start = performance.now();
      const loop = (now: number) => {
        frame = requestAnimationFrame(loop);
        if (!onScreen) return;
        program.uniforms.uTime.value = (now - start) / 1000;
        renderer.render({ scene: mesh });
      };
      frame = requestAnimationFrame(loop);

      setLive(true);

      teardown = () => {
        cancelAnimationFrame(frame);
        sizeObserver.disconnect();
        visibility.disconnect();
        document.removeEventListener('visibilitychange', onTabChange);
        gl.canvas.remove();
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
      setLive(false);
    };
  }, [reduced, intensity]);

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div ref={hostRef} className="absolute inset-0" />
      {/* Repli CSS : affiché tant que le canvas n'a pas pris le relais. */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700',
          'bg-[radial-gradient(70%_60%_at_20%_0%,rgba(249,115,22,.22),transparent_60%),radial-gradient(60%_55%_at_85%_8%,rgba(35,179,122,.16),transparent_60%)]',
          live ? 'opacity-0' : 'opacity-100',
        )}
      />
    </div>
  );
}
