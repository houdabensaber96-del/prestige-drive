document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // 1) ANIMATION COLLECTION
  // =========================
  const header = document.querySelector("header");
  const title = document.querySelector(".collection h2");
  const subtitle = document.querySelector(".collection-subtitle");
  const cards = document.querySelectorAll(".car-card");

  if (header) {
    header.style.opacity = "0";
    header.style.transform = "translateY(-30px)";
    header.style.transition = "all 0.8s ease";

    setTimeout(() => {
      header.style.opacity = "1";
      header.style.transform = "translateY(0)";
    }, 200);
  }

  if (title) {
    title.style.opacity = "0";
    title.style.transform = "translateY(20px)";
    title.style.transition = "all 0.8s ease";

    setTimeout(() => {
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
    }, 400);
  }

  if (subtitle) {
    subtitle.style.opacity = "0";
    subtitle.style.transform = "translateY(20px)";
    subtitle.style.transition = "all 0.8s ease";

    setTimeout(() => {
      subtitle.style.opacity = "1";
      subtitle.style.transform = "translateY(0)";
    }, 600);
  }

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 800 + index * 200);

    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // =========================
  // 2) RÉSERVATION
  // =========================
  const form = document.getElementById("reservation-form");
  const carSelect = document.getElementById("carSelect");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const driverOption = document.getElementById("driverOption");
  const insuranceOption = document.getElementById("insuranceOption");

  const dailyPrice = document.getElementById("dailyPrice");
  const totalDays = document.getElementById("totalDays");
  const optionsPrice = document.getElementById("optionsPrice");
  const totalPrice = document.getElementById("totalPrice");
  const successMessage = document.getElementById("successMessage");

  function calculateTotal() {
    if (
      !carSelect ||
      !startDate ||
      !endDate ||
      !driverOption ||
      !insuranceOption ||
      !dailyPrice ||
      !totalDays ||
      !optionsPrice ||
      !totalPrice
    ) {
      return;
    }

    let pricePerDay = 0;
    let days = 0;
    let extraOptions = 0;
    let total = 0;

    const selectedOption = carSelect.options[carSelect.selectedIndex];

    if (selectedOption && selectedOption.dataset.price) {
      pricePerDay = parseInt(selectedOption.dataset.price, 10);
    }

    if (startDate.value && endDate.value) {
      const start = new Date(startDate.value);
      const end = new Date(endDate.value);

      if (end >= start) {
        const diffTime = end - start;
        days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      } else {
        days = 0;
      }
    }

    if (driverOption.checked) {
      extraOptions += 500;
    }

    if (insuranceOption.checked) {
      extraOptions += 200;
    }

    total = pricePerDay * days + extraOptions;

    dailyPrice.textContent = pricePerDay;
    totalDays.textContent = days;
    optionsPrice.textContent = extraOptions;
    totalPrice.textContent = total;
  }

  if (startDate && endDate) {
    startDate.addEventListener("change", function () {
      endDate.min = startDate.value;
      calculateTotal();
    });
  }

  if (carSelect) carSelect.addEventListener("change", calculateTotal);
  if (startDate) startDate.addEventListener("change", calculateTotal);
  if (endDate) endDate.addEventListener("change", calculateTotal);
  if (driverOption) driverOption.addEventListener("change", calculateTotal);
  if (insuranceOption) insuranceOption.addEventListener("change", calculateTotal);

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!startDate.value || !endDate.value) {
        alert("Veuillez choisir la date de départ et la date de retour.");
        return;
      }

      if (carSelect.value === "") {
        alert("Veuillez choisir une voiture.");
        return;
      }

      const start = new Date(startDate.value);
      const end = new Date(endDate.value);

      if (end < start) {
        alert("La date de retour ne peut pas être avant la date de départ.");
        return;
      }

      if (successMessage) {
        successMessage.style.display = "block";
        successMessage.innerHTML = `
          <h3>Réservation confirmée avec succès</h3>
          <p class="success-title">Votre demande a bien été envoyée.</p>
          <p><strong>Nom :</strong> ${document.getElementById("fullName")?.value || ""}</p>
          <p><strong>Email :</strong> ${document.getElementById("email")?.value || ""}</p>
          <p><strong>Voiture :</strong> ${carSelect.value}</p>
          <p><strong>Date de départ :</strong> ${startDate.value}</p>
          <p><strong>Date de retour :</strong> ${endDate.value}</p>
          <p><strong>Lieu de récupération :</strong> ${document.getElementById("pickupLocation")?.value || ""}</p>
          <p><strong>Lieu de retour :</strong> ${document.getElementById("returnLocation")?.value || ""}</p>
          <p><strong>Nombre de jours :</strong> ${totalDays.textContent}</p>
          <p><strong>Options :</strong> ${optionsPrice.textContent} DH</p>
          <p class="success-total">Montant total à payer : ${totalPrice.textContent} DH</p>
        `;
      }

      form.reset();

      if (dailyPrice) dailyPrice.textContent = "0";
      if (totalDays) totalDays.textContent = "0";
      if (optionsPrice) optionsPrice.textContent = "0";
      if (totalPrice) totalPrice.textContent = "0";
      if (endDate) endDate.min = "";
    });
  }

  // =========================
  // 3) SIGN IN / SIGN UP
  // =========================
  const authModal = document.getElementById("authModal");
  const authTitle = document.getElementById("authTitle");
  const authName = document.getElementById("authName");
  const authEmail = document.getElementById("authEmail");
  const authPassword = document.getElementById("authPassword");
  const authSubmitBtn = document.getElementById("authSubmitBtn");
  const userArea = document.getElementById("userArea");
  const authError = document.getElementById("authError");

  let isSignUpMode = false;

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function renderAuthText() {
    if (
      !authTitle ||
      !authName ||
      !authSubmitBtn ||
      !authError
    ) {
      return;
    }

    const authToggleText = document.getElementById("authToggleText");

    if (!authToggleText) {
      return;
    }

    authError.textContent = "";
    authName.value = "";
    if (authEmail) authEmail.value = "";
    if (authPassword) authPassword.value = "";

    if (isSignUpMode) {
      authTitle.textContent = "Créer un compte";
      authSubmitBtn.textContent = "S'inscrire";
      authName.style.display = "block";
      authToggleText.innerHTML =
        'Vous avez déjà un compte ? <span id="toggleAuthMode">Se connecter</span>';
    } else {
      authTitle.textContent = "Connexion";
      authSubmitBtn.textContent = "Se connecter";
      authName.style.display = "none";
      authToggleText.innerHTML =
        'Vous n’avez pas de compte ? <span id="toggleAuthMode">Créer un compte</span>';
    }

    const toggleAuthMode = document.getElementById("toggleAuthMode");
    if (toggleAuthMode) {
      toggleAuthMode.addEventListener("click", function () {
        isSignUpMode = !isSignUpMode;
        renderAuthText();
      });
    }
  }

  function updateUserArea() {
    if (!userArea || !authModal) {
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      userArea.innerHTML = `
        <span>Bonjour, ${currentUser.name}</span>
        <button class="logout-btn" id="logoutBtn">Déconnexion</button>
      `;

      authModal.style.display = "none";

      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
          localStorage.removeItem("currentUser");
          location.reload();
        });
      }
    } else {
      userArea.innerHTML = "";
      authModal.style.display = "flex";
    }
  }

  if (authSubmitBtn) {
    authSubmitBtn.addEventListener("click", function () {
      if (!authEmail || !authPassword || !authError) {
        return;
      }

      const nameValue = authName ? authName.value.trim() : "";
      const emailValue = authEmail.value.trim();
      const passwordValue = authPassword.value.trim();

      let users = JSON.parse(localStorage.getItem("users")) || [];

      authError.textContent = "";

      if (!emailValue || !passwordValue || (isSignUpMode && !nameValue)) {
        authError.textContent = "Veuillez remplir tous les champs.";
        return;
      }

      if (!isValidEmail(emailValue)) {
        authError.textContent = "Veuillez entrer une adresse email valide.";
        return;
      }

      if (passwordValue.length < 6) {
        authError.textContent =
          "Le mot de passe doit contenir au moins 6 caractères.";
        return;
      }

      if (isSignUpMode) {
        const userExists = users.find((user) => user.email === emailValue);

        if (userExists) {
          authError.textContent = "Cet email existe déjà.";
          return;
        }

        const newUser = {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        updateUserArea();
      } else {
        const foundUser = users.find(
          (user) =>
            user.email === emailValue && user.password === passwordValue
        );

        if (!foundUser) {
          authError.textContent = "Email ou mot de passe incorrect.";
          return;
        }

        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        updateUserArea();
      }
    });
  }

  renderAuthText();
  updateUserArea();
});



const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(button => {
  button.addEventListener("click", function () {
    const card = this.closest(".car-card");

    const params = new URLSearchParams({
      name: card.dataset.name,
      brand: card.dataset.brand,
      price: card.dataset.price,
      speed: card.dataset.speed,
      image: card.dataset.image
    });

    window.location.href = "car-details.html?" + params.toString();
  });
});