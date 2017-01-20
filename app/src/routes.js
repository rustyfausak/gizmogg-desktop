export default [
  {
    path: '/',
    name: 'splash-page',
    component: require('components/SplashPageView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
