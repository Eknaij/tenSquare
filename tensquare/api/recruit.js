import request from '@/utils/request'
const group_name = 'recruit'
export default {
  getList() {
    return request({
      url: `/${group_name}`,
      method: 'get'
    })
  },
  search(page, size, searchMap) {
    return request({
      url: `/${group_name}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  save(pojo) {
    return request({
      url: `/${group_name}`,
      method: 'post',
      data: pojo
    })
  },
  findById(id) {
    return request({
      url: `/${group_name}/${id}`,
      method: 'get'
    })
  },
  update(id, pojo) {
    if (id === null || id === '') {
      return this.save(pojo)
    }
    return request({
      url: `/${group_name}/${id}`,
      method: 'put',
      data: pojo
    })
  },
  deleteById(id) {
    return request({
      url: `/${group_name}/${id}`,
      method: 'delete'
    })
  },
  recommend() {
    return request({
    url: `/${group_name}/search/recommend`,
    method: 'get'
    })
  },
  newlist() {
    return request({
    url: `/${group_name}/search/newlist`,
    method: 'get'
    })
  }
}
