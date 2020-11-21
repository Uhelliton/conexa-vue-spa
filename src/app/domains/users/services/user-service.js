import RestServices from '../../../supports/services/rest-services'
import HttpServices from '@/app/supports/services/http-services'

class UserService extends RestServices {
  endpoint = '/users'
  authenticate (data) {
    return HttpServices.post('/login', data)
  }
}

export default new UserService()
