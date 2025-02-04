// Fonction pour définir la position de la glider
function setGliderPosition(index) {
    const tabs = document.querySelectorAll('.tab');
    const glider = document.querySelector('.glider');

    if (index >= 0 && index < tabs.length) {
        tabs.forEach(tab => tab.classList.remove('active'));

        tabs[index].classList.add('active');

        if (index === 0) {
            glider.style.transform = `translateX(${index - 0}%)`;
            glider.style.width = '50px'
        } else if (index === 1) {
            glider.style.transform = `translateX(${index * 90}%)`;
            glider.style.width = '60px'
        } else if (index === 2) {
            glider.style.transform = `translateX(${index * 115}%)`;
            glider.style.width = '50px'
        } else if (index === 3) {
            glider.style.transform = `translateX(${index * 79}%)`;
            glider.style.width = '70px'
        }
    } else {
        console.error('Index hors limites : ', index);
    }
}

document.querySelectorAll('.tab').forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        setGliderPosition(index);
        const targetId = tab.getAttribute('href');
        if (targetId.startsWith('#')) {
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        }
    });
});


setGliderPosition(0);

const body = document.querySelector('.background');

document.addEventListener('mousemove', (event) => {
    // Récupérer les coordonnées de la souris
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const xPos = (mouseX / window.innerWidth) * 100;
    const yPos = (mouseY / window.innerHeight) * 100;

    body.style.backgroundPosition = `${xPos}% ${yPos}%`;
});

window.addEventListener('scroll', () => {
    const tabs = document.querySelector('.tabs');
    if (window.scrollY > 0) {
        tabs.style.backgroundColor = 'rgba(255,255,255,0.50)';
        tabs.style.backdropFilter = 'blur(10px)';
    } else {
        tabs.style.backgroundColor = 'transparent';
        tabs.style.backdropFilter = 'none';
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajoute la classe `visible` si l'élément est visible
                entry.target.classList.add('visible');
            } else {
                // Retire la classe `visible` si l'élément quitte la vue
                entry.target.classList.remove('visible');
            }
        });
    });

    fadeElements.forEach(element => observer.observe(element));
});

function showQuadtree() {
    const textContent = document.getElementById('quadtreeDesc')
    const textContentOtherOne = document.getElementById('tcguideDesc')
    const textContentOtherTwo = document.getElementById('stickgameDesc')
    if (textContent.style.display === "flex") {
        textContent.style.display = "none";
    } else {
        textContent.style.display = "flex";
        textContentOtherOne.style.display = "none"
        textContentOtherTwo.style.display = "none"
    }
}

function showTCGuide() {
    const textContent = document.getElementById('tcguideDesc')
    const textContentOtherOne = document.getElementById('quadtreeDesc')
    const textContentOtherTwo = document.getElementById('stickgameDesc')
    if (textContent.style.display === "flex") {
        textContent.style.display = "none";
    } else {
        textContent.style.display = "flex";
        textContentOtherOne.style.display = "none"
        textContentOtherTwo.style.display = "none"
    }
}

function showStickgame() {
    const textContent = document.getElementById('stickgameDesc')
    const textContentOtherOne = document.getElementById('tcguideDesc')
    const textContentOtherTwo = document.getElementById('quadtreeDesc')
    if (textContent.style.display === "flex") {
        textContent.style.display = "none";
    } else {
        textContent.style.display = "flex";
        textContentOtherOne.style.display = "none"
        textContentOtherTwo.style.display = "none"
    }
}
