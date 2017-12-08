import Axios from 'axios'
import Qs from 'qs'

const debug = process.env.NODE_ENV !== 'production'

export const API_ROOT_PATH = debug ? 'http://server/api/' : 'http://server/api'
export const APP_ID = '{app-id}'
export const APP_VERSION = '1.0.0'

export const MOCK_DATA_COUNT = 100
// 是否启用模拟资料
export const MOCK_DATA_ENABLE = true

export const AXIOS_INSTANCE = Axios.create({
  baseURL: API_ROOT_PATH,
  transformRequest: [function (data) {
    return MOCK_DATA_ENABLE ? data : Qs.stringify(data)
  }]
})

export const APP_MENUS = [
  {
    text: '首页',
    toggle: false,
    value: '/home',
    to: '/home'
  },
  {
    text: '应用管理',
    toggle: false,
    isMenu: true
  },
  {
    text: '用户管理',
    toggle: false,
    isMenu: true
  },
  {
    text: '设备管理',
    toggle: false,
    isMenu: true
  },
  {
    text: '权限管理',
    toggle: false,
    isMenu: true,
    val: '/auth',
    items: [
      {
        text: '群组',
        to: '/auth/group'
      },
      {
        text: '角色',
        to: '/auth/role'
      },
      {
        text: '权限物件',
        to: '/auth/object'
      }
    ]
  },
  {
    text: 'Chart',
    toggle: false,
    isMenu: true,
    val: '/charts',
    items: [
      {
        text: 'Line',
        to: '/charts/line'
      }
    ]
  },
  {
    text: 'Icons',
    toggle: false,
    isMenu: true,
    val: '/icons',
    items: [
      {
        text: 'Material Design Icons',
        to: '/icons/mdi'
      }
    ]
  },
  {
    text: 'Table',
    toggle: false,
    val: '/tables',
    isMenu: true,
    items: [
      {
        text: 'Table',
        to: '/tables/table'
      }
    ]
  }
]
