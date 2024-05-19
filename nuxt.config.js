export default defineNuxtConfig({
  //devtools: { enabled: true }
  runtimeConfig: {
    jwtSecret: process.env.APP_JWT_SECRET,
    cookieName: process.env.APP_COOKIE_NAME,
    cookieExpires: process.env.APP_COOKIE_EXPIRES,
    cookieRememberMeExpires: process.env.APP_COOKIE_REMEMBER_ME_EXPIRES,
    public: {
      // Paths that unauthenticated users are allowed to see:
      // - (Wildcard `*` does what you'd expect but it's a very basic implementation!)
      unprotectedPaths: ['/', '/home', '/about*']
    }
  },
  css: [
    '~/assets/stylesheets/main.css'
  ]
})
