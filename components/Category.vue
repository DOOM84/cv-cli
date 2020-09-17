<template>
  <section class="pt-120 pb-150">
          <div class="container">
              <div class="row">
                <div class="col-lg-8">
                      <posts
                        :posts="posts"
                        @loadedPosts="handleLoadedPosts"
                        :currentPage="currentPage"
                        :postsPages="postsPages"
                        :payload="{category: this.category}"
                        :type="'blog/getPagedCats'"
                      />
                </div>
                  <div class="col-lg-4">
                    <blog-right  :recentPosts="recentPosts" :categories="categories" :tags="tags"/>
                  </div>
              </div>
          </div>
      </section>
</template>

<script>
import blogRight from "~/components/blogRight";
import Posts from "~/components/Posts";
    export default {
      name: "Category",
      components: {blogRight, Posts},
      props: ['category', 'posts', 'recentPosts', 'tags', 'categories', 'postsPages', 'postsTotal', 'currentPage'],
      methods: {
        handleLoadedPosts(posts, postsPages, postsTotal, currentPage){
          this.$emit('paginatedPosts', posts, postsPages, postsTotal, currentPage)
        }
      }
    }
</script>

<style scoped>

</style>
