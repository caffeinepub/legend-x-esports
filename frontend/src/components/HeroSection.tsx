import { useEffect, useRef } from "react";

// --- Shooting Animation Component ---
function ShootingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef({
    frame: 0,
    recoilAngle: 0,
    targetRecoil: 0,
    bullets: [] as { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[],
    casings: [] as { x: number; y: number; vx: number; vy: number; vy0: number; life: number; maxLife: number; angle: number; spin: number }[],
    muzzleFlash: 0,
    shootTimer: 0,
    burstCount: 0,
    burstPause: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    const ARM_X = W * 0.62;
    const ARM_Y = H * 0.72;
    const GUN_LEN = 54;
    const GUN_ANGLE = -0.13;
    const MUZZLE_X = ARM_X + Math.cos(GUN_ANGLE) * GUN_LEN;
    const MUZZLE_Y = ARM_Y + Math.sin(GUN_ANGLE) * GUN_LEN;

    function spawnBullet() {
      const s = stateRef.current;
      s.bullets.push({
        x: 15,
        y: MUZZLE_Y - 2,
        vx: 18 + Math.random() * 4,
        vy: (Math.random() - 0.5) * 1.2,
        life: 0,
        maxLife: 28,
      });
      s.casings.push({
        x: MUZZLE_X - 10,
        y: MUZZLE_Y - 4,
        vx: -(1.5 + Math.random() * 1.5),
        vy: -(3 + Math.random() * 2),
        vy0: 0,
        life: 0,
        maxLife: 38,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.4,
      });
      s.muzzleFlash = 7;
      s.targetRecoil = -4;
    }

    function drawArm(recoilAngle: number) {
      ctx!.save();
      ctx!.translate(ARM_X, ARM_Y);
      ctx!.rotate((recoilAngle * Math.PI) / 180);

      // Upper arm
      ctx!.save();
      ctx!.rotate(-0.18);
      const armGrad = ctx!.createLinearGradient(-8, -28, 8, 28);
      armGrad.addColorStop(0, "#5a3a1a");
      armGrad.addColorStop(0.5, "#8B5E3C");
      armGrad.addColorStop(1, "#3d2510");
      ctx!.fillStyle = armGrad;
      ctx!.beginPath();
      ctx!.roundRect(-8, -28, 16, 56, 7);
      ctx!.fill();
      ctx!.restore();

      // Forearm
      ctx!.save();
      ctx!.rotate(0.08);
      const foreGrad = ctx!.createLinearGradient(-7, 0, 7, 44);
      foreGrad.addColorStop(0, "#7a4e2a");
      foreGrad.addColorStop(1, "#3d2510");
      ctx!.fillStyle = foreGrad;
      ctx!.beginPath();
      ctx!.roundRect(-7, 0, 14, 44, 6);
      ctx!.fill();
      ctx!.restore();

      // Hand
      const handGrad = ctx!.createRadialGradient(0, 10, 2, 0, 10, 16);
      handGrad.addColorStop(0, "#a0693a");
      handGrad.addColorStop(1, "#5a3a1a");
      ctx!.fillStyle = handGrad;
      ctx!.beginPath();
      ctx!.ellipse(0, 10, 13, 16, 0.1, 0, Math.PI * 2);
      ctx!.fill();

      // Gun
      ctx!.save();
      ctx!.rotate(GUN_ANGLE);
      // Body
      const gunGrad = ctx!.createLinearGradient(0, -5, 0, 5);
      gunGrad.addColorStop(0, "#555");
      gunGrad.addColorStop(0.5, "#222");
      gunGrad.addColorStop(1, "#111");
      ctx!.fillStyle = gunGrad;
      ctx!.beginPath();
      ctx!.roundRect(0, -5, GUN_LEN, 10, 3);
      ctx!.fill();
      // Barrel
      ctx!.fillStyle = "#1a1a1a";
      ctx!.beginPath();
      ctx!.roundRect(GUN_LEN * 0.55, -3, GUN_LEN * 0.45, 6, 2);
      ctx!.fill();
      // Grip
      ctx!.fillStyle = "#333";
      ctx!.beginPath();
      ctx!.roundRect(GUN_LEN * 0.15, 4, 14, 20, 3);
      ctx!.fill();
      // Trigger guard
      ctx!.strokeStyle = "#444";
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.arc(GUN_LEN * 0.3, 8, 8, 0, Math.PI);
      ctx!.stroke();
      // Sight
      ctx!.fillStyle = "#e00";
      ctx!.beginPath();
      ctx!.rect(GUN_LEN * 0.6, -7, 5, 3);
      ctx!.fill();
      ctx!.restore();

      ctx!.restore();
    }

    function drawAim() {
      const aimX = 38;
      const aimY = MUZZLE_Y - 2;
      const r = 14;
      ctx!.save();
      ctx!.globalAlpha = 0.82;
      ctx!.strokeStyle = "#ff2222";
      ctx!.lineWidth = 1.5;
      ctx!.shadowColor = "#ff0000";
      ctx!.shadowBlur = 8;
      ctx!.beginPath();
      ctx!.arc(aimX, aimY, r, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.moveTo(aimX - r - 5, aimY);
      ctx!.lineTo(aimX + r + 5, aimY);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.moveTo(aimX, aimY - r - 5);
      ctx!.lineTo(aimX, aimY + r + 5);
      ctx!.stroke();
      ctx!.globalAlpha = 1;
      ctx!.restore();
    }

    function loop() {
      const s = stateRef.current;
      ctx!.clearRect(0, 0, W, H);

      // Shoot logic
      if (s.burstPause > 0) {
        s.burstPause--;
      } else if (s.shootTimer <= 0) {
        spawnBullet();
        s.burstCount++;
        if (s.burstCount >= 3) {
          s.burstCount = 0;
          s.burstPause = 38;
        } else {
          s.shootTimer = 7;
        }
      } else {
        s.shootTimer--;
      }

      // Recoil spring
      s.recoilAngle += (s.targetRecoil - s.recoilAngle) * 0.35;
      s.targetRecoil *= 0.7;

      // Muzzle flash
      if (s.muzzleFlash > 0) {
        ctx!.save();
        ctx!.globalAlpha = s.muzzleFlash / 7;
        const flashGrad = ctx!.createRadialGradient(MUZZLE_X, MUZZLE_Y, 0, MUZZLE_X, MUZZLE_Y, 22);
        flashGrad.addColorStop(0, "#fff8c0");
        flashGrad.addColorStop(0.4, "#ffaa00");
        flashGrad.addColorStop(1, "rgba(255,60,0,0)");
        ctx!.fillStyle = flashGrad;
        ctx!.beginPath();
        ctx!.ellipse(MUZZLE_X + 10, MUZZLE_Y, 22, 10, GUN_ANGLE, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
        s.muzzleFlash--;
      }

      // Bullets
      s.bullets = s.bullets.filter((b) => b.life < b.maxLife);
      for (const b of s.bullets) {
        b.x += b.vx;
        b.y += b.vy;
        b.life++;
        const alpha = 1 - b.life / b.maxLife;
        ctx!.save();
        ctx!.globalAlpha = alpha;
        const bGrad = ctx!.createLinearGradient(b.x - 12, b.y, b.x + 4, b.y);
        bGrad.addColorStop(0, "rgba(255,200,50,0)");
        bGrad.addColorStop(0.6, "#ffcc33");
        bGrad.addColorStop(1, "#fff8c0");
        ctx!.fillStyle = bGrad;
        ctx!.beginPath();
        ctx!.ellipse(b.x, b.y, 10, 2.5, Math.atan2(b.vy, b.vx), 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      // Casings
      s.casings = s.casings.filter((c) => c.life < c.maxLife);
      for (const c of s.casings) {
        c.vy += 0.38;
        c.x += c.vx;
        c.y += c.vy;
        c.angle += c.spin;
        c.life++;
        const alpha = 1 - c.life / c.maxLife;
        ctx!.save();
        ctx!.globalAlpha = alpha * 0.85;
        ctx!.translate(c.x, c.y);
        ctx!.rotate(c.angle);
        ctx!.fillStyle = "#c8a020";
        ctx!.strokeStyle = "#a07010";
        ctx!.lineWidth = 0.8;
        ctx!.beginPath();
        ctx!.ellipse(0, 0, 4, 2, 0, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();
        ctx!.restore();
      }

      // Draw aim (outside arm group, fixed position)
      drawAim();

      // Draw arm
      drawArm(s.recoilAngle);

      s.frame++;
      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={220}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

// --- Hero Section ---
export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.png"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-24">
          {/* Left: Text — centered */}
          <div className="flex flex-col gap-6 items-center text-center">
            {/* Logo Image (replaces duplicate brand text) */}
            <div className="mb-2">
              <img
                src="/assets/generated/legend-x-logo.dim_512x512.png"
                alt="Legend X Arena Logo"
                className="h-20 w-auto object-contain drop-shadow-[0_0_16px_var(--color-primary)]"
              />
            </div>

            {/* Hero Title — Legend / X / Arena */}
            <div className="flex flex-col leading-none gap-1 items-center">
              <h1
                className="font-black uppercase tracking-widest text-foreground"
                style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", letterSpacing: "0.12em" }}
              >
                Legend
              </h1>
              <h1
                className="font-black uppercase text-primary drop-shadow-[0_0_24px_var(--color-primary)]"
                style={{ fontSize: "clamp(4rem, 11vw, 9rem)", lineHeight: "0.9", letterSpacing: "0.04em" }}
              >
                X
              </h1>
              <h1
                className="font-black uppercase tracking-widest text-foreground"
                style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", letterSpacing: "0.12em" }}
              >
                Arena
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Dominate the battlefield. Rise through the ranks. Join the legend.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              <a
                href="#roster"
                className="btn-glow px-8 py-3 text-sm font-bold tracking-wider uppercase rounded"
              >
                Meet the Team
              </a>
              <a
                href="#news"
                className="px-8 py-3 text-sm font-bold tracking-wider uppercase rounded border border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-200"
              >
                Latest News
              </a>
            </div>
          </div>

          {/* Right: Shooting Animation */}
          <div className="flex items-center justify-center">
            <div
              className="relative"
              style={{ width: "320px", height: "220px" }}
            >
              <ShootingAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
