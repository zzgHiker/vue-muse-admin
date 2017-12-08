import {AXIOS_INSTANCE} from '../config'

export default {
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      AXIOS_INSTANCE.post(url, params)
        .then(res => {
          let data = res.data
          if (data && data.status === 'OK') {
            resolve(data)
          } else {
            reject(data.data)
          }
        }, err => {
          reject(err)
        })
    })
  }
}
