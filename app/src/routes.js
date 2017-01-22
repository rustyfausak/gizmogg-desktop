export default [
  {
    path: '/',
    component: require('components/SplashPageView'),
    children: [
      {
        path: '/',
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
