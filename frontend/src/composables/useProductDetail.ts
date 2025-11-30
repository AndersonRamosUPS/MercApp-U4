import { ref } from 'vue'
import { useApi } from '@/composables/useApi'
import type { Product } from './useProducts'

const producto = ref<Product | null>(null)

export function useProductDetail() {
  const {
    loading,
    error,
    request,
    cancel,
  } = useApi<Product>()   // ← Quitamos data

  async function cargarProducto(id: string) {
    producto.value = null

    const resultado = await request(`/products/${id}`)
    if (resultado) {
      producto.value = resultado
    }
  }

  return {
    producto,
    cargandoProducto: loading,
    errorProducto: error,
    cargarProducto,
    cancelarProducto: cancel,
  }
}
