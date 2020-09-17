<template>
  <header class="header">
          <!-- Start Header Navbar-->
      <div :class="`main-header ${sticky ? 'sticky fadeInDown' : ''}`">
          <div class="main-menu-wrap">
              <div class="container">
                  <div class="row align-items-center">
                    <div class="col-xl-1 col-lg-1 col-md-1 col-12 text-left py-0 ">
                      <!-- Logo -->
                      <ul class="d-inline-flex text-left">
                        <li v-for="lang in langs" :key="lang"  class="pr-2 small lang">
                          <a  :ref="lang" @click.prevent="setLang(lang)"  href="#"
                          >
                              {{lang}}
                          </a>
                        </li>
                      </ul>
                      <!-- End of Logo -->
                    </div>
                      <div class="col-xl-11 col-lg-11 col-md-11 col-12 menu-button">
                          <div class="menu--inner-area clearfix ">
                              <div class="menu-wraper">
                                <nav class="navbar narbar-light">
                                  <button @click.prevent="setMenu(!showMenu)" type="button" id="nav-toggle" class="navbar-toggler collapsed" aria-expanded="false"
                                          aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon pt-1">
                        <!--<i class="fa fa-navicon tm-fa-toggler-icon"></i>-->
                      <font-awesome-icon icon="bars"/>
                    </span>
                                  </button>
                                  <transition name="slide-fade">
                                    <div v-if="showMenu" id="mainNav" class="navbar-collapse pt-0" style="background: #1b1e21; color: white !important;">
                                      <AppMenu  @closeMenu="setMenu('false')" :classList="'ml-auto mobileMenu'"/>
                                    </div>
                                  </transition>

                                </nav>
                                  <nav>
                                      <!-- Header-menu -->
                                      <div class="header-menu dosis">
                                        <AppMenu :classList="'main-nav'"/>
                                        <loginModal />
                                        <avaModal />
                                        <!--modal-->
                                      </div>
                                      <!-- End of Header-menu -->
                                  </nav>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- End Header Navbar-->
  </header>
</template>

<script>
import AppMenu from "../components/AppMenu";
import loginModal from "../components/loginModal";
import avaModal from "../components/avaModal";
    export default {
      name: "NavOne",
      components: {AppMenu, loginModal, avaModal},
      data(){
        return {
          sticky: false,
          langs: ['ua', 'en', 'ru'],
        }
      },
      mounted() {
        this.checkActLang();

        if ($nuxt.$route.hash) {
          this.scrollToHash()
        }
        window.addEventListener('scroll', this.handleScroll);

      },

      computed: {
        showMenu (){
          return this.$store.getters['front/showMenu'];
        }
      },

      methods: {
        setLang(lang){
          /*this.$cookiz.set('lang', lang, {
            maxAge: 60 * 60 * 24 * 30
          });*/
          this.$store.dispatch('multiLang/setLangInRuntime', lang);
          this.checkActLang()
        },
        checkActLang(){
          for(let i = 0; i < this.langs.length; i++){
            if(this.$refs[this.langs[i]][0].innerText === this.$location()){
              //this.$refs[this.langs[i]][0].classList.remove('text-white');
              this.$refs[this.langs[i]][0].classList.add('activeLang');
            }else{
              this.$refs[this.langs[i]][0].classList.remove('activeLang');
              //this.$refs[this.langs[i]][0].classList.add('text-white')
            }
          }
        },

        setMenu(param){
          this.$store.commit('front/SET_MENU', param)
        },

        handleScroll () {

          if (window.scrollY > 70) {
            this.sticky = true
          }
          else if (window.scrollY < 70) {
            this.sticky = false
          }
        },
          scrollToHash () {
            let hash=$nuxt.$route.hash
            this.$nextTick(() => {
              this.$scrollTo(hash, 800)
            })
          },
      },
      watch: {
        '$route.path': function() {
          this.setMenu(false);
          //this.showMenu = false;
        }
      },
    }
</script>

<style lang="scss" scoped>

.activeLang{
  color: darkred;
}

</style>


