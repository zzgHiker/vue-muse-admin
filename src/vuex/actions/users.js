import api from '../api'

export default {
  users: () => {
    return api.post('/users')
  }
}
