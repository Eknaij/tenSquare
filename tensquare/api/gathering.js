import request from "@/utils/request"
const group_name='gathering'
export default {
    getList(){
        return request({
            url:'/${group_name}',
            method:'get'
        })
    },
    search(page,size,searchMap) {
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
    update(id,pojo){
        if(id == null || id == ''|| pojo== null){
            return request({    //保存
                url: `/${group_name}`,
                method: 'post',
                data: pojo
            })
        }
        return request({        //修改
            url: `/${group_name}/${id}`,
            method: 'put',
            data: pojo
        })      
    },
    deleteById(id){
        return request({
            url: `/${group_name}/${id}`,
            method: 'delete'
        })
    }
        
        
        
}