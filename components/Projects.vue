<template>
  <section class="pt-80 pb-5 app-shot-one" id="projects">
              <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-8">
                        <!-- section title -->
                        <div class="text-center">
                            <h2>{{$getLang('projects')}}</h2>
                        </div>
                        <!-- End of section title -->
                    </div>
                </div>

                <div class="phone pt-150 pb-150">
                  <client-only placeholder="Loading...">
                    <carousel-3d  :clickable="false" :space="365" :autoplay="true" :autoplay-timeout="5000" :display="5" v-if="projects" :perspective="180" :controls-visible="true" :width="278" :height="471">
                      <slide v-for="(project, i) in projects" :index="i" :key="i">
                        <img style="cursor: pointer" @click="showImage(project)"  class="imw-pr" :src="project.images.thumbnail">
                      </slide>
                    </carousel-3d>
                  </client-only>
                </div>
                <client-only>
                  <modal
                    style="z-index: 1000000"
                    name="portfolio-modal"
                    :max-width="1000"
                    width="80%"
                    height="auto"
                    @before-close="beforeClose"
                    scrollable
                  >
                    <div class="container-fluid px-0">
                      <p class="text-center pt-3" v-html="projectToShow[$toLang('name')]"></p>
                      <img v-if="projectToShow.images" class="w-100" :src="projectToShow.images.original" alt="">
                    </div>
                  </modal>
                </client-only>
              </div><!-- /.container-fluid -->
          </section>
</template>

<script>
    export default {
      props: ['projects'],
      name: "Projects",
      data() {
        return {
          imageToShow: '',
          projectToShow: {},
        }
      },
      methods : {
        beforeClose(){
          this.projectToShow= {};
          this.imageToShow= '';
        },
        showImage(project){
          this.projectToShow = project;
          //this.imageToShow = image;
          this.$modal.show('portfolio-modal')
        }
      }
    }
</script>

<style lang="scss">

</style>
