<script setup lang="ts">
import { useCart } from '@/composables/useCart'

const {
  items,
  totalItems,
  totalPrice,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = useCart()
</script>

<template>
  <section class="carrito">
    <h1>Carrito de compras</h1>

    <p v-if="items.length === 0">
      Tu carrito está vacío.
    </p>

    <table v-else>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cant.</th>
          <th>Precio</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.product.id">
          <td>{{ item.product.name }}</td>

          <td>
            <button @click="decreaseQuantity(item.product.id)">-</button>
            {{ item.quantity }}
            <button @click="addToCart(item.product)">+</button>
          </td>

          <td>$ {{ item.product.price.toFixed(2) }}</td>

          <td>$ {{ (item.quantity * item.product.price).toFixed(2) }}</td>

          <td>
            <button @click="removeFromCart(item.product.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="items.length > 0" class="totales">
      <p><strong>Total de items:</strong> {{ totalItems }}</p>
      <p><strong>Total a pagar:</strong> $ {{ totalPrice.toFixed(2) }}</p>

      <button @click="clearCart">Vaciar carrito</button>
    </div>
  </section>
</template>

<style scoped>
.carrito {
  max-width: 900px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th {
  text-align: left;
  padding-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
}

td {
  padding: 0.6rem 0;
  vertical-align: middle;
  border-bottom: 1px solid #333;
}

/* --- Alínea todas las columnas --- */
td:nth-child(1) { /* Producto */
  width: 40%;
}

td:nth-child(2) { /* Cantidad */
  width: 20%;
  text-align: center;
}

td:nth-child(3), /* Precio */
td:nth-child(4) { /* Total */
  width: 15%;
  text-align: center;
}

td:nth-child(5) { /* Botón eliminar */
  width: 10%;
  text-align: right;
}

/* --- Botones de cantidad --- */
.cantidad-controles {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.cantidad-controles button {
  background: #222;
  border: none;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.cantidad-controles span {
  min-width: 1.2rem;
  text-align: center;
  font-weight: bold;
}

/* --- Botón eliminar --- */
.eliminar-btn {
  background: #444;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.totales {
  margin-top: 1.2rem;
  font-size: 1rem;
}

.vaciar-btn {
  margin-top: 1rem;
  background: #222;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

</style>
