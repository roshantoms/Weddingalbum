(function() {
    // Preloader
    window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('preloader').classList.add('loaded');
    }, 1000);
    });

    // fade reveal observer
    const reveals = document.querySelectorAll('.fade-reveal');
    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        }
    });
    }, { threshold: 0.2, rootMargin: '0px' });
    reveals.forEach(el => observer.observe(el));

    // optimized parallax for banner
    let ticking = false;
    window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
        document.querySelectorAll('.banner').forEach(section => {
            const speed = 0.25;
            const yPos = (window.scrollY - section.offsetTop) * speed;
            section.style.backgroundPosition = `center ${yPos}px`;
        });
        ticking = false;
        });
        ticking = true;
    }
    });

    // crossfade slideshow
    const slides = document.querySelectorAll('.slide');
    if (slides.length) {
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5400);
    }

    // audio toggle
    const audio = document.getElementById('ambientAudio');
    const toggle = document.getElementById('audio-toggle');
    audio.volume = 0.4;
    
    audio.play().then(() => {
    toggle.innerText = '♬ off';
    }).catch(() => {
    toggle.innerText = '♬';
    });
    
    toggle.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().catch(e => console.log('autoplay blocked, but user clicked'));
        toggle.innerText = '♬ off';
    } else {
        audio.pause();
        toggle.innerText = '♬';
    }
    });

    // cursor glow
    document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--x', e.clientX + 'px');
    document.body.style.setProperty('--y', e.clientY + 'px');
    });

    document.addEventListener('mouseleave', () => {
    document.body.style.setProperty('--x', '-200px');
    document.body.style.setProperty('--y', '-200px');
    });

    // scroll hint fade
    window.addEventListener('scroll', ()=>{
    const hint = document.querySelector('.scroll-hint');
    if(window.scrollY > 200) hint.style.opacity = '0';
    else hint.style.opacity = '1';
    });

    // Duplicate polaroid strip for seamless loop if needed
    const polaroidStrip = document.querySelector('.polaroid-strip');
    if (polaroidStrip) {
    const clone = polaroidStrip.cloneNode(true);
    polaroidStrip.parentNode.appendChild(clone);
    }
})();