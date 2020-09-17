<template>
  <div>
    <div class="row" style="position: fixed; z-index: 1000000000;">
      <notifications group="foo" animation-name="v-fade-left" position="top left" />
    </div>
    <NavOne/>
    <nuxt />
    <Footer />
  </div>

</template>


<script>
import NavOne from "../components/NavOne";
import Footer from "../components/Footer";

  export default {
    components: {
      NavOne,
      Footer,

    },
    head(){
      return {
        title: "Jironis - Vue Nuxt App Landing One Page Template"
      }
    },
    mounted(){
      this.$store.commit('front/SET_LOGIN', false)

      /*this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })*/
    },
  }
</script>

<style>
</style>
