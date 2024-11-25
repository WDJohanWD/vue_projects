<template>
  <div class="row">
    <h5 class="text-center front-weight-bold">TRABAJA CON NOSOTROS</h5>
  </div>
  <br>
  <div class="container-fluid border p-4">
    <form class="form-in-line">
      <div class="col-10 col-m-6 col-lg-6 mx-auto">
        <div class="input-group-text mb-3">
          <span class="input-group-text custom-span me-2">Apellidos:</span>
          <input type="text" class="form-control sm w-50" required placeholder="Apellidos"
            v-model="candidato.apellidos">

          <span class="input-group-text custom-span ms-2 me-2">Nombre:</span>
          <input type="text" class="form-control sm w-50" required placeholder="Nombre" v-model="candidato.nombre">
        </div>
        <div class="input-group-text mb-3">
          <span class="input-group-text custom-span ms-2 me-2">Email: </span>
          <input type="email" class="form-control sm w-50" required placeholder="Email" v-model="candidato.email"
            @blur="validarEmail(this.candidato.email)">

          <span class="input-group-text custom-span ms-2 me-2">Móvil:</span>
          <input class="form-control sm w-25" type="text" required placeholder="Móvil" v-model="candidato.movil"
            @blur="validarTelefono(this.candidato.movil)">



        </div>

        <div class="input-group-text mb-3">
          <span class="input-group-text custom-span ms-2 me-2">Departamentos</span>
          <select name="departamento" class="form-control sm w-25 ms-2" v-model="candidato.departamento" required>
            <option value="" disabled>Departamentos</option>
            <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento">
              {{ departamento.nm }}
            </option>
          </select>

          <span class="input-group-text custom-span ms-2 me-2">Modalidades </span>
          <div class="m-auto">
            <input class="mx-2" type="radio" name="modalidad" v-model="candidato.modalidad" value="remoto" id="remoto"
              checked><label for="remoto">Remoto</label>
            <input class="mx-2" type="radio" name="modalidad" v-model="candidato.modalidad" value="hibrido"
              id="hibrido"><label for="hibrido">Hibrido</label>

            <input class="mx-2" type="radio" name="modalidad" v-model="candidato.modalidad" value="presencial"
              id="presencial"><label for="presencial">Presencial</label>

          </div>

        </div>
        <div class="input-group-text mb-3">

          <span class="input-group-text custom-span ms-2 me-2">CV (PDF) </span>
          <input type="file" class="form-control sm w-100">

        </div>
        <input type="checkbox" class="text-align-left" name="" id="" v-model="candidato.avisoLegal" required>He leido y
        acepto la <router-link to="/privacidad">Politica de privacidad</router-link>

      </div>
      <button class="btn btn-primary m-1" @click.prevent="grabarCandidato"
        :disabled="!candidato.avisoLegal">Enviar</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "TablaEmpleo",
  components: {
  },

  data() {
    return {
      candidato: {
        apellidos: '',
        nombre: '',
        email: '',
        movil: '',
        departamento: '',
        modalidad: '',
        avisoLegal: ''
      },
      candidatos: [],
      departamentos: [],
      categorias: []
    }
  },

  mounted() {
    this.getDepartamentos();
  },

  methods: {
    validarTelefono(telefono) {
      if (telefono == '') {
        this.mostrarAlerta('Error', 'El teléfono con formato no valido', 'error');
      }
      const regex = /^[67]\d{8}$/;
      if (!regex.test(telefono)) {
        this.mostrarAlerta('Error', 'El teléfono con formato no valido', 'error')
      }
    },

    validarEmail(email) {
      if (email == '') {
        this.mostrarAlerta('Error', 'El email con formato no valido', 'error');
      }
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(email)) {
        this.mostrarAlerta('Error', 'El email con formato no valido', 'error')
      }
    },

    mostrarAlerta(titulo, mensaje, icono) {
      Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        customClass: {
          container: 'custom-alert-container',
          popup: 'custom-alert-popup',
          modal: 'custom-alert-modal'
        }
      })
    },

    limpiarFormulario() {
      this.candidato = {
        apellidos: '',
        nombre: '',
        email: '',
        movil: '',
        departamento: '',
        modalidad: '',
        avisoLegal: ''
      }
    },

    async grabarCandidato() {
      // Verificar si los campos requeridos están llenos
      if (this.candidato.apellidos && this.candidato.nombre && this.candidato.email && this.candidato.movil && this.candidato.apellidos && this.candidato.nombre && this.candidato.avisoLegal) {
        try {

          if (this.candidato.avisoLegal) {
            this.candidato.avisoLegal = "si";
          }

          const crearResponse = await fetch('http://localhost:3000/candidatos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.candidato),
          });

          if (!crearResponse.ok) {
            throw new Error('Error al guardar el candidato ' + crearResponse.statusText);
          }

          const nuevoCandidato = await crearResponse.json();
          this.candidatos.push(nuevoCandidato);
          this.mostrarAlerta('Aviso', 'Candidato grabado correctamente', 'success');
          this.limpiarFormulario();
        } catch (error) {
          console.error(error);
          this.mostrarAlerta('Error', 'No se pudo grabar el candidato.', 'error');
        }
      } else {
        this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
      }
    },

    async getDepartamentos() {
      try {
        const response = await fetch('http://localhost:3000/departamentos');
        if (!response.ok) {
          throw new Error('Error en la solicitud:' + response.statusText);
        }
        this.departamentos = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>

<style></style>