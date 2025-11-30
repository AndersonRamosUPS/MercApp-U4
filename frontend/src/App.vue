<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div id="app">

    <header>
      <NavBar />
    </header>

    <main>
      <Suspense>
        <template #default>
          <RouterView />
        </template>

        <template #fallback>
          <div class="cargando-vista">
            Cargando vista...
          </div>
        </template>
      </Suspense>
    </main>

  </div>
</template>

<style scoped>
.cargando-vista {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  opacity: 0.8;
}
</style>

