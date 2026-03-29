document.addEventListener("DOMContentLoaded", function () {

  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeRight {
      from { opacity: 0; transform: translateX(50px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes glowBorder {
      0%, 100% { box-shadow: 0 0 10px rgba(201,161,74,0.2); }
      50%       { box-shadow: 0 0 25px rgba(201,161,74,0.5); }
    }
  `;
  document.head.appendChild(style);

  // 1) IMAGE AVEC ANIMATION + EFFET GLOW
  const img = document.querySelector(".about img");
  if (img) {
    img.style.opacity = "0";
    img.style.transform = "translateX(-50px)";
    img.style.transition = "all 0.9s ease";
    setTimeout(() => {
      img.style.opacity = "1";
      img.style.transform = "translateX(0)";
      img.style.animation = "glowBorder 3s ease-in-out infinite";
    }, 300);

    // Effet 3D hover
    img.addEventListener("mousemove", function (e) {
      const r = img.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / 18;
      const y = (e.clientY - r.top - r.height / 2) / 18;
      img.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.03)`;
    });
    img.addEventListener("mouseleave", () => {
      img.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale(1)";
    });
  }

  // 2) TITRE ABOUT US
  const title = document.querySelector(".about-text h1");
  if (title) {
    title.style.opacity = "0";
    title.style.transform = "translateX(50px)";
    title.style.transition = "all 0.9s ease 0.2s";
    setTimeout(() => {
      title.style.opacity = "1";
      title.style.transform = "translateX(0)";
    }, 400);
  }

  // 3) PARAGRAPHES UN PAR UN
  const paragraphs = document.querySelectorAll(".about-text p");
  paragraphs.forEach((p, i) => {
    p.style.opacity = "0";
    p.style.transform = "translateY(20px)";
    p.style.transition = "all 0.6s ease";
    setTimeout(() => {
      p.style.opacity = "1";
      p.style.transform = "translateY(0)";
    }, 600 + i * 200);
  });

  // 4) LIEN LEARN MORE EFFET
  const link = document.querySelector(".about-text a");
  if (link) {
    link.style.transition = "all 0.3s ease";
    link.style.display = "inline-block";
    link.addEventListener("mouseenter", function () {
      this.style.letterSpacing = "3px";
      this.style.color = "#f4d27a";
    });
    link.addEventListener("mouseleave", function () {
      this.style.letterSpacing = "normal";
      this.style.color = "";
    });
  }

});