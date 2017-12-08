import api from '../api'

export default {
  groups: ({commit}) => {
    return new Promise((resolve) => {
      api.post('/auth/groups')
        .then(res => {
          commit('AUTH_CLEAR_GROUP')
          res.data.forEach(item => {
            commit('AUTH_SAVE_GROUP', item)
          })
          resolve()
        })
    })
  },

  saveGroup: ({commit}, data) => {
    return new Promise((resolve) => {
      commit('AUTH_SAVE_GROUP', data)
      resolve()
    })
  },

  roles: ({commit}) => {
    return new Promise((resolve) => {
      api.post('/auth/roles')
        .then(res => {
          commit('AUTH_CLEAR_ROLE')
          res.data.forEach(item => {
            commit('AUTH_SAVE_ROLE', item)
          })
          resolve()
        })
    })
  },

  saveRole: ({commit}, data) => {
    return new Promise((resolve) => {
      commit('AUTH_SAVE_ROLE', data)
      resolve()
    })
  },

  objects: ({commit}) => {
    return new Promise((resolve) => {
      api.post('/auth/objects')
        .then(res => {
          commit('AUTH_CLEAR_OBJECT')
          res.data.forEach(item => {
            commit('AUTH_SAVE_OBJECT', item)
          })
          resolve()
        })
    })
  },

  saveObject: ({commit}, data) => {
    return new Promise((resolve) => {
      commit('AUTH_SAVE_OBJECT', data)
      resolve()
    })
  }
}
