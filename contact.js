document.addEventListener("DOMContentLoaded", function () {

  // STYLES
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(50px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(201,161,74,0.3); }
      50%       { box-shadow: 0 0 0 8px rgba(201,161,74,0); }
    }
  `;
  document.head.appendChild(style);

  // 1) ANIMATION ENTRÉE
  const left = document.querySelector(".contact-left");
  const right = document.querySelector(".contact-right");
  if (left) left.style.animation = "slideInLeft 0.9s ease forwards";
  if (right) right.style.animation = "slideInRight 0.9s ease 0.2s forwards";
  if (right) right.style.opacity = "0";
  setTimeout(() => { if (right) right.style.opacity = "1"; }, 200);

  // 2) FOCUS ÉLÉGANT SUR INPUTS
  const inputs = document.querySelectorAll(".contact-form input, .contact-form textarea");
  inputs.forEach(input => {
    input.addEventListener("focus", function () {
      this.style.transform = "scale(1.01)";
      this.style.transition = "all 0.3s ease";
      this.style.boxShadow = "0 0 15px rgba(201,161,74,0.15)";
    });
    input.addEventListener("blur", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "none";
    });
  });

  // 3) COMPTEUR CARACTÈRES
  const textarea = document.querySelector(".contact-form textarea");
  if (textarea) {
    textarea.setAttribute("maxlength", "500");
    const counter = document.createElement("p");
    counter.style.cssText = "color:#555;font-size:0.78rem;text-align:right;margin-top:-10px;transition:color 0.3s;";
    counter.textContent = "0 / 500";
    textarea.parentNode.insertBefore(counter, textarea.nextSibling);
    textarea.addEventListener("input", () => {
      const len = textarea.value.length;
      counter.textContent = len + " / 500";
      counter.style.color = len > 450 ? "#e74c3c" : len > 300 ? "#c9a14a" : "#555";
    });
  }

  // 4) HOVER INFO CONTACT
  document.querySelectorAll(".contact-info p").forEach(p => {
    p.style.transition = "all 0.3s ease";
    p.style.cursor = "default";
    p.style.borderRadius = "6px";
    p.style.padding = "4px 8px";
    p.addEventListener("mouseenter", function () {
      this.style.background = "rgba(201,161,74,0.08)";
      this.style.paddingLeft = "14px";
      this.style.color = "#c9a14a";
    });
    p.addEventListener("mouseleave", function () {
      this.style.background = "transparent";
      this.style.paddingLeft = "8px";
      this.style.color = "";
    });
  });

  // 5) VALIDATION + ENVOI
  const btn = document.querySelector(".contact-form button");
  if (btn) {
    btn.style.transition = "all 0.3s ease";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const allInputs = document.querySelectorAll(".contact-form input, .contact-form textarea");
      const name = allInputs[0].value.trim();
      const email = allInputs[1].value.trim();
      const subject = allInputs[2].value.trim();
      const message = allInputs[3].value.trim();

      const oldErr = document.getElementById("contactErr");
      if (oldErr) oldErr.remove();

      if (!name || !email || !subject || !message) {
        showError("⚠️ Veuillez remplir tous les champs.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("⚠️ Adresse email invalide.");
        return;
      }
      if (message.length < 10) {
        showError("⚠️ Message trop court.");
        return;
      }

      btn.textContent = "✉️ Envoi en cours...";
      btn.disabled = true;
      btn.style.animation = "pulse 1s infinite";

      setTimeout(() => {
        const form = document.querySelector(".contact-form");
        form.style.transition = "all 0.5s ease";
        form.style.opacity = "0";
        form.style.transform = "scale(0.96)";
        setTimeout(() => {
          form.style.display = "none";
          const success = document.createElement("div");
          success.style.cssText = `
            background: linear-gradient(145deg, #141414, #1c1c1c);
            border: 1px solid rgba(201,161,74,0.35);
            border-radius: 18px; padding: 45px;
            text-align: center; color: white;
            animation: slideInRight 0.6s ease forwards;
          `;
          success.innerHTML = `
            <div style="font-size:3.5rem;margin-bottom:18px;">✅</div>
            <h3 style="color:#c9a14a;font-size:1.6rem;margin-bottom:12px;">Message envoyé !</h3>
            <p style="color:#bbb;margin-bottom:8px;">Merci <strong style="color:white;">${name}</strong> !</p>
            <p style="color:#bbb;">Sujet : <strong style="color:#c9a14a;">${subject}</strong></p>
            <p style="color:#666;margin-top:18px;font-size:0.85rem;">Réponse sous 24h — contact@prestigedrive.com</p>
          `;
          form.parentNode.appendChild(success);
        }, 500);
      }, 1500);
    });
  }

  function showError(msg) {
    const err = document.createElement("p");
    err.id = "contactErr";
    err.style.cssText = "color:#e74c3c;text-align:center;margin-top:10px;font-size:14px;";
    err.textContent = msg;
    document.querySelector(".contact-form").appendChild(err);
    setTimeout(() => err.remove(), 3000);
  }

});