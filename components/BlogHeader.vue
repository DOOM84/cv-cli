<template>
  <div class="page-title-wrap" style="background: rgba(0, 0, 0, 0) url(/assets/img/banner/main-base.png) repeat scroll center center;">
          <div class="container">
              <div class="row">
                  <div class="col">
                      <!-- page title content -->
                      <div class="page-title-content text-center">
                          <ul class="mb-0 list-unstyle nav">
                              <li><nuxt-link to="/">{{$getLang('home')}}</nuxt-link></li>
                              <li><nuxt-link to="/blog">{{$getLang('blog')}}</nuxt-link></li>
                              <li v-if="title"><a href="#">{{ title }}</a></li>
                          </ul>
                          <h3 class="h3 text-white">{{ subTitle }}</h3>
                      </div><!-- /.End of page title content -->
                  </div><!-- /.col -->
              </div><!-- /.row -->
          </div><!-- /.container -->
      </div>
</template>

<script>
    export default {
      name: "BlogHeader",
      props: {
        title: {
          type: String
        },
        subTitle: {
          type: String
        }
      }

    }
</script>

<style scoped>

</style>
