<template>
  <div>
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Технологии</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group mr-2">
            <button @click.prevent="showModal('add')" type="button" class="mod-but btn ">
              Добавить
            </button>
          </div>
        </div>
      </div>

    <div v-if="skills" >
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название (рус)</th>
            <th scope="col">Название (укр)</th>
            <th scope="col">Название (англ)</th>
            <th scope="col">Уровень использования</th>
            <th scope="col">Цвет</th>
            <th scope="col">Опубликовано</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(skill, i) in skills" :key="skill.id">
            <th scope="row">{{i+1}}</th>
            <td>{{skill.ru_name}}</td>
            <td>{{skill.ua_name}}</td>
            <td>{{skill.en_name}}</td>
            <td>{{skill.rate}}</td>
            <td>{{skill.color}}</td>
            <td>{{skill.status ? 'ДА' : 'НЕТ'}}</td>
            <td>
              <button @click.prevent="editItem(skill)" type="button" class="btn mod-btn pa-0">
                <font-awesome-icon class="pa-0" icon="edit" />
              </button>
              <button @click.prevent="deleteItem(skill.id)" type="button" class="btn mod-btn ">
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
          <input type="text" v-model="skillToUpdate.ru_name" class="form-control" id="ru_name">
        </div>
          <div class="form-group">
          <label for="ua_name">Название (укр)</label>
          <input type="text" v-model="skillToUpdate.ua_name" class="form-control" id="ua_name">
        </div>
          <div class="form-group">
          <label for="en_name">Название (англ)</label>
          <input type="text" v-model="skillToUpdate.en_name" class="form-control" id="en_name">
        </div>
          <div class="form-group">
          <label for="rate">Уровень использования</label>
          <input type="text" v-model="skillToUpdate.rate" class="form-control" id="rate">
        </div>
          <div class="form-group">
            <label for="color">Цвет отображения</label>
            <input type="text" v-model="skillToUpdate.color" class="form-control" id="color">
          </div>

          <div class="custom-control custom-checkbox m-2 float-left">
            <input v-model="skillToUpdate.status" type="checkbox" class="custom-control-input" id="customCheck1">
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
        skills: [],
        skillToUpdate: {
          ru_name: '',
          ua_name: '',
          en_name: '',
          rate: '',
          color: '',
          status: false,
        }
      }
    },

    async asyncData({store}) {
      try {
        const {skills} = await store.dispatch('adminSkill/index');
        return {
          skills,
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
      editItem(skill) {
        this.skillToUpdate = Object.assign(this.skillToUpdate, skill);
        this.showModal('edit');
      },

      async createItem() {
        try {
          const {success, skill} = await this.$store.dispatch('adminSkill/create', this.skillToUpdate);
          this.skills.push(skill);
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
          const {success, skill} = await this.$store.dispatch('adminSkill/update', this.skillToUpdate);
          this.$set(this.skills, this.skills.findIndex(item => item.id === skill.id), skill);
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
        this.skillToUpdate = {
          ru_name: '',
          ua_name: '',
          en_name: '',
          rate: '',
          color: '',
          status: false,
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminSkill/delete', id);
          this.skills.splice(this.skills.findIndex(item => item.id === id), 1);
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
