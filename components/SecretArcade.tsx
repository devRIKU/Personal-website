import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2, VolumeX, Trophy, Swords, Ghost, Sparkles, RefreshCw, Zap, Shield, Flame } from 'lucide-react';

// ==========================================
// 🔊 RETRO 8-BIT SOUND GENERATOR (Web Audio API)
// ==========================================
class ArcadeSoundEngine {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play(type: 'laser' | 'hit' | 'explode' | 'powerup' | 'bounce' | 'score' | 'win' | 'lose') {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'laser') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'hit') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'bounce') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(580, now + 0.04);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'explode') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(30, now + 0.25);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'powerup') {
        osc.type = 'triangle';
        [330, 440, 550, 660, 880].forEach((freq, i) => {
          osc.frequency.setValueAtTime(freq, now + i * 0.05);
        });
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'score') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(523, now);
        osc.frequency.setValueAtTime(659, now + 0.08);
        osc.frequency.setValueAtTime(783, now + 0.16);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'win') {
        osc.type = 'square';
        const notes = [440, 554, 659, 880, 1108];
        notes.forEach((freq, idx) => {
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        });
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'lose') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.4);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch {
      // Audio fallback silent
    }
  }
}

const sounds = new ArcadeSoundEngine();

// ==========================================
// 🏓 GAME 1: PONG CLASH (Neural Grid)
// ==========================================
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

const PongClash: React.FC<{ onVictory: () => void }> = ({ onVictory }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');
  const [score, setScore] = useState({ player: 0, ai: 0 });

  const stateRef = useRef({
    playerY: 150,
    aiY: 150,
    paddleH: 64,
    paddleW: 10,
    ball: { x: 200, y: 150, vx: 4.5, vy: 2, r: 6, speed: 4.5 },
    particles: [] as Particle[],
    keys: { up: false, down: false },
    rally: 0,
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        stateRef.current.keys.up = true;
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        stateRef.current.keys.down = true;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        stateRef.current.keys.up = false;
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        stateRef.current.keys.down = false;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const handlePointer = (clientY: number) => {
    if (gameState !== 'playing' || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const relY = ((clientY - rect.top) / rect.height) * 300;
    stateRef.current.playerY = Math.max(35, Math.min(265, relY));
  };

  const spawnSparks = (x: number, y: number, color: string) => {
    for (let i = 0; i < 8; i++) {
      stateRef.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        color,
        life: 1,
      });
    }
  };

  const resetBall = (directionToAI: boolean) => {
    const s = stateRef.current;
    s.rally = 0;
    s.ball = {
      x: 200,
      y: 150,
      vx: directionToAI ? 4.5 : -4.5,
      vy: (Math.random() - 0.5) * 4,
      r: 6,
      speed: 4.5,
    };
  };

  const startMatch = () => {
    setScore({ player: 0, ai: 0 });
    stateRef.current.playerY = 150;
    stateRef.current.aiY = 150;
    stateRef.current.particles = [];
    resetBall(true);
    setGameState('playing');
    sounds.play('powerup');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const tick = () => {
      const s = stateRef.current;

      // Keyboard player movement
      if (s.keys.up) s.playerY = Math.max(35, s.playerY - 6);
      if (s.keys.down) s.playerY = Math.min(265, s.playerY + 6);

      // AI movement with responsive tracking & intentional slight human error
      const aiCenter = s.aiY;
      const targetY = s.ball.vx > 0 ? s.ball.y : 150;
      const aiDiff = targetY - aiCenter;
      const aiSpeed = Math.min(Math.abs(aiDiff), 4.2);
      s.aiY += Math.sign(aiDiff) * aiSpeed;
      s.aiY = Math.max(35, Math.min(265, s.aiY));

      // Ball Physics
      s.ball.x += s.ball.vx;
      s.ball.y += s.ball.vy;

      // Top / Bottom walls
      if (s.ball.y - s.ball.r <= 0) {
        s.ball.y = s.ball.r;
        s.ball.vy *= -1;
        spawnSparks(s.ball.x, s.ball.y, '#f59e0b');
        sounds.play('bounce');
      } else if (s.ball.y + s.ball.r >= 300) {
        s.ball.y = 300 - s.ball.r;
        s.ball.vy *= -1;
        spawnSparks(s.ball.x, s.ball.y, '#f59e0b');
        sounds.play('bounce');
      }

      // Player Paddle Collision (Left: x = 20)
      const pLeft = 20;
      const pHalf = s.paddleH / 2;
      if (
        s.ball.x - s.ball.r <= pLeft + s.paddleW &&
        s.ball.x + s.ball.r >= pLeft &&
        s.ball.y >= s.playerY - pHalf &&
        s.ball.y <= s.playerY + pHalf &&
        s.ball.vx < 0
      ) {
        s.ball.x = pLeft + s.paddleW + s.ball.r;
        s.rally++;
        const hitOffset = (s.ball.y - s.playerY) / pHalf; // -1 to 1
        const maxAngle = Math.PI / 3; // 60 deg
        const angle = hitOffset * maxAngle;
        const currentSpeed = Math.min(10, 4.5 + s.rally * 0.35);
        s.ball.vx = Math.cos(angle) * currentSpeed;
        s.ball.vy = Math.sin(angle) * currentSpeed;
        spawnSparks(s.ball.x, s.ball.y, '#fb7185');
        sounds.play('hit');
      }

      // AI Paddle Collision (Right: x = 370)
      const aiLeft = 370;
      if (
        s.ball.x + s.ball.r >= aiLeft &&
        s.ball.x - s.ball.r <= aiLeft + s.paddleW &&
        s.ball.y >= s.aiY - pHalf &&
        s.ball.y <= s.aiY + pHalf &&
        s.ball.vx > 0
      ) {
        s.ball.x = aiLeft - s.ball.r;
        s.rally++;
        const hitOffset = (s.ball.y - s.aiY) / pHalf;
        const angle = hitOffset * (Math.PI / 3);
        const currentSpeed = Math.min(10, 4.5 + s.rally * 0.35);
        s.ball.vx = -Math.cos(angle) * currentSpeed;
        s.ball.vy = Math.sin(angle) * currentSpeed;
        spawnSparks(s.ball.x, s.ball.y, '#38bdf8');
        sounds.play('hit');
      }

      // Goal scoring
      if (s.ball.x < 0) {
        // AI scored
        sounds.play('lose');
        setScore((prev) => {
          const next = { ...prev, ai: prev.ai + 1 };
          if (next.ai >= 5) {
            setGameState('gameover');
          } else {
            resetBall(false);
          }
          return next;
        });
      } else if (s.ball.x > 400) {
        // Player scored
        sounds.play('score');
        setScore((prev) => {
          const next = { ...prev, player: prev.player + 1 };
          if (next.player >= 5) {
            sounds.play('win');
            setGameState('victory');
            setTimeout(onVictory, 1500);
          } else {
            resetBall(true);
          }
          return next;
        });
      }

      // Update particles
      s.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
      });
      s.particles = s.particles.filter((p) => p.life > 0);

      // Render Canvas
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 400, 300);

      // Grid Lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < 400; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 300);
        ctx.stroke();
      }
      for (let y = 0; y < 300; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(400, y);
        ctx.stroke();
      }

      // Center Divider
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(200, 0);
      ctx.lineTo(200, 300);
      ctx.stroke();
      ctx.setLineDash([]);

      // Player Paddle
      ctx.fillStyle = '#fb7185';
      ctx.fillRect(pLeft, s.playerY - pHalf, s.paddleW, s.paddleH);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(pLeft, s.playerY - pHalf, s.paddleW, s.paddleH);

      // AI Paddle
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(aiLeft, s.aiY - pHalf, s.paddleW, s.paddleH);
      ctx.strokeRect(aiLeft, s.aiY - pHalf, s.paddleW, s.paddleH);

      // Ball
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(s.ball.x, s.ball.y, s.ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Particles
      s.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [gameState, onVictory]);

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      {/* Score Header */}
      <div className="w-full flex items-center justify-between mb-3 bg-neo-white dark:bg-neo-dark-surface border-3 border-black p-3 shadow-neo-sm font-ui font-bold text-xs uppercase">
        <span className="text-neo-highlight bg-black px-2 py-1">YOU: {score.player}</span>
        <span className="text-gray-500">FIRST TO 5 GOALS</span>
        <span className="text-neo-accent bg-black px-2 py-1">SYS: {score.ai}</span>
      </div>

      {/* Screen Container */}
      <div className="relative border-4 border-black shadow-neo bg-black w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full aspect-[4/3] block touch-none cursor-ns-resize"
          onMouseMove={(e) => handlePointer(e.clientY)}
          onTouchMove={(e) => {
            if (e.touches[0]) handlePointer(e.touches[0].clientY);
          }}
        />

        {/* Overlay States */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="p-3 bg-neo-highlight border-3 border-black shadow-neo-sm text-black mb-3">
              <Swords size={32} />
            </div>
            <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white mb-2">
              PONG CLASH
            </h3>
            <p className="font-grotesk text-xs text-gray-300 mb-6 max-w-xs">
              Defeat the System Neural Core. Move mouse, drag, or press W/S / Up/Down keys.
            </p>
            <button
              onClick={startMatch}
              className="px-6 py-3 bg-neo-accent text-black font-ui font-bold text-xs uppercase tracking-wider border-3 border-black shadow-neo-sm hover:bg-neo-highlight transition-all active:translate-y-0.5"
            >
              START BATTLE
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center text-white">
            <h3 className="font-display text-3xl font-black text-neo-highlight uppercase mb-2">
              SYSTEM OVERRIDE
            </h3>
            <p className="font-grotesk text-xs text-gray-300 mb-6">The AI defended its sector.</p>
            <button
              onClick={startMatch}
              className="px-6 py-3 bg-white text-black font-ui font-bold text-xs uppercase tracking-wider border-3 border-black shadow-neo-sm hover:bg-neo-accent transition-all flex items-center gap-2"
            >
              <RefreshCw size={14} /> REMATCH
            </button>
          </div>
        )}

        {gameState === 'victory' && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center text-white">
            <h3 className="font-display text-3xl font-black text-neo-support uppercase mb-2">
              VICTORY ACHIEVED!
            </h3>
            <p className="font-grotesk text-xs text-gray-300">Sector successfully liberated.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 👾 GAME 2: BUG INVADERS (Defense Grid)
// ==========================================
interface Invader {
  x: number;
  y: number;
  row: number;
  alive: boolean;
}

interface ShieldTile {
  x: number;
  y: number;
  hp: number;
}

const BugInvaders: React.FC<{ onVictory: () => void }> = ({ onVictory }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');
  const [score, setScore] = useState(0);

  const stateRef = useRef({
    playerX: 200,
    playerSpeed: 5,
    bullets: [] as { x: number; y: number }[],
    enemyBullets: [] as { x: number; y: number }[],
    aliens: [] as Invader[],
    alienDir: 1,
    alienSpeed: 0.9,
    alienStepTimer: 0,
    mysteryUfo: { x: -50, y: 30, alive: false, speed: 2 },
    mysteryTimer: 0,
    shields: [] as ShieldTile[],
    particles: [] as Particle[],
    keys: { left: false, right: false, shoot: false },
    lastShot: 0,
  });

  const initAliens = () => {
    const list: Invader[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 7; c++) {
        list.push({
          x: 45 + c * 44,
          y: 60 + r * 30,
          row: r,
          alive: true,
        });
      }
    }
    return list;
  };

  const initShields = () => {
    const shields: ShieldTile[] = [];
    const bunkerPositions = [80, 200, 320];
    bunkerPositions.forEach((bx) => {
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
          shields.push({
            x: bx + c * 10 - 20,
            y: 310 + r * 10,
            hp: 3,
          });
        }
      }
    });
    return shields;
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') stateRef.current.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') stateRef.current.keys.right = true;
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        if (!stateRef.current.keys.shoot) {
          stateRef.current.keys.shoot = true;
          firePlayer();
        }
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') stateRef.current.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') stateRef.current.keys.right = false;
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        stateRef.current.keys.shoot = false;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [gameState]);

  const firePlayer = () => {
    const s = stateRef.current;
    const now = Date.now();
    if (gameState === 'playing' && now - s.lastShot > 280) {
      s.bullets.push({ x: s.playerX, y: 360 });
      s.lastShot = now;
      sounds.play('laser');
    }
  };

  const spawnParticles = (x: number, y: number, color: string, count = 6) => {
    for (let i = 0; i < count; i++) {
      stateRef.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        color,
        life: 1,
      });
    }
  };

  const startMission = () => {
    stateRef.current = {
      playerX: 200,
      playerSpeed: 5,
      bullets: [],
      enemyBullets: [],
      aliens: initAliens(),
      alienDir: 1,
      alienSpeed: 1,
      alienStepTimer: 0,
      mysteryUfo: { x: -50, y: 30, alive: false, speed: 2 },
      mysteryTimer: 0,
      shields: initShields(),
      particles: [],
      keys: { left: false, right: false, shoot: false },
      lastShot: 0,
    };
    setScore(0);
    setGameState('playing');
    sounds.play('powerup');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const tick = () => {
      const s = stateRef.current;

      // Player Movement
      if (s.keys.left) s.playerX = Math.max(20, s.playerX - s.playerSpeed);
      if (s.keys.right) s.playerX = Math.min(380, s.playerX + s.playerSpeed);

      // Player Bullets
      s.bullets.forEach((b) => (b.y -= 7));
      s.bullets = s.bullets.filter((b) => b.y > 0);

      // Alien Movement & Edge Check
      let hitEdge = false;
      let livingCount = 0;

      s.aliens.forEach((a) => {
        if (!a.alive) return;
        livingCount++;
        a.x += s.alienSpeed * s.alienDir;
        if (a.x > 375 || a.x < 25) hitEdge = true;
        if (a.y >= 355) {
          // Reached defense line
          sounds.play('lose');
          setGameState('gameover');
        }
      });

      if (hitEdge) {
        s.alienDir *= -1;
        s.aliens.forEach((a) => {
          if (a.alive) a.y += 16;
        });
        s.alienSpeed = Math.min(3.5, s.alienSpeed + 0.15);
      }

      // Alien Shooting
      if (Math.random() < 0.025 && livingCount > 0) {
        const aliveAliens = s.aliens.filter((a) => a.alive);
        const shooter = aliveAliens[Math.floor(Math.random() * aliveAliens.length)];
        if (shooter) {
          s.enemyBullets.push({ x: shooter.x, y: shooter.y + 10 });
        }
      }

      // Enemy Bullets Movement
      s.enemyBullets.forEach((eb) => (eb.y += 4));

      // Player Bullet collisions with Aliens
      s.bullets.forEach((b) => {
        if (b.y < -100) return;
        s.aliens.forEach((a) => {
          if (!a.alive) return;
          if (Math.abs(b.x - a.x) < 14 && Math.abs(b.y - a.y) < 12) {
            a.alive = false;
            b.y = -999;
            spawnParticles(a.x, a.y, '#f43f5e', 10);
            sounds.play('explode');
            setScore((sc) => sc + 50);
          }
        });

        // Hit mystery UFO
        if (s.mysteryUfo.alive && Math.abs(b.x - s.mysteryUfo.x) < 18 && Math.abs(b.y - s.mysteryUfo.y) < 12) {
          s.mysteryUfo.alive = false;
          b.y = -999;
          spawnParticles(s.mysteryUfo.x, s.mysteryUfo.y, '#fbbf24', 16);
          sounds.play('score');
          setScore((sc) => sc + 250);
        }

        // Bullet vs Shields
        s.shields.forEach((sh) => {
          if (sh.hp > 0 && Math.abs(b.x - sh.x) < 7 && Math.abs(b.y - sh.y) < 7) {
            sh.hp--;
            b.y = -999;
            spawnParticles(sh.x, sh.y, '#38bdf8', 4);
          }
        });
      });

      // Enemy Bullet vs Shields & Player
      s.enemyBullets.forEach((eb) => {
        s.shields.forEach((sh) => {
          if (sh.hp > 0 && Math.abs(eb.x - sh.x) < 7 && Math.abs(eb.y - sh.y) < 7) {
            sh.hp--;
            eb.y = 999;
            spawnParticles(sh.x, sh.y, '#38bdf8', 4);
          }
        });

        // Hit Player
        if (Math.abs(eb.x - s.playerX) < 15 && Math.abs(eb.y - 370) < 12) {
          spawnParticles(s.playerX, 370, '#f59e0b', 20);
          sounds.play('lose');
          setGameState('gameover');
        }
      });
      s.enemyBullets = s.enemyBullets.filter((eb) => eb.y < 400);

      // Mystery UFO periodic spawn
      s.mysteryTimer++;
      if (s.mysteryTimer > 400 && !s.mysteryUfo.alive) {
        s.mysteryUfo = { x: 0, y: 30, alive: true, speed: 2.2 };
        s.mysteryTimer = 0;
      }
      if (s.mysteryUfo.alive) {
        s.mysteryUfo.x += s.mysteryUfo.speed;
        if (s.mysteryUfo.x > 420) s.mysteryUfo.alive = false;
      }

      // Check Victory
      if (livingCount === 0) {
        sounds.play('win');
        setGameState('victory');
        setTimeout(onVictory, 1500);
        return;
      }

      // Update Particles
      s.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
      });
      s.particles = s.particles.filter((p) => p.life > 0);

      // Render
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, 400, 400);

      // Draw Mystery UFO
      if (s.mysteryUfo.alive) {
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(s.mysteryUfo.x - 14, s.mysteryUfo.y - 4, 28, 8);
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(s.mysteryUfo.x - 6, s.mysteryUfo.y - 8, 12, 4);
      }

      // Draw Aliens
      s.aliens.forEach((a) => {
        if (!a.alive) return;
        const color = a.row === 0 ? '#f43f5e' : a.row === 1 ? '#fb923c' : a.row === 2 ? '#facc15' : '#4ade80';
        ctx.fillStyle = color;
        // Pixel alien shape
        ctx.fillRect(a.x - 10, a.y - 8, 20, 16);
        ctx.fillStyle = '#000';
        ctx.fillRect(a.x - 6, a.y - 3, 3, 4);
        ctx.fillRect(a.x + 3, a.y - 3, 3, 4);
      });

      // Draw Shields
      s.shields.forEach((sh) => {
        if (sh.hp <= 0) return;
        ctx.fillStyle = sh.hp === 3 ? '#38bdf8' : sh.hp === 2 ? '#0284c7' : '#0369a1';
        ctx.fillRect(sh.x - 4, sh.y - 4, 8, 8);
      });

      // Draw Player Cannon
      ctx.fillStyle = '#10b981';
      ctx.fillRect(s.playerX - 16, 370, 32, 10);
      ctx.fillRect(s.playerX - 4, 360, 8, 10);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(s.playerX - 16, 370, 32, 10);

      // Bullets
      ctx.fillStyle = '#fde047';
      s.bullets.forEach((b) => ctx.fillRect(b.x - 2, b.y, 4, 10));

      ctx.fillStyle = '#fb7185';
      s.enemyBullets.forEach((eb) => ctx.fillRect(eb.x - 2, eb.y, 4, 8));

      // Particles
      s.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [gameState, onVictory]);

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-3 bg-neo-white dark:bg-neo-dark-surface border-3 border-black p-3 shadow-neo-sm font-ui font-bold text-xs uppercase">
        <span className="text-neo-highlight bg-black px-2 py-1">DEFENSE GRID</span>
        <span className="text-gray-600 dark:text-gray-300">SCORE: {score}</span>
        <span className="text-neo-support bg-black px-2 py-1">SHIELDS: ACTIVE</span>
      </div>

      {/* Screen */}
      <div className="relative border-4 border-black shadow-neo bg-black w-full overflow-hidden">
        <canvas ref={canvasRef} width={400} height={400} className="w-full aspect-square block touch-none" />

        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="p-3 bg-neo-highlight border-3 border-black shadow-neo-sm text-black mb-3">
              <Ghost size={32} />
            </div>
            <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white mb-2">
              BUG INVADERS
            </h3>
            <p className="font-grotesk text-xs text-gray-300 mb-6 max-w-xs">
              Squash the swarm before they breach the base! Arrows/A/D to move, Space/Up to fire.
            </p>
            <button
              onClick={startMission}
              className="px-6 py-3 bg-neo-accent text-black font-ui font-bold text-xs uppercase tracking-wider border-3 border-black shadow-neo-sm hover:bg-neo-highlight transition-all"
            >
              DEPLOY TURRET
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center text-white">
            <h3 className="font-display text-3xl font-black text-neo-highlight uppercase mb-2">
              BASE BREACHED!
            </h3>
            <p className="font-grotesk text-xs text-gray-300 mb-6">Final Score: {score}</p>
            <button
              onClick={startMission}
              className="px-6 py-3 bg-white text-black font-ui font-bold text-xs uppercase tracking-wider border-3 border-black shadow-neo-sm hover:bg-neo-accent transition-all flex items-center gap-2"
            >
              <RefreshCw size={14} /> RETRY DEFENSE
            </button>
          </div>
        )}

        {gameState === 'victory' && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center text-white">
            <h3 className="font-display text-3xl font-black text-neo-support uppercase mb-2">
              SECTOR CLEARED!
            </h3>
            <p className="font-grotesk text-xs text-gray-300">Score: {score} // All bugs neutralized.</p>
          </div>
        )}

        {/* Mobile touch controls */}
        {gameState === 'playing' && (
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center md:hidden pointer-events-auto">
            <div className="flex gap-2">
              <button
                className="w-12 h-12 bg-white/20 border-2 border-white text-white font-bold active:bg-white/40 shadow-neo-sm flex items-center justify-center"
                onTouchStart={() => (stateRef.current.keys.left = true)}
                onTouchEnd={() => (stateRef.current.keys.left = false)}
                aria-label="Move Left"
              >
                ◀
              </button>
              <button
                className="w-12 h-12 bg-white/20 border-2 border-white text-white font-bold active:bg-white/40 shadow-neo-sm flex items-center justify-center"
                onTouchStart={() => (stateRef.current.keys.right = true)}
                onTouchEnd={() => (stateRef.current.keys.right = false)}
                aria-label="Move Right"
              >
                ▶
              </button>
            </div>
            <button
              className="w-14 h-14 bg-neo-highlight border-3 border-black text-black font-ui font-bold text-xs active:scale-95 shadow-neo-sm uppercase flex items-center justify-center"
              onTouchStart={firePlayer}
              aria-label="Fire Weapon"
            >
              FIRE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 🧱 GAME 3: CYBER BREAKOUT (Brick Core)
// ==========================================
interface Brick {
  x: number;
  y: number;
  w: number;
  h: number;
  hp: number;
  color: string;
  powerup?: 'wide' | 'multi' | 'laser' | 'shield';
}

interface DropPowerup {
  x: number;
  y: number;
  type: 'wide' | 'multi' | 'laser' | 'shield';
}

interface ActiveBall {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const CyberBreakout: React.FC<{ onVictory: () => void }> = ({ onVictory }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');
  const [score, setScore] = useState(0);

  const stateRef = useRef({
    paddleX: 200,
    paddleW: 75,
    paddleH: 10,
    balls: [] as ActiveBall[],
    bricks: [] as Brick[],
    powerups: [] as DropPowerup[],
    particles: [] as Particle[],
    laserActive: 0,
    shieldActive: false,
    lasers: [] as { x: number; y: number }[],
    keys: { left: false, right: false },
  });

  const initBricks = () => {
    const bricks: Brick[] = [];
    const colors = ['#f43f5e', '#fb923c', '#facc15', '#4ade80', '#38bdf8'];
    const pTypes: Array<'wide' | 'multi' | 'laser' | 'shield'> = ['wide', 'multi', 'laser', 'shield'];

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 8; c++) {
        const hasP = Math.random() < 0.25;
        bricks.push({
          x: 24 + c * 44,
          y: 45 + r * 22,
          w: 38,
          h: 16,
          hp: r === 0 ? 2 : 1,
          color: colors[r],
          powerup: hasP ? pTypes[Math.floor(Math.random() * pTypes.length)] : undefined,
        });
      }
    }
    return bricks;
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') stateRef.current.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') stateRef.current.keys.right = true;
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        // Fire laser if active
        if (stateRef.current.laserActive > 0) {
          stateRef.current.lasers.push(
            { x: stateRef.current.paddleX - 15, y: 360 },
            { x: stateRef.current.paddleX + 15, y: 360 }
          );
          sounds.play('laser');
          e.preventDefault();
        }
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') stateRef.current.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') stateRef.current.keys.right = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const handlePointer = (clientX: number) => {
    if (gameState !== 'playing' || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const relX = ((clientX - rect.left) / rect.width) * 400;
    const half = stateRef.current.paddleW / 2;
    stateRef.current.paddleX = Math.max(half, Math.min(400 - half, relX));
  };

  const spawnParticles = (x: number, y: number, color: string, count = 8) => {
    for (let i = 0; i < count; i++) {
      stateRef.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        color,
        life: 1,
      });
    }
  };

  const startBreakout = () => {
    stateRef.current = {
      paddleX: 200,
      paddleW: 75,
      paddleH: 10,
      balls: [{ x: 200, y: 320, vx: Math.random() > 0.5 ? 3.5 : -3.5, vy: -4, r: 6 }],
      bricks: initBricks(),
      powerups: [],
      particles: [],
      laserActive: 0,
      shieldActive: false,
      lasers: [],
      keys: { left: false, right: false },
    };
    setScore(0);
    setGameState('playing');
    sounds.play('powerup');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const tick = () => {
      const s = stateRef.current;
      const halfW = s.paddleW / 2;

      // Keyboard paddle control
      if (s.keys.left) s.paddleX = Math.max(halfW, s.paddleX - 6.5);
      if (s.keys.right) s.paddleX = Math.min(400 - halfW, s.paddleX + 6.5);

      // Update Powerups falling
      s.powerups.forEach((pu) => (pu.y += 2));
      s.powerups.forEach((pu) => {
        if (Math.abs(pu.x - s.paddleX) < halfW + 10 && Math.abs(pu.y - 370) < 14) {
          pu.y = 999; // collect
          sounds.play('powerup');
          if (pu.type === 'wide') s.paddleW = Math.min(130, s.paddleW + 30);
          if (pu.type === 'shield') s.shieldActive = true;
          if (pu.type === 'laser') s.laserActive = 600; // frames
          if (pu.type === 'multi') {
            s.balls.push(
              { x: s.paddleX, y: 350, vx: -3, vy: -4, r: 6 },
              { x: s.paddleX, y: 350, vx: 3, vy: -4, r: 6 }
            );
          }
          setScore((sc) => sc + 75);
        }
      });
      s.powerups = s.powerups.filter((pu) => pu.y < 400);

      // Decrement laser timer
      if (s.laserActive > 0) s.laserActive--;

      // Laser bolts
      s.lasers.forEach((l) => (l.y -= 7));
      s.lasers.forEach((l) => {
        s.bricks.forEach((b) => {
          if (b.hp > 0 && l.x > b.x && l.x < b.x + b.w && l.y > b.y && l.y < b.y + b.h) {
            b.hp = 0;
            l.y = -999;
            spawnParticles(b.x + b.w / 2, b.y + b.h / 2, b.color);
            sounds.play('explode');
            setScore((sc) => sc + 40);
          }
        });
      });
      s.lasers = s.lasers.filter((l) => l.y > 0);

      // Balls Physics & Collisions
      s.balls.forEach((ball) => {
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Walls
        if (ball.x - ball.r <= 0) {
          ball.x = ball.r;
          ball.vx *= -1;
          sounds.play('bounce');
        } else if (ball.x + ball.r >= 400) {
          ball.x = 400 - ball.r;
          ball.vx *= -1;
          sounds.play('bounce');
        }

        if (ball.y - ball.r <= 0) {
          ball.y = ball.r;
          ball.vy *= -1;
          sounds.play('bounce');
        }

        // Bottom floor check
        if (ball.y >= 390) {
          if (s.shieldActive) {
            s.shieldActive = false;
            ball.vy = -Math.abs(ball.vy);
            sounds.play('powerup');
            spawnParticles(200, 395, '#38bdf8', 20);
          }
        }

        // Paddle Hit
        const padTop = 370 - s.paddleH / 2;
        const padBot = 370 + s.paddleH / 2;
        if (
          ball.y + ball.r >= padTop &&
          ball.y - ball.r <= padBot &&
          ball.x >= s.paddleX - halfW &&
          ball.x <= s.paddleX + halfW &&
          ball.vy > 0
        ) {
          ball.y = padTop - ball.r;
          const hitOffset = (ball.x - s.paddleX) / halfW; // -1 to 1
          const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
          const maxAngle = (5 * Math.PI) / 12; // 75 deg
          const angle = hitOffset * maxAngle;
          ball.vx = Math.sin(angle) * speed;
          ball.vy = -Math.cos(angle) * speed;
          sounds.play('hit');
          spawnParticles(ball.x, padTop, '#fde047', 6);
        }

        // Brick Collisions
        s.bricks.forEach((b) => {
          if (b.hp <= 0) return;
          const nearX = Math.max(b.x, Math.min(ball.x, b.x + b.w));
          const nearY = Math.max(b.y, Math.min(ball.y, b.y + b.h));
          const distSq = (ball.x - nearX) ** 2 + (ball.y - nearY) ** 2;

          if (distSq < ball.r * ball.r) {
            b.hp--;
            sounds.play('hit');
            spawnParticles(nearX, nearY, b.color, 8);

            if (b.hp <= 0) {
              setScore((sc) => sc + 50);
              if (b.powerup) {
                s.powerups.push({
                  x: b.x + b.w / 2,
                  y: b.y + b.h / 2,
                  type: b.powerup,
                });
              }
            }

            // Deflection calculation
            const overlapX = ball.x - (b.x + b.w / 2);
            const overlapY = ball.y - (b.y + b.h / 2);
            if (Math.abs(overlapX) / b.w > Math.abs(overlapY) / b.h) {
              ball.vx *= -1;
            } else {
              ball.vy *= -1;
            }
          }
        });
      });

      // Filter out lost balls
      s.balls = s.balls.filter((b) => b.y < 410);

      if (s.balls.length === 0) {
        sounds.play('lose');
        setGameState('gameover');
        return;
      }

      // Check victory
      const aliveBricks = s.bricks.filter((b) => b.hp > 0);
      if (aliveBricks.length === 0) {
        sounds.play('win');
        setGameState('victory');
        setTimeout(onVictory, 1500);
        return;
      }

      // Update particles
      s.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
      });
      s.particles = s.particles.filter((p) => p.life > 0);

      // Render
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, 400, 400);

      // Floor Shield
      if (s.shieldActive) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(0, 395, 400, 5);
      }

      // Bricks
      s.bricks.forEach((b) => {
        if (b.hp <= 0) return;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
        if (b.hp > 1) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(b.x + 4, b.y + 4, 4, 4);
        }
      });

      // Powerups
      s.powerups.forEach((pu) => {
        ctx.fillStyle = pu.type === 'wide' ? '#fb923c' : pu.type === 'multi' ? '#f43f5e' : pu.type === 'laser' ? '#facc15' : '#38bdf8';
        ctx.fillRect(pu.x - 6, pu.y - 6, 12, 12);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(pu.x - 6, pu.y - 6, 12, 12);
      });

      // Laser bolts
      ctx.fillStyle = '#facc15';
      s.lasers.forEach((l) => ctx.fillRect(l.x - 2, l.y, 4, 10));

      // Paddle
      ctx.fillStyle = s.laserActive > 0 ? '#facc15' : '#10b981';
      ctx.fillRect(s.paddleX - halfW, 370 - s.paddleH / 2, s.paddleW, s.paddleH);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(s.paddleX - halfW, 370 - s.paddleH / 2, s.paddleW, s.paddleH);

      // Balls
      ctx.fillStyle = '#ffffff';
      s.balls.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.stroke();
      });

      // Particles
      s.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [gameState, onVictory]);

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-3 bg-neo-white dark:bg-neo-dark-surface border-3 border-black p-3 shadow-neo-sm font-ui font-bold text-xs uppercase">
        <span className="text-neo-highlight bg-black px-2 py-1">CYBER CORE</span>
        <span className="text-gray-600 dark:text-gray-300">SCORE: {score}</span>
        <span className="text-neo-accent bg-black px-2 py-1">POWERUPS: ON</span>
      </div>

      {/* Screen */}
      <div className="relative border-4 border-black shadow-neo bg-black w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full aspect-square block touch-none cursor-ew-resize"
          onMouseMove={(e) => handlePointer(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches[0]) handlePointer(e.touches[0].clientX);
          }}
        />

        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="p-3 bg-neo-accent border-3 border-black shadow-neo-sm text-black mb-3">
              <Zap size={32} />
            </div>
            <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white mb-2">
              CYBER BREAKOUT
            </h3>
            <p className="font-grotesk text-xs text-gray-300 mb-6 max-w-xs">
              Shatter the cyber core, catch powerup modules, and clear the grid. Move mouse or drag paddle.
            </p>
            <button
              onClick={startBreakout}
              className="px-6 py-3 bg-neo-accent text-black font-ui font-bold text-xs uppercase tracking-wider border-3 border-black shadow-neo-sm hover:bg-neo-highlight transition-all"
            >
              LAUNCH BALL
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center text-white">
            <h3 className="font-display text-3xl font-black text-neo-highlight uppercase mb-2">
              CORE REBOUND FAILED
            </h3>
            <p className="font-grotesk text-xs text-gray-300 mb-6">Final Score: {score}</p>
            <button
              onClick={startBreakout}
              className="px-6 py-3 bg-white text-black font-ui font-bold text-xs uppercase tracking-wider border-3 border-black shadow-neo-sm hover:bg-neo-accent transition-all flex items-center gap-2"
            >
              <RefreshCw size={14} /> RETRY BREAKOUT
            </button>
          </div>
        )}

        {gameState === 'victory' && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center text-white">
            <h3 className="font-display text-3xl font-black text-neo-support uppercase mb-2">
              CYBER CORE CRUSHED!
            </h3>
            <p className="font-grotesk text-xs text-gray-300">All defense sectors dismantled.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 🕹 MAIN SECRET ARCADE HUB
// ==========================================
export default function SecretArcade() {
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [muted, setMuted] = useState(false);

  const onWin = (idx: number) => {
    if (!completed.includes(idx)) setCompleted((c) => [...c, idx]);
  };

  const toggleSound = () => {
    sounds.muted = !sounds.muted;
    setMuted(sounds.muted);
    if (!sounds.muted) sounds.play('powerup');
  };

  const games = [
    {
      title: 'PONG CLASH',
      badge: '1v1 vs Neural Core',
      desc: 'Angular rebound physics, reactive AI, and particle sparks.',
      icon: <Swords size={32} />,
      color: 'bg-neo-accent',
      Component: PongClash,
    },
    {
      title: 'BUG INVADERS',
      badge: 'Defensive Bunker Grid',
      desc: 'Wave swarm, destructible shields, and bonus mystery drones.',
      icon: <Ghost size={32} />,
      color: 'bg-neo-highlight',
      Component: BugInvaders,
    },
    {
      title: 'CYBER BREAKOUT',
      badge: 'Core Breaker & Powerups',
      desc: 'Multi-ball, laser blasters, paddle expanders, and steel bricks.',
      icon: <Zap size={32} />,
      color: 'bg-neo-support',
      Component: CyberBreakout,
    },
  ];

  if (completed.length === 3) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 px-4 text-center bg-neo-white dark:bg-neo-dark-surface text-neo-black dark:text-white border-4 border-black dark:border-neo-dark-border shadow-neo-lg max-w-xl mx-auto">
        <div className="p-4 bg-neo-accent border-3 border-black shadow-neo mb-6">
          <Trophy size={48} className="text-black" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-black uppercase mb-3 tracking-tight">
          ARCADE MASTER UNLOCKED
        </h2>
        <p className="font-grotesk text-sm text-gray-700 dark:text-gray-300 mb-6 max-w-md">
          You conquered all three retro challenges with zero compromises.
        </p>

        <div className="bg-neo-black text-neo-support p-4 border-3 border-black text-left text-xs font-mono w-full max-w-sm shadow-neo-sm mb-6 space-y-1">
          <p>{`> USER_SKILL = RANK_S`}</p>
          <p>{`> ALL_GAMES_CLEARED = TRUE`}</p>
          <p>{`> STATUS: HIGH_VELOCITY_ENGINEER`}</p>
        </div>

        <button
          onClick={() => setCompleted([])}
          className="px-6 py-3 bg-neo-accent text-black font-ui font-bold text-xs uppercase tracking-wider border-3 border-black shadow-neo-sm hover:bg-neo-highlight transition-all"
        >
          RESET CHALLENGES
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center pb-8 font-ui">
      {activeGame === null ? (
        <div className="w-full max-w-3xl bg-neo-white dark:bg-neo-dark-surface p-6 md:p-8 border-4 border-black dark:border-neo-dark-border shadow-neo-lg relative">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-black dark:border-neo-dark-border pb-6 mb-8 gap-4">
            <div>
              <div className="inline-block bg-neo-accent text-black px-2 py-0.5 font-ui text-[10px] font-bold uppercase tracking-widest border-2 border-black shadow-neo-sm mb-2">
                ARCADE PROTOCOL // v4.2
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-black text-neo-black dark:text-white uppercase tracking-tight">
                NEO ARCADE
              </h2>
              <p className="font-grotesk text-xs text-gray-600 dark:text-gray-400 mt-1">
                Polished retro games inspired by Pong, Space Invaders & Breakout.
              </p>
            </div>

            {/* Sound & Status */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSound}
                className="p-2 bg-neo-surface-muted dark:bg-neo-dark-surface-elevated border-2 border-black dark:border-white/20 text-neo-black dark:text-white hover:bg-neo-accent hover:text-black transition-colors shadow-neo-sm"
                title={muted ? 'Unmute Audio' : 'Mute Audio'}
                aria-label="Toggle Sound"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <div className="bg-neo-black text-white px-3 py-1.5 border-2 border-black font-ui font-bold text-xs uppercase tracking-wider">
                CLEARED: {completed.length}/3
              </div>
            </div>
          </div>

          {/* 3 Games Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.map((g, i) => {
              const isDone = completed.includes(i);

              return (
                <div
                  key={g.title}
                  className={`border-4 border-black dark:border-neo-dark-border p-5 flex flex-col justify-between transition-all duration-200 ${
                    isDone
                      ? 'bg-neo-surface-muted dark:bg-neo-dark-surface-elevated opacity-75'
                      : 'bg-neo-white dark:bg-neo-dark-surface shadow-neo hover:shadow-neo-lg hover:-translate-y-1'
                  }`}
                >
                  <div>
                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 ${g.color} border-2 border-black text-black shadow-neo-sm`}>
                        {g.icon}
                      </div>
                      {isDone ? (
                        <span className="bg-neo-support text-black text-[10px] font-ui font-bold px-2 py-0.5 border border-black uppercase">
                          CLEARED
                        </span>
                      ) : (
                        <span className="text-[10px] font-ui font-bold text-gray-500 uppercase">
                          READY
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-neo-black dark:text-white mb-1">
                      {g.title}
                    </h3>
                    <div className="font-ui text-[11px] font-bold text-neo-secondary uppercase mb-2">
                      {g.badge}
                    </div>
                    <p className="font-grotesk text-xs text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {g.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      sounds.play('powerup');
                      setActiveGame(i);
                    }}
                    className={`w-full py-2.5 px-4 font-ui font-bold text-xs uppercase tracking-wider border-3 border-black shadow-neo-sm transition-all ${
                      isDone
                        ? 'bg-white text-black hover:bg-neo-accent'
                        : `${g.color} text-black hover:bg-black hover:text-white`
                    }`}
                  >
                    {isDone ? 'PLAY AGAIN' : 'START GAME'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Active Game Screen */
        <div className="w-full max-w-xl bg-neo-white dark:bg-neo-dark-surface p-6 md:p-8 border-4 border-black dark:border-neo-dark-border shadow-neo-lg flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-6 border-b-2 border-black/10 dark:border-white/10 pb-4">
            <button
              onClick={() => setActiveGame(null)}
              className="flex items-center gap-2 bg-neo-surface-muted dark:bg-neo-dark-surface-elevated text-neo-black dark:text-white px-3 py-1.5 border-2 border-black font-ui font-bold text-xs uppercase tracking-wider hover:bg-neo-accent hover:text-black transition-colors shadow-neo-sm"
            >
              <ArrowLeft size={14} /> EXIT ARCADE
            </button>

            <span className="font-display text-base font-bold uppercase text-neo-black dark:text-white">
              {games[activeGame].title}
            </span>
          </div>

          {React.createElement(games[activeGame].Component, {
            onVictory: () => onWin(activeGame),
          })}
        </div>
      )}
    </div>
  );
}
