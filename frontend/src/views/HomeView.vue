<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProducts, type Product } from '@/composables/useProducts'
import { useCategories } from '@/composables/useCategories'
import { useCart } from '@/composables/useCart'
import ProductCard from '@/components/ProductCard.vue'

const router = useRouter()

const busqueda = ref('')
const categoriaSeleccionada = ref<'todas' | string>('todas')

const {
  products,
  loading: cargandoProductos,
  error: errorProductos,
} = useProducts()

const {
  categorias,
  cargandoCategorias,
  errorCategorias,
} = useCategories()

const { addToCart } = useCart()

const cargando = computed(
  () => cargandoProductos.value || cargandoCategorias.value,
)

const mensajeError = computed(
  () => errorProductos.value || errorCategorias.value,
)

const productosVisibles = computed(() => {
  const texto = busqueda.value.trim().toLowerCase()

  return products.value.filter((producto) => {
    const coincideBusqueda =
      !texto ||
      producto.name.toLowerCase().includes(texto) ||
      (producto.description &&
        producto.description.toLowerCase().includes(texto))

    const coincideCategoria =
      categoriaSeleccionada.value === 'todas' ||
      producto.categoryId === categoriaSeleccionada.value

    return coincideBusqueda && coincideCategoria
  })
})

function manejarProductoAñadido(producto: Product) {
  addToCart(producto)
}

function irANuevoProducto() {
  router.push({ name: 'product-new' })
}
</script>

<template>
  <section>
    <h1>Catálogo de Productos</h1>

    <div class="filtros">
      <div class="filtros__busqueda">
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar por nombre o descripción..."
        />

        <select v-model="categoriaSeleccionada">
          <option value="todas">Todas las categorías</option>
          <option
            v-for="categoria in categorias"
            :key="categoria.id"
            :value="categoria.id"
          >
            {{ categoria.nombre }}
          </option>
        </select>
      </div>

      <button
        type="button"
        class="btn-nuevo-producto"
        @click="irANuevoProducto"
      >
        + Nuevo producto
      </button>
    </div>

    <p v-if="cargando">Cargando productos...</p>
    <p v-else-if="mensajeError" class="error">
      {{ mensajeError }}
    </p>

    <div v-else class="grid-productos">
      <p v-if="productosVisibles.length === 0">
        No se encontraron productos.
      </p>

      <ProductCard
        v-for="producto in productosVisibles"
        :key="producto.id"
        :product="producto"
        @added-to-cart="manejarProductoAñadido"
      />
    </div>
  </section>
</template>

<style scoped>
.filtros {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.filtros__busqueda {
  display: flex;
  flex: 1;
  gap: 0.75rem;
  min-width: 260px;
}

.filtros__busqueda input {
  flex: 1;
  padding: 0.5rem;
}

.filtros__busqueda select {
  padding: 0.5rem;
  min-width: 180px;
}

.btn-nuevo-producto {
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: #4caf50;
  color: #fff;
  font-weight: 600;
  white-space: nowrap;
}

.grid-productos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  column-gap: 1rem;  /* espacio horizontal */
  row-gap: 2rem;     /* espacio vertical más grande */
  align-items: stretch;
}

.error {
  color: #ff6b6b;
}
</style>
