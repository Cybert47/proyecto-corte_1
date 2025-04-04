const MENU_URL = "https://script.google.com/macros/s/AKfycbzQPXGvBAqRyM6zX830AK8nIXx3hQuh8CxJQ17aLGqb5sJ9V1syR0FGwW4LM1fiVNBqCA/exec"

let menuData = {}


  // equipo 
  const teamData = [
    {
      name: "Amy jeanine Nossa",
      role: "Chef Principal",
      specialty: "Repostería Fina",
      image: "/placeholder.svg?height=200&width=200",
      
    },
    {
      name: "Manuel José Cardozo Vanegas",
      role: "Barista Senior",
      specialty: "Café de Especialidad",
      image: "/placeholder.svg?height=200&width=200",
     
    },
    {
      name: "Esteban Hernandez Parra",
      role: "Chef Pastelero",
      specialty: "Pasteles y Postres",
      image: "/placeholder.svg?height=200&width=200",
    
    },
  ]
  
  // estado carrito
  let cart = []
  let currentCategory = "desserts"
  
  // elemento escogidos del dom
  const menuSection = document.getElementById("menu")
  const cartModal = document.getElementById("cartModal")
  const cartItems = document.querySelector(".cart-items")
  const cartTotal = document.getElementById("cartTotal")
  const cartCount = document.querySelector(".cart-count")
  const cartToggle = document.querySelector(".cart-toggle")
  const closeCart = document.querySelector(".close-cart")
  const checkoutBtn = document.getElementById("checkoutBtn")
  const categoryButtons = document.querySelectorAll(".category-btn")
  
  // Eventos DOM
  document.addEventListener("DOMContentLoaded", () => {
    fetchMenuData()
    renderTeam()
    setupEventListeners()
  })

  async function fetchMenuData() {
    try {
      const response = await fetch(MENU_URL);
      const data = await response.json();
      menuData = data; 
      renderMenu(currentCategory)
      console.log(menuData)
    } catch (error) {
      console.error("Error al cargar el menú:", error);
    }
    setupEventListeners()
  }
  
  // evenstos escucha
  function setupEventListeners() {
    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        currentCategory = button.dataset.category
        updateActiveCategory()
        renderMenu(currentCategory)
      })
    })
  
    cartToggle.addEventListener("click", toggleCart)
    closeCart.addEventListener("click", toggleCart)
    checkoutBtn.addEventListener("click", handleCheckout)
  }
  
  // renderizar funciones
  function renderMenu(category) {
    menuSection.innerHTML = menuData[category] ? menuData[category]
      .map(
        (item) => `
          <div class="menu-item">
              <div class="menu-item-image">
                  <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="menu-item-info">
                  <h3>${item.name}</h3>
                  <p>${item.description}</p>
                  <div class="menu-item-footer">
                      <span class="price">$${item.price.toFixed(2)}</span>
                      <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(item).replace(/"/g, "&quot;")})">
                          Agregar al Carrito
                      </button>
                  </div>
              </div>
          </div>
      `,
      )
      .join("") : '<p class="loading">cargando menú...</p>'

      
  }
  
  function renderTeam() {
    const teamGrid = document.querySelector(".team-grid")
    teamGrid.innerHTML = teamData
      .map(
        (member) => `
          <div class="team-member">
              
              <h3>${member.name}</h3>
              <p class="role">${member.role}</p>
              <p class="specialty">${member.specialty}</p>
          </div>
      `,
      )
      .join("")
  }
  
  function renderCart() {
    cartItems.innerHTML = cart
      .map(
        (item) => `
          <div class="cart-item">
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-details">
                  <h4>${item.name}</h4>
                  <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
              </div>
              <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
          </div>
      `,
      )
      .join("")
  
    updateCartTotal()
  }
  
  // funciones carrito
  function addToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
  
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }
  
    updateCart()
    showNotification("Producto agregado al carrito")
  }
  
  function removeFromCart(itemId) {
    cart = cart.filter((item) => item.id !== itemId)
    updateCart()
  }
  
  function updateCart() {
    renderCart()
    updateCartCount()
  }
  
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = count
  }
  
  function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    cartTotal.textContent = `$${total.toFixed(2)}`
  }
  
  function toggleCart() {
    cartModal.classList.toggle("active")
  }
  
  function updateActiveCategory() {
    categoryButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.category === currentCategory)
    })
  }
  
  function showNotification(message) {
    const notification = document.createElement("div")
    notification.className = "notification"
    notification.textContent = message
    document.body.appendChild(notification)
  
    setTimeout(() => {
      notification.classList.add("show")
      setTimeout(() => {
        notification.classList.remove("show")
        setTimeout(() => notification.remove(), 300)
      }, 2000)
    }, 100)
  }
  
  // funcion de pago
  function handleCheckout() {
    if (cart.length === 0) {
      showNotification("El carrito está vacío")
      return
    }
  
    const order = {
      items: cart,
      total: Number.parseFloat(cartTotal.textContent.slice(1)),
      timestamp: new Date().toISOString(),
    }
  
    console.log("Enviando orden:", order)
    showNotification("¡Gracias por tu pedido! Será procesado en breve.")
  
    cart = []
    updateCart()
    toggleCart()
  }
  
  