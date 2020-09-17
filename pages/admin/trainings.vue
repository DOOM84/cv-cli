<template>
  <div>
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Информация</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group mr-2">
            <button @click.prevent="showModal('add')" type="button" class="mod-but btn ">
              Добавить
            </button>
          </div>
        </div>
      </div>

    <div v-if="trainings" >
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Должность (рус)</th>
            <th scope="col">Должность (укр)</th>
            <th scope="col">Должность (англ)</th>
            <th scope="col">Описание (рус)</th>
            <th scope="col">Описание (укр)</th>
            <th scope="col">Описание (англ)</th>
            <th scope="col">Год</th>
            <th scope="col">Цвет</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(training, i) in trainings" :key="training.id">
            <th scope="row">{{i+1}}</th>
            <td>{{training.ru_name}}</td>
            <td>{{training.ua_name}}</td>
            <td>{{training.en_name}}</td>
            <td>{{training.ru_description}}</td>
            <td>{{training.ua_description}}</td>
            <td>{{training.en_description}}</td>
            <td>{{training.year}}</td>
            <td>{{training.color}}</td>
            <td>
              <button @click.prevent="editItem(training)" type="button" class="btn mod-btn pa-0">
                <font-awesome-icon class="pa-0" icon="edit" />
              </button>
              <button @click.prevent="deleteItem(training.id)" type="button" class="btn mod-btn ">
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
          <input type="text" v-model="trainingToUpdate.ru_name" class="form-control" id="ru_name">
        </div>
          <div class="form-group">
          <label for="ua_name">Название (укр)</label>
          <input type="text" v-model="trainingToUpdate.ua_name" class="form-control" id="ua_name">
        </div>
          <div class="form-group">
          <label for="en_name">Название (англ)</label>
          <input type="text" v-model="trainingToUpdate.en_name" class="form-control" id="en_name">
        </div>
          <div class="form-group">
          <label for="ru_description">Описание (рус)</label>
          <input type="text" v-model="trainingToUpdate.ru_description" class="form-control" id="ru_description">
        </div>
          <div class="form-group">
          <label for="ua_description">Описание (укр)</label>
          <input type="text" v-model="trainingToUpdate.ua_description" class="form-control" id="ua_description">
        </div>
          <div class="form-group">
          <label for="en_description">Описание (англ)</label>
          <input type="text" v-model="trainingToUpdate.en_description" class="form-control" id="en_description">
        </div>
          <div class="form-group">
            <label for="year">Год начала</label>
            <input type="text" v-model="trainingToUpdate.year" class="form-control" id="year">
          </div>
          <div class="form-group">
            <label for="color">Цвет отображения</label>
            <input type="text" v-model="trainingToUpdate.color" class="form-control" id="color">
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
        trainings: [],
        trainingToUpdate: {
          ru_name: '',
          ua_name: '',
          en_name: '',
          ru_description: '',
          en_description: '',
          ua_description: '',
          year: '',
          color: '',
        }
      }
    },

    async asyncData({store}) {
      try {
        const {trainings} = await store.dispatch('adminTraining/index');
        return {
          trainings,
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
      editItem(training) {
        this.trainingToUpdate = Object.assign(this.trainingToUpdate, training);
        this.showModal('edit');
      },

      async createItem() {
        try {
          const {success, training} = await this.$store.dispatch('adminTraining/create', this.trainingToUpdate);
          this.trainings.push(training);
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
          const {success, training} = await this.$store.dispatch('adminTraining/update', this.trainingToUpdate);
          this.$set(this.trainings, this.trainings.findIndex(item => item.id === training.id), training);
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
        this.trainingToUpdate= {
          ru_name: '',
            ua_name: '',
            en_name: '',
            ru_description: '',
            en_description: '',
            ua_description: '',
            year: '',
            color: '',
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminTraining/delete', id);
          this.trainings.splice(this.trainings.findIndex(item => item.id === id), 1);
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
