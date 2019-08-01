import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export default {
  sendsms(mobile) {
    return request({
    url: `/user/sendsms/${mobile}`,
    method: 'put'
    })
  },
  login(mobile,password) {
    return request({
      url: `user/login`,
      method: 'post',
      data: {
        mobile,
        password
      }
    })
  },
  register(user,code) {
    return request({
      url: `/user/register/${code}`,
      method: 'post',
      data:user
    })
  }
}

