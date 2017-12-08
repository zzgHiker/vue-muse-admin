const STORAGE_KEY = 'SK_ACCOUNT'

const state = {
  is_login: false,
  user_info: {}
}

const getters = {
  isLogin: (state) => {
    return state.is_login
  }
}

const mutations = {
  'SET_USER_INFO': (state, user) => {
    state.user_info = user
  },

  'SET_LOGIN_STATE': (state, isLogin) => {
    state.is_login = isLogin
  },

  'SET_USER_PROPERTIES': (state, userProperties) => {
    for (let p in userProperties) {
      if (userProperties.hasOwnProperty(p)) {
        state.user_info[p] = userProperties[p]
      }
    }
  },

  'LOAD_STORAGE': (state) => {
    let cacheData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    for (let k in state) {
      if (cacheData.hasOwnProperty(k)) {
        state[k] = cacheData[k]
      }
    }
  },

  'SAVE_STORAGE': (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
}

export default {
  state,
  getters,
  mutations
}
