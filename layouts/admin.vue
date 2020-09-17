<template>
<div>
  <nav class="navbar navbar-expand navbar-dark bg-dark" >
    <a @click.prevent="showMenu" href="#" id="menu-toggle" class="navbar-brand pl-3">
      <span class="navbar-toggler-icon"></span>
    </a>
      <ul class="navbar-nav mr-auto adminMenu">
        <li class="nav-item active"> <nuxt-link class="nav-link" to="/">Vue.js, Laravel, PHP, Nuxt.js, Back-end, Front-end development </nuxt-link> </li>

      </ul>
      <a href="#" @click.prevent="logout" class="text-white adminMenu">Выход</a>
  </nav>
  <div class="row" style="position: fixed; z-index: 1000000000;">
    <notifications group="foo" animation-name="v-fade-left" position="top left" />
  </div>
  <div id="wrapper" ref="wrapper" >
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
      <ul class="sidebar-nav">
        <li class="sidebar-brand ">
          <nuxt-link to="/" class="text-white font-weight-bold">
            <small><strong>Административная Панель</strong></small>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin">
            <font-awesome-icon class="mr-1" icon="home" />
            Главная
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/trainings">
            <font-awesome-icon class="mr-1" icon="info-circle" />
            Информация
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/projects">
            <font-awesome-icon class="mr-1" icon="columns" />
            Проекты
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/skills">
            <font-awesome-icon class="mr-1" icon="code" />
            Технологии
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/categories">
            <font-awesome-icon class="mr-1" icon="th-large" />
            Категории (блог)
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/blog">
            <font-awesome-icon class="mr-1" icon="pen-square" />
            Посты (блог)
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/users">
            <font-awesome-icon class="mr-1" icon="users" />
            Пользователи
          </nuxt-link>
        </li>
        <li class="sidebar-brand ">
          <a @click.prevent="logout" href="#" class="text-white font-weight-bold">
            <small>Выход</small>
          </a>
        </li>
      </ul>
    </div> <!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper">
      <div class="container" style="font-size: .875rem;">
        <nuxt />
      </div>
    </div> <!-- /#page-content-wrapper -->
  </div>
</div>
</template>

<script>
  export default {
      //middleware: 'auth',
      methods: {
        logout(){
          this.$auth.logout();
          this.$router.push('/');
        },
        showMenu(){
          this.$refs['wrapper'].classList.toggle('toggled');
        }
        },
    /*beforeMount() {
      if (this.$store.getters['isAdmin'] !== 1) this.$router.push('/404')
    },*/
    computed: {
      /*showAdm(){
        return this.$store.state.index.isAdmin === 1 ? this.$store.state.index.isAdmin : false
      },*/
      siteName() {
        return process.env.SITE_NAME;
      },
    },
      watch: {
        '$route.path': function() {
          this.$refs['wrapper'].classList.toggle('toggled');
        }
      },
    }
</script>


