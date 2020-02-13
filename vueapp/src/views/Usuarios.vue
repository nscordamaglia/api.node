<template>
    <div class="container">

        <h1>Usuarios</h1>
        <b-alert
                    :show="dismissCountDown"
                    dismissible
                    :variant="mensaje.color"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="countDownChanged"
                    >
                    {{mensaje.texto}}
                    </b-alert>

<form @submit.prevent="agregarUsuario(usuario)" v-if="agregar">
  <h3 class="text-center">Agregar Usuario</h3>
  <input type="text" placeholder="Ingrese un Nombre" class="form-control my-2" v-model="usuario.nombre">
  <input type="text" placeholder="Ingrese un Apellido" class="form-control my-2" v-model="usuario.apellido">
  <input type="text" placeholder="Ingrese un nombre de usuario" class="form-control my-2" v-model="usuario.username">
  <input type="text" placeholder="Ingrese un correo" class="form-control my-2" v-model="usuario.email">
  <b-button class="btn-sm btn-block btn-success" type="submit">Agregar</b-button>
</form>
<form @submit.prevent="editarUsuario(usuarioEditar)" v-else>
  <h3 class="text-center">Editar Usuario</h3>
  <input type="text" placeholder="Ingrese un Nombre" class="form-control my-2" v-model="usuarioEditar.nombre">
  <input type="text" placeholder="Ingrese una descripcion" class="form-control my-2" v-model="usuarioEditar.apellido">
  <input type="text" placeholder="Ingrese un Nombre" class="form-control my-2" v-model="usuarioEditar.username">
  <input type="text" placeholder="Ingrese una descripcion" class="form-control my-2" v-model="usuarioEditar.email">
  <b-button class="btn-sm btn-block mb-1 btn-warning" type="submit">Editar</b-button>
  <b-button class="btn-sm btn-block" @click="agregar = true">Cancelar</b-button>
</form>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in usuarios" :key="index">
      <th scope="row">{{item._id}}</th>
      <td>{{item.nombre}}</td>
      <td>{{item.apellido}}</td>
      <td>{{item.username}}</td>
      <td>{{item.email}}</td>
      <td>
        <b-button class="btn-warning btn-sm mx-2" @click="activarEdicion(item._id)">Actualizar</b-button>
        <b-button class="btn-danger btn-sm mx-2" @click="eliminarUsuario(item._id)">Eliminar</b-button>
      </td>
    </tr>
  </tbody>
</table>
    </div>
    
</template>

<script>
export default {
  data() {
    return {
      usuarios: [],
      usuario: {},
      mensaje: {color: 'success', texto: ''},
      dismissSecs: 5,
      dismissCountDown: 0,
      agregar: true,
      usuarioEditar: {},
    };
  },
  created(){
    this.listarUsuarios();
  },
  methods:{
    listarUsuarios(){
      this.axios.get('users')
      .then((response) => {
        // console.log(response.data)
        this.usuarios = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    agregarUsuario(user){
      this.axios.post('create', user)
        .then(res => {
          // Agrega al inicio de nuestro array notas
          this.usuarios.unshift(res.data);
            console.log(res);
          // Alerta de mensaje
          this.showAlert();
          this.mensaje.texto = 'Usuario Agregado!'
          this.mensaje.color = 'success';
        })
        .catch( e => {
          console.log(e.response.data.message);

          // Alerta de mensaje
          this.showAlert();
          this.mensaje.color = 'danger';
          this.mensaje.texto = e.response.data.message;
        })
      
    },
    eliminarUsuario(id){
        this.axios.delete(`user/${id}`)
            .then(res => {
                console.log(res);
            let index = this.usuarios.findIndex( item => item._id === res.data._id )
            this.usuarios.splice(index, 1);

            this.showAlert();
            this.mensaje.texto = 'Usuario Eliminado!'
            this.mensaje.color = 'success'
            })
            .catch( e => {
            console.log(e.response.data.message);

            // Alerta de mensaje
            this.showAlert();
            this.mensaje.color = 'danger';
            this.mensaje.texto = e.response.data.message;
            })
        },
        activarEdicion(id){
            this.agregar = false;
            this.axios.get(`user/${id}`)
            .then(res => {
                this.usuarioEditar = res.data;
            })
            .catch(e => {
                console.log(e.response);
            })
        },
        editarUsuario(item){
            this.axios.put(`user/${item._id}`, item)
            .then(res => {
                let index = this.usuarios.findIndex( itemNota => itemNota._id === this.usuarioEditar._id);
                this.usuarios[index].nombre = this.usuarioEditar.nombre;
                this.usuarios[index].apellido = this.usuarioEditar.apellido;
                this.usuarios[index].username = this.usuarioEditar.username;
                this.usuarios[index].email = this.usuarioEditar.email;
                this.usuarioEditar = {}

                this.showAlert();
                this.mensaje.texto = 'Usuario Actualizado'
                this.mensaje.color = 'success'
            })
            .catch(e => {
                console.log(e);
            })
            this.agregar = true;
        },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }
};
</script>