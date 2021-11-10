const routes = [
  {
    path: '/exp',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      { path: '/exp', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/MainPage.vue') }
    ]
  },
  {
    path: '/songs',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      { path: '/songs', component: () => import('pages/songbook/songList.vue'), meta: {title: "Ցանկ"}},
      { path: '/song/:number', component: () => import('pages/songbook/singleSong.vue') },
      { path: '/search-song', component: () => import('pages/songbook/searchSong.vue'), meta: {title: "Որոնում"} },
      { path: '/bookmarks', component: () => import('pages/bookmark/bookmarkList.vue'), meta: {title: "Էջանշվածների ցանկ"} }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
