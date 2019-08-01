import request from '@/utils/request'
const api_name = 'problem'
export default {
    list(type,label,page,size){
        return request({
            url:`/${api_name}/${type}/${label}/${page}/${size}`,
            method: 'get'
        })
    }
}