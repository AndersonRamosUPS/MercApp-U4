import { ref, computed, watch } from 'vue'
import type { Product } from '@/composables/useProducts'

export interface CartItem {
  product: Product
  quantity: number
}

// Intentar cargar carrito desde localStorage
const saved = localStorage.getItem('mercapp_cart')
const items = ref<CartItem[]>(saved ? JSON.parse(saved) : [])

// Total de items
const totalItems = computed(() =>
  items.value.reduce((s, item) => s + item.quantity, 0)
)

// Total en dinero
const totalPrice = computed(() =>
  items.value.reduce((s, item) => s + item.quantity * item.product.price, 0)
)

// Agregar producto al carrito
function addToCart(product: Product) {
  const existente = items.value.find(
    (item) => item.product.id === product.id
  )

  if (existente) {
    existente.quantity += 1
  } else {
    items.value.push({ product, quantity: 1 })
  }
}

// Quitar 1 unidad del producto
function decreaseQuantity(productId: string) {
  const item = items.value.find((i) => i.product.id === productId)
  if (!item) return

  if (item.quantity > 1) {
    item.quantity -= 1
  } else {
    removeFromCart(productId)
  }
}

// Eliminar producto del carrito
function removeFromCart(productId: string) {
  items.value = items.value.filter(
    (item) => item.product.id !== productId
  )
}

// Vaciar carrito
function clearCart() {
  items.value = []
}

// Guardar automaticamente en localStorage
watch(
  items,
  (nuevoValor) => {
    localStorage.setItem('mercapp_cart', JSON.stringify(nuevoValor))
  },
  { deep: true }
)

export function useCart() {
  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  }
}

