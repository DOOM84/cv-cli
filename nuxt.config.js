require('dotenv').config();
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */


  head: {
    title: 'Vue.js, Laravel, PHP, Nuxt.js, Back-end, Front-end development',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'Vue.js, Laravel, PHP, Nuxt.js, Back-end, Front-end, development, создание сайтов, разработка'},
      { hid: 'description', name: 'description', content: 'Vue.js, Laravel, PHP, Nuxt.js, Back-end, Front-end, development'}
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700" },
    ],
    script: [
    ]
  },

  loading: {
    color: 'white',
    //height: '5px',
    throttle: 0
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/lang',
    '~/plugins/fontawesome.js',
    { src: '~plugins/vue-notification'},
    { src: '~plugins/vue-js-modal', ssr: false },
    { src: '~/plugins/back-to-top', mode: 'client' },
    { src: '~plugins/vue-carousel-3d', ssr: false },
    { src: '~/plugins/vue-editor.js', ssr: false },
    { src: '~/plugins/vue-input-tag', ssr: false },
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    //'@nuxtjs/dotenv',
    '@nuxtjs/auth',
    'vue-scrollto/nuxt',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],

  auth: {
    redirect: {
      home: false,
      login: '/'
    },
    watchLoggedIn: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'meta.token'
          },
          user: {
            url: '/auth/me',
            method: 'get',
            propertyName: 'data'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          }
        }
      }
    }
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseUrl: process.env.API_URL
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend (config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  }
}
