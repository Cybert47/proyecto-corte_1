// datos del menu
const menuData = {
    starters: [
        {
            "id": 1,
            "name": "Mini Éclairs",
            "description": "Pequeños éclairs rellenos de crema pastelera y cubiertos con chocolate",
            "price": 5.99,
            "image": "Mini-Eclairs.jpg"
          },
          {
            "id": 2,
            "name": "Palmiers",
            "description": "Crujientes hojaldres en forma de corazón con azúcar caramelizado",
            "price": 4.99,
            "image": "palmiers.jpg"
          },
          {
            "id": 3,
            "name": "Madeleines",
            "description": "Bizcochos esponjosos con un toque de limón y mantequilla",
            "price": 6.49,
            "image": "Madeleines.jpg"
          },
      
    ],
    main: [
        {
            "id": 5,
            "name": "Tarta de Chocolate y Avellanas",
            "description": "Tarta húmeda de chocolate con crema de avellanas y cobertura de ganache",
            "price": 12.99,
            "image": "torta.jpg"
          },
          {
            "id": 6,
            "name": "Milhojas de Crema y Frutas",
            "description": "Crujiente hojaldre en capas con crema pastelera y frutas frescas",
            "price": 10.99,
            "image": "milhojas.jpg"
          },
          {
            "id": 7,
            "name": "Cheesecake de Frutos Rojos",
            "description": "Suave cheesecake horneado con base de galleta y topping de frutos rojos",
            "price": 11.49,
            "image": "Cheesecake.jpg"
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
            "id": 11,
            "name": "Tiramisú",
            "description": "Clásico postre italiano con capas de bizcocho de café y crema de mascarpone",
            "price": 9.99,
            "image": "tiramisu.jpg"
          },
          {
            "id": 12,
            "name": "Crème Brûlée",
            "description": "Delicada crema de vainilla con una crujiente capa de caramelo",
            "price": 8.99,
            "image": "Creme-Brulee.jpg"
          },
          {
            "id": 13,
            "name": "Profiteroles",
            "description": "Bocaditos de masa choux rellenos de crema y bañados en chocolate",
            "price": 7.99,
            "image": "Profiteroles.jpg"
          },
      ],
  }
  
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
  
  