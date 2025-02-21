// datos del menu
const menuData = {
    starters: [
      {
        id: 1,
        name: "Brownies de Chocolate",
        description: "Deliciosos brownies caseros con chocolate derretido",
        price: 6.99,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/postre4.jpg-n3ZOc8GkBDTS3vZqykqYChYnnaiLnl.jpeg",
      },
      {
        id: 2,
        name: "Pastel de Fresa",
        description: "Pastel cremoso con fresas frescas y salsa de fresa",
        price: 7.99,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/postre6.jpg-uLyWPGp4EELKLaDVHdh6m3s5PAOXQO.jpeg",
      },
      {
        id: 3,
        name: "Waffles con Miel",
        description: "Waffles dorados con miel pura de maple",
        price: 8.99,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/postre3.jpg-zVU9ys5bnEoXDyfq2dPvzz4t0cJq9f.jpeg",
      },
      {
        id: 4,
        name: "Pie de Limón",
        description: "Pie de limón con merengue dorado",
        price: 6.99,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/postre5.jpg-B5Ovyv5VOatKRZSzKrO5PaVlOY3cts.jpeg",
      },
    ],
    snacks: [
      {
        id: 5,
        name: "Rollo de Canela",
        description: "Rollo de canela recién horneado con glaseado",
        price: 4.99,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/entrada1.jpg-wLDKOpOIb6yqG3YLIvym9TnNxEawUB.jpeg",
      },
      {
        id: 6,
        name: "Waffles Especiales",
        description: "Waffles belgas con sirope de maple casero",
        price: 9.99,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/entrada2.jpg-acEovrc8I5NDPmtcVycK8rB5Q1A2iJ.jpeg",
      },
      {
        id: 7,
        name: "Galletas con Chispas",
        description: "Galletas suaves con chispas de chocolate",
        price: 3.99,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/entrada3.jpg-VgcfBipM5PnusePzLVaHI0TmnFWTHs.jpeg",
      },
    ],
    drinks: [
      {
        id: 8,
        name: "Chocolate Caliente",
        description: "Chocolate caliente con crema batida y chocolate",
        price: 5.99,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bebida1.jpg-cxHLofRvyG8RfNmcBaghJ7w5ptw8S6.jpeg",
      },
      {
        id: 9,
        name: "Café con Crema",
        description: "Café especial con crema batida y canela",
        price: 4.99,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bebida2.jpg-GeCg2QAn59gM0prKAHEMFuCzjR3a5M.jpeg",
      },
      {
        id: 10,
        name: "Cappuccino",
        description: "Cappuccino italiano con espuma cremosa",
        price: 4.99,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bebida3.jpg-RLt9XlylxtwpvehpxB4WwkfHteNXU6.jpeg",
      },
    ],
    desserts: [
        {
          id: 8,
          name: "Chocolate Caliente",
          description: "Chocolate caliente con crema batida y chocolate",
          price: 5.99,
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bebida1.jpg-cxHLofRvyG8RfNmcBaghJ7w5ptw8S6.jpeg",
        },
        {
          id: 9,
          name: "Café con Crema",
          description: "Café especial con crema batida y canela",
          price: 4.99,
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bebida2.jpg-GeCg2QAn59gM0prKAHEMFuCzjR3a5M.jpeg",
        },
        {
          id: 10,
          name: "Cappuccino",
          description: "Cappuccino italiano con espuma cremosa",
          price: 4.99,
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bebida3.jpg-RLt9XlylxtwpvehpxB4WwkfHteNXU6.jpeg",
        },
      ],
  }
  
  // equipo 
  const teamData = [
    {
      name: "Chef María González",
      role: "Chef Principal",
      specialty: "Repostería Fina",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Carlos Rodríguez",
      role: "Barista Senior",
      specialty: "Café de Especialidad",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Ana Martínez",
      role: "Chef Pastelera",
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
  
  // inicializador pagina
  document.addEventListener("DOMContentLoaded", () => {
    renderMenu(currentCategory)
    renderTeam()
    setupEventListeners()
  })
  
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
    menuSection.innerHTML = menuData[category]
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
      .join("")
  }
  
  function renderTeam() {
    const teamGrid = document.querySelector(".team-grid")
    teamGrid.innerHTML = teamData
      .map(
        (member) => `
          <div class="team-member">
              <img src="${member.image}" alt="${member.name}">
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
  
  