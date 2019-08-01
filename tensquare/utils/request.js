import axios from 'axios'
import {getUser} from '@/utils/auth'
// 创建axios实例
const service = axios.create({
    baseURL: 'http://192.168.192.130:7300/mock/5d120b475ed8ef4c615f2d60',
    // api的base_url
    timeout: 30000, // 请求超时时间
    headers: { 'Authorization': 'Bearer '+getUser().token }
})
export default service