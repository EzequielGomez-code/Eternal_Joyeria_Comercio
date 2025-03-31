document.addEventListener("DOMContentLoaded", function() {
  // Ocultar pantalla Glitch y mostrar el contenido principal
  const glitchScreen = document.getElementById("glitch-screen");
  if (glitchScreen) {
    glitchScreen.style.display = "none";
  }
  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    mainContent.classList.remove("hidden");
  }

  // Menú Desplegable
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", function(e) {
      e.stopPropagation();
      menuToggle.classList.toggle("active");
      const submenu = menuToggle.querySelector(".submenu");
      if (submenu) {
        submenu.classList.toggle("hidden");
      }
    });
  }
  document.addEventListener("click", function() {
    const menuToggle = document.getElementById("menu-toggle");
    if (menuToggle) {
      const submenu = menuToggle.querySelector(".submenu");
      if (submenu && !submenu.classList.contains("hidden")) {
        submenu.classList.add("hidden");
        menuToggle.classList.remove("active");
      }
    }
  });

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function() {
      document.body.classList.toggle("dark-mode");
    });
  }

  // Modal de Ubicación
  const locationIcon = document.getElementById("location-icon");
  const locationModal = document.getElementById("location-modal");
  if (locationIcon && locationModal) {
    const modalClose = locationModal.querySelector(".close");
    locationIcon.addEventListener("click", function() {
      locationModal.classList.remove("hidden");
    });
    if (modalClose) {
      modalClose.addEventListener("click", function() {
        locationModal.classList.add("hidden");
      });
    }
    window.addEventListener("click", function(e) {
      if (e.target === locationModal) {
        locationModal.classList.add("hidden");
      }
    });
  }

  // Buscador Funcional
  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", function() {
      const searchInput = document.getElementById("search");
      if (searchInput) {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
          const catalogo = [
            { nombre: "rolex submariner" },
            { nombre: "rolex gmt-master II" },
            { nombre: "rolex day-date 36" },
            { nombre: "patek philippe aquanaut" },
            { nombre: "patek philippe calatrava" },
            { nombre: "colgante de mujer maria" },
            { nombre: "colgante de mujer abtei" }
          ];
          const found = catalogo.find(item => item.nombre.includes(query));
          if (found) {
            window.location.href = "catalogo.html?search=" + encodeURIComponent(query);
          } else {
            alert("No se encontró el producto: " + query);
          }
        }
      }
    });
  }

  // Efecto Scroll
  document.addEventListener("scroll", function() {
    document.querySelectorAll("#scroll-effect img").forEach(img => {
      if (img.getBoundingClientRect().top < window.innerHeight * 0.8) {
        img.classList.add("show");
      }
    });
  });

  // Carrusel (si existe)
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    const carouselImages = document.querySelectorAll('.carousel-container img');
    const totalImages = carouselImages.length;
    const imagesPerSlide = 3;
    const slidesCount = Math.ceil(totalImages / imagesPerSlide);
    let currentSlide = 0;
    const sliderSpeed = 5000;
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slidesCount;
      carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, sliderSpeed);
  }

  // Chatbot (Simulación GPT)
  const chatToggle = document.getElementById("chat-toggle");
  if (chatToggle) {
    const chatbox = document.getElementById("chatbox");
    const sendMsgBtn = document.getElementById("send-msg");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");
    chatToggle.addEventListener("click", function() {
      chatbox.classList.toggle("hidden");
    });
    sendMsgBtn.addEventListener("click", function() {
      const message = chatInput.value.trim();
      if (message !== "") {
        appendMessage("usuario", message);
        const response = simulateGPTResponse(message);
        setTimeout(() => {
          appendMessage("bot", response);
        }, 1000);
        chatInput.value = "";
      }
    });
    function appendMessage(sender, text) {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("chat-message", sender);
      msgDiv.textContent = text;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    function simulateGPTResponse(message) {
      const msg = message.toLowerCase();
      if (msg.includes("rolex")) {
        return "Encontramos varios modelos de Rolex, ¿te gustaría ver el Rolex Submariner o el Rolex Day-Date?";
      } else if (msg.includes("patek")) {
        return "El Patek Philippe Nautilus es uno de nuestros modelos destacados.";
      } else if (msg.includes("precio") || msg.includes("cuánto")) {
        return "Nuestros productos son de alta gama. Por favor, visita el catálogo para ver precios detallados.";
      } else {
        return "Lo siento, no tengo información sobre eso. ¿Podrías reformular tu consulta?";
      }
    }
  }

  // **************** Funcionalidad del Carrito ****************
  // Asignamos evento a los botones "Agregar al Carrito" (solo en catálogo)
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function(){
      // Se esperan atributos data-* en el botón:
      const productId = btn.getAttribute('data-id');
      const productName = btn.getAttribute('data-name');
      const productPrice = parseFloat(btn.getAttribute('data-price'));
      const productImage = btn.getAttribute('data-image');
      addToCart(productId, productName, productPrice, productImage);
    });
  });
  
  function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProduct = cart.find(item => item.id === id);
    if(existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ id, name, price, image, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
    alert(`${name} ha sido agregado al carrito.`);
  }
});
