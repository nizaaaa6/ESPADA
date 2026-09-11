import { useEffect, useRef } from "react";

function MagneticButton({ children, href, className, onClick }) {
  const btnRef = useRef(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
    };
    const leave = () => (el.style.transform = "translate(0, 0)");

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return href ? (
    <a ref={btnRef} href={href} className={className}>
      {children}
    </a>
  ) : (
    <button ref={btnRef} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const COLORS = ["168,85,247", "192,132,253", "124,58,237"];
    let w, h, particles, animationId;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function init() {
      const count = Math.max(40, Math.min(110, Math.floor((w * h) / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + p.c + ",0.85)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle =
              "rgba(" + p.c + "," + (0.18 * (1 - dist / 120)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(tick);
    }

    resize();
    init();
    tick();

    const handleResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-black overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      ></canvas>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 py-20 text-center">
        <p className="text-purple-400 font-semibold mb-4 tracking-[0.3em] uppercase">
          Premium Desk Mats
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
          Upgrade Your <span className="text-gradient">Desk Setup</span>
        </h1>
        <p className="text-gray-300 mt-6 text-lg">FEEL YOUR SPACE WITH US</p>
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <MagneticButton
            href="#products"
            className="bg-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Shop Now
          </MagneticButton>
          <MagneticButton
            href="#products"
            className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            VIEW COLLECTIONS
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
