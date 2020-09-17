<template>
  <div>
  <div class="blog-list-inner">
    <!-- single blog inner -->
    <div class="single-blog-inner" v-for="(post, i) in posts">
      <!-- blog image -->
      <div class="post-image">
        <nuxt-link :to="'/blog/post/'+post.slug">
          <img :src="post.images.original" alt="">
        </nuxt-link>
        <div class="post-date">
          <p><span>{{post.date[0]}}</span>{{post.date[1]}} <span>{{post.date[2]}}</span></p>
        </div>
      </div>
      <!--/.End of  blog image -->

      <!-- post content -->
      <div class="post-content">
        <div class="post-details">
          <div class="post-info d-flex">
            <a href="#" class="disabled">{{post.author}}</a>
            <a href="#" class="disabled"><span>{{post.comments}}</span> <font-awesome-icon class="mr-1 py-0" icon="comment" /></a>
            <a href="#" class="disabled"><span>{{post.likes}}</span> <font-awesome-icon class="mr-1 py-0" style="color: green;" icon="thumbs-up" /></a>
          </div>

          <div class="post-title">
            <h3><nuxt-link :to="'/blog/post/'+post.slug">{{post[$toLang('title')]}}</nuxt-link></h3>
          </div>
          <p>{{post[$toLang('subtitle')]}}</p>
          <nuxt-link class="btn" :to="'/blog/post/'+post.slug">{{$getLang('read_more')}}</nuxt-link>
        </div>
      </div><!-- /.End of post content -->
    </div><!-- /.End of single blog inner -->
  </div>
  <!-- blog pagination -->
  <div class="row">
    <ul v-if="postsPages > 1" class="theme-pagination pt-sans pagination align-items-center px-3">
      <li :class="{ disabled: currentPage <= 1 }"><a @click.prevent="togglePage('prev')"  href="#"><font-awesome-icon icon="angle-left"/></a></li>
      <li v-for="page in postsPages" :key="page" :class="{ active: currentPage === page }">
        <a @click.prevent="nextPostsPage" href="#">{{page}}</a>
      </li>
      <li :class="{ disabled: currentPage >= postsPages }"><a @click.prevent="togglePage('next')" href="#"><font-awesome-icon icon="angle-right"/></a></li>
    </ul>
  </div>
  </div>
  <!--End of blog pagination -->
</template>

<script>
    export default {
      name: "Posts",
      props: ['posts', 'postsPages', 'currentPage', 'payload', 'type', 'search'],
      methods: {
        async nextPostsPage(event) {
          const page = parseInt(event.target.innerText);
          if (page !== this.currentPage) {
            if(this.payload !== null){
              this.payload.page = page;
            }
            const {posts, currentPage, postsPages, postsTotal} =
              await this.$store.dispatch(this.type, this.payload !== null ? this.payload : page);
            this.$emit('loadedPosts', posts, postsPages, postsTotal, currentPage, this.search || '')
          } else {
            return false
          }
        },

        async togglePage(dir) {
          const page = dir === 'prev' ? this.currentPage-1 : this.currentPage+1;
          if(this.payload !== null){
            this.payload.page = page;
          }
          if (page !== this.currentPage && page > 0 && page <= this.postsPages) {
            const {posts, currentPage, postsPages, postsTotal} =
              await this.$store.dispatch(this.type, this.payload !== null ? this.payload : page);
            this.$emit('loadedPosts', posts, postsPages, postsTotal, currentPage, this.search || '')
          } else {
            return false
          }
        },
      }
    }
</script>

<style scoped>

</style>
