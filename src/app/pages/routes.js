import { routes as auth } from './auth/index'
import { routes as dashboard } from './dashboard/index'
import { routes as appointment } from './appointment/index'

export default [
  ...auth,
  ...dashboard,
  ...appointment
]
