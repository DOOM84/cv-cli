<template>
    <div>
    <nuxt-child />
    </div>
</template>

<script>
    export default {
        layout: 'admin',

      head () {
        return {
          bodyAttrs: {
            class: 'admin'
          }
        }
      },

      /*beforeMount() {
        if (this.$store.getters['isAdmin'] !== 1) this.$router.push('/404')
      },*/

      async asyncData({store, error}) {
        try {
          await store.dispatch('checkAdmin');
          if(store.getters['isAdmin'] !== 1) new Error;
        } catch (err) {
          error({statusCode: 404, message: "Not found"})

        }
      },
    }
</script>

<style lang="scss">

.admin {
  margin: 0;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}

.adminMenu{
  @media (max-width: 768px) {
    display: none !important;
  }
}

.admin {
  @media (min-width: 1200px) {
    .container {
      max-width: 1310px;
    }
  }
}

.admin {
  @media (max-width: 1600px) {
    .container {
      max-width: 1000px;
    }
  }
}

.admin .hgt{
  min-height: 500px !important;
}

.admin #wrapper {
  padding-left: 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.admin #wrapper.toggled {
  padding-right: 250px;
}

.admin #sidebar-wrapper {
  z-index: 1000;
  position: fixed;
  left: 0px;
  width: 0;
  height: 100%;
  margin-right: -250px;
  overflow-y: auto;
  background: #000;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.admin #wrapper.toggled #sidebar-wrapper {
  width: 250px;
}

.admin #page-content-wrapper {
  width: 100%;
  position: absolute;
  padding: 15px;
}

.admin #wrapper.toggled #page-content-wrapper {
  position: absolute;
  margin-right: 0px;
}


/* Sidebar Styles */

.admin .sidebar-nav {
  position: absolute;
  top: 0;
  width: 250px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.admin .sidebar-nav li {
  text-indent: 20px;
  line-height: 40px;
}

.admin .sidebar-nav li a {
  display: block;
  text-decoration: none;
  color: #999999;
}

.admin .sidebar-nav li a:hover {
  text-decoration: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
}

.admin .sidebar-nav li a:active, .sidebar-nav li a:focus {
  text-decoration: none;
}
.admin .sidebar-brand {
  display: none;
}

.admin .sidebar-nav>.sidebar-brand {
  height: 65px;
  font-size: 18px;
  line-height: 60px;
}

.admin .sidebar-nav>.sidebar-brand a {
  color: #999999;
}

.admin .sidebar-nav>.sidebar-brand a:hover {
  color: #fff;
  background: none;
}

.admin {
  @media (min-width: 1200px) {
    .navbar {
      display: flex;

    }
  }
}


.admin {
  @media (max-width: 768px) {
    .sidebar-brand {
      display: block;
    }
}

  .admin .navbar-header {
    float: none;
  }
  .admin .navbar-toggle {
    display: block;
  }
  .admin .navbar-collapse {
    border-top: 1px solid transparent;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .admin .navbar-collapse.collapse {
    display: none!important;
  }
  .admin .navbar-nav {
    float: none!important;
    margin: 7.5px -15px;
  }
  .admin .navbar-nav>li {
    float: none;
  }
  .admin .navbar-nav>li>a {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .admin .navbar-text {
    float: none;
    margin: 15px 0;
  }
  /* since 3.1.0 */
  .admin .navbar-collapse.collapse.in {
    display: block!important;
  }
  .admin .collapsing {
    overflow: hidden!important;
  }
}
.admin .mod-but {
  background: white;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  letter-spacing: 1px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  min-width: 140px;
  margin-top: 8px;
  color: black;
  cursor: pointer;
  border: 1px solid #1f2328;
  text-transform: uppercase;
  transition: 0.1s all;
  font-size: 10px;

  .admin .mod-but:hover {
    border-color: mix(#dddedf, black, 90%);
    color: mix(#8b8c8d, black, 80%);
  }
}

.admin .mod-btn {
  background-color: white;
  border-color: gray;
  border-radius: 0;
  color: #666666;
  font-size: 1rem;
  margin-top: 5px;
  padding: 10px 20px;
}

</style>
