<template>
  <div class="row">
    <div class="col-md-12"> <br><br> 
        <img src="../assets/200w.gif" alt="" width="25%">  <br><br>
        Sorry. It isn't your fault. We have done something wrong    
        <hr>
        <router-link class="btn btn-danger" :to="{name: 'inicio'}">Volver</router-link>
    </div>
  </div>
</template>

<script>

export default {
    name: 'NotFound',
    components: {
    }
}
</script>

<style>

</style>