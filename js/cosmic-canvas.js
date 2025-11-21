/* ============================================
   COSMIC CANVAS - GALAXY EFFECTS
   Recria a imagem de referência com Canvas
   ============================================ */

// ===== COSMIC BEAM (Raio vertical central com partículas) =====
let beamCanvas, beamCtx, beamParticles = [], beamAnimationId;

class BeamParticle {
    constructor() {
        this.reset();
        this.y = Math.random() * beamCanvas.height; // Posição inicial aleatória
    }
    
    reset() {
        // Distribuição focada no centro (raio)
        const centerX = beamCanvas.width / 2;
        const spread = 200;
        this.x = centerX + (Math.random() - 0.5) * spread;
        this.y = -10;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        
        // Cores: branco brilhante, cyan, laranja
        const colorChoice = Math.random();
        if (colorChoice < 0.4) {
            this.color = { r: 255, g: 255, b: 255 }; // Branco
        } else if (colorChoice < 0.7) {
            this.color = { r: 0, g: 217, b: 255 }; // Cyan
        } else {
            this.color = { r: 255, g: 165, b: 0 }; // Laranja
        }
        
        this.opacity = Math.random() * 0.8 + 0.4;
        this.life = 1;
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life -= 0.002;
        
        if (this.y > beamCanvas.height || this.life <= 0) {
            this.reset();
        }
    }
    
    draw() {
        const gradient = beamCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * this.life})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        
        beamCtx.fillStyle = gradient;
        beamCtx.beginPath();
        beamCtx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        beamCtx.fill();
    }
}

function initCosmicBeam() {
    beamCanvas = document.getElementById('beam-canvas');
    if (!beamCanvas) return;
    
    beamCtx = beamCanvas.getContext('2d');
    beamCanvas.width = window.innerWidth;
    beamCanvas.height = window.innerHeight;
    
    beamParticles = [];
    for (let i = 0; i < 200; i++) {
        beamParticles.push(new BeamParticle());
    }
    
    animateCosmicBeam();
}

function animateCosmicBeam() {
    beamCtx.fillStyle = 'rgba(5, 10, 21, 0.1)';
    beamCtx.fillRect(0, 0, beamCanvas.width, beamCanvas.height);
    
    // Raio central vertical
    const centerX = beamCanvas.width / 2;
    const beamGradient = beamCtx.createLinearGradient(centerX - 100, 0, centerX + 100, 0);
    beamGradient.addColorStop(0, 'rgba(0, 217, 255, 0)');
    beamGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    beamGradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
    
    beamCtx.fillStyle = beamGradient;
    beamCtx.fillRect(centerX - 100, 0, 200, beamCanvas.height);
    
    // Partículas
    beamParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    beamAnimationId = requestAnimationFrame(animateCosmicBeam);
}

// ===== STARDUST (Campo estelar completo com espiral) =====
let stardustCanvas, stardustCtx, stars = [], spiralParticles = [], stardustAnimationId;

class Star {
    constructor() {
        this.x = Math.random() * stardustCanvas.width;
        this.y = Math.random() * stardustCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
    }
    
    update() {
        this.opacity += this.twinkleSpeed;
        if (this.opacity > 1 || this.opacity < 0) {
            this.twinkleSpeed *= -1;
        }
    }
    
    draw() {
        stardustCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
        stardustCtx.beginPath();
        stardustCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        stardustCtx.fill();
        
        // Glow
        if (this.size > 1.5) {
            stardustCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
            stardustCtx.beginPath();
            stardustCtx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            stardustCtx.fill();
        }
    }
}

class SpiralParticle {
    constructor(angle, radius) {
        this.angle = angle;
        this.radius = radius;
        this.size = Math.random() * 3 + 1;
        this.speed = 0.005 + Math.random() * 0.01;
        this.radiusSpeed = Math.random() * 0.2;
        
        const colorChoice = Math.random();
        if (colorChoice < 0.3) {
            this.color = { r: 255, g: 255, b: 255, name: 'white' };
        } else if (colorChoice < 0.6) {
            this.color = { r: 0, g: 217, b: 255, name: 'cyan' };
        } else {
            this.color = { r: 255, g: 165, b: 0, name: 'orange' };
        }
    }
    
    update() {
        this.angle += this.speed;
        this.radius += Math.sin(this.angle * 2) * this.radiusSpeed;
        
        if (this.radius < 50 || this.radius > 500) {
            this.radiusSpeed *= -1;
        }
    }
    
    draw() {
        const centerX = stardustCanvas.width / 2;
        const centerY = stardustCanvas.height / 2;
        
        const x = centerX + Math.cos(this.angle) * this.radius;
        const y = centerY + Math.sin(this.angle) * this.radius * 0.4; // Elipse
        
        const gradient = stardustCtx.createRadialGradient(x, y, 0, x, y, this.size * 3);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        
        stardustCtx.fillStyle = gradient;
        stardustCtx.beginPath();
        stardustCtx.arc(x, y, this.size * 3, 0, Math.PI * 2);
        stardustCtx.fill();
    }
}

function initStardust() {
    stardustCanvas = document.getElementById('stardust-canvas');
    if (!stardustCanvas) return;
    
    stardustCtx = stardustCanvas.getContext('2d');
    stardustCanvas.width = window.innerWidth;
    stardustCanvas.height = window.innerHeight;
    
    // Estrelas de fundo
    stars = [];
    for (let i = 0; i < 300; i++) {
        stars.push(new Star());
    }
    
    // Partículas da espiral
    spiralParticles = [];
    for (let i = 0; i < 150; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 400 + 100;
        spiralParticles.push(new SpiralParticle(angle, radius));
    }
    
    animateStardust();
}

function animateStardust() {
    // Background gradiente
    const bgGradient = stardustCtx.createRadialGradient(
        stardustCanvas.width / 2, stardustCanvas.height / 2, 0,
        stardustCanvas.width / 2, stardustCanvas.height / 2, stardustCanvas.width / 2
    );
    bgGradient.addColorStop(0, '#0a1628');
    bgGradient.addColorStop(0.5, '#050a15');
    bgGradient.addColorStop(1, '#000000');
    
    stardustCtx.fillStyle = bgGradient;
    stardustCtx.fillRect(0, 0, stardustCanvas.width, stardustCanvas.height);
    
    // Raio central vertical (sutil)
    const centerX = stardustCanvas.width / 2;
    const beamGradient = stardustCtx.createLinearGradient(centerX - 80, 0, centerX + 80, 0);
    beamGradient.addColorStop(0, 'rgba(0, 217, 255, 0)');
    beamGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
    beamGradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
    
    stardustCtx.fillStyle = beamGradient;
    stardustCtx.fillRect(centerX - 80, 0, 160, stardustCanvas.height);
    
    // Estrelas
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    // Espiral galáctica
    spiralParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Núcleo brilhante central
    const coreGradient = stardustCtx.createRadialGradient(
        stardustCanvas.width / 2, stardustCanvas.height / 2, 0,
        stardustCanvas.width / 2, stardustCanvas.height / 2, 150
    );
    coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    coreGradient.addColorStop(0.3, 'rgba(0, 217, 255, 0.4)');
    coreGradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
    
    stardustCtx.fillStyle = coreGradient;
    stardustCtx.beginPath();
    stardustCtx.arc(stardustCanvas.width / 2, stardustCanvas.height / 2, 150, 0, Math.PI * 2);
    stardustCtx.fill();
    
    stardustAnimationId = requestAnimationFrame(animateStardust);
}

// ===== UTILITÁRIOS =====
function resizeCanvas() {
    if (beamCanvas) {
        beamCanvas.width = window.innerWidth;
        beamCanvas.height = window.innerHeight;
    }
    if (stardustCanvas) {
        stardustCanvas.width = window.innerWidth;
        stardustCanvas.height = window.innerHeight;
    }
}

window.addEventListener('resize', resizeCanvas);

// Limpeza
function stopCosmicBeam() {
    if (beamAnimationId) {
        cancelAnimationFrame(beamAnimationId);
        beamAnimationId = null;
    }
}

function stopStardust() {
    if (stardustAnimationId) {
        cancelAnimationFrame(stardustAnimationId);
        stardustAnimationId = null;
    }
}
