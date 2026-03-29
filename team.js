document.addEventListener("DOMContentLoaded", function () {

  const style = document.createElement("style");
  style.textContent = `
    @keyframes riseUp {
      from { opacity: 0; transform: translateY(50px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes particleDrift {
      0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
      50%  { opacity: 0.2; }
      100% { opacity: 0; transform: translateY(-80px) rotate(180deg); }
    }
    @keyframes borderGlow {
      0%, 100% { border-color: rgba(201,161,74,0.25); }
      50%       { border-color: rgba(201,161,74,0.6); }
    }
  `;
  document.head.appendChild(style);

  const section = document.querySelector(".team-text");

  // 1) PARTICULES DORÉES
  if (section) {
    section.style.position = "relative";
    section.style.overflow = "hidden";
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 5 + 2;
      p.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        background: #c9a14a; border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        pointer-events: none;
        animation: particleDrift ${Math.random() * 7 + 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      section.appendChild(p);
    }

    // GLOW BORDER
    section.style.animation = "borderGlow 4s ease-in-out infinite";
  }

  // 2) TITRE ÉLÉGANT
  const title = document.querySelector(".team-text h2");
  if (title) {
    title.style.opacity = "0";
    title.style.transform = "translateY(-20px)";
    title.style.transition = "all 0.8s ease";
    setTimeout(() => {
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
    }, 200);
  }

  // 3) PARAGRAPHES AVEC DÉLAI
  const paragraphs = document.querySelectorAll(".team-text p");
  paragraphs.forEach((p, i) => {
    p.style.opacity = "0";
    p.style.transform = "translateY(25px)";
    p.style.transition = "all 0.7s ease";
    p.style.borderLeft = "0px solid #c9a14a";
    setTimeout(() => {
      p.style.opacity = "1";
      p.style.transform = "translateY(0)";
    }, 400 + i * 250);

    // Hover élégant
    p.addEventListener("mouseenter", function () {
      this.style.paddingLeft = "14px";
      this.style.borderLeft = "3px solid #c9a14a";
      this.style.color = "#f5f1e8";
      this.style.transition = "all 0.3s ease";
    });
    p.addEventListener("mouseleave", function () {
      this.style.paddingLeft = "0";
      this.style.borderLeft = "0px solid #c9a14a";
      this.style.color = "";
    });
  });

  // 4) BOUTON BACK HOME
  const btn = document.querySelector(".team-text a");
  if (btn) {
    btn.style.cssText = `
      display: inline-block; margin-top: 30px;
      padding: 13px 35px;
      background: transparent;
      border: 1px solid #c9a14a;
      color: #c9a14a; border-radius: 10px;
      font-size: 15px; cursor: pointer;
      opacity: 0; transition: all 0.3s ease;
      letter-spacing: 1px;
    `;
    setTimeout(() => {
      btn.style.opacity = "1";
      btn.style.transform = "translateY(0)";
    }, 1600);
    btn.addEventListener("mouseenter", function () {
      this.style.background = "#c9a14a";
      this.style.color = "#111";
      this.style.letterSpacing = "2px";
      this.style.boxShadow = "0 5px 20px rgba(201,161,74,0.35)";
    });
    btn.addEventListener("mouseleave", function () {
      this.style.background = "transparent";
      this.style.color = "#c9a14a";
      this.style.letterSpacing = "1px";
      this.style.boxShadow = "none";
    });
  }

  // 5) COMPTEUR DE MOTS
  let words = 0;
  paragraphs.forEach(p => words += p.textContent.trim().split(/\s+/).length);
  const info = document.createElement("p");
  info.style.cssText = "color:#444;font-size:0.75rem;margin-top:25px;letter-spacing:1px;";
  info.textContent = "✍️ " + words + " mots · Prestige Drive © 2026";
  if (section) {
    setTimeout(() => {
      section.appendChild(info);
      info.style.transition = "color 1s ease";
      setTimeout(() => info.style.color = "#666", 500);
    }, 2000);
  }

});