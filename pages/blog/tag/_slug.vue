<template>
  <div>
    <BlogHeader :title="$getLang('tags')"  :subTitle="$route.params.name || tag"/>
    <Tag
      @paginatedPosts="handlePosts"
      :posts="posts"
      :recentPosts="recentPosts"
      :tags="tags"
      :categories="categories"
      :postsPages="postsPages"
      :postsTotal="postsTotal"
      :currentPage="currentPage"
      :tag="$route.params.slug"
    />
  </div>
</template>
<script>
  import BlogHeader from "~/components/BlogHeader";
  import Tag from "~/components/Tag";
  export default {
    validate({ params }) {
      return /^[a-z0-9_\-]+$/i.test(params.slug)
    },
    components: {Tag, BlogHeader},
    head(){
      return {
        title: this.$getLang('sphere') +
          ' — ' + this.$getLang('blog') + ' — ' +
          this.$getLang('tags') + ' — ' + this.tag
      }
    },
    data(){
      return {
        tag: '',
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
          posts,
          recentPosts,
          tags,
          categories,
          postsPages,
          postsTotal,
          currentPage,
          tag,
        } = await store.dispatch('blog/tag', params.slug);
        return {
          posts,
          recentPosts,
          tags,
          categories,
          postsPages,
          postsTotal,
          currentPage,
          tag
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
