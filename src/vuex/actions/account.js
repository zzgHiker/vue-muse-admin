import api from '../api'

export default {
  login: ({commit}, params) => {
    return new Promise((resolve, reject) => {
      api.post('/account/userlogin', params)
        .then(res => {
          commit('SET_LOGIN_STATE', true)
          commit('SET_USER_INFO', res)
          commit('SAVE_STORAGE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  logout: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit('SET_LOGIN_STATE', false)
      commit('SET_USER_INFO', {})
      commit('SAVE_STORAGE')
      resolve()
    })
  }
}
