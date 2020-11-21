const routes = [
  {
    path: '/appointments',
    component: () => import('./views/AppointmentIndex'),
    name: 'appointment.index',
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/appointments/create',
    component: () => import('./views/AppointmentCreate'),
    name: 'appointment.create',
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/appointments/:id/details',
    component: () => import('./views/AppointmentDetails'),
    name: 'appointment.detail',
    meta: {
      requiresAuth: true
    }
  }
]

export default routes
