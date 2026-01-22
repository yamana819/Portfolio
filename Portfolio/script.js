document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const sidebar = document.getElementById('sidebarMenu');

    if (sidebar) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn btn-dark d-md-none mobile-nav-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '20px';
        toggleBtn.style.left = '20px';
        toggleBtn.style.zIndex = '1100';
        toggleBtn.style.width = '45px';
        toggleBtn.style.height = '45px';
        toggleBtn.style.borderRadius = '50%';
        toggleBtn.style.border = '2px solid var(--neon-cyan)';
        toggleBtn.style.backgroundColor = 'rgba(22, 25, 37, 0.9)';
        toggleBtn.style.color = '#fff';
        toggleBtn.style.boxShadow = '0 0 10px rgba(0, 247, 255, 0.3)';

        body.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show-mobile-menu');
            
            if (sidebar.classList.contains('show-mobile-menu')) {
                toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
                toggleBtn.style.borderColor = 'var(--neon-pink)';
            } else {
                toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
                toggleBtn.style.borderColor = 'var(--neon-cyan)';
            }
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768) { 
                if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                    sidebar.classList.remove('show-mobile-menu');
                    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    toggleBtn.style.borderColor = 'var(--neon-cyan)';
                }
            }
        });
    }

    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-link');
    menuItem.forEach(item => {
        if(item.href === currentLocation){
            item.classList.add("active");
        }
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[placeholder="Adınız Soyadınız"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if (name === "" || email === "" || message === "") {
                alert("Lütfen tüm alanları doldurunuz!");
                return;
            }

            if (!email.includes("@")) {
                alert("Geçerli bir e-posta adresi giriniz!");
                return;
            }

            alert(`Mesajınız alındı ${name}! (Bu bir demo gönderimidir)`);
            this.reset();
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const animateSelectors = [
        '.welcome-text', '.job-title', '.intro-desc', '.btn-custom-primary', 
        '.btn-custom-outline', '.profile-glow-container',
        '.section-title', '.section-desc',
        '.about-text-container', '.interest-card', 
        '.cv-block-card', '.project-card',
        '.contact-info-box', '.contact-form-box'
    ];

    const hiddenElements = document.querySelectorAll(animateSelectors.join(','));
    hiddenElements.forEach((el) => {
        el.classList.add('hidden-animate');
        observer.observe(el);
    });
});