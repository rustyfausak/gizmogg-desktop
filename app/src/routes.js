export default [
  {
    path: '/',
    component: require('components/SplashPageView'),
    children: [
      {
        path: '/',
        name: 'loading',
        component: require('components/SplashPageView/Loading')
      },
      {
        path: '/choose',
        name: 'choose-dir',
        component: require('components/SplashPageView/Choose')
      },
      {
        path: '/watch',
        name: 'watch',
        component: require('components/SplashPageView/Watch')
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
