<template>
  <footer class="bg-primary text-white text-center py-1">
    <div class="container">
      <p>© 2024 Mi Empresa. Todos los derechos reservados.
        <router-link to="/avisolegal" class="nav-link d-inline text-white">Aviso Legal</router-link> |
        <router-link to="/privacidad" class="nav-link d-inline text-white">Politica de privacidad</router-link>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>

<style scoped>
footer {
  width: 100%;
}
</style>
