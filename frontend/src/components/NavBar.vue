<template>
  <header class="navbar">
    <h1 class="navbar__logo">MercApp</h1>

    <nav class="navbar__links">
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/cart">Carrito</RouterLink>
      <RouterLink to="/about">Acerca de</RouterLink>
    </nav>
  </header>
</template>


<script setup lang="ts">
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}

.navbar__logo {
  font-size: 1.4rem;
  font-weight: 700;
}

.navbar__links {
  display: flex;
  gap: 1rem;
}

a.router-link-active {
  font-weight: 600;
  text-decoration: underline;
}
</style>
