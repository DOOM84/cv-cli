<template>
  <div>
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Проекты</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group mr-2">
            <button @click.prevent="showModal('add')" type="button" class="mod-but btn ">
              Добавить
            </button>
          </div>
        </div>
      </div>

    <div v-if="projects" >
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
            <th scope="col">Опубликовано</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(project, i) in projects" :key="project.id">
            <th scope="row">{{i+1}}</th>
            <td><img :src="project.images.thumbnail" alt=""></td>
            <td v-html="project.ru_name"></td>
            <td v-html="project.ua_name"></td>
            <td v-html="project.en_name"></td>
            <td v-html="project.ru_details"></td>
            <td v-html="project.ua_details"></td>
            <td v-html="project.en_details"></td>
            <td>{{project.status ? 'ДА' : 'НЕТ'}}</td>
            <td>
              <button @click.prevent="editItem(project)" type="button" class="btn mod-btn pa-0">
                <font-awesome-icon class="pa-0" icon="edit" />
              </button>
              <button @click.prevent="deleteItem(project.id)" type="button" class="btn mod-btn ">
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

          <div v-if="projectToUpdate.images" class="text-center">
            <img class="img-fluid" :src="projectToUpdate.images.thumbnail" alt="">
          </div>

        <div class="form-group">
          <label for="ru_name">Название (рус)</label>
          <input type="text" v-model="projectToUpdate.ru_name" class="form-control" id="ru_name">
        </div>
          <div class="form-group">
          <label for="ua_name">Название (укр)</label>
          <input type="text" v-model="projectToUpdate.ua_name" class="form-control" id="ua_name">
        </div>
          <div class="form-group">
          <label for="en_name">Название (англ)</label>
          <input type="text" v-model="projectToUpdate.en_name" class="form-control" id="en_name">
        </div>
          <div class="form-group">
          <label for="ru_details">Описание (рус)</label>
          <input type="text" v-model="projectToUpdate.ru_details" class="form-control" id="ru_details">
        </div>
          <div class="form-group">
          <label for="ua_details">Описание (укр)</label>
          <input type="text" v-model="projectToUpdate.ua_details" class="form-control" id="ua_details">
        </div>
          <div class="form-group">
          <label for="en_details">Описание (англ)</label>
          <input type="text" v-model="projectToUpdate.en_details" class="form-control" id="en_details">
        </div>

          <div class="input-group p-2">
            <div class="custom-file">
              <input ref="image" type="file" class="custom-file-input" id="editFile" >
              <label class="custom-file-label" for="editFile">Выберите изображение </label>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label for="inputGroupSelect01">Используумые технологии</label>
            </div>
          </div>
          <div class="input-group mb-3" style="min-height: 250px">
            <select v-model="projectToUpdate.ids" multiple class="custom-select" id="inputGroupSelect01">
              <option v-for="(skill, i) in skills" :key="i" :value="skill.id">{{skill.ru_name}}</option>
            </select>
          </div>
          <div class="custom-control custom-checkbox m-2 float-left">
            <input v-model="projectToUpdate.status" type="checkbox" class="custom-control-input" id="customCheck1">
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
        projects: [],
        projectToUpdate: {
          ru_name: '',
          ua_name: '',
          en_name: '',
          ru_details: '',
          ua_details: '',
          en_details: '',
          images: [],
          skills: [],
          ids: [],
          status: false,
        }
      }
    },

    async asyncData({store}) {
      try {
        const {projects, skills} = await store.dispatch('adminProject/index');
        return {
          projects,
          skills
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
      editItem(project) {
        this.projectToUpdate = Object.assign(this.projectToUpdate, project);
        this.showModal('edit');
      },

      async createItem() {
        try {

          let formData = new FormData();
          let file = this.$refs.image.files[0];
          if(file){formData.append('image', file)}
          formData.append('ru_name', this.projectToUpdate.ru_name);
          formData.append('en_name', this.projectToUpdate.en_name);
          formData.append('ua_name', this.projectToUpdate.ua_name);
          formData.append('ru_details', this.projectToUpdate.ru_details);
          formData.append('en_details', this.projectToUpdate.en_details);
          formData.append('ua_details', this.projectToUpdate.ua_details);
          formData.append('ids', this.projectToUpdate.ids);
          formData.append('status', this.projectToUpdate.status);

          const {success, project} = await this.$store.dispatch('adminProject/create', formData);
          this.projects.push(project);
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
          let formData = new FormData();
          let upFile = this.$refs.image.files[0];
          if(upFile){formData.append('image', upFile)}
          formData.append('ru_name', this.projectToUpdate.ru_name);
          formData.append('en_name', this.projectToUpdate.en_name);
          formData.append('ua_name', this.projectToUpdate.ua_name);
          formData.append('ru_details', this.projectToUpdate.ru_details);
          formData.append('en_details', this.projectToUpdate.en_details);
          formData.append('ua_details', this.projectToUpdate.ua_details);
          formData.append('ids', this.projectToUpdate.ids);
          formData.append('id', this.projectToUpdate.id);
          formData.append('status', this.projectToUpdate.status);
          formData.append('_method', 'PATCH');

          const {success, project} = await this.$store.dispatch('adminProject/update', {data: formData, id: this.projectToUpdate.id});
          this.$set(this.projects, this.projects.findIndex(item => item.id === project.id), project);
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
        this.projectToUpdate= {
            ru_name: '',
            ua_name: '',
            en_name: '',
            ru_details: '',
            ua_details: '',
            en_details: '',
            images: [],
            skills: [],
            ids: [],
            status: false,
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminProject/delete', id);
          this.projects.splice(this.projects.findIndex(item => item.id === id), 1);
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
