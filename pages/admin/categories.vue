<template>
  <div>
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Категории</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group mr-2">
            <button @click.prevent="showModal('add')" type="button" class="mod-but btn ">
              Добавить
            </button>
          </div>
        </div>
      </div>

    <div v-if="categories" >
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название (рус)</th>
            <th scope="col">Название (укр)</th>
            <th scope="col">Название (англ)</th>
            <th scope="col">Опубликовано</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(category, i) in categories" :key="category.id">
            <th scope="row">{{i+1}}</th>
            <td>{{category.ru_name}}</td>
            <td>{{category.ua_name}}</td>
            <td>{{category.en_name}}</td>
            <td>{{category.status ? 'ДА' : 'НЕТ'}}</td>
            <td>
              <button @click.prevent="editItem(category)" type="button" class="btn mod-btn pa-0">
                <font-awesome-icon class="pa-0" icon="edit" />
              </button>
              <button @click.prevent="deleteItem(category.id)" type="button" class="btn mod-btn ">
                <font-awesome-icon icon="trash" />
              </button>

            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
    <client-only>
      <modal
        style="z-index: 1000000"
        name="conditional-modal"
        :max-width="1000"
        width="80%"
        height="auto"
        @before-close="beforeClose"
        scrollable
      >
        <div class="container">

        <div class="form-group">
          <label for="ru_name">Название (рус)</label>
          <input type="text" v-model="categoryToUpdate.ru_name" class="form-control" id="ru_name">
        </div>
          <div class="form-group">
          <label for="ua_name">Название (укр)</label>
          <input type="text" v-model="categoryToUpdate.ua_name" class="form-control" id="ua_name">
        </div>
          <div class="form-group">
          <label for="en_name">Название (англ)</label>
          <input type="text" v-model="categoryToUpdate.en_name" class="form-control" id="en_name">
        </div>
          <div class="custom-control custom-checkbox m-2 float-left">
            <input v-model="categoryToUpdate.status" type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">Опубликовано</label>
          </div>
        <div class="float-right m-3">
          <button v-if="mode === 'add'"
                  type="button"
                  class="mod-but btn"
                  @click.prevent="createItem">
            Добавить
          </button>
          <button v-else
                  type="button"
                  class="mod-but btn"
                  @click.prevent="updateItem">
            Сохранить
          </button>
        </div>
        </div>


      </modal>
    </client-only>

  </div>
</template>

<script>
  export default {
    layout: 'admin',
    data() {

      return {
        mode: '',
        categories: [],
        categoryToUpdate: {
          ru_name: '',
          ua_name: '',
          en_name: '',
          status: false,
        }
      }
    },

    async asyncData({store}) {
      try {
        const {categories} = await store.dispatch('adminCategory/index');
        return {
          categories,
        }
      } catch (error) {
        /*if (error.response.status === 401) {
            return $nuxt.$router.replace('/login');
        }*/
      }
    },

    methods: {
      showModal(mode) {
        this.mode = mode;
        this.$modal.show('conditional-modal')
      },
      editItem(category) {
        this.categoryToUpdate = Object.assign(this.categoryToUpdate, category);
        this.showModal('edit');
      },

      async createItem() {
        try {
          const {success, category} = await this.$store.dispatch('adminCategory/create', this.categoryToUpdate);
          this.categories.push(category);
          this.$modal.hide('conditional-modal');
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
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
        try {
          const {success, category} = await this.$store.dispatch('adminCategory/update', this.categoryToUpdate);
          this.$set(this.categories, this.categories.findIndex(item => item.id === category.id), category);
          this.$modal.hide('conditional-modal');
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
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
        this.categoryToUpdate = {
          ru_name: '',
          ua_name: '',
          en_name: '',
          status: false,
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminCategory/delete', id);
          this.categories.splice(this.categories.findIndex(item => item.id === id), 1);
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

<style lang="scss" scoped>

</style>
