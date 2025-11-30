import { ref, onMounted } from 'vue'
import { apiGet } from '@/services/api'

// Cómo es la categoría que viene del backend
interface CategoriaCruda {
  _id?: string
  id?: string
  nombre?: string
  name?: string
}

// Cómo la usaremos en el frontend
export interface Categoria {
  id: string
  nombre: string
}

const categorias = ref<Categoria[]>([])
const cargandoCategorias = ref(false)
const errorCategorias = ref<string | null>(null)

export function useCategories() {
  const cargarCategorias = async () => {
    cargandoCategorias.value = true
    errorCategorias.value = null

    try {
      const datos = await apiGet<CategoriaCruda[]>('/categories')

      categorias.value = datos.map((cat) => ({
        // tomamos id si existe, si no _id
        id: (cat.id ?? cat._id ?? '').toString(),
        // tomamos nombre si existe, si no name
        nombre: (cat.nombre ?? cat.name ?? 'Sin nombre').toString(),
      }))
    } catch (error: any) {
      console.error(error)
      errorCategorias.value = error?.message ?? 'Error al cargar categorías'
    } finally {
      cargandoCategorias.value = false
    }
  }

  onMounted(() => {
    cargarCategorias()
  })

  return {
    categorias,
    cargandoCategorias,
    errorCategorias,
    cargarCategorias,
  }
}
