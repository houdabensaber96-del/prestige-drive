document.addEventListener("DOMContentLoaded", function () {

  const allCars = [
    { name: "Mercedes Classe S", brand: "Mercedes", image: "77.png", price: 3300, speed: "220-250 km/h" },
    { name: "Mercedes AMG GT", brand: "Mercedes", image: "mercedes-amg.png", price: 3500, speed: "250-290 km/h" },
    { name: "Mercedes GLE", brand: "Mercedes", image: "22.png", price: 2800, speed: "200-240 km/h" },
    { name: "Mercedes ARO", brand: "Mercedes", image: "mercedes-gle.png", price: 2800, speed: "200-240 km/h" },
    { name: "Bugatti Veyron", brand: "Bugatti", image: "bugatti-veyron.png", price: 1800, speed: "280+ km/h" },
    { name: "Bugatti Veyron 2", brand: "Bugatti", image: "ff.png", price: 1800, speed: "280+ km/h" },
    { name: "Bugatti Deler", brand: "Bugatti", image: "do.png", price: 1800, speed: "280+ km/h" },
    { name: "Ferrari", brand: "Ferrari", image: "jj.png", price: 1300, speed: "200-260 km/h" },
    { name: "Ferrari Roma", brand: "Ferrari", image: "ferrari-roma.png", price: 1500, speed: "220-270 km/h" },
    { name: "Ferrari SF90", brand: "Ferrari", image: "ferrari-sf90.png", price: 1800, speed: "250+ km/h" },
    { name: "Ferrari SF95", brand: "Ferrari", image: "ki.png", price: 1800, speed: "250+ km/h" },
    { name: "Porsche Cayenne", brand: "Porsche", image: "oo.png", price: 1700, speed: "300+ km/h" },
    { name: "Porsche 911", brand: "Porsche", image: "porsche-911.png", price: 1900, speed: "280+ km/h" },
    { name: "Porsche Panamera", brand: "Porsche", image: "porsche-panamera.png", price: 1600, speed: "260+ km/h" },
    { name: "Porsche Litare", brand: "Porsche", image: "ko.png", price: 1600, speed: "260+ km/h" },
    { name: "Audi Q8", brand: "Audi", image: "aa.png", price: 1700, speed: "200-260 km/h" },
    { name: "Audi R8", brand: "Audi", image: "audi-r8.png", price: 2200, speed: "280+ km/h" },
    { name: "Audi A8", brand: "Audi", image: "audi-a8.png", price: 1500, speed: "220-250 km/h" },
    { name: "Audi B12", brand: "Audi", image: "mo.png", price: 1500, speed: "220-250 km/h" },
    { name: "Range Rover", brand: "Range Rover", image: "cc.png", price: 1700, speed: "180-220 km/h" },
    { name: "Range Rover Sport", brand: "Range Rover", image: "rr-sport.png", price: 1900, speed: "200-240 km/h" },
    { name: "Range Rover Velar", brand: "Range Rover", image: "rr-velar.png", price: 1500, speed: "180-220 km/h" },
    { name: "Range Rover Molar", brand: "Range Rover", image: "pi.png", price: 1500, speed: "180-220 km/h" },
    { name: "Volkswagen", brand: "Volkswagen", image: "bb.png", price: 1700, speed: "180-220 km/h" },
    { name: "Volkswagen Golf R", brand: "Volkswagen", image: "vw-golf.png", price: 1200, speed: "160-200 km/h" },
    { name: "Volkswagen Golf S", brand: "Volkswagen", image: "ui.png", price: 1200, speed: "160-200 km/h" },
    { name: "Volkswagen Golf F", brand: "Volkswagen", image: "ua.png", price: 1200, speed: "160-200 km/h" },
    { name: "Peugeot", brand: "Peugeot", image: "dd.png", price: 3300, speed: "180-220 km/h" },
    { name: "Peugeot 508", brand: "Peugeot", image: "peugeot-508.png", price: 900, speed: "160-200 km/h" },
    { name: "Peugeot 620", brand: "Peugeot", image: "za.png", price: 900, speed: "160-200 km/h" },
    { name: "Peugeot 842", brand: "Peugeot", image: "zo.png", price: 900, speed: "160-200 km/h" }
  ];

  // 1) AFFICHER LES DÉTAILS
  const params = new URLSearchParams(window.location.search);
  const car = {
    name: params.get("name"),
    brand: params.get("brand"),
    price: parseInt(params.get("price")),
    speed: params.get("speed"),
    image: params.get("image")
  };

  if (!car.name) {
    document.body.innerHTML = "<h2 style='color:white;text-align:center;margin-top:150px;'>Aucune voiture sélectionnée</h2>";
    return;
  }

  document.getElementById("carImage").src = car.image;
  document.getElementById("carImage").alt = car.name;
  document.getElementById("carName").textContent = car.name;
  document.getElementById("carPrice").textContent = car.price + " DH";
  document.getElementById("carSpeed").textContent = car.speed;
  document.getElementById("carBrand").textContent = car.brand;

  // 2) VOITURES SIMILAIRES
  const similarGrid = document.getElementById("similarGrid");
  const similar = allCars.filter(c => c.brand === car.brand && c.name !== car.name);

  if (similar.length === 0) {
    similarGrid.innerHTML = "<p class='no-similar'>Aucune voiture similaire trouvée.</p>";
  } else {
    similar.forEach(function (item) {
      const card = document.createElement("div");
      card.classList.add("similar-card");
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="similar-card-info">
          <h3>${item.name}</h3>
          <p>💰 ${item.price} DH / jour</p>
          <p>⚡ ${item.speed}</p>
          <p>🏷️ ${item.brand}</p>
        </div>
      `;
      card.addEventListener("click", function () {
        const p = new URLSearchParams({
          name: item.name,
          brand: item.brand,
          price: item.price,
          speed: item.speed,
          image: item.image
        });
        window.location.href = "car-details.html?" + p.toString();
      });
      similarGrid.appendChild(card);
    });
  }

});