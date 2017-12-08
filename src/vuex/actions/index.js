import account from './account'
import users from './users'
import system from './system'
import auth from './auth'

export default {
  ...account,
  ...users,
  ...system,
  ...auth
}
