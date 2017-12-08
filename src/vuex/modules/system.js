const STORAGE_KEY = 'SK_SYS_CONFIG'

const state = {
  settings: {
    theme: 'carbon',
    lang: 'en'
  }
}

const getters = {
  theme: (state) => {
    return state.settings.theme
  }
}

const mutations = {
  'SET_THEME': (state, theme) => {
    state.settings.theme = theme
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
