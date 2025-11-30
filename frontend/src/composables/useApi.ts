import { ref, onBeforeUnmount } from 'vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export function useApi<T>() {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  let controlador: AbortController | null = null

  function cancelar() {
    if (controlador) {
      controlador.abort()
      controlador = null
    }
  }

  async function hacerPeticion(
    path: string,
    opciones?: RequestInit,
  ): Promise<T | null> {
    // Cancelar petición anterior (si había)
    cancelar()

    controlador = new AbortController()
    loading.value = true
    error.value = null

    const urlBaseLimpia = API_BASE_URL.replace(/\/$/, '')
    const pathLimpio = path.startsWith('/') ? path : `/${path}`
    const url = `${urlBaseLimpia}${pathLimpio}`

    const ejecutarFetch = async (): Promise<T> => {
      const respuesta = await fetch(url, {
        ...opciones,
        signal: controlador?.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(opciones?.headers ?? {}),
        },
      })

      if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`)
      }

      return (await respuesta.json()) as T
    }

    try {
      // Primer intento
      data.value = await ejecutarFetch()
    } catch (err1: any) {
      try {
        // Reintento simple (una sola vez)
        data.value = await ejecutarFetch()
      } catch (err2: any) {
        error.value =
          err2?.message ?? 'Error al realizar la petición al servidor'
        data.value = null
      }
    } finally {
      loading.value = false
      controlador = null
    }

    return data.value
  }

  // Cancelar automáticamente si el componente que usa el composable se destruye
  onBeforeUnmount(() => {
    cancelar()
  })

  return {
    data,
    loading,
    error,
    request: hacerPeticion,
    cancel: cancelar,
  }
}
