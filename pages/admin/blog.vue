<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Посты (блог)</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button @click.prevent="showModal('add')" type="button" class="mod-but btn ">
            Добавить
          </button>
        </div>
      </div>
    </div>
    <div v-if="posts" >
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Изображение</th>
            <th scope="col">Название (рус)</th>
            <th scope="col">Название (укр)</th>
            <th scope="col">Название (англ)</th>
            <th scope="col">Описание (рус)</th>
            <th scope="col">Описание (укр)</th>
            <th scope="col">Описание (англ)</th>
            <th scope="col">Автор</th>
            <th scope="col">Опубликовано</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(post, i) in posts" :key="post.slug">
            <th scope="row">{{i+1}}</th>
            <td><img width="150" :src="post.images.thumbnail" alt=""></td>
            <td>{{post.ru_title}}</td>
            <td>{{post.ua_title}}</td>
            <td>{{post.en_title}}</td>
            <td>{{post.ru_subtitle}}</td>
            <td>{{post.ua_subtitle}}</td>
            <td>{{post.en_subtitle}}</td>
            <td>{{post.author}}</td>
            <td>{{post.status ? 'ДА' : 'НЕТ'}}</td>
            <td>
              <button @click.prevent="editItem(post)" type="button" class="btn mod-btn pa-0">
                <font-awesome-icon class="pa-0" icon="edit" />
              </button>
              <button @click.prevent="deleteItem(post.id)" type="button" class="btn mod-btn ">
                <font-awesome-icon icon="trash" />
              </button>

            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
    <!--<div class="row">
      <div v-html="posts[2].body" class="col-12">
      </div>
    </div>-->

    <client-only>
      <modal
        style="z-index: 1000000; overflow: scroll"
        name="post-modal"
        :max-width="1000"
        width="80%"
        height="auto"
        @before-close="beforeClose"
        scrollable
      >
        <div class="container py-5">

          <div class="form-group">
            <label for="ru_title">Название (рус)</label>
            <input type="text" v-model="postToUpdate.ru_title" class="form-control" id="ru_title">
          </div>
          <div class="form-group">
            <label for="ua_title">Название (укр)</label>
            <input type="text" v-model="postToUpdate.ua_title" class="form-control" id="ua_title">
          </div>
          <div class="form-group">
            <label for="en_title">Название (англ)</label>
            <input type="text" v-model="postToUpdate.en_title" class="form-control" id="en_title">
          </div>
          <div class="input-group p-2">
            <div class="custom-file">
              <input ref="image" type="file" class="custom-file-input" id="editFile" >
              <label class="custom-file-label" for="editFile">Выберите изображение </label>
            </div>
          </div>
          <div class="form-group">
            <label for="ru_subtitle">Описание (рус)</label>
            <input type="text" v-model="postToUpdate.ru_subtitle" class="form-control" id="ru_subtitle">
          </div>
          <div class="form-group">
            <label for="ua_subtitle">Описание (укр)</label>
            <input type="text" v-model="postToUpdate.ua_subtitle" class="form-control" id="ua_subtitle">
          </div>
          <div class="form-group">
            <label for="en_description">Описание (англ)</label>
            <input type="text" v-model="postToUpdate.en_subtitle" class="form-control" id="en_description">
          </div>
          <div class="row">
            <div class="col">
              <label for="inputGroupSelect01">Категория(и)</label>
            </div>
          </div>
          <div class="input-group mb-3" style="min-height: 250px">
            <select v-model="postToUpdate.ids" multiple class="custom-select" id="inputGroupSelect01">
              <option v-for="(category, i) in categories" :key="i" :value="category.id">{{category.ru_name}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="tags">Теги</label>
            <client-only>
              <input-tag id="tags"
                v-model=postToUpdate.tags
                placeholder="Tags separated by commas"
                on-paste-delilmiter=",">
              </input-tag>
            </client-only>

          </div>
          <app-editor :text_content="postToUpdate.body" :getData="getData" @get-body="getBody" />

            <div class="form-group mt-5">
              <label for="author">Автор</label>
              <input type="text" v-model="postToUpdate.author" class="form-control" id="author">
            </div>
            <div class="form-group">
              <label for="source">Источник</label>
              <input type="text" v-model="postToUpdate.source" class="form-control" id="source">
            </div>
          <div class="custom-control custom-checkbox m-2 float-left">
            <input v-model="postToUpdate.status" type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">Опубликовано</label>
          </div>
          <button v-if="mode === 'edit'" @click.prevent="updateItem" type="button" class="mod-but btn btn-success">Сохранить</button>
          <button v-else @click.prevent="createItem" type="button" class="mod-but btn btn-success">Сохранить</button>
        </div>

      </modal>
    </client-only>
    </div>
</template>

<script>
  import appEditor from "~/components/appEditor";
  export default {
    components: {appEditor},
    data() {
      return {
        getData: false,
        mode: '',
        posts: [],
        categories: [],
        postToUpdate: {
          ru_title: '',
          ua_title: '',
          en_title: '',
          ru_subtitle: '',
          en_subtitle: '',
          ua_subtitle: '',
          body: '',
          author: '',
          source: '',
          status: false,
          categories: [],
          tags: [],
          ids: [],
        },

      }
    },

    async asyncData({store}) {
      try {
        const {posts, categories} = await store.dispatch('adminPost/index');
        return {
          posts,
          categories,
        }
      } catch (error) {
        /*if (error.response.status === 401) {
            return $nuxt.$router.replace('/login');
        }*/
      }
    },

    methods: {
      getBody(body){
        this.postToUpdate.body = body;
      },
      showModal(mode) {
        this.mode = mode;
        this.$modal.show('post-modal')
      },
      editItem(post) {
        this.postToUpdate = Object.assign(this.postToUpdate, post);
        this.showModal('edit');
      },

      async createItem() {
        await new Promise(resolve => {
          setTimeout(resolve, 500)
          this.getData = true;
        });
        try {

          let formData = new FormData();
          let file = this.$refs.image.files[0];
          if(file){formData.append('image', file)}
          formData.append('ru_title', this.postToUpdate.ru_title);
          formData.append('en_title', this.postToUpdate.en_title);
          formData.append('ua_title', this.postToUpdate.ua_title);
          formData.append('ru_subtitle', this.postToUpdate.ru_subtitle);
          formData.append('en_subtitle', this.postToUpdate.en_subtitle);
          formData.append('ua_subtitle', this.postToUpdate.ua_subtitle);
          formData.append('body', this.postToUpdate.body);
          formData.append('author', this.postToUpdate.author);
          formData.append('source', this.postToUpdate.source);
          formData.append('tags', JSON.stringify(this.postToUpdate.tags));
          formData.append('ids', this.postToUpdate.ids);
          formData.append('status', this.postToUpdate.status);

          const {success, post} = await this.$store.dispatch('adminPost/create', formData);
          this.posts.push(post);
          this.$modal.hide('post-modal');
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          this.getData = false;
          if(e.response.status === 404 || e.response.status === 500){
            $nuxt.error({ statusCode: 404, message: 'Not found' })
          }else{
            const message = e.response.data.errors;
            //this.$modal.hide('conditional-modal');
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

      async updateItem(){
        await new Promise(resolve => {
          setTimeout(resolve, 500)
          this.getData = true;
        });

        try {
          let formData = new FormData();
          let upFile = this.$refs.image.files[0];
          if(upFile){formData.append('image', upFile)}
          formData.append('ru_title', this.postToUpdate.ru_title);
          formData.append('en_title', this.postToUpdate.en_title);
          formData.append('ua_title', this.postToUpdate.ua_title);
          formData.append('ru_subtitle', this.postToUpdate.ru_subtitle);
          formData.append('en_subtitle', this.postToUpdate.en_subtitle);
          formData.append('ua_subtitle', this.postToUpdate.ua_subtitle);
          formData.append('body', this.postToUpdate.body);
          formData.append('author', this.postToUpdate.author);
          formData.append('source', this.postToUpdate.source);
          formData.append('status', this.postToUpdate.status);
          formData.append('ids', this.postToUpdate.ids);
          formData.append('id', this.postToUpdate.id);
          formData.append('tags', JSON.stringify(this.postToUpdate.tags));
          formData.append('_method', 'PATCH');

          const {success, post} = await this.$store.dispatch('adminPost/update', {data: formData, id: this.postToUpdate.id});
          this.$set(this.posts, this.posts.findIndex(item => item.id === post.id), post);
          this.$modal.hide('post-modal');
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          this.getData = false;
          if(e.response.status === 404 || e.response.status === 500){
            $nuxt.error({ statusCode: 404, message: 'Not found' })
          }else{
            const message = e.response.data.errors;
            //this.$modal.hide('conditional-modal');
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

      beforeClose(event) {
        this.getData = false;
        this.postToUpdate = {
          ru_title: '',
          ua_title: '',
          en_title: '',
          ru_subtitle: '',
          en_subtitle: '',
          ua_subtitle: '',
          body: '',
          author: '',
          source: '',
          status: false,
          categories: [],
          tags: [],
          ids: [],
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminPost/delete', id);
          this.posts.splice(this.posts.findIndex(item => item.id === id), 1);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        }
      },

    }
  }
</script>

<style lang="scss">

</style>
