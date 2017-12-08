import Mock from 'mockjs'

export const OBJ_INDEX = '__INDEX'
export const OBJ_ID = '__ID'

const INDEX_MAP = {}

function getIndex(name) {
  if (!INDEX_MAP[name]) {
    INDEX_MAP[name] = 0
  }
  return ++INDEX_MAP[name]
}

export const Util = {
  preprocessing: (obj, tag) => {
    if (!obj[OBJ_ID]) {
      obj[OBJ_ID] = Mock.Random.guid()
    }
    if (!obj[OBJ_INDEX]) {
      obj[OBJ_INDEX] = getIndex(tag)
    }
  }
}
