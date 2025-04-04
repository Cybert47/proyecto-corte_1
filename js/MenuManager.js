// - Gestor del menú
import { CONFIG } from "./config.js"

class MenuManager {
  constructor() {
    this.data = {}
    this.currentCategory = CONFIG.DEFAULT_CATEGORY
    this.menuSection = document.getElementById("menu")
    this.categoryButtons = document.querySelectorAll(".category-btn")
  }

  // AQUÍ SE UTILIZA FETCH Y ASYNC/AWAIT PARA CARGAR LOS PRODUCTOS DE FORMA ASÍNCRONA
  // Esta función hace una solicitud HTTP asíncrona para obtener los datos del menú
  async fetchData() {
    try {
      // AQUÍ SE USA FETCH PARA HACER UNA SOLICITUD GET ASÍNCRONA
      const response = await fetch(CONFIG.MENU_URL)
      const data = await response.json()

      // Debug: Veamos qué estructura tienen los datos
      console.log("Datos recibidos:", data)

      if (data?.data && Array.isArray(data.data)) {
        // Inicializar estructura de categorías
        CONFIG.CATEGORIES.forEach((category) => {
          this.data[category] = []
        })

        // AQUÍ SE PROCESAN LOS DATOS RECIBIDOS DE FORMA ASÍNCRONA
        // Distribuye los productos en sus categorías correspondientes
        data.data.forEach((product) => {
          // Verificar si el producto tiene una categoría válida
          const category = product.Category?.toLowerCase() || CONFIG.DEFAULT_CATEGORY

          // Asegurarse de que la categoría existe en nuestro objeto de datos
          if (this.data[category]) {
            this.data[category].push({
              id: product.id,
              name: product.Name,
              description: product.Description,
              price: product.Price,
              image: product.Image,
            })
          }
        })

        // Verificar si hay productos en cada categoría después de la distribución
        console.log("Distribución de productos por categoría:", {
          starters: this.data.starters.length,
          main: this.data.main.length,
          drinks: this.data.drinks.length,
          desserts: this.data.desserts.length,
        })

        // Veamos la estructura del primer producto para depurar
        if (data.data.length > 0) {
          console.log("Estructura del primer producto:", data.data[0])
        }

        console.log("Menú cargado correctamente")
        return true
      } else {
        throw new Error("Formato de datos inesperado")
      }
    } catch (error) {
      console.error("Error al cargar el menú:", error)
      this.menuSection.innerHTML = '<p class="error">Error al cargar el menú. Por favor, intente nuevamente.</p>'
      return false
    }
  }

  renderMenu() {
    const category = this.currentCategory

    if (!this.data || Object.keys(this.data).length === 0) {
      this.menuSection.innerHTML = '<p class="loading">Cargando menú...</p>'
      return
    }

    if (!this.data[category] || this.data[category].length === 0) {
      this.menuSection.innerHTML = '<p class="info">No hay productos disponibles en esta categoría</p>'
      return
    }

    // Debug: Verifiquemos los datos que vamos a renderizar
    console.log(`Datos a renderizar en categoría ${category}:`, this.data[category])

    this.menuSection.innerHTML = this.data[category]
      .map((item, index) => {
        // Aseguramos que todas las propiedades existan y tengan valores válidos
        const itemId = item.id || item.ID || index + 1

        // Es posible que las propiedades no coincidan exactamente con los nombres esperados
        // Probamos diferentes variantes comunes de nombres de propiedades
        const name = item.Nombre || item.nombre || item.name || item.Name || "Producto sin nombre"
        const description =
          item.Descripcion || item.descripcion || item.description || item.Description || "Sin descripción"

        // Aseguramos que el precio sea un número antes de usar toFixed()
        let price = 0
        if (item.Precio !== undefined) price = Number.parseFloat(item.Precio)
        else if (item.precio !== undefined) price = Number.parseFloat(item.precio)
        else if (item.price !== undefined) price = Number.parseFloat(item.price)
        else if (item.Price !== undefined) price = Number.parseFloat(item.Price)

        // Lo mismo con la imagen, probamos diferentes nombres de propiedades
        const image =
          item["Imagen (URL)"] || item.imagen || item.image || item.Image || "/placeholder.svg?height=200&width=200"

        // Debug: ver los valores extraídos
        console.log(`Producto ${index + 1}: nombre=${name}, precio=${price}, imagen=${image}`)

        return `
          <div class="menu-item">
              <div class="menu-item-image">
                  <img src="${image}" alt="${name}" onerror="this.src='/placeholder.svg?height=200&width=200'">
              </div>
              <div class="menu-item-info">
                  <h3>${name}</h3>
                  <p>${description}</p>
                  <div class="menu-item-footer">
                      <span class="price">$${isNaN(price) ? "0.00" : price.toFixed(2)}</span>
                      <button class="add-to-cart-btn" 
                        data-id="${itemId}" 
                        data-name="${name}" 
                        data-price="${isNaN(price) ? 0 : price}" 
                        data-image="${image}">
                          Agregar al Carrito
                      </button>
                  </div>
              </div>
          </div>
        `
      })
      .join("")
  }

  updateActiveCategory() {
    this.categoryButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.category === this.currentCategory)
    })
  }

  setCategory(category) {
    this.currentCategory = category
    this.updateActiveCategory()
    this.renderMenu()
  }

  setupEventListeners(cartManager) {
    this.categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.setCategory(button.dataset.category)
      })
    })

    // Delegación de eventos para los botones de agregar al carrito
    this.menuSection.addEventListener("click", (event) => {
      const button = event.target.closest(".add-to-cart-btn")
      if (button) {
        const item = {
          id: Number.parseInt(button.dataset.id),
          name: button.dataset.name,
          price: Number.parseFloat(button.dataset.price),
          image: button.dataset.image,
        }
        cartManager.addItem(item)
      }
    })
  }
}

export { MenuManager }

