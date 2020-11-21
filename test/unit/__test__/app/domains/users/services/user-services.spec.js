import mockAxios from 'axios'
// import userService from '@/app/domains/users/services/user-service'
import { user } from '../../__mocks__/user-mock'

describe('user-services.js', () => {
  it('authenticate a user', async () => {
    // setup
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve(user)
    )
  })
})
