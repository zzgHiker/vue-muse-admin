import {OBJ_ID, Util} from '../util'

const state = {
  groups: [],
  roles: [],
  objects: []
}

const getters = {
  groups: (state) => {
    return state.groups
  },
  roles: (state) => {
    return state.roles
  },
  objects: (state) => {
    return state.objects
  }
}

const keyIndex = {
  groups: {},
  roles: {},
  objects: {}
}

const mutations = {
  'AUTH_SAVE_GROUP': (state, data) => {
    Util.preprocessing(data, 'GROUP')
    let key = data[OBJ_ID]
    let keyMap = keyIndex.groups
    let store = state.groups
    if (keyMap[key]) {
      for (let p in data) {
        keyMap[key][p] = data[p]
      }
    } else {
      keyMap[key] = data
      store.push(data)
    }
  },

  'AUTH_REMOVE_GROUP': (state, groupID) => {
    let groups = state.groups
    for (let i = 0; i < groups.length; i++) {
      if (groups[i][OBJ_ID] === groupID) {
        groups.splice(i, 1)
        delete keyIndex.groups[groupID]
        i--
      }
    }
  },

  'AUTH_CLEAR_GROUP': (state) => {
    state.groups = []
    keyIndex.groups = {}
  },

  'AUTH_SAVE_ROLE': (state, data) => {
    Util.preprocessing(data, 'ROLE')
    let key = data[OBJ_ID]
    let keyMap = keyIndex.roles
    let store = state.roles
    if (keyMap[key]) {
      for (let p in data) {
        keyMap[key][p] = data[p]
      }
    } else {
      keyMap[key] = data
      store.push(data)
    }
  },

  'AUTH_REMOVE_ROLE': (state, roleId) => {
    let roles = state.roles
    for (let i = 0; i < roles.length; i++) {
      if (roles[i][OBJ_ID] === roleId) {
        roles.splice(i, 1)
        delete keyIndex.roles[roleId]
        i--
      }
    }
  },

  'AUTH_CLEAR_ROLE': (state) => {
    state.roles = []
    keyIndex.roles = {}
  },

  'AUTH_SAVE_OBJECT': (state, data) => {
    Util.preprocessing(data, 'OBJECT')
    let key = data[OBJ_ID]
    let keyMap = keyIndex.objects
    let store = state.objects
    if (keyMap[key]) {
      for (let p in data) {
        keyMap[key][p] = data[p]
      }
    } else {
      keyMap[key] = data
      store.push(data)
    }
  },

  'AUTH_REMOVE_OBJECT': (state, objectId) => {
    let objects = state.objects
    for (let i = 0; i < objects.length; i++) {
      if (objects[i][OBJ_ID] === objectId) {
        objects.splice(i, 1)
        delete keyIndex.objects[objectId]
        i--
      }
    }
  },

  'AUTH_CLEAR_OBJECT': (state) => {
    state.objects = []
    keyIndex.objects = {}
  }
}

export default {
  state,
  getters,
  mutations
}
