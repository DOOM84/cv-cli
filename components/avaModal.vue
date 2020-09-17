<template>
  <client-only>
    <modal
      style="z-index: 1000000; overflow: scroll"
      name="change-avatar"
      :max-width="1000"
      width="80%"
      height="auto"
      scrollable
    >
      <div class="container py-5">
        <label for="avaFile">{{$getLang('choose_avatar')}} </label>
        <div class="input-group p-2">
          <div class="custom-file">
            <input ref="image" type="file" class="custom-file-input" id="avaFile" >
            <label class="custom-file-label" for="avaFile">{{$getLang('ch_file')}}</label>
          </div>
        </div>
        <button @click.prevent="uploadAvatar" class="btn">{{$getLang('save')}}</button>
      </div>

    </modal>
  </client-only>
</template>

<script>
export default {
name: "avaModal",
  methods: {
    async uploadAvatar(){
      try {
        let formData = new FormData();
        let file = this.$refs.image.files[0];
        if(file){formData.append('image', file)}
        const {success} = await this.$store.dispatch('front/avatar', formData);
        await this.$auth.fetchUser();
        this.$modal.hide('change-avatar');
        this.$notify({
          type: 'success',
          group: 'foo',
          text: success
        });
      } catch (e) {
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
  }
}
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  z-index: 1;
  position: relative;
  padding: 16px 36px;
  color: #5b39c9;
  font-weight: 600;
  text-transform: capitalize;
  overflow: hidden;
  border: 2px solid #5b39c9;
  border-radius: 50px;
  overflow: hidden;
  -webkit-transition: .3s all linear;
  transition: .3s all linear;
  font-size: 14px;
}
</style>
