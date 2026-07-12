import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2, VolumeX, Trophy, Crosshair, Swords, Activity, Ghost } from 'lucide-react';

// ==========================================
// 🔊 RETRO 8-BIT SOUND GENERATOR (Web Audio)
// ==========================================
class SoundEngine {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play(type: 'click' | 'shoot' | 'hit' | 'score' | 'win' | 'lose' | 'bounce') {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      const now = this.ctx.currentTime;

      if (type === 'click') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now); osc.stop(now + 0.08);
      } else if (type === 'bounce') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
      } else if (type === 'shoot') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
      } else if (type === 'score') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.setValueAtTime(600, now + 0.1);
        osc.frequency.setValueAtTime(800, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now); osc.stop(now + 0.4);
      } else if (type === 'win') {
        osc.type = 'square';
        [400, 500, 600, 800].forEach((freq, i) => {
          osc.frequency.setValueAtTime(freq, now + i * 0.1);
        });
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.6);
        osc.start(now); osc.stop(now + 0.6);
      } else if (type === 'lose') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.4);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
        osc.start(now); osc.stop(now + 0.4);
      }
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }
}
const sounds = new SoundEngine();

// ==========================================
// 🏓 GAME 1: NEO PONG
// ==========================================
const NeoPong: React.FC<{ onVictory: () => void }> = ({ onVictory }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'idle'|'playing'|'gameover'>('idle');
  const [scores, setScores] = useState({ p1: 0, p2: 0 });

  const stateRef = useRef({
    p1: 150, p2: 150,
    ball: { x: 200, y: 150, vx: -4, vy: 2, r: 6 },
    keys: { up: false, down: false }
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent, isDown: boolean) => {
      if (e.key === 'ArrowUp' || e.key === 'w') stateRef.current.keys.up = isDown;
      if (e.key === 'ArrowDown' || e.key === 's') stateRef.current.keys.down = isDown;
    };
    const onDown = (e: KeyboardEvent) => handleKey(e, true);
    const onUp = (e: KeyboardEvent) => handleKey(e, false);
    window.addEventListener('keydown', onDown); window.addEventListener('keyup', onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (status !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const y = e.touches[0].clientY - rect.top;
    stateRef.current.p1 = Math.max(30, Math.min(270, y));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (status !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    stateRef.current.p1 = Math.max(30, Math.min(270, y));
  };

  const startGame = () => {
    stateRef.current.ball = { x: 200, y: 150, vx: -5, vy: (Math.random() - 0.5) * 4, r: 6 };
    setScores({ p1: 0, p2: 0 });
    setStatus('playing');
    sounds.play('click');
  };

  useEffect(() => {
    if (status !== 'playing') return;
    const ctx = canvasRef.current!.getContext('2d')!;
    let animId: number;

    const loop = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, 400, 300);

      // Player 1 Movement
      if (s.keys.up) s.p1 -= 6;
      if (s.keys.down) s.p1 += 6;
      s.p1 = Math.max(30, Math.min(270, s.p1));

      // AI Movement (Player 2)
      const aiSpeed = 4;
      if (s.p2 < s.ball.y - 10) s.p2 += aiSpeed;
      else if (s.p2 > s.ball.y + 10) s.p2 -= aiSpeed;
      s.p2 = Math.max(30, Math.min(270, s.p2));

      // Ball Movement
      s.ball.x += s.ball.vx;
      s.ball.y += s.ball.vy;

      // Top/Bottom Bounce
      if (s.ball.y - s.ball.r < 0) { s.ball.y = s.ball.r; s.ball.vy *= -1; sounds.play('bounce'); }
      if (s.ball.y + s.ball.r > 300) { s.ball.y = 300 - s.ball.r; s.ball.vy *= -1; sounds.play('bounce'); }

      // Paddle Collision
      const checkHit = (px: number, py: number, isLeft: boolean) => {
        if (isLeft && s.ball.x - s.ball.r < px + 10 && s.ball.x + s.ball.r > px && Math.abs(s.ball.y - py) < 35) {
          s.ball.x = px + 10 + s.ball.r;
          s.ball.vx *= -1.05;
          s.ball.vy = (s.ball.y - py) * 0.2;
          sounds.play('bounce');
        }
        if (!isLeft && s.ball.x + s.ball.r > px && s.ball.x - s.ball.r < px + 10 && Math.abs(s.ball.y - py) < 35) {
          s.ball.x = px - s.ball.r;
          s.ball.vx *= -1.05;
          s.ball.vy = (s.ball.y - py) * 0.2;
          sounds.play('bounce');
        }
      };
      checkHit(20, s.p1, true);
      checkHit(370, s.p2, false);

      // Scoring
      let scored = false;
      if (s.ball.x < 0) {
        setScores(prev => { const n = { ...prev, p2: prev.p2 + 1 }; checkWin(n); return n; });
        scored = true;
      } else if (s.ball.x > 400) {
        setScores(prev => { const n = { ...prev, p1: prev.p1 + 1 }; checkWin(n); return n; });
        scored = true;
      }

      if (scored) {
        sounds.play('score');
        s.ball = { x: 200, y: 150, vx: (Math.random() > 0.5 ? 4 : -4), vy: (Math.random() - 0.5) * 4, r: 6 };
      }

      // Draw
      ctx.fillStyle = '#111'; ctx.fillRect(0, 0, 400, 300);
      
      // Center line
      ctx.strokeStyle = '#333'; ctx.setLineDash([10, 10]);
      ctx.beginPath(); ctx.moveTo(200, 0); ctx.lineTo(200, 300); ctx.stroke(); ctx.setLineDash([]);

      // Paddles
      ctx.fillStyle = '#38bdf8'; // Neo-blue
      ctx.fillRect(20, s.p1 - 30, 10, 60);
      ctx.fillStyle = '#ef4444'; // Neo-red
      ctx.fillRect(370, s.p2 - 30, 10, 60);

      // Ball
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.ball.x, s.ball.y, s.ball.r, 0, Math.PI*2); ctx.fill();

      animId = requestAnimationFrame(loop);
    };

    const checkWin = (sc: {p1: number, p2: number}) => {
      if (sc.p1 >= 5) { setStatus('gameover'); sounds.play('win'); setTimeout(onVictory, 1500); }
      else if (sc.p2 >= 5) { setStatus('gameover'); sounds.play('lose'); }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [status, onVictory]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[400px] mb-2 font-display font-bold text-lg uppercase px-2">
        <span className="text-[#38bdf8]">YOU: {scores.p1}</span>
        <span className="text-gray-400">FIRST TO 5</span>
        <span className="text-[#ef4444]">SYS: {scores.p2}</span>
      </div>
      <div className="relative border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] bg-[#111]">
        <canvas 
          ref={canvasRef} width={400} height={300} 
          className="w-full max-w-[400px] aspect-[4/3] block touch-none cursor-ns-resize"
          onTouchMove={handleTouchMove} onMouseMove={handleMouseMove}
        />
        {status === 'idle' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center text-white">
            <Swords size={48} className="text-[#38bdf8] mb-4" />
            <h3 className="text-2xl font-bold font-display uppercase tracking-widest mb-2">NEO PONG</h3>
            <p className="text-xs mb-6 text-gray-300 font-mono">Move mouse / drag / Up&Down to control left paddle.</p>
            <button onClick={startGame} className="px-6 py-2 bg-white text-black font-bold border-4 border-black shadow-[4px_4px_0_0_#38bdf8] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#38bdf8] active:translate-y-[4px] active:shadow-none transition-all uppercase">Start Match</button>
          </div>
        )}
        {status === 'gameover' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center text-white">
            <h3 className={`text-3xl font-bold font-display uppercase tracking-widest mb-4 ${scores.p1 >= 5 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
              {scores.p1 >= 5 ? 'VICTORY' : 'DEFEAT'}
            </h3>
            {scores.p1 < 5 && (
              <button onClick={startGame} className="px-6 py-2 bg-white text-black font-bold border-4 border-black shadow-[4px_4px_0_0_#ef4444] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#ef4444] active:translate-y-[4px] active:shadow-none transition-all uppercase">Rematch</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 👾 GAME 2: SPACE INVADERS (Bug Swarm)
// ==========================================
const SpaceInvaders: React.FC<{ onVictory: () => void }> = ({ onVictory }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'idle'|'playing'|'gameover'|'victory'>('idle');
  
  const stateRef = useRef({
    player: { x: 200, speed: 5 },
    bullets: [] as {x: number, y: number}[],
    aliens: [] as {x: number, y: number, alive: boolean}[],
    alienDir: 1,
    alienSpeed: 1,
    keys: { left: false, right: false, shoot: false },
    lastShot: 0
  });

  const initAliens = () => {
    const aliens = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 7; col++) {
        aliens.push({ x: 50 + col * 40, y: 30 + row * 30, alive: true });
      }
    }
    return aliens;
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent, isDown: boolean) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') stateRef.current.keys.left = isDown;
      if (e.key === 'ArrowRight' || e.key === 'd') stateRef.current.keys.right = isDown;
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') {
        if (isDown && !stateRef.current.keys.shoot) {
          stateRef.current.keys.shoot = true;
          fire();
        } else if (!isDown) {
          stateRef.current.keys.shoot = false;
        }
        if (isDown) e.preventDefault();
      }
    };
    const onDown = (e: KeyboardEvent) => handleKey(e, true);
    const onUp = (e: KeyboardEvent) => handleKey(e, false);
    window.addEventListener('keydown', onDown); window.addEventListener('keyup', onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, [status]);

  const fire = () => {
    const s = stateRef.current;
    const now = Date.now();
    if (status === 'playing' && now - s.lastShot > 300) {
      s.bullets.push({ x: s.player.x, y: 370 });
      s.lastShot = now;
      sounds.play('shoot');
    }
  };

  const startGame = () => {
    stateRef.current = {
      player: { x: 200, speed: 5 },
      bullets: [],
      aliens: initAliens(),
      alienDir: 1,
      alienSpeed: 1,
      keys: { left: false, right: false, shoot: false },
      lastShot: 0
    };
    setStatus('playing');
    sounds.play('click');
  };

  useEffect(() => {
    if (status !== 'playing') return;
    const ctx = canvasRef.current!.getContext('2d')!;
    let animId: number;

    const loop = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, 400, 400);

      // Player Movement
      if (s.keys.left) s.player.x -= s.player.speed;
      if (s.keys.right) s.player.x += s.player.speed;
      s.player.x = Math.max(15, Math.min(385, s.player.x));

      // Bullets
      s.bullets.forEach(b => b.y -= 7);
      s.bullets = s.bullets.filter(b => b.y > 0);

      // Aliens
      let hitEdge = false;
      let allDead = true;
      let reachedBottom = false;

      s.aliens.forEach(a => {
        if (!a.alive) return;
        allDead = false;
        a.x += s.alienSpeed * s.alienDir;
        if (a.x > 380 || a.x < 20) hitEdge = true;
        if (a.y > 360) reachedBottom = true;

        // Collision with bullets
        s.bullets.forEach((b, bIdx) => {
          if (b.y < -100) return; // ignore spent bullets
          if (Math.abs(b.x - a.x) < 15 && Math.abs(b.y - a.y) < 15) {
            a.alive = false;
            b.y = -999; // spend bullet
            sounds.play('hit');
          }
        });
      });

      if (hitEdge) {
        s.alienDir *= -1;
        s.aliens.forEach(a => { if (a.alive) a.y += 20; });
        s.alienSpeed += 0.2; // Speed up
      }

      if (allDead) {
        setStatus('victory');
        sounds.play('win');
        setTimeout(onVictory, 1500);
        return;
      }

      if (reachedBottom) {
        setStatus('gameover');
        sounds.play('lose');
        return;
      }

      // Draw
      ctx.fillStyle = '#111'; ctx.fillRect(0, 0, 400, 400);

      // Draw Player
      ctx.fillStyle = '#10b981'; // neo-green
      ctx.fillRect(s.player.x - 15, 380, 30, 10);
      ctx.fillRect(s.player.x - 5, 370, 10, 10);

      // Draw Bullets
      ctx.fillStyle = '#fcd34d'; // neo-yellow
      s.bullets.forEach(b => {
        if (b.y > 0) ctx.fillRect(b.x - 2, b.y, 4, 10);
      });

      // Draw Aliens
      ctx.fillStyle = '#ef4444'; // neo-red
      s.aliens.forEach(a => {
        if (a.alive) {
          ctx.fillRect(a.x - 10, a.y - 10, 20, 20);
          ctx.fillStyle = '#111';
          ctx.fillRect(a.x - 6, a.y - 4, 4, 4);
          ctx.fillRect(a.x + 2, a.y - 4, 4, 4);
          ctx.fillStyle = '#ef4444';
        }
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [status, onVictory]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[400px] mb-2 font-display font-bold text-lg uppercase px-2 text-center text-[#ef4444]">
        BUG SWARM
      </div>
      <div className="relative border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] bg-[#111]">
        <canvas 
          ref={canvasRef} width={400} height={400} 
          className="w-full max-w-[400px] aspect-square block touch-none"
        />
        {status === 'idle' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center text-white">
            <Ghost size={48} className="text-[#ef4444] mb-4" />
            <h3 className="text-2xl font-bold font-display uppercase tracking-widest mb-2">BUG SWARM</h3>
            <p className="text-xs mb-6 text-gray-300 font-mono">Use Arrows/A/D to move, Space to shoot.</p>
            <button onClick={startGame} className="px-6 py-2 bg-white text-black font-bold border-4 border-black shadow-[4px_4px_0_0_#ef4444] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#ef4444] active:translate-y-[4px] active:shadow-none transition-all uppercase">Eliminate Bugs</button>
          </div>
        )}
        {status === 'gameover' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center text-white">
            <h3 className="text-3xl font-bold font-display uppercase tracking-widest mb-4 text-[#ef4444]">SYSTEM BREACH</h3>
            <button onClick={startGame} className="px-6 py-2 bg-white text-black font-bold border-4 border-black shadow-[4px_4px_0_0_#ef4444] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#ef4444] active:translate-y-[4px] active:shadow-none transition-all uppercase">Retry</button>
          </div>
        )}
        {status === 'victory' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center text-white">
            <h3 className="text-3xl font-bold font-display uppercase tracking-widest mb-4 text-[#10b981]">BUGS SQUASHED</h3>
          </div>
        )}
        
        {/* On-screen controls for mobile */}
        {status === 'playing' && (
          <div className="absolute bottom-2 left-2 right-2 flex justify-between md:hidden">
            <div className="flex gap-2">
              <button 
                className="w-14 h-14 bg-white/10 border-2 border-white text-white font-bold text-xl active:bg-white/30"
                onTouchStart={() => stateRef.current.keys.left = true} onTouchEnd={() => stateRef.current.keys.left = false}
              >◀</button>
              <button 
                className="w-14 h-14 bg-white/10 border-2 border-white text-white font-bold text-xl active:bg-white/30"
                onTouchStart={() => stateRef.current.keys.right = true} onTouchEnd={() => stateRef.current.keys.right = false}
              >▶</button>
            </div>
            <button 
              className="w-14 h-14 bg-red-500/50 border-2 border-white text-white font-bold text-xl active:bg-red-500/80 rounded-full"
              onTouchStart={() => fire()} 
            >🔥</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 🧱 GAME 3: BREAKOUT (Block Smash)
// ==========================================
const Breakout: React.FC<{ onVictory: () => void }> = ({ onVictory }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'idle'|'playing'|'gameover'|'victory'>('idle');

  const stateRef = useRef({
    paddle: { x: 200, w: 80, h: 10 },
    ball: { x: 200, y: 300, vx: 3, vy: -4, r: 6 },
    bricks: [] as { x: number, y: number, w: number, h: number, alive: boolean, color: string }[],
    keys: { left: false, right: false }
  });

  const initBricks = () => {
    const bricks = [];
    const colors = ['#ef4444', '#fcd34d', '#10b981', '#38bdf8'];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 8; c++) {
        bricks.push({
          x: 20 + c * 45, y: 40 + r * 25, w: 40, h: 20,
          alive: true, color: colors[r]
        });
      }
    }
    return bricks;
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent, isDown: boolean) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') stateRef.current.keys.left = isDown;
      if (e.key === 'ArrowRight' || e.key === 'd') stateRef.current.keys.right = isDown;
    };
    const onDown = (e: KeyboardEvent) => handleKey(e, true);
    const onUp = (e: KeyboardEvent) => handleKey(e, false);
    window.addEventListener('keydown', onDown); window.addEventListener('keyup', onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (status !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    stateRef.current.paddle.x = Math.max(stateRef.current.paddle.w/2, Math.min(400 - stateRef.current.paddle.w/2, x));
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (status !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    stateRef.current.paddle.x = Math.max(stateRef.current.paddle.w/2, Math.min(400 - stateRef.current.paddle.w/2, x));
  };

  const startGame = () => {
    stateRef.current = {
      paddle: { x: 200, w: 80, h: 10 },
      ball: { x: 200, y: 300, vx: (Math.random() > 0.5 ? 3 : -3), vy: -4, r: 6 },
      bricks: initBricks(),
      keys: { left: false, right: false }
    };
    setStatus('playing');
    sounds.play('click');
  };

  useEffect(() => {
    if (status !== 'playing') return;
    const ctx = canvasRef.current!.getContext('2d')!;
    let animId: number;

    const loop = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, 400, 400);

      // Paddle
      if (s.keys.left) s.paddle.x -= 6;
      if (s.keys.right) s.paddle.x += 6;
      s.paddle.x = Math.max(s.paddle.w/2, Math.min(400 - s.paddle.w/2, s.paddle.x));

      // Ball
      s.ball.x += s.ball.vx;
      s.ball.y += s.ball.vy;

      // Walls
      if (s.ball.x - s.ball.r < 0) { s.ball.x = s.ball.r; s.ball.vx *= -1; sounds.play('bounce'); }
      if (s.ball.x + s.ball.r > 400) { s.ball.x = 400 - s.ball.r; s.ball.vx *= -1; sounds.play('bounce'); }
      if (s.ball.y - s.ball.r < 0) { s.ball.y = s.ball.r; s.ball.vy *= -1; sounds.play('bounce'); }

      // Floor (Loss)
      if (s.ball.y > 400) {
        setStatus('gameover');
        sounds.play('lose');
        return;
      }

      // Paddle Hit
      if (s.ball.y + s.ball.r > 380 && s.ball.y - s.ball.r < 390 && Math.abs(s.ball.x - s.paddle.x) < s.paddle.w/2 + s.ball.r) {
        s.ball.y = 380 - s.ball.r;
        s.ball.vy *= -1;
        s.ball.vx = (s.ball.x - s.paddle.x) * 0.15;
        sounds.play('bounce');
      }

      // Brick Hit
      let allDead = true;
      s.bricks.forEach(b => {
        if (!b.alive) return;
        allDead = false;
        
        const testX = s.ball.x;
        const testY = s.ball.y;
        
        const hitX = testX > b.x - s.ball.r && testX < b.x + b.w + s.ball.r;
        const hitY = testY > b.y - s.ball.r && testY < b.y + b.h + s.ball.r;

        if (hitX && hitY) {
          b.alive = false;
          sounds.play('hit');
          
          const overlapLeft = s.ball.x - (b.x - s.ball.r);
          const overlapRight = (b.x + b.w + s.ball.r) - s.ball.x;
          const overlapTop = s.ball.y - (b.y - s.ball.r);
          const overlapBottom = (b.y + b.h + s.ball.r) - s.ball.y;

          const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

          if (minOverlap === overlapLeft || minOverlap === overlapRight) s.ball.vx *= -1;
          else {
             s.ball.vy *= -1;
             // Push ball out to prevent double-bounce bugs inside bricks
             if (minOverlap === overlapTop) s.ball.y = b.y - s.ball.r;
             else if (minOverlap === overlapBottom) s.ball.y = b.y + b.h + s.ball.r;
          }
        }
      });

      if (allDead) {
        setStatus('victory');
        sounds.play('win');
        setTimeout(onVictory, 1500);
        return;
      }

      // Draw
      ctx.fillStyle = '#111'; ctx.fillRect(0, 0, 400, 400);

      // Bricks
      s.bricks.forEach(b => {
        if (b.alive) {
          ctx.fillStyle = b.color;
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeStyle = '#111'; ctx.lineWidth = 2;
          ctx.strokeRect(b.x, b.y, b.w, b.h);
        }
      });

      // Paddle
      ctx.fillStyle = '#fcd34d'; // neo-yellow
      ctx.fillRect(s.paddle.x - s.paddle.w/2, 380, s.paddle.w, s.paddle.h);

      // Ball
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.ball.x, s.ball.y, s.ball.r, 0, Math.PI*2); ctx.fill();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [status, onVictory]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[400px] mb-2 font-display font-bold text-lg uppercase px-2 text-center text-[#fcd34d]">
        BLOCK SMASH
      </div>
      <div className="relative border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] bg-[#111]">
        <canvas 
          ref={canvasRef} width={400} height={400} 
          className="w-full max-w-[400px] aspect-square block touch-none cursor-ew-resize"
          onTouchMove={handleTouchMove} onMouseMove={handleMouseMove}
        />
        {status === 'idle' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center text-white">
            <Activity size={48} className="text-[#fcd34d] mb-4" />
            <h3 className="text-2xl font-bold font-display uppercase tracking-widest mb-2">BLOCK SMASH</h3>
            <p className="text-xs mb-6 text-gray-300 font-mono">Move mouse or drag to control paddle.</p>
            <button onClick={startGame} className="px-6 py-2 bg-white text-black font-bold border-4 border-black shadow-[4px_4px_0_0_#fcd34d] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#fcd34d] active:translate-y-[4px] active:shadow-none transition-all uppercase">Break Out</button>
          </div>
        )}
        {status === 'gameover' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center text-white">
            <h3 className="text-3xl font-bold font-display uppercase tracking-widest mb-4 text-[#ef4444]">GAME OVER</h3>
            <button onClick={startGame} className="px-6 py-2 bg-white text-black font-bold border-4 border-black shadow-[4px_4px_0_0_#ef4444] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#ef4444] active:translate-y-[4px] active:shadow-none transition-all uppercase">Retry</button>
          </div>
        )}
        {status === 'victory' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center text-white">
            <h3 className="text-3xl font-bold font-display uppercase tracking-widest mb-4 text-[#10b981]">CLEARED</h3>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 🕹 MAIN ARCADE COMPONENT
// ==========================================
export default function SecretArcade() {
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);

  const onWin = (idx: number) => {
    if (!completed.includes(idx)) setCompleted(c => [...c, idx]);
    setActiveGame(null);
  };

  const games = [
    { title: "NEO PONG", icon: <Swords size={40} />, color: "text-[#38bdf8]", border: "border-[#38bdf8]", shadow: "shadow-[#38bdf8]", Component: NeoPong },
    { title: "BUG SWARM", icon: <Ghost size={40} />, color: "text-[#ef4444]", border: "border-[#ef4444]", shadow: "shadow-[#ef4444]", Component: SpaceInvaders },
    { title: "BLOCK SMASH", icon: <Activity size={40} />, color: "text-[#fcd34d]", border: "border-[#fcd34d]", shadow: "shadow-[#fcd34d]", Component: Breakout }
  ];

  if (completed.length === 3) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 text-center bg-[#fafafa] dark:bg-[#151515] text-[#111] dark:text-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        <Trophy size={64} className="text-[#fcd34d] mb-6 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" />
        <h2 className="text-4xl font-display font-black uppercase mb-4 tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">ARCADE MASTER</h2>
        <p className="font-mono text-sm mb-8 font-bold opacity-80 uppercase">You have conquered the retro challenges.</p>
        <div className="bg-[#111] text-[#10b981] p-6 border-4 border-black text-left text-sm font-mono w-full max-w-sm shadow-inner">
          <p>{`> USER_SKILL_LEVEL = MAX`}</p>
          <p>{`> SECRETS_UNLOCKED = TRUE`}</p>
          <p>{`> INITIALIZING_REWARD...`}</p>
          <p className="animate-pulse">{`> _`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center pb-12 font-ui" style={{ letterSpacing: '0.05em' }}>
      
      {activeGame === null ? (
        <div className="w-full max-w-2xl bg-[#fafafa] dark:bg-[#1a1a1a] p-8 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Crosshair size={120} />
          </div>
          
          <div className="mb-10 relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#111] dark:text-white mb-2 uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
              NEO ARCADE
            </h2>
            <div className="h-2 w-24 bg-black dark:bg-white mb-4"></div>
            <p className="text-[#111] dark:text-gray-400 font-mono font-bold uppercase text-xs">Insert Coin to Play</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 relative z-10">
            {games.map((g, i) => {
              const isDone = completed.includes(i);
              return (
                <button
                  key={i} onClick={() => { sounds.play('click'); setActiveGame(i); }}
                  disabled={isDone}
                  className={`
                    group flex flex-col items-center justify-center p-6 border-4 transition-all duration-200
                    ${isDone 
                      ? 'border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#222] text-gray-400 cursor-not-allowed' 
                      : `border-black bg-white dark:bg-[#111] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-[2px] active:shadow-none text-[#111] dark:text-white`
                    }
                  `}
                >
                  <div className={`mb-4 transition-transform group-hover:scale-110 ${isDone ? 'grayscale opacity-50' : g.color}`}>
                    {g.icon}
                  </div>
                  <span className={`text-sm font-black uppercase tracking-wider ${isDone ? 'text-gray-500' : 'text-[#111] dark:text-white'}`}>
                    {g.title}
                  </span>
                  
                  {isDone && (
                    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-[#111] dark:text-[#10b981] font-black text-xl rotate-[-15deg] border-4 border-current px-3 py-1 bg-white/90 dark:bg-[#111]/90 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
                        CLEARED
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-10 flex justify-between items-center bg-white dark:bg-[#111] p-4 border-4 border-black relative z-10 shadow-[4px_4px_0_0_#000]">
            <div className="flex gap-4">
              <button 
                onClick={() => { sounds.muted = false; sounds.play('click'); }}
                className={`p-2 border-2 transition-colors ${!sounds.muted ? 'border-black text-[#10b981] bg-gray-100 dark:bg-gray-800' : 'border-transparent text-gray-400 hover:border-gray-300'}`}
                title="Unmute Sound"
              >
                <Volume2 size={20} />
              </button>
              <button 
                onClick={() => { sounds.muted = true; }}
                className={`p-2 border-2 transition-colors ${sounds.muted ? 'border-black text-[#ef4444] bg-gray-100 dark:bg-gray-800' : 'border-transparent text-gray-400 hover:border-gray-300'}`}
                title="Mute Sound"
              >
                <VolumeX size={20} />
              </button>
            </div>
            <span className="text-sm font-mono font-bold text-[#111] dark:text-white uppercase tracking-widest bg-gray-100 dark:bg-gray-800 px-3 py-1 border-2 border-black">
              SCORE: {completed.length}/3
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center bg-[#fafafa] dark:bg-[#1a1a1a] p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <div className="w-full max-w-[400px] flex justify-between items-center mb-6">
            <button 
              onClick={() => setActiveGame(null)}
              className="text-[#111] dark:text-white hover:text-gray-500 font-bold text-sm uppercase flex items-center gap-2 transition-colors font-mono border-b-2 border-black dark:border-white pb-1"
            >
              <ArrowLeft size={16} /> ABORT MISSION
            </button>
          </div>
          
          <div className="w-full flex justify-center">
            {React.createElement(games[activeGame].Component, { onVictory: () => onWin(activeGame) })}
          </div>
        </div>
      )}
    </div>
  );
}
