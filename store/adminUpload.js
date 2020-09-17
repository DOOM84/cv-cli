export const state = () => ({
});

export const mutations = {

};

export const actions = {

  async upload({}, data){
    try {
      return await this.$axios.$post('admin/uploadEditorImage', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
    } catch (error) {
      throw error;
    }
  },
};

export const getters = {

  };
