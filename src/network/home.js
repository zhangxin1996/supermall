import {request1} from './request.js'

export function homeMultiData() {
  return request1({
    url: '/home/multidata'
  })
}