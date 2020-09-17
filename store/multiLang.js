export const state = () => ({
    location: 'ua',
    paths: ['/', '/blog/category', '/blog/tag', '/blog/post']

});

export const mutations = {
    SET_LOCATION(state, data){
        state.location = data
    },

};


export const actions = {
    setLang({commit, getters}){
      const lang = this.$cookiz.get('lang')
      if(!lang){
        getters.getPaths.forEach(p => this.$cookiz.set('lang', 'ua', {maxAge: 60 * 60 * 24 * 30, sameSite: 'strict', path: p}))
          commit('SET_LOCATION', 'ua')
    }else{
          commit('SET_LOCATION', lang)
        }
},
  setLangInRuntime({commit, getters}, lng){
    const lang = lng ? lng : this.$cookiz.get('lang')
    if(!lang){
      getters.getPaths.forEach(p => this.$cookiz.set('lang', 'ua', {maxAge: 60 * 60 * 24 * 30, sameSite: 'strict', path: p}))
      commit('SET_LOCATION', 'ua')
    }else{
      getters.getPaths.forEach(p => this.$cookiz.set('lang', lang, {maxAge: 60 * 60 * 24 * 30, sameSite: 'strict', path: p}))
      commit('SET_LOCATION', lang)
    }
  },
    setLocation({commit},lang){
        commit('SET_LOCATION', lang)
    },

};

export const getters = {

    location(state){
        return state.location
    },
    getPaths(state){
    return state.paths
    }
};

