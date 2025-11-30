// src/composables/useProducts.ts
import { ref, onMounted } from "vue";
import { useApi } from "@/composables/useApi";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  categoryId?: string | null;
}

const products = ref<Product[]>([]);

export function useProducts() {
  // usamos el composable genérico
  const {
    data,
    loading,
    error,
    request,
    cancel: cancelarPeticion,
  } = useApi<Product[]>()

  async function cargarProductos() {
    const res = await request('/products')
    if (res) {
      products.value = res
    }
  }

  // Cargar automáticamente al montar
  onMounted(() => {
    cargarProductos()
  })

  return {
    products,
    loading,
    error,
    cargarProductos,
    cancelarPeticion,
  }
}
