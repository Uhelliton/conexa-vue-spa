const routes = [
  {
    path: '/users',
    component: () => import('./views/UserIndex.vue'),
    name: 'user.index',
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/users/create',
    component: () => import('./views/UserCreate.vue'),
    name: 'user.create',
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/users/:id/edit',
    component: () => import('./views/UserEdit.vue'),
    name: 'user.edit',
    meta: {
      requiresAuth: true
    }
  }
]

export default routes
