/**
 * fireworks.js - PC画面専用の花火アニメーション
 * 画面幅 900px 以上の場合のみ動作する。
 * pointer-events: none でクリック操作を妨げず、
 * opacity を抑えてコンテンツの視認性を保つ。
 */
(function () {
    'use strict';

    if (window.innerWidth < 900) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'fireworks-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var particles = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();

    window.addEventListener('resize', function () {
        if (window.innerWidth < 900) {
            canvas.style.display = 'none';
        } else {
            canvas.style.display = '';
            resize();
        }
    }, { passive: true });

    // 技科大祭カラー: メイン赤 + 金・黄 + 白
    var COLORS = ['#C7000A', '#E83C44', '#FFD166', '#FFB347', '#FFFFFF', '#FF6B6B', '#FFE566'];

    // コンテンツの視認性を保つため opacity を控えめに設定
    var MAX_OPACITY = 0.28;

    function createBurst(x, y) {
        var count = 14 + Math.floor(Math.random() * 8);
        var color = COLORS[Math.floor(Math.random() * COLORS.length)];
        var baseSpeed = 1.6 + Math.random() * 1.6;
        for (var i = 0; i < count; i++) {
            var angle = (Math.PI * 2 * i / count) + (Math.random() - 0.5) * 0.25;
            var spd   = baseSpeed * (0.6 + Math.random() * 0.8);
            particles.push({
                x:      x,
                y:      y,
                vx:     Math.cos(angle) * spd,
                vy:     Math.sin(angle) * spd,
                life:   1.0,
                decay:  0.009 + Math.random() * 0.008,
                radius: 1.5 + Math.random() * 2.0,
                color:  color
            });
        }
    }

    // 画面周辺部に分散した出現位置（中央コンテンツ領域を避けるよう左右に寄せる）
    var POSITIONS = [
        { x: 0.08, y: 0.18 },
        { x: 0.88, y: 0.12 },
        { x: 0.10, y: 0.68 },
        { x: 0.86, y: 0.65 },
        { x: 0.50, y: 0.06 }
    ];
    var posIdx = 0;

    function scheduleNext(delay) {
        setTimeout(function () {
            var pos = POSITIONS[posIdx % POSITIONS.length];
            posIdx++;
            createBurst(
                canvas.width  * pos.x + (Math.random() - 0.5) * 50,
                canvas.height * pos.y + (Math.random() - 0.5) * 40
            );
            scheduleNext(1800 + Math.random() * 1600);
        }, delay);
    }

    // 最初の花火を 1.2 秒後に打ち上げ、以降は 1.8〜3.4 秒間隔で連続
    scheduleNext(1200);

    var rafId = null;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            p.x  += p.vx;
            p.y  += p.vy;
            p.vy += 0.04;   // 重力
            p.vx *= 0.98;   // 空気抵抗
            p.vy *= 0.98;
            p.life -= p.decay;

            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life * MAX_OPACITY;
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        rafId = requestAnimationFrame(animate);
    }
    animate();

    // ページ非表示時にアニメーション停止（省電力）
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        } else if (!rafId) {
            animate();
        }
    });
})();
