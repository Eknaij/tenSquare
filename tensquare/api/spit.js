import request from '@/utils/request'
const api_name = 'spit'
export default {
search(page, size, searchMap) {
    return request({
        url: `/${api_name}/search/${page}/${size}`,
        method: 'post',
        data: searchMap
        })
    },
    findById(id){
    return request({
        url: `/${api_name}/${id}`,
        method: 'get'
        })
    },
    commentlist(id){
        return request({
        url: `/${api_name}/commentlist/${id}`,
        method: 'get'
        })
    },
    thumbup(id) {
        return request({
        url: `/${api_name}/thumbup/${id}`,
        method: 'put'
        })
    },
    save(pojo) {
        return request({
        url: `/${api_name}`,
        method: 'post',
        data: pojo
        })
    }
}