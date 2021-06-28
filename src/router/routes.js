
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Dashboard.vue') },
      { path: '/register', component: () => import('pages/Register.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/notifications', component: () => import('src/pages/Notifications.vue') },
      { path: '/creator', component: () => import('src/pages/Creator.vue') },
      { path: '/editor/:id', component: () => import('pages/Editor.vue') },
      { path: '/thread/:id', component: () => import('pages/Thread.vue') },
      { path: '/profile', component: () => import('pages/Profile.vue') },
      { path: '/profile/settings', component: () => import('pages/Settings.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
