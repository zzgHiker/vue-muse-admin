import Mock from 'mockjs'
import {MOCK_DATA_COUNT} from '@/config'

const Accounts = [{
  username: 'admin',
  password: '1234',
  cname: '管理员'
}]

const Users = []

for (let i = 0; i < MOCK_DATA_COUNT; i++) {
  Users.push({
    id: Mock.mock('@increment'),
    username: Mock.Random.name(),
    password: '123456',
    cname: Mock.Random.cname(),
    birthday: Mock.Random.date(),
    sex: Mock.Random.boolean()
  })
}

export {
  Accounts,
  Users
}
