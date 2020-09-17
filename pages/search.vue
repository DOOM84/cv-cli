<template>
  <div>
    <BlogHeader :subTitle="term" :title="$getLang('search')" />
    <app-search
      @paginatedPosts="handlePosts"
      :posts="posts"
      :recentPosts="recentPosts"
      :tags="tags"
      :categories="categories"
      :postsPages="postsPages"
      :postsTotal="postsTotal"
      :currentPage="currentPage"
      :search="term"
    />
  </div>
</template>
<script>
  import BlogHeader from "~/components/BlogHeader";
  import appSearch from "~/components/Search";
  export default {
    components: {appSearch, BlogHeader},
    head(){
      return {
        title: this.$getLang('sphere') + ' — ' + this.$getLang('search') + ' — ' + this.term
      }
    },
    validate({ params }) {
      return !!params.search
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
        term: '',
      }
    },
    async asyncData({store, params, error}) {
      try {
        const {
          posts,
          recentPosts,
          tags,
          categories,
          postsPages,
          postsTotal,
          currentPage
        } = await store.dispatch('blog/search', {search:params.search, page:1});

        return {
          posts,
          recentPosts,
          tags,
          categories,
          postsPages,
          postsTotal,
          currentPage,
          term: params.search
        }
      }
      catch (err) {
        if(err.response.status === 422){
          error({statusCode: 404, message: "Not found"})
        }
      }
    },
    methods: {
      handlePosts(posts, postsPages, postsTotal, currentPage, term){
        this.posts = posts;
        this.postsPages = postsPages;
        this.postsTotal = postsTotal;
        this.currentPage = currentPage;
        this.term = term;
      },
    },

    /*watch: {
      "$route.params.search"(value) {
        console.log(value);
      }
    }*/
  }
</script>
