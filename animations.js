document.addEventListener("DOMContentLoaded", function () {

  // 1) PARTICULES DORÉES DANS LE HERO
  const hero = document.querySelector(".hero");
  if (hero) {
    for (let i = 0; i < 25; i++) {
      const dot = document.createElement("div");
      const size = Math.random() * 4 + 2;
      dot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: #c9a14a;
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: 0;
        pointer-events: none;
        animation: floatUp ${Math.random() * 6 + 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        z-index: 1;
      `;
      hero.appendChild(dot);
    }
    const style = document.createElement("style");
    style.textContent = `
      @keyframes floatUp {
        0%   { opacity: 0; transform: translateY(0) scale(1); }
        50%  { opacity: 0.25; transform: translateY(-40px) scale(1.3); }
        100% { opacity: 0; transform: translateY(-80px) scale(0.7); }
      }
      @keyframes fadeSlideDown {
        from { opacity: 0; transform: translateY(-30px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(40px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
    `;
    document.head.appendChild(style);
  }

  // 2) ANIMATION HEADER
  const header = document.querySelector("header");
  if (header) {
    header.style.animation = "fadeSlideDown 0.8s ease forwards";
  }

  // 3) HERO CONTENT ANIMATION
  const heroH1 = document.querySelector(".hero-content h1");
  const heroP = document.querySelector(".hero-content p");
  const heroBtns = document.querySelectorAll(".hero-content .btn");

  if (heroH1) {
    heroH1.style.opacity = "0";
    heroH1.style.background = "linear-gradient(90deg, #fff 0%, #c9a14a 50%, #fff 100%)";
    heroH1.style.backgroundSize = "200% auto";
    heroH1.style.webkitBackgroundClip = "text";
    heroH1.style.webkitTextFillColor = "transparent";
    heroH1.style.backgroundClip = "text";
    setTimeout(() => {
      heroH1.style.transition = "opacity 1s ease";
      heroH1.style.opacity = "1";
      heroH1.style.animation = "shimmer 3s linear infinite";
    }, 300);
  }

  if (heroP) {
    heroP.style.opacity = "0";
    heroP.style.transform = "translateY(20px)";
    heroP.style.transition = "all 0.8s ease";
    setTimeout(() => {
      heroP.style.opacity = "1";
      heroP.style.transform = "translateY(0)";
    }, 700);
  }

  heroBtns.forEach((btn, i) => {
    btn.style.opacity = "0";
    btn.style.transform = "translateY(20px)";
    btn.style.transition = "all 0.6s ease";
    setTimeout(() => {
      btn.style.opacity = "1";
      btn.style.transform = "translateY(0)";
    }, 1000 + i * 200);
  });

  // 4) SCROLL REVEAL GÉNÉRAL
  const revealItems = document.querySelectorAll(
    ".feature, .stat, .testimonial, .reservation h2, .features h2"
  );
  revealItems.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(35px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  });

  function revealOnScroll() {
    revealItems.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, i * 80);
      }
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // 5) COMPTEURS ANIMÉS
  let counted = false;
  const stats = document.querySelectorAll(".stat h2");

  function runCounters() {
    if (counted) return;
    const targets = [500, 120, 5];
    const suffixes = ["", "", " ans"];
    stats.forEach((el, i) => {
      if (targets[i] === undefined) return;
      let count = 0;
      const step = Math.ceil(targets[i] / 60);
      const timer = setInterval(() => {
        count += step;
        if (count >= targets[i]) {
          count = targets[i];
          clearInterval(timer);
        }
        el.textContent = "+" + count + suffixes[i];
      }, 25);
    });
    counted = true;
  }

  window.addEventListener("scroll", function () {
    const statsSection = document.querySelector(".stats");
    if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight) {
      runCounters();
    }
  });

  // 6) FEATURES EFFET 3D HOVER
  document.querySelectorAll(".feature").forEach(f => {
    f.style.transition = "transform 0.3s ease, border-color 0.3s ease";
    f.addEventListener("mousemove", function (e) {
      const r = f.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / 12;
      const y = (e.clientY - r.top - r.height / 2) / 12;
      f.style.transform = `perspective(500px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.04)`;
    });
    f.addEventListener("mouseleave", () => {
      f.style.transform = "perspective(500px) rotateY(0) rotateX(0) scale(1)";
    });
  });

  // 7) TESTIMONIALS AUTO HIGHLIGHT
  const testimonials = document.querySelectorAll(".testimonial");
  let current = 0;
  if (testimonials.length > 0) {
    testimonials.forEach((t, i) => {
      t.style.transition = "all 0.6s ease";
      t.style.borderLeftColor = i === 0 ? "#c9a14a" : "#333";
      t.style.opacity = i === 0 ? "1" : "0.4";
      t.style.transform = i === 0 ? "scale(1.02)" : "scale(1)";
    });
    setInterval(() => {
      testimonials[current].style.borderLeftColor = "#333";
      testimonials[current].style.opacity = "0.4";
      testimonials[current].style.transform = "scale(1)";
      current = (current + 1) % testimonials.length;
      testimonials[current].style.borderLeftColor = "#c9a14a";
      testimonials[current].style.opacity = "1";
      testimonials[current].style.transform = "scale(1.02)";
    }, 2500);
  }

  // 8) PARALLAX HERO
  window.addEventListener("scroll", () => {
    if (hero) hero.style.backgroundPositionY = window.scrollY * 0.35 + "px";
  });

  // 9) NAV LIENS ACTIFS AU SCROLL
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");
  window.addEventListener("scroll", () => {
    let active = "";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) active = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute("href") === "#" + active ? "#c9a14a" : "";
    });
  });

  // 10) BOUTON SCROLL TOP ÉLÉGANT
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑";
  scrollBtn.style.cssText = `
    position: fixed; bottom: 35px; right: 35px;
    width: 48px; height: 48px;
    background: linear-gradient(135deg, #c9a14a, #f4d27a);
    color: #000; border: none; border-radius: 50%;
    font-size: 1.2rem; font-weight: bold;
    cursor: pointer; display: none; z-index: 999;
    box-shadow: 0 4px 20px rgba(201,161,74,0.4);
    transition: all 0.3s ease;
  `;
  scrollBtn.addEventListener("mouseenter", () => {
    scrollBtn.style.transform = "scale(1.1)";
    scrollBtn.style.boxShadow = "0 6px 25px rgba(201,161,74,0.6)";
  });
  scrollBtn.addEventListener("mouseleave", () => {
    scrollBtn.style.transform = "scale(1)";
    scrollBtn.style.boxShadow = "0 4px 20px rgba(201,161,74,0.4)";
  });
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(scrollBtn);
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

});