import {AXIOS_INSTANCE} from '../config'
import MockAdapter from 'axios-mock-adapter'
import {Accounts, Users} from './mock-data/accounts'
import AuthData from './mock-data/auth'

export default {
  bootstrap() {
    let mock = new MockAdapter(AXIOS_INSTANCE)

    mock.onPost('/account/userlogin')
      .reply(req => {
        let {username, password} = JSON.parse(JSON.stringify(req.data))
        return new Promise((resolve) => {
          let loginUser = null
          let hasUser = Accounts.some(user => {
            if (user.username === username && user.password === password) {
              loginUser = JSON.parse(JSON.stringify(user))
              delete loginUser['password']
              return true
            }
          })

          if (hasUser) {
            resolve([200, {status: 'OK', data: loginUser}])
          } else {
            resolve([200, {status: 'FAIL', data: 'UserName/Password not matched'}])
          }
        })
      })

    mock.onPost('/users')
      .reply(() => {
        return new Promise((resolve) => {
          resolve([200, {status: 'OK', data: Users}])
        })
      })

    mock.onPost('/auth/groups')
      .reply(() => {
        return new Promise((resolve) => {
          resolve([200, {status: 'OK', data: AuthData.Groups}])
        })
      })

    mock.onPost('/auth/roles')
      .reply(() => {
        return new Promise((resolve) => {
          resolve([200, {status: 'OK', data: AuthData.Roles}])
        })
      })

    mock.onPost('/auth/objects')
      .reply(() => {
        return new Promise((resolve) => {
          resolve([200, {status: 'OK', data: AuthData.Objects}])
        })
      })
  }
}
