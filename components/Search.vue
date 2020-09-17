<template>
  <section class="pt-120 pb-150">
          <div class="container">
              <div class="row">
                  <div class="col-lg-8">
                    <h3 v-if="!posts.length">
                      {{$getLang('not_found')}}
                    </h3>
                    <template v-else>
                      <h5 class="text-right">
                        {{$getLang('found')}}: {{postsTotal}}
                      </h5>
                      <posts
                          :posts="posts"
                          @loadedPosts="handleLoadedPosts"
                          :currentPage="currentPage"
                          :postsPages="postsPages"
                          :payload="{search:this.search}"
                          :type="'blog/searchPostsOnly'"
                          :search="search"
                      />
                    </template>
                  </div>

                  <div class="col-lg-4">
                    <blog-right
                                @postsSearched="postsSearched"
                                :recentPosts="recentPosts"
                                :categories="categories"
                                :tags="tags"
                    />
                  </div>
              </div>
          </div>
      </section>
</template>

<script>
import blogRight from "~/components/blogRight";
import Posts from "~/components/Posts";
    export default {
      name: "appSearch",
      components: {Posts, blogRight},
      props: ['search','posts', 'recentPosts', 'tags', 'categories', 'postsPages', 'postsTotal', 'currentPage'],
      methods: {

        handleLoadedPosts(posts, postsPages, postsTotal, currentPage, search){
          this.$emit('paginatedPosts', posts, postsPages, postsTotal, currentPage, search)
        },

        postsSearched(posts, postsPages, postsTotal, currentPage, term){
          this.$emit('paginatedPosts', posts, postsPages, postsTotal, currentPage, term)
        }
      },
    }
</script>

<style scoped>

</style>
