export default {
  changeTheme: ({commit}, theme) => {
    commit('SET_THEME', theme)
    commit('SAVE_STORAGE')
  }
}
