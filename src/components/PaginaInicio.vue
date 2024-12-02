<template>
  <h3 class="mt-3 text-center front-weight-bold"><i class="bi bi-people"></i>Página de Inicio</h3>

  <div class="grid-box">
    <div class="my-5">
      <button class="btn btn-primary me-2 w-25"><router-link to="/usuarios"  class="nav-link text-white" exact-active-class="active"> Gestión de Usuarios</router-link></button>
      <button class="btn btn-primary me-2 w-25"><router-link to="/empleo"  class="nav-link text-white" exact-active-class="active"> Gestión Empleo</router-link></button>
    </div>
    <div class="my-5">
      <button class="btn btn-dark me-2 w-25" disabled>En construción</button>
      <button class="btn btn-dark me-2 w-25" disabled>En construción</button>
    </div>
    <div class="my-5">
      <button class="btn btn-dark me-2 w-25" disabled>En construción</button>
      <button class="btn btn-dark me-2 w-25" disabled>En construción</button>
    </div>
  </div>
</template>

<script>

export default {
    name: 'PaginaInicio',
    components: {
    }
}
</script>

<style>

</style>