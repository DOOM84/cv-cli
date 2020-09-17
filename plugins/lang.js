import Lang from '@/static/js/lang'

export default ({ app }, inject) => {
  inject('getLang', (key) => {
    const loc = app.store.getters['multiLang/location'];
    if(loc === 'en' || loc === 'ua' || loc === 'ru'){
      return Lang[loc][key]
    }
    return Lang['ua'][key]
  })

  inject('toLang', (param) => {
      return app.store.getters['multiLang/location']+'_'+param;
  })

  const location = () =>  app.store.getters['multiLang/location'];
  inject('location', location)
}
