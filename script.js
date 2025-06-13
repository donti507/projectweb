// Typing animation for hero section
const typingText = document.getElementById('typingText');
const names = ['Ali Ashraf Yad', 'A Tech Enthusiast', 'A Data Analyst', 'An Innovator'];
let nameIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentName = names[nameIndex];
    
    if (isDeleting) {
        typingText.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentName.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 100 : 150;
    
    if (!isDeleting && charIndex === currentName.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        typeSpeed = 500; // Pause before typing next name
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Terminal animation
const terminalCommand = document.getElementById('terminalCommand');
const terminalOutput = document.getElementById('terminalOutput');
const commands = [
    { cmd: 'whoami', output: 'ali_ashraf_yad - tech_enthusiast' },
    { cmd: 'ls skills/', output: 'Python  SQL  PowerBI  JavaScript  DataAnalysis' },
    { cmd: 'cat passion.txt', output: 'Transforming data into actionable insights...' },
    { cmd: 'git status', output: 'Ready to build innovative solutions!' }
];
let cmdIndex = 0;

function animateTerminal() {
    if (cmdIndex < commands.length) {
        const { cmd, output } = commands[cmdIndex];
        let cmdCharIndex = 0;
        
        // Type command
        const typeCommand = () => {
            if (cmdCharIndex < cmd.length) {
                terminalCommand.textContent = cmd.substring(0, cmdCharIndex + 1);
                cmdCharIndex++;
                setTimeout(typeCommand, 100);
            } else {
                // Show output after command is typed
                setTimeout(() => {
                    terminalOutput.innerHTML += `<div><span style="color: #ffd700;">$</span> ${cmd}</div><div style="margin-bottom: 1rem;">${output}</div>`;
                    cmdIndex++;
                    terminalCommand.textContent = '';
                    setTimeout(animateTerminal, 2000);
                }, 500);
            }
        };
        
        typeCommand();
    } else {
        // Reset animation
        setTimeout(() => {
            terminalOutput.innerHTML = '';
            cmdIndex = 0;
            animateTerminal();
        }, 3000);
    }
}

// Particle system for background
function createParticleSystem() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 215, 0, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Background music functionality
const musicBtn = document.getElementById('musicBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicBtn.textContent = '🎵';
        musicBtn.style.opacity = '0.6';
    } else {
        backgroundMusic.play().catch(e => {
            console.log('Audio play failed:', e);
            // Fallback: You can add a message to user that audio couldn't play
        });
        musicBtn.textContent = '🎶';
        musicBtn.style.opacity = '1';
    }
    isPlaying = !isPlaying;
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add glow effect to elements on hover
document.querySelectorAll('.btn, .contact-link, .project-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeWriter, 1000);
    
    // Start terminal animation
    setTimeout(animateTerminal, 2000);
    
    // Create particle system
    createParticleSystem();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    const particles = document.getElementById('particles');
    if (document.hidden) {
        particles.style.animationPlayState = 'paused';
    } else {
        particles.style.animationPlayState = 'running';
    }
});

// Add mouse trail effect
let mouseTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
    
    // Remove old trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        konamiCode = [];
    }
});