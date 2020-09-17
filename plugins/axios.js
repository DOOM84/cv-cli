export default  function ({$axios, store, app, redirect}) {

  $axios.interceptors.request.use((config) => {
    //if(config.method !== 'get'){
      config.params = config.params || {};
      config.params['lang'] = store.getters['multiLang/location'];
    //}
    return config;
  });

  $axios.onError(error => {

    if (error.response.status === 401) {
      app.$auth.reset();
      store.commit('front/SET_LOGIN', true);
      //return redirect('/');
    }
    /*if(error.response.status === 422){
      store.dispatch("validation/setErrors", error.response.data.errors);
      //return redirect('/login');
    }*/
    /*if(error.response.status === 404){
      return redirect('/404');
    }

    if (error.response.status === 500) {
      //console.error('Server 500 error')
      return redirect('/404');
    }*/

    /*if (error.response.status === 401) {
      app.$auth.reset();
      store.commit('auth/SET_LOGIN', true)
      //store.d

      //return redirect('/');
    }*/

    return Promise.reject(error);
  });

  /*$axios.onRequest(()=>{
    store.dispatch("validation/clearErrors");
  })*/
}
