export const state = () => ({
  showLogin: false,
  modalMode: false,
  showMenu: false,
  modalWidth: 656,
});

export const mutations = {
  SET_LOGIN(state, data){
    state.showLogin = data;
  },
  SET_MENU(state, data){
    state.showMenu = data;
  },
  SET_MODE(state, data){
    state.modalMode = data;
  },
  SET_WIDTH(state, data){
    state.modalWidth = data;
    console.log(state.modalWidth);
  },

};

export const actions = {

    async index() {
        try {
            return await this.$axios.$get('index')
        } catch (error) {
            throw error;
        }
    },

  async restore({}, data){
    try {
      return await this.$axios.$post('getPass', data);
    }catch (error) {
      throw error;
    }
  },

  async avatar({}, data){
    try {
      return await this.$axios.$post('avatar', data);
    }catch (error) {
      throw error;
    }
  },

  async comment({}, params){
    try {
      return await this.$axios.$post(`/blog/${params.id}/comments`, {body: params.body})
    }catch (error) {
      throw error;
    }
  },

  async removeComment({}, id){
    try {
      return await this.$axios.$delete(`removeComment/${id}`);
    } catch (error) {
      throw error;
    }
  },

  async contact({}, data){
    try {
      return await this.$axios.$post('contact', data);
    }catch (error) {
      throw error;
    }

  },

  /*async product({}, data) {
    try {
      return await this.$axios.$get(`getProduct/${data.slug}`);
    } catch (error) {
      throw error;
    }
  },

  async contacts({commit}) {
        try {
          const {contact} = await this.$axios.$get('contacts')
          commit('SET_CONTACT', contact.address);
        } catch (error) {
            throw error;
        }
    },*/


};

export const getters = {
  showLogin(state){
    return state.showLogin
  },
  modalMode(state){
    return state.modalMode
  },
  showMenu(state){
    return state.showMenu
  },
  modalWidth(state){
    return state.modalWidth
  },
  };
