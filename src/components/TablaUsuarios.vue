<template>
  <div class="row">

    <h3 class="mt-3 text-center front-weight-bold"><i class="bi bi-people"></i> GESTIÓN USUARIOS <router-link to="/">
        <button class="btn btn-customb"><i class="bi bi-arrow-return-left "></i></button></router-link></h3>

  </div>
  <br>
  <div class="container-fluid border p-4">
    <form class="form-in-line">
      <div class="col-10 col-m-6 col-lg-8 mx-auto">
        <div class="input-group-text mb-3">
          <span class="input-group-text custom-span me-2">DNI/NIE:</span>
          <input type="text" class="form-control sm w-25" placeholder="DNI-NIE" v-model="usuario.dni"
            @blur="validarDNI(this.usuario.dni)" :disabled="editDni">
          <button class="btn btn-outline" type="submit" @click.prevent="buscarUsuario(usuario.dni)"> <i
              class="bi bi-search"></i></button>

          <span class="input-group-text custom-span ms-auto me-2">Fecha Alta:</span>
          <input type="date" class="form-control sm w-25" placeholder="Fecha Alta" v-model="usuario.alta">

        </div>
        <div class="input-group-text mb-3">
          <span class="input-group-text custom-span me-2">Apellidos: </span>
          <input type="text" class="form-control sm w-50" placeholder="Apellidos" v-model="usuario.apellidos">
          <span class="input-group-text custom-span ms-2 me-2">Nombre: </span>
          <input type="text" class="form-control sm w-50" placeholder="Nombre" v-model="usuario.nombre">
        </div>
        <div class="input-group-text mb-3">
          <span class="input-group-text custom-span me-2">Dirección: </span>
          <input type="text" class="form-control sm w-50" placeholder="Dirección" v-model="usuario.direccion">
          <span class="input-group-text custom-span ms-2 me-2">Email: </span>
          <input type="email" class="form-control sm w-25" placeholder="Email" v-model="usuario.email">

          <span class="input-group-text custom-span me-2 ms-2">Teléfono:</span>
          <input class="form-control sm w-25" type="text" v-model="usuario.telefono"
            @blur="validarTelefono(this.usuario.telefono)" placeholder="Teléfono">
        </div>

        <div class="input-group-text mb-3">

          <span class="input-group-text custom-span me-2 ">Provincia: </span>
          <select name="provincia" class="form-control sm " v-model="usuario.provincia">
            <option value="">Provincia</option>
            <option v-for="provincia in provincias" :key="provincia.id" :value="provincia">
              {{ provincia.nm }}
            </option>
          </select>
          <span class="input-group-text custom-span ms-2 me-2">Municipio: </span>
          <select name="municipio" class="form-control sm w-100" v-model="usuario.municipio">
            <option value="">Municipio</option>
            <option v-for="municipio in municipiosFiltrados" :key="municipio.id" :value="municipio">
              {{ municipio.nm }}
            </option>
          </select>

          <span class="input-group-text custom-span  ms-2 me-2">Tipo:</span>
          <select class="form-control sm" v-model="usuario.tipo" name="" id="">
            <option value="usuario" selected="selected">Usuario</option>
            <option value="admin">Administrador</option>
          </select>

          <input type="checkbox" class="m-2" name="historico" v-model="isChecked">
          <label for="bg input-group-text custom-span ms-2 me-2">Histórico</label>

          <button class="btn btn-light m-1" @click="limpiarFormCli()">
            <i class="bi-arrow-clockwise"></i>
          </button>

        </div>
      </div>
      <button class="btn btn-primary m-1" @click.prevent="grabarUsuario">Alta</button>
      <button class="btn btn-primary m-1" @click.prevent="modificarUsuario">Modificar</button>
      <button class="btn btn-primary m-1" @click.prevent="eliminarUsuario">Eliminar</button>
    </form>
  </div>


  <div>
    <div class="container my-5">
      <h2 class="mb-4"><i class="bi bi-card-list"></i> Lista de Datos</h2>
      <div class="container my-2">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="table-info rounded-header">
              <tr>
                <th scope="col" class="w-15 text-center">DNI</th>
                <th scope="col" class="w-20">Apellidos</th>
                <th scope="col" class="w-20">Nombre</th>
                <th scope="col" class="w-20 text-center">Email</th>
                <th scope="col" class="w-10">Móvil</th>
                <th scope="col" class="w-10">Tipo</th>
                <th scope="col" class="w-10 text-center">Fecha Baja</th>
                <th scope="col" class="pale-yellow table-warning">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in usuarioPorPagina" :key="usuario.id">
                <td class="align-middle">{{ usuario.dni }}</td>
                <td class="align-middle text-start">{{ usuario.apellidos }}</td>
                <td class="align-middle text-start">{{ usuario.nombre }}</td>
                <td class="align-middle">{{ usuario.email }}</td>
                <td class="align-middle">{{ usuario.telefono }}</td>
                <td class="align-middle">{{ usuario.tipo }}</td>
                <td class="align-middle">{{ usuario.baja }}</td>
                <td class="text-center align-middle pale-yellow table-warning">
                  <div>
                    <button class="btn btn-warning m-2" @click="seleccionaUsuario(usuario)">
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                    <!--
                    <button class="btn btn-danger m-2" @click="deleteusuario(usuario.dni)">
                      <i class="bi bi-trash"></i>
                    </button>
                    -->
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

            <button class="btn btn-primary" :disabled="currentPage * pageSize >= filtroUsuarios.length"
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
  name: "TablaUsuarios",
  components: {
  },

  data() {
    return {

      usuario: {
        dni: '',
        alta: '',
        apellidos: '',
        nombre: '',
        direccion: '',
        email: '',
        provincia: '',
        municipio: '',
        baja: '',
        telefono: '',
        tipo: 'usuario'
      },

      usuarios: [],
      provincias: [],
      municipios: [],
      errores: [],
      currentPage: 1,
      pageSize: 5,
      isChecked: false,
      editDni: false
    };
  },

  mounted() {
    this.getUsuarios();
    this.getProvincias();
    this.getMunicipios();
  },


  computed: {
    usuarioPorPagina() {
      const cleintesFiltrados = this.filtroUsuarios;
      const indiceInicial = (this.currentPage - 1) * this.pageSize;
      return cleintesFiltrados.slice(indiceInicial, indiceInicial + this.pageSize)
    },

    filtroUsuarios() {
      if (this.isChecked) {
        return this.usuarios;
      } else {
        return this.usuarios.filter(usuario => !usuario.baja);
      }
    },

    municipiosFiltrados() {
      if (!this.usuario.provincia || !this.usuario.provincia.id) return [];

      return this.municipios.filter(municipio =>
        municipio.id.startsWith(this.usuario.provincia.id)
      )
    },
  },

  methods: {
    async buscarUsuario(dni) {
      if (!dni) {
        this.mostrarAlerta('Error', 'Introduce un DNI', 'error')
      } else {
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }
        const usuarios = await response.json();

        // Encontrar el usuario por su DNI
        const usuarioEncontrado = usuarios.find(c => c.dni === dni);
        if (!usuarioEncontrado) {
          this.mostrarAlerta('Error', 'usuario no existente', 'error')
        } else {

          this.seleccionaUsuario(usuarioEncontrado);
        }
      }


    },

    siguientePagina() {
      if (this.currentPage * this.pageSize < this.usuarios.length) {
        this.currentPage++;
      }
    },



    paginaAnterior() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    async seleccionaUsuario(usuario) {
      try {
        this.limpiarFormCli()
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }
        const usuarios = await response.json();

        // Encontrar el usuario por su DNI
        const usuarioEncontrado = usuarios.find(c => c.dni === usuario.dni);


        if (usuarioEncontrado) {
          // Convertir la fecha de alta al formato dd/mm/yyyy
          // Asignar el objeto completo de provincia y municipio
          if (this.usuario.provincia) {
            this.usuario.provincia = this.provincias.find(p => p.nm === this.usuario.provincia).nm;
            if (this.usuario.provincia) {
              console.log("Provincia encontrada", this.usuario.provincia);

            }
          }

          this.usuario = { ...usuarioEncontrado };
          this.editDni = true;
          console.log("usuario encontrado", this.usuario.municipio);
          if (this.usuario.alta) {
            this.usuario.alta = this.usuario.alta.split('T')[0];  // Para asegurarse de que la fecha esté en formato YYYY-MM-DD
          }
        } else {
          this.mostrarAlerta('Error', 'usuario no encontrado en el servidor.', 'error');
        }
      } catch (error) {
        console.error(error);
        this.mostrarAlerta('Error', 'No se pudo cargar el usuario desde el servidor.', 'error');
      }
    },


    limpiarFormCli() {
      this.usuario = {
        dni: '',
        alta: '',
        apellidos: '',
        nombre: '',
        direccion: '',
        email: '',
        provincia: '',
        municipio: '',
        baja: ''
      }

      this.editDni = false;
    },

    validarDNI(dni) {
      if (dni === '') {
        // Si el campo está vacío, no hace nada
        return true;
      }
      dni = dni.toUpperCase(); // Convertir a mayúsculas
      this.usuario.dni = dni;
      // Comprobar el formato del DNI/NIE
      const dniRegex = /^[XYZ0-9][0-9]{7}[A-Z]$/; // Formato 8 dígitos seguido de 1 letra

      if (!dniRegex.test(dni)) {
        this.mostrarAlerta('Error', 'El NIE/DNI con formato no válido.', 'error');
        return false;
      }

      // Inicializar variables para el cálculo
      let dniNum = dni.substring(0, 8); // Extraer los númerhttp://localhost:3000/provinciasos
      const letra = dni.charAt(8); // Obtener la letra en la posición 8
      // Identificación del NIE y sustitución
      if (dniNum.charAt(0) === 'X') {
        dniNum = dniNum.substring(1, 8)
        dniNum = '0' + dniNum; // Sustituir X por 0
      } else if (dniNum.charAt(0) === 'Y') {
        dniNum = dniNum.substring(1, 8)
        dniNum = '1' + dniNum; // Sustituir Y por 1
      } else if (dni.charAt(0) === 'Z') {
        dniNum = dniNum.substring(1, 8)
        dniNum = '2' + dniNum; // Sustituir Z por 2
      }

      // Comprobar la letra esperada
      const letras = 'TRWAGMYFPDXBNJZSQVHLCKE'; // Letras válidas para el DNI
      const letraCalculada = letras[dniNum % 23]; // Calcular la letra esperada
      if (letra !== letraCalculada) {
        this.mostrarAlerta('Error', 'DNI/NIE Incorrecto.', 'error');
        return false;
      }

      return true; // DNI/NIE válido

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

    async getUsuarios() {
      try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) {
          throw new Error('Error en la solicitud:' + response.statusText);
        }
        this.usuarios = (await response.json()).sort((a, b) => a.apellidos.localeCompare(b.apellidos) || a.nombre.localeCompare(b.nombre));
      } catch (error) {
        console.error(error);
      }
    },

    async getProvincias() {
      try {
        const response = await fetch('http://localhost:3000/provincias');
        if (!response.ok) {
          throw new Error('Error en la solicitud:' + response.statusText);
        }
        this.provincias = await response.json();
      } catch (error) {
        console.error(error);
      }
    },

    async getMunicipios() {
      try {
        const response = await fetch('http://localhost:3000/municipios');
        if (!response.ok) {
          throw new Error('Error en la solicitud:' + response.statusText);
        }
        this.municipios = await response.json();
      } catch (error) {
        console.error(error);
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
    obtenerFechaHoy() {
      const fecha = new Date();
      const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
      //return fecha.toLocaleDateString('es-ES');  // Formato dd/mm/yyyy
      return fechaFormateada;
    },

    async grabarUsuario() {
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
        if (this.usuario.dni && this.usuario.apellidos && this.usuario.telefono) {
          try {
            this.usuario.baja = '';
            // Obtener los usuarios existentes
            const response = await fetch('http://localhost:3000/usuarios');
            if (!response.ok) {
              throw new Error('Error al obtener los usuarios: ' + response.statusText);
            }

            const usuariosExistentes = await response.json();

            const usuarioExistente = usuariosExistentes.find(usuario => usuario.dni === this.usuario.dni);
            if (usuarioExistente && usuarioExistente.baja === '') {
              this.mostrarAlerta('Error', 'El usuario ya existe con este DNI', 'error');
            }
            else if (usuarioExistente) {

              usuarioExistente.baja = '';
              const actualizarResponse = await fetch(`http://localhost:3000/usuarios/${usuarioExistente.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioExistente),
              });

              if (!actualizarResponse.ok) {
                throw new Error('Error al actualizar el usuario: ' + actualizarResponse.statusText);
              }

              this.mostrarAlerta('Aviso', 'usuario reactivado correctamente', 'success');
              this.getUsuarios();
            } else {
              const crearResponse = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.usuario),
              });

              if (!crearResponse.ok) {
                throw new Error('Error al guardar el usuario: ' + crearResponse.statusText);
              }

              const nuevousuario = await crearResponse.json();
              this.usuarios.push(nuevousuario);
              this.mostrarAlerta('Aviso', 'usuario grabado correctamente', 'success');
              this.getUsuarios();
            }
          } catch (error) {
            console.error(error);
            this.mostrarAlerta('Error', 'No se pudo grabar el usuario.', 'error');
          }
        } else {
          this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
        }
      }
    },

    async eliminarUsuario() {
      try {
        const response = await fetch("http://localhost:3000/usuarios");
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.statusText);
        }

        const usuarios = await response.json();
        const usuarioExistente = usuarios.find(usuario => usuario.dni === this.usuario.dni);

        if (usuarioExistente) {
          const fechaHoy = this.obtenerFechaHoy(); // Llamada a la función correctamente

          usuarioExistente.baja = fechaHoy;

          await fetch(`http://localhost:3000/usuarios/${usuarioExistente.id}`, { // URL interpolada correctamente
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioExistente),
          });

          this.mostrarAlerta("Aviso", "usuario dado de baja correctamente", "success");
          this.getUsuarios(); // Actualizar lista de usuarios

        } else {
          this.mostrarAlerta("Error", "usuario no encontrado", "error");
        }
      } catch (error) {
        console.error(error);
        this.mostrarAlerta("Error", "No se pudo dar de baja al usuario", "error");
      }
    },

    async modificarUsuario() {
      if (this.usuario.dni) {
        try {


          const response = await fetch(`http://localhost:3000/usuarios/${this.usuario.id}`, { // URL interpolada correctamente
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.usuario),
          });


          if (!response.ok) {
            throw new Error('Error al modificar el usuario:' + response.statusText);
          }
          this.mostrarAlerta("Aviso", "usuario modificado correctamente", "success");
          this.getUsuarios();

        } catch (error) {
          console.error(error);
        }
      } else {
        this.mostrarAlerta('Error', 'Debe seleccionar un usuario para modificar', 'error')
      }
    },


  },
}

</script>

<style scoped>
.custom-date-input {
  width: 12em;
  text-align: center;
}
</style>