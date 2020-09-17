export const state = () => ({

});

export const mutations = {

};


export const actions = {

  async index({}) {
    try {
      return await this.$axios.$get('blog');
    } catch (error) {
      throw error;
    }
  },
  async getPagedPosts({}, page){
    try {
      return await this.$axios.$get(`getPagedPosts/${page}`);
    } catch (error) {
      throw error;
    }
  },

  async getPagedCats({}, data){
    try {
      return await this.$axios.$get(`getPagedCats/${data.category}/${data.page}`);
    } catch (error) {
      throw error;
    }
  },

  async getPagedTag({}, data){
    try {
      return await this.$axios.$get(`getPagedTag/${data.tag}/${data.page}`);
    } catch (error) {
      throw error;
    }
  },

  async post({}, data) {
    try {
      return await this.$axios.$get(`post/${data}`);
    } catch (error) {
      throw error;
    }
  },

  async like({}, postId){
    try {
      return await this.$axios.$post(`/blog/${postId}/like`)
    }catch (error) {
      throw error;
    }
  },

  async category({}, data) {
    try {
      return await this.$axios.$get(`category/${data}`);
    } catch (error) {
      throw error;
    }
  },
  async tag({}, data) {
    try {
      return await this.$axios.$get(`tag/${data}`);
    } catch (error) {
      throw error;
    }
  },

  async search({}, data) {
    try {
      return await this.$axios.$get(`search/${data.search}/${data.page}`);
    } catch (error) {
      throw error;
    }
  },
  async searchPostsOnly({}, data) {
    try {
      return await this.$axios.$get(`searchPostsOnly/${data.search}/${data.page}`);
    } catch (error) {
      throw error;
    }
  },
};

export const getters = {

};
