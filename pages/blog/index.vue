<template>
  <div>
    <BlogHeader :subTitle="$getLang('blog')"/>
    <Blog
      @paginatedPosts="handlePosts"
      :posts="posts"
      :recentPosts="recentPosts"
      :tags="tags"
      :categories="categories"
      :postsPages="postsPages"
      :postsTotal="postsTotal"
      :currentPage="currentPage"
    />
  </div>
</template>
<script>
  import BlogHeader from "~/components/BlogHeader";
  import Blog from "~/components/Blog";
  export default {
    components: {Blog, BlogHeader},
    head(){
      return {
        title: this.$getLang('sphere') + ' — ' + this.$getLang('blog')
      }
    },
    data(){
      return {
        posts: [],
        recentPosts: [],
        tags: [],
        categories: [],
        postsPages: 0,
        postsTotal: 0,
        currentPage: 1,
      }
    },
    async asyncData({store, params}) {
      try {
        const {posts, recentPosts, tags, categories, postsPages, postsTotal, currentPage} = await store.dispatch('blog/index');
        return {
          posts,
          recentPosts,
          tags,
          categories,
          postsPages,
          postsTotal,
          currentPage
        }
      }
      catch (error) {
        //console.log(error);
      }
    },
    methods: {
      handlePosts(posts, postsPages, postsTotal, currentPage){
        this.posts = posts;
        this.postsPages = postsPages;
        this.postsTotal = postsTotal;
        this.currentPage = currentPage;
      }
    }
  }
</script>
