<template>
  <ul :class="classList">
    <li><nuxt-link to="/">{{$getLang('home')}}</nuxt-link>

    </li>
    <li>
      <a href="/#about"
         @click.prevent="moveToHash('#about')"
      >
        {{$getLang('about')}}
      </a>
    </li>
    <li>
      <a href="/#technologies"
         @click.prevent="moveToHash('#technologies')"
      >
        {{$getLang('technologies')}}
      </a>
    </li>
    <li>
      <a href="/#projects"
         @click.prevent="moveToHash('#projects')"
      >
        {{$getLang('projects')}}
      </a>
    </li>
    <li>
      <a href="/#blog"
         @click.prevent="moveToHash('#blog')"
      >
        {{$getLang('blog')}}
      </a>
    </li>
    <li>
      <a href="/#contacts"
         @click.prevent="moveToHash('#contacts')"
      >
        {{$getLang('contact')}}
      </a>
    </li>

    <template v-if="$auth.loggedIn">
      <li class="pl-sm-2 ml-sm-2 pl-lg-5 ml-lg-5">
        <a href="#" @click.prevent="changeAvatar" class="pt-0">
          <img class="imgAva" :src="$auth.user.avatar" alt="">
        </a>

        <ul>
          <li><a class="disabled" href="#">{{$auth.user.name}}</a></li>
          <li class="active"><a href="#" @click.prevent="$auth.logout">{{$getLang('logOut')}}</a></li>
        </ul>
      </li>
    </template>

    <template v-else>
      <li class="pl-5 ml-5 text-right">
        <a @click.prevent="showMod('login')" href="#">
        <span class="small">
         {{$getLang('login')}}
        </span>
        </a>
      </li>
      <li class="text-right">
        <a @click.prevent="showMod('reg')" href="#">
        <span class="small">
          {{$getLang('register')}}
        </span>
        </a>
      </li>
    </template>
  </ul>

</template>

<script>
export default {
name: "AppMenu",
  props: ['classList'],
  watch: {
    '$store.state.front.showLogin': function(newVal, oldVal) {
      if(newVal){
        this.showMod('login')
      }
    }
  },
  computed: {
    showMenu (){
      return this.$store.getters['front/showMenu'];
    },
  },
  methods:{
    showMod(mode){
      this.$store.commit('front/SET_MODE', mode);
      this.$modal.show('login-modal');

    },
    changeAvatar(){
      this.$modal.show('change-avatar')
    },
    moveToHash(hash){
      try {
        if(document.getElementById(hash.substr(1))){
          this.$scrollTo(hash, 800, {offset: -40});
          this.$store.commit('front/SET_MENU', false);
        }else{
          this.$router.push({ path: '/', hash: hash})
        }

      }catch (e) {
        console.log(e);
      }
    },
  },
}
</script>

<style scoped>

</style>
