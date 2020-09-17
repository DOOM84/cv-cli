<template>
  <client-only>
    <modal style="z-index: 2000000"
           :clickToClose="false"
           @closed="$store.commit('front/SET_MENU', false)"
           name="login-modal"
           transition="pop-out"
           :width="modalWidth" scrollable
           :focus-trap="true"
           @before-open="beforeOpen"
           height="auto">
      <div class="box">
        <div class="box-part" id="bp-left">
          <div class="partition" id="partition-register">
            <div class="partition-title py-0 pr-5 mt-1 text-right">
              <font-awesome-icon @click="hideModal" style="cursor: pointer" icon="window-close" /></div>
            <div class="partition-title py-4">
              {{mode === 'reg' ? $getLang('register') : mode === 'login' ? $getLang('login') : $getLang('resetPas') }}
            </div>
            <div class="partition-form">
              <form autocomplete="false">

                <div class="autocomplete-fix">
                  <input disabled type="password">
                </div>
                <template v-if="mode==='login'">
                  <input v-model="loginForm.email" type="email" :placeholder="$getLang('email')">
                  <input v-model="loginForm.password" type="password" :placeholder="$getLang('password')">
                </template>
                <template v-else-if="mode==='reg'">
                  <input v-model="regForm.email" type="email" :placeholder="$getLang('email')">
                  <input v-model="regForm.name" type="text" :placeholder="$getLang('name')">
                  <input v-model="regForm.password" type="password" :placeholder="$getLang('password')">
                  <input v-model="regForm.password_confirmation" type="password" :placeholder="$getLang('password_more')">
                </template>

                <template v-else>
                  <input v-model="restoreForm.email" type="email" :placeholder="$getLang('email')">
                </template>


              </form>
              <div :style="mode==='login' ? 'margin-top: 42px' : 'margin-top: 12px'">
              </div>

              <div class="button-set">
                <template v-if="mode==='login'">
                  <button @click="signIn">{{$getLang('login')}}</button>
                  <button @click.prevent="$store.commit('front/SET_MODE', 'restore')"  class="marg-btn" >{{$getLang('forgot')}}</button>
                </template>
                <template v-else-if="mode==='reg'">
                  <button id="register-btn" class="mb-40" @click="register">{{$getLang('register')}}</button>
                </template>
                <template v-else>
                  <button @click="restore">{{$getLang('resetPas')}} </button>
                  <button @click.prevent="$store.commit('front/SET_MODE', 'login')"  class="marg-btn" >{{$getLang('login')}}</button>
                </template>

              </div>


            </div>
          </div>
        </div>
        <div class="box-part" id="bp-right">
          <div class="box-messages">
          </div>
        </div>
      </div>
    </modal>
  </client-only>
</template>
<script>
const MODAL_WIDTH = 656;
export default {
  name: 'loginModal',
  data(){
    return {
      loginForm: {
        email: '',
        password: '',
      },
      regForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      restoreForm: {
        email: '',
      },
      modalWidth: MODAL_WIDTH,
    }
  },
  mounted() {
    if(window.screen.width < 320){
      this.modalWidth = window.innerWidth < MODAL_WIDTH ? window.innerWidth : MODAL_WIDTH;
    }else{
      this.modalWidth = window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;

    }
  },

  computed: {
    mode(){
      return this.$store.getters['front/modalMode']
    }
  },

  methods: {
    beforeOpen(){
      if(window.screen.width < 320){
        this.modalWidth = window.innerWidth < MODAL_WIDTH ? window.innerWidth : MODAL_WIDTH;
      }else{
        this.modalWidth = window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
      }
    },
    hideModal(){
      this.loginForm = {
        email: '',
          password: '',
      };
        this.regForm= {
        name: '',
          email: '',
          password: '',
          password_confirmation: '',
      };
        this.restoreForm= {
        email: '',
      };
      this.$store.commit('front/SET_LOGIN', false)
      this.$modal.hide('login-modal');
    },
    async signIn() {
      try {
        await this.$auth.loginWith('local', {data: this.loginForm});
        this.hideModal();

      }catch (e) {
        const message = e.response.data.errors;
        for (const key of Object.keys(message)) {
          this.$notify({
            type: 'error',
            group: 'foo',
            text: message[key][0]
          });
          break;
        }
      }
    },
    async register() {
      try {
        await this.$axios.post('auth/register', this.regForm);

        await this.$auth.loginWith('local', {
          data: {
            email: this.regForm.email,
            password: this.regForm.password
          },
        });
        this.hideModal();
        //this.$router.push('/')
      } catch (e) {
        const message = e.response.data.errors;
        for (const key of Object.keys(message)) {
          this.$notify({
            type: 'error',
            group: 'foo',
            text: message[key][0]
          });
          break;
        }
      }
    },
    async restore(){
      try {
        const {success} = await this.$store.dispatch('front/restore', this.restoreForm);
        this.$notify({
          type: 'success',
          group: 'foo',
          text: success
        });
      }catch (e) {
        const message = e.response.data.errors;
        for (const key of Object.keys(message)) {
          this.$notify({
            type: 'error',
            group: 'foo',
            text: message[key][0]
          });
          break;
        }
      }
    },

  }
}
</script>
<style lang="scss">

</style>
