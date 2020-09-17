<template>
  <div class="row">
    <div class="col-12">
      <label for="editorone">Текст</label>
      <div id="editorone" ></div>
    </div>
  </div>
</template>

<script>
export default {
name: "appEditor",
  props: ['text_content', 'getData'],
  data(){
    return {
      editor: '',
    }
  },
  mounted() {
    let pg;
    if (typeof window !== 'undefined') {
      pg = require('vueditor')    // Depends on how you set weback alias
    }

    this.editor = pg.createEditor('#editorone', {
      toolbar: [
        'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
        'bold', 'italic', 'underline', 'strikeThrough', 'link', 'divider', 'subscript', 'superscript',
        'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
        'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'table', '|', 'switchView', '|', 'sourceCode'
      ],
      fontName: [
        {val: 'arial black'},
        {val: 'times new roman'},
        {val: 'Courier New'}
      ],
      fontSize: [
        '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
      ],
      uploadUrl: '',
      id: '',
      classList: ['hgt']
    });
    this.editor.setContent(this.text_content)
    this.editor.getContent();
    this.editor.upload = async (obj, callback) => {
      let formData = new FormData();
      let file = obj.files[0];
      formData.append('image', file);
      try {
        const {path, success} = await this.$store.dispatch('adminUpload/upload', formData);

        callback(path);

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
  },
  watch: {
    getData (newVal, oldVal) {
      if(newVal){
        this.$emit("get-body", this.editor.getContent());
      }
    }
  }
}
</script>

<style scoped>

</style>
