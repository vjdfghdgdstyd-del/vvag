// Function to open the surprise modal
function openSurprise() {
    const modal = document.getElementById('surpriseModal');
    modal.style.display = 'block';
    
    // Add celebration effect
    createConfetti();
    
    // Play a subtle animation
    setTimeout(() => {
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.transform = 'scale(1.05)';
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
        }, 200);
    }, 100);
}

// Function to close the surprise modal
function closeSurprise() {
    const modal = document.getElementById('surpriseModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('surpriseModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Create floating hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    
    // Random horizontal position
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Random animation duration
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    // Random size
    const size = Math.random() * 1 + 1;
    heart.style.fontSize = size + 'rem';
    
    document.querySelector('.floating-hearts').appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 7000);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
            confetti.style.animation = 'confettiFall 3s linear forwards';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
    
    // Remove confetti container after all confetti has fallen
    setTimeout(() => {
        if (confettiContainer.parentNode) {
            confettiContainer.parentNode.removeChild(confettiContainer);
        }
    }, 5000);
}

// Add confetti animation styles
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
@keyframes confettiFall {
    0% {
        transform: translateY(-10vh) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(confettiStyles);

// Start creating floating hearts
setInterval(createFloatingHeart, 2000);

// Add some initial hearts
for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 400);
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSurprise();
    }
    if (event.key === 'Enter' || event.key === ' ') {
        const modal = document.getElementById('surpriseModal');
        if (modal.style.display !== 'block') {
            openSurprise();
        }
    }
});

// Add touch support for mobile
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const touchDiff = touchStartY - touchEndY;
    
    // If swipe up gesture detected on the surprise button
    if (touchDiff > 50 && e.target.closest('.surprise-button')) {
        openSurprise();
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});