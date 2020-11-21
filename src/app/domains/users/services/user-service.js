import HttpServices from '@/app/supports/services/http-services'

class UserService {
  authenticate (data) {
    return HttpServices.post('/login', data)
  }
}

export default new UserService()
