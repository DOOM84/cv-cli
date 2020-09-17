<template>
  <section class="pt-120 pb-150">
          <div class="container">
              <div class="row">
                  <div class="col-lg-8">
                      <!-- blog details inner -->
                      <div class="blog-details-inner">
                          <!-- single blog inner -->
                          <div class="single-blog-inner">
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
                                    <div class="post-info d-flex justify-content-between">
                                      <a href="#" class="disabled">{{post.author}}</a>
                                      <div>
                                        <a href="#" class="disabled py-0"><span>{{post.comments.length}}</span>
                                          <font-awesome-icon class="mr-1 py-0" icon="comment" />
                                        </a>
                                        <a href="#" @click.prevent="like(post.id)"><span>{{post.likes}}</span>
                                          <font-awesome-icon v-if="post.isLiked" class="mr-1 py-0" style="color: darkred;" icon="thumbs-down" />
                                          <font-awesome-icon v-else class="py-0" style="color: green;" icon="thumbs-up" />
                                        </a>
                                      </div>

                                    </div>

                                      <div class="post-title">
                                          <h3><nuxt-link :to="'/blog/post/'+post.slug">
                                           {{post[$toLang('title')]}}
                                          </nuxt-link></h3>
                                      </div>
                                      <div v-html="post.body"></div>
                                    <div  class="text-right">
                                      <a class="font-weight-normal text-white badge badge-dark" target="_blank" :href="post.source">
                                        {{$getLang('source')}}
                                      </a>
                                    </div>
                                  </div>
                              </div><!-- /.End of post content -->
                          </div><!-- /.End of single blog inner -->

                          <!-- post tag and share -->
                          <div class="post-tag-share d-flex align-items-center">
                            <div class="post-tag">
                              <h5>Теги:</h5>
                              <nuxt-link :key="i" v-for="(tag, i) in post.tag_list.tags"
                                         :to="{ name: 'blog-tag-slug', params: {slug: post.tag_list.normalized[i], name: post.tag_list.tags[i] }}"
                                         class="font-weight-normal text-white badge badge-pill badge-info ml-1">
                                {{tag}}
                              </nuxt-link>
                            </div>
                          </div><!-- /.End of post tag and share -->

                          <!-- post comments -->
                          <div class="post-comment">
                              <h3>{{post.comments.length}} {{$getLang('comments')}}</h3>
                              <ul class="post-comments p-0 m-0 list-unstyled">
                                  <li v-for="(comment, i) in post.comments">
                                      <div class="comment-author-details media">
                                          <img :src="comment.user.avatar" alt="">
                                          <div class="comment-author-content w-100">
                                            <div class="row ">
                                              <div class="col col-lg-8 col-xl-8 col-md-8 col-sm-8 py-0">
                                                <h5>{{comment.user.name}}</h5>
                                                <h6>{{comment.created_at_dates.created_at_human}}</h6>
                                              </div>
                                              <div class="col col-lg-4 col-lg-4 col-md-4 col-sm-4 py-0 text-right">
                                                <button @click="quote(comment)" class="btn bg-white">{{$getLang('reply')}}</button>
                                                <font-awesome-icon v-if="$auth.loggedIn && $auth.user.can_remove" @click="removeComment(comment.id)" class="mr-1" icon="trash" style="cursor:pointer;" />
                                              </div>
                                            </div>
                                              <div style="overflow: hidden" v-html="comment.body"></div>
                                          </div>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                          <!--/.End of post comments -->

                          <!-- contact form -->
                          <div class="contact-form contact-page-form parsley-validate">
                              <h3>
                                {{$getLang('leave_com')}}
                              </h3>
                              <form @submit.prevent="addComment" novalidate="">
                                  <div class="row">
                                      <div id="quote" class="col-md-12">
                                        <div v-if="quotation">
                                          <font-awesome-icon @click="quotation = ''" class="mr-1" icon="window-close" style="cursor:pointer; position:absolute; right: 20px; top: 30px" />
                                          <div v-html="quotation"></div>
                                        </div>

                                          <textarea v-model.trim="commentForm.body" name="message" :placeholder="$getLang('message')"  class="theme-input-style"></textarea>
                                          <div class="submite-btn">
                                              <button :disabled="!commentForm.body" type="submit" class="btn">{{$getLang('send')}} </button>
                                          </div><!-- /.submite btn -->
                                      </div><!-- /.col -->
                                  </div><!-- /.row -->
                              </form><!-- /.form -->
                          </div><!-- /.End of contact form -->
                      </div>
                      <!-- Ennd of blog details inner -->
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
    export default {
      name: "BlogPost",
      props: ['post', 'recentPosts', 'tags', 'categories'],
      components: {blogRight},
      data(){
          return {
            quotation: '',
            commentForm: {
              body: '',
            },
            finalText:''
          }
      },
      methods: {
        quote(comment){
          if(comment.body.search("blockquote") === -1){
            this.quotation = `<p><blockquote><em>${comment.user.name} (${comment.date}): </em>${comment.body}</blockquote></p>`;
          }else{
            this.quotation = `<p><blockquote><em>${comment.user.name} (${comment.date}): </em>${comment.body.slice(comment.body.lastIndexOf('te>')+3)}</blockquote></p>`;
          }
          this.$scrollTo('#quote', 800, {offset: -200})
        },
        async like(postId){
          try {
            const {likes, isLiked, success} = await this.$store.dispatch('blog/like', postId);
            this.post.likes = likes;
            this.post.isLiked = isLiked;
            this.$notify({
              type: 'success',
              group: 'foo',
              text: success
            });
          }
          catch (e){
            if(e.response.status === 422){
              const message = e.response.data.errors;
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
        },
        async addComment(){
          try {
          const {comment, success} = await this.$store.dispatch('front/comment',
            {id: this.post.id, body: this.quotation ? this.quotation.concat(this.commentForm.body) : this.commentForm.body});
            this.quotation = '';
            this.commentForm.body = '';
            this.post.comments = [...this.post.comments, comment];
            this.$notify({
              type: 'success',
              group: 'foo',
              text: success
            });
          }
          catch (e){
            if(e.response.status === 422){
              const message = e.response.data.errors;
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
        },

        async removeComment(id){
          if (confirm('Are You Sure?')) {
            const {success} = await this.$store.dispatch('front/removeComment', id);
            this.post.comments.splice(this.post.comments.findIndex(item => item.id === id), 1);
            this.$notify({
              type: 'success',
              group: 'foo',
              text: success
            });
          }
        }
      }
    }
</script>

<style lang="scss">
blockquote {
  margin: 0;
}

blockquote {
  padding: 15px;
  background: #eee;
  border-radius: 5px;
}

blockquote p::before {
  content: '\201C';
}

blockquote p::after {
  content: '\201D';
}
</style>
