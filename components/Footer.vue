<template>
    <div>
      <footer class="footer" id="contacts">
          <div class="footerbg">
          <img src="/assets/img/footer-bg.png" alt="">
          </div>
          <div class="footer-top pb-55">
            <div class="section-title text-center">
              <h3>{{$getLang('quest_com')}} {{$getLang('contacts')}}:</h3>
            </div>
              <div class="container">
                  <div class="row">
                      <div class="col-lg-6">
                        <div class="contact-form contact-page-form parsley-validate">
                          <form ref="contactForm" action="#" @submit.prevent="contact" novalidate="">
                            <div class="row">
                              <div class="col-md-6">
                                <input type="text" v-model="form.name" name="name" :placeholder="$getLang('name')" class="theme-input-style" style="border: 1px solid #6f6c7f;" required="">
                              </div>
                              <div class="col-md-6">
                                <input type="email" v-model="form.email"  name="email" :placeholder="$getLang('email')" class="theme-input-style" style="border: 1px solid #6f6c7f;" required="">
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <textarea name="message" v-model="form.message" required  :placeholder="$getLang('message')" class="theme-input-style" style="border: 1px solid #6f6c7f;"></textarea>
                                <div class="submite-btn">
                                  <button v-if="!loading" type="submit" class="btn">{{ $getLang('send') }} </button>
                                  <button v-else class="btn btn-primary" type="button" disabled>
                                    <font-awesome-icon class="mr-1" icon="spinner" spin />
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    {{$getLang('loading')}}
                                  </button>
                                </div>
                                <!-- /.submite btn -->
                              </div><!-- /.col -->
                            </div><!-- /.row -->
                          </form><!-- /.form -->
                        </div>
                      </div>
                      <div class="col-lg-6 contact_grid_left">
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="mapouter">
                              <div class="gmap_canvas">
                                <iframe
                                    id="gmap_canvas"
                                    width="100%"
                                    height="300px"
                                    src="https://maps.google.com/maps?q=Kyiv&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    frameborder="0"
                                    scrolling="no"
                                    marginheight="0"
                                    marginwidth="0"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="footer-bottom">
              <div class="footer-text text-center">
                  <p>© {{ new Date().getFullYear() }} | {{$getLang('sphere')}}</p>
              </div>
          </div>
      </footer>

    </div>
</template>

<script>
    export default {
      name: "Footer",
      data(){
        return {
          form: {
            email: '',
            name:  '',
            message: '',
          },
          loading: false
        }
      },

      methods: {
        async contact(){
          try {
            this.loading = true;
            const {success} = await this.$store.dispatch('front/contact', this.form);
            this.$refs.contactForm.reset();
            this.form = {
              email: '',
              name:  '',
              message: '',
            }
            this.loading = false;
            this.$notify({
              type: 'success',
              group: 'foo',
              text: success
            });
          }catch (e) {
            if(e.response.status === 422){
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
            this.loading = false;
          }
        },

        /*handleScroll () {

          if (window.scrollY > 70) {
            this.scrollBtn = true
          }
          else if (window.scrollY < 70) {
            this.scrollBtn = false
          }
        },*/

        /*scrollTop () {
            window.scrollTo(0, 0);
        }*/


      }
    }
</script>

<style scoped>

</style>
