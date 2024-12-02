<template>
  <div class="row">
    <h3 class="mt-3 text-center front-weight-bold"><i class="bi bi-person-workspace"></i> TRABAJA CON NOSOTROS <router-link to="/">
        <button class="btn btn-customb"><i class="bi bi-arrow-return-left "></i></button></router-link></h3>
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
          <span class="input-group-text custom-span me-2">Email: </span>
          <input type="email" class="form-control sm w-50" required placeholder="Email" v-model="candidato.email"
            @blur="validarEmail(this.candidato.email)">

          <span class="input-group-text custom-span ms-2 me-2">Móvil:</span>
          <input class="form-control sm w-25" type="text" required placeholder="Móvil" v-model="candidato.movil"
            @blur="validarTelefono(this.candidato.movil)" :disabled="editMovil">



        </div>

        <div class="input-group-text mb-3">
          <span class="input-group-text custom-span me-2">Departamentos</span>
          <select name="departamento" class="form-control sm w-25 ms-2" v-model="candidato.departamento" required>
            <option value="" disabled>Departamentos</option>
            <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento">
              {{ departamento.nm }}
            </option>
          </select>

          <span class="input-group-text custom-span ms-2 me-2">Modalidades </span>
          <div class="m-auto">
            <input class="mx-2" type="radio" name="modalidad" v-model="candidato.modalidad" value="remoto" id="remoto"
              ><label for="remoto">Remoto</label>
            <input class="mx-2" type="radio" name="modalidad" v-model="candidato.modalidad" value="hibrido"
              id="hibrido"><label for="hibrido">Hibrido</label>

            <input class="mx-2" type="radio" name="modalidad" v-model="candidato.modalidad" value="presencial"
              id="presencial"><label for="presencial">Presencial</label>

          </div>

        </div>
        <div class="input-group-text mb-3">
          <span class="input-group-text custom-span  me-2" for="comentario">Comentario: </span>
          <textarea placeholder="Comentarios (Máximo 256 caracteres)" class="form-control sm w-100" maxlength="256"
            name="" id="" rows="4" v-model="candidato.comentario"
            @blur="validarComentario(this.candidato.comentario)"></textarea>

        </div>
        <div class="input-group-text mb-3">

          <span class="input-group-text custom-span  me-2">CV (PDF) </span>
          <input type="file" class="form-control sm w-100">

        </div>
        <input type="checkbox" class="text-align-left" name="" id="" v-model="candidato.avisoLegal" required> He leido y
        acepto la <router-link to="/privacidad">Politica de privacidad</router-link>

      </div>
      <button class="btn btn-primary m-1" @click.prevent="grabarCandidato"
        :disabled="!candidato.avisoLegal">Enviar</button>
    </form>
  </div>


  <div>
    <div class="container my-5">
      <h2 class="mb-4"><i class="bi bi-pencil-square"></i> Gestionar candidatos</h2>
      <div class="container my-2">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="table-info rounded-header">
              <tr>
                <th scope="col" class="w-10">Apellidos</th>
                <th scope="col" class="w-10">Nombre</th>
                <th scope="col" class="w-10">Móvil</th>
                <th scope="col" class="w-10">Departamento</th>
                <th scope="col" class="w-10 text-center">Modalidad</th>
                <th scope="col" class="pale-yellow table-warning">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="candidato in candidatosPorPagina" :key="candidato.id">
                <td class="align-middle ">{{ candidato.apellidos }}</td>
                <td class="align-middle">{{ candidato.nombre }}</td>
                <td class="align-middle">{{ candidato.movil }}</td>
                <td class="align-middle">{{ candidato.departamento.nm }}</td>

                <td class="align-middle">{{ candidato.modalidad }}</td>
                <td class="text-center align-middle pale-yellow table-warning">
                  <div>
                    <button class="btn btn-warning m-2" @click="seleccionaCandidato(candidato)">
                      <i class="fas fa-pencil-alt"></i>
                    </button>

                    <button class="btn btn-danger m-2" @click="deleteCandidato(candidato.movil)">
                      <i class="bi bi-trash"></i>
                    </button>

                  </div>
                </td>
              </tr>
            </tbody>

          </table>
          <div class="d-flex justify-content-center my-3">
            <button class="btn btn-primary" :disabled="currentPage === 1" @click="paginaAnterior">
              <i class="bi bi-chevron-left"> </i>
            </button>
            <span class="mx-3 align-self-center">Página {{ currentPage }}</span>

            <button class="btn btn-primary" :disabled="currentPage * pageSize >= candidatos.length"
              @click="siguientePagina">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
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
        avisoLegal: '',
        comentario: ''
      },
      candidatos: [],
      departamentos: [],
      editMovil: false,
      currentPage: 1,
      pageSize:5
    }
  },

  mounted() {
    this.getCandidatos();
    this.getDepartamentos();
  },
  computed:{
    
  candidatosPorPagina() {
    const inicio = (this.currentPage - 1) * this.pageSize;
    return this.candidatos.slice(inicio, inicio + this.pageSize);
  
},

  },
  methods: {
    siguientePagina() {
      if (this.currentPage * this.pageSize < this.candidatos.length) {
        this.currentPage++;
      }
    },
    paginaAnterior() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    async seleccionaCandidato(candidato) {
      try {
        this.limpiarFormulario()
        const response = await fetch('http://localhost:3000/candidatos');
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }
        const candidatos = await response.json();

        // Encontrar el candidato por su DNI
        const candidatoEncontrado = candidatos.find(c => c.movil === candidato.movil);


        if (candidatoEncontrado) {
          this.editMovil = true;
          this.candidato = { ...candidatoEncontrado };
        } else {
          this.mostrarAlerta('Error', 'candidato no encontrado en el servidor.', 'error');
        }
      } catch (error) {
        console.error(error);
        this.mostrarAlerta('Error', 'No se pudo cargar el candidato desde el servidor.', 'error');
      }
    },

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

    validarComentario(comentario) {
      if (comentario.length > 256) {
        this.mostrarAlerta('Error', 'el comentario no puede sobre pasar 256 caracteres', 'error')
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
        avisoLegal: '',
        comentario: ''
      }
      this.editMovil = false;
    },

    async grabarCandidato() {
      const resultado = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas grabar el candidato?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Grabar',
        cancelButtonText: 'No, no grabar',
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
      })

      if (resultado.isConfirmed) {
      // Verificar si los campos requeridos están llenos
      if (this.candidato.apellidos && this.candidato.nombre && this.candidato.email && this.candidato.movil && this.candidato.apellidos
       && this.candidato.nombre && this.candidato.departamento && this.candidato.modalidad && this.candidato.avisoLegal==true) {
        try {
          if (this.candidato.avisoLegal){
            this.candidato.avisoLegal = "si";
          }

          const response = await fetch('http://localhost:3000/candidatos');
          if (!response.ok) {
            throw new Error('Error al obtener los candidatos: ' + response.statusText);
          }

          const candidatosExistentes = await response.json();

          let candidatoExistente = candidatosExistentes.find(candidato => candidato.movil === this.candidato.movil);

          if (candidatoExistente) {
            candidatoExistente = this.candidato;
            
            
            const actualizarResponse = await fetch(`http://localhost:3000/candidatos/${candidatoExistente.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },

              body: JSON.stringify(candidatoExistente),
            });

            if (!actualizarResponse.ok) {
              throw new Error('Error al actualizar el candidato: ' + actualizarResponse.statusText);
            }

            this.mostrarAlerta('Aviso', 'Candidato reactivado correctamente', 'success');
            this.getCandidatos();
          } 
          
          else {
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
          }
        } catch (error) {
          console.error(error);
          this.mostrarAlerta('Error', 'No se pudo grabar el candidato.', 'error');
        }
      } else if (this.candidato.avisoLegal == false) {
        this.mostrarAlerta('Error', 'Por favor, acepta las Políticas de Privacidad.', 'error');
      }   
      else {
        this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
      }}
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

    async getCandidatos() {
      try {
        const response = await fetch('http://localhost:3000/candidatos');
        if (!response.ok) {
          throw new Error('Error en la solicitud:' + response.statusText);
        }
        this.candidatos = (await response.json()).sort((a, b) => a.apellidos.localeCompare(b.apellidos) || a.nombre.localeCompare(b.nombre));
      } catch (error) {
        console.error(error);
      }
    },

    async deleteCandidato(movil) {
      const resultado = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas eliminar el candidato?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
      })

      if (resultado.isConfirmed) {
        try {

          const response = await fetch("http://localhost:3000/candidatos");
          if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.statusText);
          }

          const candidatos = await response.json();
          const candidatoExistente = candidatos.find(candidato => candidato.movil === movil);

          if (candidatoExistente) {

            await fetch(`http://localhost:3000/candidatos/${candidatoExistente.id}`, { // URL interpolada correctamente
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });

            this.mostrarAlerta("Aviso", "candidato dado de baja correctamente", "success");
            this.getCandidatos(); // Actualizar lista de candidatos

          } else {
            this.mostrarAlerta("Error", "candidato no encontrado", "error");
          }
        } catch (error) {
          console.error(error);
          this.mostrarAlerta("Error", "No se pudo dar de baja al candidato", "error");
        }
      }
    }
  }
}
</script>

<style></style>