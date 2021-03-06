const environment = process.env.NODE_ENV
const envSettings = require(`./env.${environment}.js`)

export default {
  env: envSettings,
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "spa",
  srcDir: "src/",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: "ja",
    },
    titleTemplate: "%s",
    title: envSettings.META_TITLE,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "og:title",
        property: "og:title",
        content: envSettings.META_TITLE
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: envSettings.META_TITLE
      },
      {
        hid: "og:title",
        property: "og:title",
        content: envSettings.META_TITLE
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://firebasestorage.googleapis.com/v0/b/kuroco-member-imabari.appspot.com/o/share-photo.png?alt=media&token=02863866-11b3-4bb9-8aac-30a72bd422d2"
      },
      {
        hid: "og:image:alt",
        property: "og:image:alt",
        content: envSettings.META_TITLE
      },
      {
        hid: "twitter:title",
        property: "twitter:title",
        content: envSettings.META_TITLE
      },
      {
        hid: "twitterCard",
        property: "twitter:card",
        content: "summary_large_image"
      },
      {
        hid: "twitterImage",
        property: "twitter:image",
        content: "https://firebasestorage.googleapis.com/v0/b/kuroco-member-imabari.appspot.com/o/share-photo.png?alt=media&token=02863866-11b3-4bb9-8aac-30a72bd422d2"
      },
      {
        hid: "description",
        name: "description",
        content: envSettings.META_TITLE,
      },
      { hid: "robots", name: "robots", content: envSettings.ROBOTS },
      {
        hid: "apple-mobile-web-app-title",
        name: "apple-mobile-web-app-title",
        content: envSettings.META_TITLE,
      },
      {
        hid: "mobile-web-app-capable",
        name: "mobile-web-app-capable",
        content: envSettings.META_TITLE,
      },
      {
        hid: "apple-mobile-web-app-capable",
        name: "apple-mobile-web-app-capable",
        content: envSettings.META_TITLE,
      },
      {
        hid: "shortcut icon + apple-touch-icon",
        name: "shortcut icon + apple-touch-icon",
        content: envSettings.META_TITLE,
      },
    ],
    link: [
      { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "shortcut icon", href: "/touch_google.png" },
      { rel: "shortcut icon", href: "/android-icon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png",  sizes:"36x36", href: "android-chrome-36x36.png" },
      { rel: "icon", type: "image/png",  sizes:"48x48", href: "android-chrome-48x48.png" },
      { rel: "icon", type: "image/png",  sizes:"72x72", href: "android-chrome-72x72.png" },
      { rel: "icon", type: "image/png",  sizes:"96x96", href: "android-chrome-96x96.png" },
      { rel: "icon", type: "image/png",  sizes:"128x128", href: "android-chrome-128x128.png" },
      { rel: "icon", type: "image/png",  sizes:"144x144", href: "android-chrome-144x144.png" },
      { rel: "icon", type: "image/png",  sizes:"152x152", href: "android-chrome-152x152.png" },
      { rel: "icon", type: "image/png",  sizes:"192x192", href: "android-chrome-192x192.png" },
      { rel: "icon", type: "image/png",  sizes:"256x256", href: "android-chrome-256x256.png" },
      { rel: "icon", type: "image/png",  sizes:"384x384", href: "android-chrome-384x384.png" },
      { rel: "icon", type: "image/png",  sizes:"512x512", href: "android-chrome-512x512.png" },
      { rel: "android-touch-icon", href: "/android-touch-icon.png" },
      { rel: "icon", type: "image/png", href: "/android-touch-icon.png" },
      { rel: "icon", type: "image/png", href: "/android-chrome.png" },
      { rel: "icon", type: "image/png", href: "/android-icon.png" },
      { rel: "icon", type: "image/png", href: "/touch-icon-chrome.png" },
    ],
    script: [
      {
        src: envSettings.PAYGENT_JS,
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ["@/assets/main.css", "@/assets/content-styles.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['@/plugins/firebase'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/auth",  'nuxt-client-init-module'],
  // pwa: {
  //   manifest: {
  //     "name": envSettings.META_TITLE,
  //     "lang": 'ja',
  //     "useWebmanifestExtension": true,
  //     "short_name": envSettings.META_TITLE,
  //     "description": envSettings.META_TITLE,
  //     "icons": [{
  //       "src": "/android-chrome-36x36.png",
  //       "type": "image/png",
  //       "sizes": "36x36",
       
  //       },
  //       {
  //       "src": "/android-chrome-48x48.png",
  //       "type": "image/png",
  //       "sizes": "48x48",
       
  //       },
  //       {
  //         "src": "/android-chrome-72x72.png",
  //         "type": "image/png",
  //         "sizes": "72x72",
          
  //       },
  //       {
  //         "src": "/android-chrome-96x96.png",
  //         "type": "image/png",
  //         "sizes": "96x96",
         
  //       },
  //       {
  //         "src": "/android-chrome-128x128.png",
  //         "type": "image/png",
  //         "sizes": "128x128",
          
  //       },
  //       {
  //         "src": "/android-chrome-144x144.png",
  //         "type": "image/png",
  //         "sizes": "144x144",
          
  //       },
  //       {
  //         "src": "/android-chrome-152x152.png",
  //         "type": "image/png",
  //         "sizes": "152x152",
          
  //       },
  //       {
  //         "src": "/android-chrome-192x192.png",
  //         "type": "image/png",
  //         "sizes": "192x192",
          
  //       },
  //       {
  //         "src": "/android-chrome-192x192.png",
  //         "type": "image/png",
  //         "sizes": "192x192",
          
  //       },
  //       {
  //         "src": "/android-chrome-256x256.png",
  //         "type": "image/png",
  //         "sizes": "256x256",
          
  //       },
  //       {
  //         "src": "/android-chrome-384x384.png",
  //         "type": "image/png",
  //         "sizes": "384x384",
  //       },
  //       {
  //         "src": "/android-chrome-512x512.png",
  //         "type": "image/png",
  //         "sizes": "512x512",
  //       },
  //       {
  //       "src": "/favicon.ico",
  //       "type": "image/x-icon",
  //       },
  //   ],
  //   }
  // },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["@/assets/variables.scss"],
    theme: {
      light: true,
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    hardSource: false,
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true,
  },
  router: {
    middleware: ["auth", "upgrade"],
  },
  axios: {
    baseURL: envSettings.BASE_URL,
    credentials: true,
  },
  auth: {
    localStorage: {
      prefix: "rcms_api.",
    },
    redirect: {
      login: "/", // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
      logout: "/", // ログアウト時のリダイレクトURL(4.9.1ではそのままでは動かない)
      callback: false,
      home: "/", // ログイン後のリダイレクトURL(4.9.1ではそのままでは動かない)
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/rcms-api/1/login",
            method: "post",
          },
          user: {
            url: "/rcms-api/1/profile",
            method: "get",
            propertyName: false,
          },
          logout: {
            url: "/rcms-api/1/logout",
            method: "post",
          },
        },
        tokenRequired: false,
        autoFetchUser: true,
      },
    },
  },
  workbox: {
    offline: false,
  }
}
