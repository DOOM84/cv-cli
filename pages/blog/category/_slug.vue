<template>
  <div>
    <BlogHeader :title="$getLang('categories')"  :subTitle="category[$toLang('name')]"/>
    <Category
      @paginatedPosts="handlePosts"
      :posts="posts"
      :recentPosts="recentPosts"
      :tags="tags"
      :categories="categories"
      :postsPages="postsPages"
      :postsTotal="postsTotal"
      :currentPage="currentPage"
      :category="category.slug"
    />
  </div>
</template>
<script>
  import BlogHeader from "~/components/BlogHeader";
  import Category from "~/components/Category";
  export default {
    validate({ params }) {
      //return !!params.slug
      return /^[a-z0-9_\-]+$/i.test(params.slug)
    },
    components: {Category, BlogHeader},
    head(){
      return {
        title: this.$getLang('sphere') +
          ' — ' + this.$getLang('blog') + ' — ' +
          this.$getLang('category') + ' — ' +
          this.category[this.$toLang('name')]
      }
    },
    data(){
      return {
        category: {},
        posts: [],
        recentPosts: [],
        tags: [],
        categories: [],
        postsPages: 0,
        postsTotal: 0,
        currentPage: 1,
      }
    },
    async asyncData({store, params, error}) {
      try {
        const {
          category,
          posts,
          recentPosts,
          tags,
          categories,
          postsPages,
          postsTotal,
          currentPage
        } = await store.dispatch('blog/category', params.slug);
        return {
          category,
          posts,
          recentPosts,
          tags,
          categories,
          postsPages,
          postsTotal,
          currentPage
        }
      }
      catch (err) {
        if(err.response.status === 404 || err.response.status === 500){
          error({statusCode: 404, message: "Not found"})
        }
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
