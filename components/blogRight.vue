<template>
  <aside>
    <!-- single sidebar widget -->
    <div class="single-sidebar-widget mb-30">
      <div class="search-bar-widget">
        <div class="search-form parsley-validate">
          <form action="#" @submit.prevent="search" novalidate="">
            <input ref="search" type="text" :placeholder="$getLang('search')+'...'" required="">
          </form>
        </div>
      </div>
    </div>
    <!--End of  single sidebar widget -->

    <!-- single sidebar widget -->
    <div class="single-sidebar-widget mb-30">
      <div class="sidebar-title">
        <h5>{{$getLang('recent_post')}} </h5>
      </div>
      <div class="sidebar-body latest-post">
        <ul>
          <!-- single latest post -->
          <li v-for="(recentPost, i) in recentPosts" :key="i">
            <div class="latest-post-wrap media">
              <div class="latest-post-img">
                <img width="60" :src="recentPost.images.thumbnail" alt="">
              </div>
              <div class="latest-post-body media-body">
                <p>
                  <nuxt-link :to="'/blog/post/'+recentPost.slug">
                    {{recentPost[$toLang('title')]}}
                  </nuxt-link>
                </p>

              </div>
            </div>
          </li>

        </ul>
      </div>
    </div>
    <!--End of  single sidebar widget -->

    <!-- single sidebar widget -->
    <div class="single-sidebar-widget mb-30">
      <div class="sidebar-title">
        <h5>{{$getLang('categories')}} </h5>
      </div>

      <div class="sidebar-body categories-inner">
        <ul>
          <li v-for="(category, i) in categories" :key="i"><nuxt-link :to="'/blog/category/'+category.slug">{{category[$toLang('name')]}}</nuxt-link></li>
        </ul>
      </div>
    </div>
    <!--End of  single sidebar widget -->

    <!-- single sidebar widget -->
    <div class="single-sidebar-widget mb-30">
      <div class="sidebar-title">
        <h5>{{$getLang('tags')}}</h5>
      </div>

      <div class="sidebar-body tag-inner">
        <nuxt-link
          :to="{ name: 'blog-tag-slug', params: {slug: tag.normalized, name: tag.name }}"
          :key="i" v-for="(tag, i) in tags"
                   class="font-weight-light text-black-50 badge badge-light pa-0 m-1  ">
          {{tag.name}}
        </nuxt-link>

      </div>
    </div>
    <!--End of  single sidebar widget -->
  </aside>
</template>

<script>
export default {
name: "blogRight",
  props: ['recentPosts', 'categories', 'tags'],
  methods: {
    async search(){
      const term = this.$refs.search.value;
      if(!term)return;

      if(this.$route.name === 'search'){
        try{
          const {
            posts,
            postsPages,
            postsTotal,
            currentPage
          } = await this.$store.dispatch('blog/searchPostsOnly',
            {search:term, page:1});
          this.$emit('postsSearched', posts, postsPages, postsTotal, currentPage, term);
        }catch (err) {
          if(err.response.status === 422){
            const message = err.response.data.errors;
            for (const key of Object.keys(message)) {
              this.$notify({
                type: 'error',
                group: 'foo',
                text: message[key][0]
              });
              break;
            }
          }
        }

      }else{
        if(!term || term.trim().length < 3){return false;}
        await this.$router.push({ name: 'search', params: { search: term } })
      }
    }
  },
}
</script>

<style scoped>

</style>
