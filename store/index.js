export const state = () => ({
  isAdmin: null,

});

export const mutations = {
  SET_ADMIN(state, data){
    state.isAdmin = data
  },

};

export const actions = {

  nuxtServerInit({dispatch}){
    dispatch('multiLang/setLang');
  },

  async checkAdmin({commit}) {
    try {
      const adm = await this.$axios.$get('checkAdmin');
      commit('SET_ADMIN', adm);
      return adm;

    } catch (error) {
      throw error;
    }

  },


};

export const getters = {
  isAdmin(state){
    return state.isAdmin
  },

};
