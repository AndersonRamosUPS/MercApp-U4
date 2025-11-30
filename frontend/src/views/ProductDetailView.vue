<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductDetail } from "@/composables/useProductDetail";
import { useCart } from "@/composables/useCart";
import { useApi } from "@/composables/useApi";

const route = useRoute();
const router = useRouter();

const { producto, cargandoProducto, errorProducto, cargarProducto } =
  useProductDetail();
const { addToCart } = useCart();

// useApi separado para eliminar
const {
  loading: eliminando,
  error: errorEliminar,
  request: requestEliminar,
} = useApi<unknown>();

function cargarDesdeRuta() {
  const id = route.params.id as string | undefined;
  if (!id) return;
  cargarProducto(id);
}

onMounted(cargarDesdeRuta);

watch(
  () => route.params.id,
  () => cargarDesdeRuta()
);

function volverAlCatalogo() {
  router.push({ name: "home" });
}

function agregarAlCarrito() {
  if (producto.value) {
    addToCart(producto.value);
  }
}

async function eliminarProducto() {
  if (!producto.value) return;

  const confirmado = window.confirm(
    "¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer."
  );

  if (!confirmado) return;

  await requestEliminar(`/products/${producto.value.id}`, {
    method: "DELETE",
  });

  if (!errorEliminar.value) {
    router.push({ name: "home" });
  }
}

// Navegar a la vista de edición
function irAEditarProducto() {
  if (!producto.value) return;
  router.push({
    name: "product-edit",
    params: { id: producto.value.id },
  });
}
</script>

<template>
  <section class="detalle-contenedor">
    <button type="button" class="btn-volver" @click="volverAlCatalogo">
      ← Volver
    </button>

    <p v-if="cargandoProducto">Cargando producto...</p>
    <p v-else-if="errorProducto" class="error">
      {{ errorProducto }}
    </p>

    <article v-if="producto" class="detalle">
      <div v-if="producto.imageUrl" class="detalle__imagen">
        <img :src="producto.imageUrl" :alt="producto.name" />
      </div>

      <h1>{{ producto.name }}</h1>

      <p class="detalle__precio">$ {{ producto.price.toFixed(2) }}</p>

      <p>
        Stock:
        <strong>
          {{ producto.stock > 0 ? producto.stock : "Sin stock" }}
        </strong>
      </p>

      <p class="detalle__descripcion">
        {{ producto.description || "Sin descripción." }}
      </p>

      <div class="detalle__acciones">
        <button
          type="button"
          :disabled="producto.stock <= 0"
          @click="agregarAlCarrito"
        >
          Añadir al carrito
        </button>

        <!--BOTÓN EDITAR -->
        <button type="button" class="btn-editar" @click="irAEditarProducto">
          Editar producto
        </button>

        <button
          type="button"
          class="btn-eliminar"
          :disabled="eliminando"
          @click="eliminarProducto"
        >
          {{ eliminando ? "Eliminando..." : "Eliminar producto" }}
        </button>
      </div>

      <p v-if="errorEliminar" class="error">
        {{ errorEliminar }}
      </p>
    </article>

    <p v-else>Producto no encontrado.</p>
  </section>
</template>

<style scoped>
.detalle-contenedor {
  max-width: 700px;
  margin: 0 auto;
  padding: 1rem;
}

.btn-volver {
  margin-bottom: 1rem;
  background: #222;
  border: none;
  color: white;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  cursor: pointer;
}

.detalle {
  text-align: center;
  background: #1b1b1b;
  padding: 1.5rem;
  border-radius: 10px;
}

.detalle__imagen {
  width: 100%;
  max-width: 350px;
  margin: 0 auto 1rem auto;
  border-radius: 10px;
  overflow: hidden;
}

.detalle__imagen img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.detalle__precio {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
}

.detalle__descripcion {
  margin: 1rem 0;
  opacity: 0.9;
  font-size: 0.95rem;
}

.detalle__acciones {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.detalle__acciones button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

/* BOTÓN EDITAR */
.btn-editar {
  background: #1976d2;
  color: white;
}

.btn-eliminar {
  background: #b71c1c;
  color: white;
}

.btn-eliminar:disabled {
  opacity: 0.7;
}
</style>
