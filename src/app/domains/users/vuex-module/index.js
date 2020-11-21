import UserService from '@/app/domains/users/services/user-service'
import UserStorage from '@/app/domains/users//storage/user-storage'

const CHANGE_USER = 'CHANGE_USER'
const CHANGE_TOKEN = 'CHANGE_TOKEN'
const CLEAR_USER_SESSION = 'CLEAR_USER_SESSION'

export default {
  namespaced: true,
  state: {
    auth: UserStorage.getUser(),
    token: UserStorage.getToken()
  },
  getters: {
    isAuthenticate: state => { return Object.keys(state.token).length !== 0 },
    user: state => { return state.auth },
    token: state => { return state.token }
  },
  mutations: {
    [CHANGE_USER] (state, payload) {
      state.auth = payload
    },
    [CHANGE_TOKEN] (state, payload) {
      state.token = payload
    },
    [CLEAR_USER_SESSION] (state, payload) {
      state.auth = {}
      state.token = ''
    }
  },
  actions: {
    attemptLogin ({ commit, dispatch }, payload) {
      return UserService.authenticate(payload).then(res => {
        const { data: response, status } = res
        if (status === 200 && 'data' in response) {
          const data = response.data

          commit(CHANGE_USER, data)
          commit(CHANGE_TOKEN, data.token)
          UserStorage.store(data)
        }
        return response
      }).catch(error => error.response)
    },
    logout ({ commit, dispatch }, payload) {
      commit(CLEAR_USER_SESSION, [])
      UserStorage.clearSession()
      return true
    }
  }
}
