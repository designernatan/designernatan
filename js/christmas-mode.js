// Christmas Mode Toggle Script
// Elegant Christmas theme switcher with localStorage persistence

(function() {
    'use strict';
    
    // Christmas Jingle Bell Audio
    let jingleBellAudio = null;
    
    // Check for saved preference or default to off
    const savedMode = localStorage.getItem('christmasMode');
    const preferChristmas = savedMode === 'enabled';
    
    // Initialize on page load
    if (preferChristmas) {
        document.body.classList.add('christmas-mode');
        createSnowflakes();
        initAudio();
    }
    
    // Initialize Audio
    function initAudio() {
        if (!jingleBellAudio) {
            jingleBellAudio = new Audio('https://www.soundjay.com/christmas/sounds/jingle-bells-01.mp3');
            jingleBellAudio.volume = 0.6;
            jingleBellAudio.loop = true;
        }
    }
    
    // Play Jingle Bells
    function playJingleBells() {
        initAudio();
        jingleBellAudio.play().catch(err => {
            console.log('Audio autoplay prevented. User interaction required.');
        });
    }
    
    // Stop Jingle Bells
    function stopJingleBells() {
        if (jingleBellAudio) {
            jingleBellAudio.pause();
            jingleBellAudio.currentTime = 0;
        }
    }
    
    // Toggle Christmas Mode
    window.toggleChristmasMode = function() {
        const body = document.body;
        const isChristmasMode = body.classList.toggle('christmas-mode');
        
        // Save preference
        localStorage.setItem('christmasMode', isChristmasMode ? 'enabled' : 'disabled');
        
        // Add/remove snowflakes
        if (isChristmasMode) {
            createSnowflakes();
            playJingleBells();
            showChristmasNotification('🎄 Christmas Mode Activated!');
        } else {
            removeSnowflakes();
            stopJingleBells();
            showChristmasNotification('❄️ Christmas Mode Deactivated');
        }
    };
    
    // Create falling snowflakes
    function createSnowflakes() {
        const snowflakeCount = 15;
        const container = document.body;
        
        // Remove existing snowflakes first
        removeSnowflakes();
        
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❄';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
            snowflake.style.animationDelay = Math.random() * 5 + 's';
            snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
            snowflake.style.opacity = Math.random() * 0.6 + 0.4;
            
            container.appendChild(snowflake);
        }
    }
    
    // Remove snowflakes
    function removeSnowflakes() {
        const snowflakes = document.querySelectorAll('.snowflake');
        snowflakes.forEach(flake => flake.remove());
    }
    
    // Show notification
    function showChristmasNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.christmas-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = 'christmas-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(20, 59, 33, 0.95);
            color: var(--christmas-gold, #FFD700);
            padding: 16px 24px;
            border: 2px solid var(--christmas-gold, #FFD700);
            z-index: 10001;
            font-family: 'Helvetica Neue', sans-serif;
            font-weight: 700;
            font-size: 14px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }
    
    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Keyboard shortcut (Ctrl/Cmd + Shift + C)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            toggleChristmasMode();
        }
    });
    
    // Optional: Add sparkles on click in Christmas mode
    document.addEventListener('click', function(e) {
        if (!document.body.classList.contains('christmas-mode')) return;
        
        const sparkle = document.createElement('span');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            pointer-events: none;
            font-size: 20px;
            z-index: 9999;
            animation: sparkleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    });
    
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(0.5) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translate(${Math.random() * 100 - 50}px, -100px) scale(1.5) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    
})();
