import Mock from 'mockjs'

const data = Mock.mock({
  'Groups|1-20': [{
    'id|+1': 1,
    'name': 'G+USER-@string("upper",3)'
  }],
  'Roles|10-20': [{
    'id|+1': 1,
    'name': 'A+USER-@string("upper",3)'
  }],
  'Objects|10-30': [{
    'id|+1': 1,
    'name': 'OBJ-@string("upper",3)'
  }]
})

export default {
  ...data
}
