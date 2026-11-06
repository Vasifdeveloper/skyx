"use client";
import { useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sculpture } from "./geometry";
type Props = {
  onReady: () => void;
  onFailure: (reason?: string) => void;
  visible: boolean;
};
function Model({ onReady, onFailure, visible }: Props) {
  const object = useMemo(() => sculpture(), []);
  const { gl, scene, camera } = useThree();
  useEffect(
    () => () => {
      object.traverse((o) => {
        if (
          o instanceof THREE.Mesh ||
          o instanceof THREE.Line ||
          o instanceof THREE.Points
        ) {
          o.geometry.dispose();
          for (const m of Array.isArray(o.material) ? o.material : [o.material])
            m.dispose();
        }
      });
    },
    [object],
  );
  useEffect(() => {
    const el = gl.domElement;
    const host = el.closest<HTMLElement>(".orbit-stage");
    if (!host) return;
    // Software rasterizers can stall while compiling the scene. Use the poster
    // before the first draw, while hardware renderers keep the WebGL experience.
    const context = gl.getContext();
    const debug = context.getExtension("WEBGL_debug_renderer_info");
    const renderer = debug
      ? String(context.getParameter(debug.UNMASKED_RENDERER_WEBGL))
      : "";
    if (/swiftshader|llvmpipe|softpipe|software/i.test(renderer)) {
      onFailure("software-renderer");
      return;
    }
    let raf = 0,
      phase = 0,
      prev = 0,
      slow = 0,
      ready = false,
      px = 0,
      py = 0;
    const lost = (e: Event) => {
      e.preventDefault();
      onFailure("context-loss");
    };
    function loop(now: number) {
      const dt = prev ? now - prev : 0;
      prev = now;
      phase += Math.min(50, dt) * 0.001;
      const chapter = Number(host?.dataset.pose || 0);
      object.rotation.set(
        0.034 * Math.sin((phase * Math.PI) / 12) + py,
        chapter * 0.29 + 0.034 * Math.sin((phase * Math.PI) / 12) + px,
        Math.sin(chapter * 0.95) * 0.26,
      );
      object.position.y = 0.025 * Math.sin((phase * Math.PI) / 12);
      gl.render(scene, camera);
      if (!ready) {
        ready = true;
        onReady();
      }
      if (dt > 105) slow++;
      else slow = Math.max(0, slow - 1);
      if (slow > 20) {
        onFailure("performance");
        return;
      }
      raf = requestAnimationFrame(loop);
    }
    const point = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        px = (e.clientX / innerWidth - 0.5) * 0.09;
        py = (e.clientY / innerHeight - 0.5) * 0.07;
      }
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      prev = 0;
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", point, { passive: true });
    el.addEventListener("webglcontextlost", lost);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", point);
      el.removeEventListener("webglcontextlost", lost);
    };
  }, [gl, scene, camera, object, onReady, onFailure, visible]);
  return <primitive object={object} />;
}
export default function OrbitCanvas(props: Props) {
  return (
    <Canvas
      frameloop="never"
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      camera={{ fov: 35, position: [0, 0, 7.3], near: 0.1, far: 30 }}
      dpr={[1, 1.5]}
    >
      <Model {...props} />
    </Canvas>
  );
}
