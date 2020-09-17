<template>
  <div>
    <BlogHeader :subTitle="post[$toLang('title')]" />
    <BlogPost :post="post" :recentPosts="recentPosts" :tags="tags" :categories="categories" />

  </div>
</template>
<script>
  import BlogHeader from "@/components/BlogHeader";
  import BlogPost from "@/components/BlogPost";
  export default {
    validate({ params }) {
      return /^[a-z0-9_\-]+$/i.test(params.slug)
    },
    components: {BlogPost, BlogHeader},
    head(){
      return {
        title: this.$getLang('sphere') + ' — '
          + this.$getLang('blog') + ' — ' + this.post[this.$toLang('title')]
      }
    },
    data(){
      return {
        post: {},
        recentPosts: [],
        tags: [],
        categories: [],
      }
    },
    async asyncData({store, params, error}) {
      try {
        const {post, recentPosts, tags, categories} = await store.dispatch('blog/post', params.slug);
        return {
          post,
          recentPosts,
          tags,
          categories,
        }
      }
      catch (err) {
        if(err.response.status === 404 || err.response.status === 500 || err.response.status === 400){
          error({statusCode: 404, message: "Not found"})
        }
      }
    },
  }
</script>
