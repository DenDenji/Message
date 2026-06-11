function showStage(stageId) {
    const currentStage = document.querySelector('.active-stage');
    const nextStage = document.getElementById(stageId);

    if (currentStage) {
        currentStage.style.opacity = '0';
        setTimeout(() => {
            currentStage.classList.remove('active-stage');
            nextStage.classList.add('active-stage');
            setTimeout(() => { nextStage.style.opacity = '1'; }, 50);
        }, 1000); 
    } else {
        nextStage.classList.add('active-stage');
        nextStage.style.opacity = '1';
    }
}

// 1. Landing Page Logic & Music
const mainFlowerButton = document.getElementById('main-flower-button');
const flowerVisual = document.getElementById('flower-visual');
const bgMusic = document.getElementById('bg-music'); 

mainFlowerButton.addEventListener('click', () => {
    flowerVisual.classList.add('open');
    
    bgMusic.play().catch(error => console.log("Audio play failed:", error)); 
    
    setTimeout(() => {
        showStage('stage-message');
        setTimeout(() => {
            startCarousel();
            typeWriter();
        }, 1000); 
    }, 1800); 
});

// 2. Carousel Logic
function startCarousel() {
    const photos = document.querySelectorAll('.carousel-photo');
    let currentPhotoIndex = 0;
    setInterval(() => {
        photos[currentPhotoIndex].classList.remove('active');
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        photos[currentPhotoIndex].classList.add('active');
    }, 3000);
}

// 3. Typewriter Logic
const textToType = "Bam,<br><br>I just wanted to take a moment to tell you how much joy you bring into my life. Every day feels brighter because you are in it.";
const typingElement = document.getElementById('typing-text');
const tuloyButtons = document.getElementById('tuloy-buttons');
let charIndex = 0;
let isTag = false;

function typeWriter() {
    if (charIndex < textToType.length) {
        if (textToType.charAt(charIndex) === '<') isTag = true;
        if (textToType.charAt(charIndex) === '>') isTag = false;

        typingElement.innerHTML = textToType.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, isTag ? 0 : 50);
    } else {
        tuloyButtons.classList.remove('hidden');
    }
}

// 4. FIXED: STRICT Runaway Button Logic
const messageBox = document.getElementById('the-message-box');

function moveInsideBox(btn) {
    const padding = 30; 
    const maxX = messageBox.clientWidth - btn.offsetWidth - (padding * 2);
    const maxY = messageBox.clientHeight - btn.offsetHeight - (padding * 2);

    const randomX = Math.floor(Math.random() * maxX) + padding;
    const randomY = Math.floor(Math.random() * maxY) + padding;

    btn.style.position = 'absolute';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
}

// 5. Button Events
const tuloyBtn = document.getElementById('tuloy-btn');
const part1 = document.getElementById('part-1');
const part2 = document.getElementById('part-2');
const yesButton = document.getElementById('yes-button');
const no2Btn = document.getElementById('no-2-btn');
const closeBtn = document.getElementById('close-btn');

// "Tuloy" click
tuloyBtn.addEventListener('click', () => {
    part1.style.display = 'none';
    part2.style.display = 'block';
});

// "No" button runaway
no2Btn.addEventListener('mouseover', () => moveInsideBox(no2Btn));
no2Btn.addEventListener('touchstart', (e) => { e.preventDefault(); moveInsideBox(no2Btn); });

// "Yes" button click
yesButton.addEventListener('click', () => {
    showStage('stage-success');
    createFlowerRain(); 
});

// "Close" button click -> Show Bouquet
closeBtn.addEventListener('click', () => {
    showStage('stage-bouquet');
});

// 6. Falling Photos & Hearts Background
function createMagicBackground() {
    const rainDropsContainer = document.getElementById('rain-drops');
    
    for (let i = 0; i < 15; i++) {
        const photo = document.createElement('img');
        photo.src = '/assets/IMG_20260612_020656_967.jpg'; 
        photo.classList.add('falling-photo');
        
        photo.style.left = Math.random() * 100 + 'vw';
        photo.style.animationDuration = (Math.random() * 8 + 7) + 's'; 
        photo.style.animationDelay = Math.random() * 5 + 's';
        rainDropsContainer.appendChild(photo);
    }

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖'; 
        heart.classList.add('falling-heart');
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 6 + 5) + 's'; 
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        rainDropsContainer.appendChild(heart);
    }
}
createMagicBackground();

// 7. Aesthetic Final Flower Rain
function createFlowerRain() {
    const flowerRainContainer = document.getElementById('flower-rain-drops');
    
    for (let i = 0; i < 15; i++) {
        const flowerPic = document.createElement('img');
        flowerPic.src = './assets/lilac.jfif'; 
        flowerPic.classList.add('falling-flower-pic');
        
        flowerPic.style.left = Math.random() * 100 + 'vw';
        flowerPic.style.animationDuration = (Math.random() * 6 + 8) + 's'; 
        flowerPic.style.animationDelay = Math.random() * 5 + 's';
        
        const randomSize = Math.floor(Math.random() * 25) + 30; 
        flowerPic.style.width = randomSize + 'px';

        flowerRainContainer.appendChild(flowerPic);
    }

    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨'; 
        sparkle.classList.add('sparkle');
        
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.animationDuration = (Math.random() * 5 + 7) + 's'; 
        sparkle.style.animationDelay = Math.random() * 5 + 's';
        sparkle.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        flowerRainContainer.appendChild(sparkle);
    }
}