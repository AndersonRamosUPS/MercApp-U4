<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { useCategories } from '@/composables/useCategories'
import type { Product } from '@/composables/useProducts'

const route = useRoute()
const router = useRouter()

const esEdicion = computed(() => route.name === 'product-edit')

// estado del formulario
const nombre = ref('')
const descripcion = ref('')
const precio = ref<number | null>(null)
const categoriaId = ref<string | ''>('')
const stock = ref<number | null>(0)
const imageUrl = ref('')

// errores de validación
const errores = ref<string[]>([])

const { categorias, cargandoCategorias, errorCategorias } = useCategories()

// useApi genérico para producto individual
const {
  loading: cargandoPeticion,
  error: errorPeticion,
  request,
} = useApi<Product>()

const titulo = computed(() =>
  esEdicion.value ? 'Editar producto' : 'Nuevo producto',
)

// cargar datos si es edición
async function cargarProductoExistente() {
  if (!esEdicion.value) return

  const id = route.params.id as string
  const producto = await request(`/products/${id}`)
  if (!producto) return

  nombre.value = producto.name
  descripcion.value = producto.description ?? ''
  precio.value = producto.price
  stock.value = producto.stock
  imageUrl.value = producto.imageUrl ?? ''
  categoriaId.value = producto.categoryId ?? ''
}

// validación simple del formulario
function validarFormulario(): boolean {
  const listaErrores: string[] = []

  if (!nombre.value.trim()) {
    listaErrores.push('El nombre es obligatorio.')
  }

  if (precio.value === null || isNaN(precio.value) || precio.value <= 0) {
    listaErrores.push('El precio debe ser un número mayor que 0.')
  }

  if (stock.value === null || isNaN(stock.value) || stock.value < 0) {
    listaErrores.push('El stock debe ser un número mayor o igual a 0.')
  }

  if (!categoriaId.value) {
    listaErrores.push('La categoría es obligatoria.')
  }

  if (imageUrl.value.trim()) {
    try {
      // valida que sea URL válida
      // eslint-disable-next-line no-new
      new URL(imageUrl.value.trim())
    } catch {
      listaErrores.push('La URL de la imagen no es válida.')
    }
  }

  errores.value = listaErrores
  return listaErrores.length === 0
}

async function manejarSubmit() {
  if (!validarFormulario()) {
    return
  }

  const cuerpo = {
    name: nombre.value.trim(),
    description: descripcion.value.trim(),
    price: precio.value ?? 0,
    stock: stock.value ?? 0,
    imageUrl: imageUrl.value.trim() || null,
    categoryId: categoriaId.value || null,
  }

  if (esEdicion.value) {
    const id = route.params.id as string
    await request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cuerpo),
    })
  } else {
    await request('/products', {
      method: 'POST',
      body: JSON.stringify(cuerpo),
    })
  }

  if (!errorPeticion.value) {
    router.push({ name: 'home' })
  }
}

function cancelar() {
  if (esEdicion.value) {
    const id = route.params.id as string
    router.push({ name: 'product-detail', params: { id } })
  } else {
    router.push({ name: 'home' })
  }
}

onMounted(() => {
  cargarProductoExistente()
})
</script>

<template>
  <section class="formulario-producto">
    <h1>{{ titulo }}</h1>

    <p v-if="cargandoCategorias">Cargando categorías...</p>
    <p v-else-if="errorCategorias" class="error">
      {{ errorCategorias }}
    </p>

    <form v-else @submit.prevent="manejarSubmit">
      <div class="campo">
        <label for="nombre">Nombre *</label>
        <input
          id="nombre"
          v-model="nombre"
          type="text"
          required
        />
      </div>

      <div class="campo">
        <label for="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          v-model="descripcion"
          rows="3"
        />
      </div>

      <div class="campo">
        <label for="precio">Precio *</label>
        <input
          id="precio"
          v-model.number="precio"
          type="number"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div class="campo">
        <label for="stock">Stock *</label>
        <input
          id="stock"
          v-model.number="stock"
          type="number"
          min="0"
          step="1"
          required
        />
      </div>

      <div class="campo">
        <label for="categoria">Categoría *</label>
        <select
          id="categoria"
          v-model="categoriaId"
          required
        >
          <option value="">Seleccione una categoría</option>
          <option
            v-for="categoria in categorias"
            :key="categoria.id"
            :value="categoria.id"
          >
            {{ categoria.nombre }}
          </option>
        </select>
      </div>

      <div class="campo">
        <label for="imagen">URL de imagen</label>
        <input
          id="imagen"
          v-model="imageUrl"
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <ul v-if="errores.length" class="lista-errores">
        <li
          v-for="(error, index) in errores"
          :key="index"
        >
          {{ error }}
        </li>
      </ul>

      <p v-if="errorPeticion" class="error">
        {{ errorPeticion }}
      </p>

      <div class="acciones">
        <button type="button" @click="cancelar">
          Cancelar
        </button>

        <button type="submit" :disabled="cargandoPeticion">
          {{ esEdicion ? 'Guardar cambios' : 'Crear producto' }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.formulario-producto {
  max-width: 600px;
  margin: 0 auto;
}

.campo {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
}

label {
  margin-bottom: 0.25rem;
  font-weight: 600;
}

input,
textarea,
select {
  padding: 0.4rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #555;
  background: #222;
  color: #f5f5f5;
}

.lista-errores {
  margin: 0.5rem 0;
  padding-left: 1.2rem;
  color: #ff6b6b;
}

.error {
  color: #ff6b6b;
  margin-top: 0.5rem;
}

.acciones {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

button {
  padding: 0.45rem 0.8rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

button[type='submit'] {
  background: #4caf50;
  color: #fff;
}

button[type='button'] {
  background: #555;
  color: #fff;
}
</style>
