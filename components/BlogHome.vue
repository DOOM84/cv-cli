<template>
  <section class="border-top pt-115 pb-80" id='blog'>
          <div class="container">
              <div class="row justify-content-center">
                  <div class="col-lg-8 col-md-12">
                      <!-- section title -->
                      <div class="section-title text-center">
                          <h2>{{$getLang('blog')}}</h2>
                      </div>
                      <!-- End of section title -->
                  </div>
              </div>
              <div class="row">
                  <div class="col-lg-4 col-md-4" v-for="(post, i) in posts">
                      <!-- single blog inner -->
                      <div class="single-blog-inner">
                          <!-- blog image -->
                          <div class="post-image">
                              <nuxt-link :to="'/blog/post/'+post.slug">
                                  <img :src="post.images.thumbnail" alt="">
                              </nuxt-link>
                              <div class="post-date">
                                  <p><span>{{post.date[0]}}</span>{{post.date[1]}} <span>{{post.date[2]}}</span></p>
                              </div>
                          </div>
                          <!--/.End of  blog image -->

                          <!-- post content -->
                          <div class="post-content">
                              <div class="post-details">
                                  <div class="post-info d-flex justify-content-between">
                                      <a href="#" class="disabled">{{post.author}}</a>
                                      <a href="#" class="disabled">
                                        <span>{{post.comments}}</span>
                                        <font-awesome-icon class="mr-1" icon="comment" />
                                        <span class="pr-1">{{post.likes}}</span><font-awesome-icon class="mr-1" icon="thumbs-up" />
                                      </a>
                                  </div>

                                  <div class="post-title">
                                      <h3><nuxt-link :to="'/blog/post/'+post.slug">{{post[$toLang('title')]}}</nuxt-link></h3>
                                  </div>
                                  <p>{{post[$toLang('subtitle')]}}</p>
                                  <nuxt-link class='blog-btn' :to="'/blog/post/'+post.slug">{{$getLang('read_more')}} </nuxt-link>
                              </div>
                          </div><!-- /.End of post content -->
                      </div><!-- /.End of single blog inner -->
                  </div>
              </div>
          </div>
      </section>
</template>

<script>
    export default {
        name: "BlogHome",
        props: ['posts']
    }
</script>

<style scoped>

</style>
