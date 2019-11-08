import {request1} from './request.js'

export function homeMultiData() {
  return request1({
    url: '/home/multidata'
  })
}

export function goodsInfo(type, page) {
  return request1({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}