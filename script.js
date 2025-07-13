// Global variables
let isMusicPlaying = false;
let butterflies = [];
let animationId = null;

// Butterfly types for variety
const butterflyTypes = ['🦋', '🦋', '🦋', '🦋', '🦋'];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    addClickListeners();
});

// Initialize page elements
function initializePage() {
    // Add initial floating butterflies
    createInitialButterflies();
    
    // Start background animations
    startBackgroundAnimations();
}

// Add click listeners
function addClickListeners() {
    // Click anywhere to trigger butterflies
    document.addEventListener('click', function(e) {
        // Don't trigger if clicking on interactive elements
        if (!e.target.closest('.fly-button') && !e.target.closest('.music-toggle')) {
            triggerButterflies(e.clientX, e.clientY);
        }
    });
    
    // Add hover effects to hearts
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        heart.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) rotate(10deg)';
            this.style.filter = 'drop-shadow(0 0 15px rgba(255, 107, 157, 1))';
        });
        
        heart.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.filter = '';
        });
    });
}

// Create initial floating butterflies
function createInitialButterflies() {
    const container = document.getElementById('butterfliesContainer');
    
    // Create 3-5 initial butterflies
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            createButterfly(container, true);
        }, i * 2000);
    }
}

// Create a single butterfly
function createButterfly(container, isInitial = false, clickX = null, clickY = null) {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    butterfly.textContent = butterflyTypes[Math.floor(Math.random() * butterflyTypes.length)];
    
    // Position based on click or random
    let startX, startY;
    if (clickX !== null && clickY !== null) {
        // Start from click position with small random offset
        startX = clickX + (Math.random() - 0.5) * 40;
        startY = clickY + (Math.random() - 0.5) * 40;
    } else if (isInitial) {
        startX = Math.random() * window.innerWidth;
        startY = Math.random() * window.innerHeight;
    } else {
        startX = -50;
        startY = Math.random() * window.innerHeight;
    }
    
    // Set initial position
    butterfly.style.left = startX + 'px';
    butterfly.style.top = startY + 'px';
    
    // Random size
    const size = 1.5 + Math.random() * 1;
    butterfly.style.fontSize = size + 'rem';
    
    // Random animation duration
    const duration = 8 + Math.random() * 4;
    butterfly.style.animationDuration = duration + 's';
    
    // Add to container
    container.appendChild(butterfly);
    
    // Add flying class after a short delay
    setTimeout(() => {
        butterfly.classList.add('flying');
    }, 100);
    
    // Remove butterfly after animation
    setTimeout(() => {
        if (butterfly.parentNode) {
            butterfly.parentNode.removeChild(butterfly);
        }
    }, duration * 1000);
    
    return butterfly;
}

// Trigger butterfly animation
function triggerButterflies(clickX = null, clickY = null) {
    const container = document.getElementById('butterfliesContainer');
    
    // Create multiple butterflies
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createButterfly(container, false, clickX, clickY);
        }, i * 200);
    }
    
    // Add sparkle effect at click position
    if (clickX !== null && clickY !== null) {
        createSparkles(clickX, clickY);
    } else {
        createSparkles();
    }
}

// Create sparkle effect
function createSparkles(clickX = null, clickY = null) {
    const sparkles = ['❤️', '💖', '💕', '💗', '💓', '💝', '💘', '💞'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            
            // Position sparkles around click point or random
            if (clickX !== null && clickY !== null) {
                const offsetX = (Math.random() - 0.5) * 100;
                const offsetY = (Math.random() - 0.5) * 100;
                sparkle.style.left = (clickX + offsetX) + 'px';
                sparkle.style.top = (clickY + offsetY) + 'px';
            } else {
                sparkle.style.left = Math.random() * window.innerWidth + 'px';
                sparkle.style.top = Math.random() * window.innerHeight + 'px';
            }
            
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.animation = 'sparkle 2s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Add sparkle animation to CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Start background animations
function startBackgroundAnimations() {
    // Animate floating elements
    animateFloatingElements();
}

// Animate floating elements
function animateFloatingElements() {
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach((heart, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            heart.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 500);
    });
}

// Toggle music
function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const musicButton = document.querySelector('.music-toggle');
    
    if (isMusicPlaying) {
        audio.pause();
        musicButton.classList.remove('playing');
        isMusicPlaying = false;
    } else {
        audio.play().catch(e => {
            console.log('Audio play failed:', e);
            // Fallback: create a simple tone
            createSimpleTone();
        });
        musicButton.classList.add('playing');
        isMusicPlaying = true;
    }
}

// Create simple tone as fallback
function createSimpleTone() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 2);
        
        // Repeat every 4 seconds
        setInterval(() => {
            if (isMusicPlaying) {
                const oscillator2 = audioContext.createOscillator();
                const gainNode2 = audioContext.createGain();
                
                oscillator2.connect(gainNode2);
                gainNode2.connect(audioContext.destination);
                
                oscillator2.frequency.setValueAtTime(523.25, audioContext.currentTime);
                oscillator2.type = 'sine';
                
                gainNode2.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
                
                oscillator2.start(audioContext.currentTime);
                oscillator2.stop(audioContext.currentTime + 2);
            }
        }, 4000);
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Add smooth scroll effect
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Add parallax effect to background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.background');
    const speed = scrolled * 0.5;
    
    parallax.style.transform = `translateY(${speed}px)`;
});

// Add window resize handler
window.addEventListener('resize', function() {
    // Recalculate butterfly positions if needed
    const butterflies = document.querySelectorAll('.butterfly');
    butterflies.forEach(butterfly => {
        // Adjust position if butterfly is off-screen
        const rect = butterfly.getBoundingClientRect();
        if (rect.right < 0 || rect.left > window.innerWidth) {
            butterfly.style.left = Math.random() * window.innerWidth + 'px';
        }
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case ' ':
            e.preventDefault();
            triggerButterflies();
            break;
        case 'm':
        case 'M':
            toggleMusic();
            break;
        case 'Enter':
            triggerButterflies();
            break;
    }
});

// Add touch support for mobile
let touchStartTime = 0;
document.addEventListener('touchstart', function(e) {
    touchStartTime = Date.now();
});

document.addEventListener('touchend', function(e) {
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration < 200) { // Short tap
        const touch = e.changedTouches[0];
        triggerButterflies(touch.clientX, touch.clientY);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    // Add fade-in effect to all elements
    const elements = document.querySelectorAll('.container > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 1s ease, transform 1s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add heartbeat effect to title
setInterval(() => {
    const title = document.querySelector('.title');
    title.style.transform = 'scale(1.05)';
    setTimeout(() => {
        title.style.transform = 'scale(1)';
    }, 200);
}, 3000);

// Add floating particles effect
function createFloatingParticles() {
    const particles = ['✨', '💫', '⭐', '🌟', '💖', '💕'];
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.position = 'fixed';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            particle.style.fontSize = '1rem';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            particle.style.animation = 'floatUp 6s linear forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 6000);
        }
    }, 1000);
}

// Add float up animation
const floatUpStyle = document.createElement('style');
floatUpStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatUpStyle);

// Start floating particles
createFloatingParticles(); 