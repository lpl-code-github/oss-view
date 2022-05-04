import {service} from '@/api/index'

// 心跳检测api
export const getHeartbeat = params => {
    return service
        .get('/heartbeat')
        .then(res => res.data)
}
// 获取节点的系统信息api
export const getNodeSystemInfo = (params) => {
    return service
        .get('/nodeSystemInfo/' + params)
        .then(res => res)
}

// 对象最新版本分页列表api
export const getObjLists = params => {
    return service
        .get('/allVersions/' + params)
        .then(res => res)
}

// 单个对象其它版本列表api
export const getObjOtherLists = params => {
    return service
        .get('/versions/' + params)
        .then(res => res)
}

// 下载对象api
export const getObj = params => {
    return service
        .get('/objects/' + params, {responseType: 'blob'})
        .then(res => res)
}

// 普通上传api
export const uploadObj = (params, data, hash, onUploadProgress) => {
    return service
        .request({
            url: '/objects/' + params,
            method: 'PUT',
            data: data,
            headers: {
                'Digest': 'SHA-256=' + hash
            },
            onUploadProgress
        })
        .then(res => res)
}

// 分片请求 获取token api
export const getSliceUploadToken = (params, hash, size) => {
    return service
        .request({
            url: '/objects/' + params,
            method: 'POST',
            headers: {
                'Digest': 'SHA-256=' + hash,
                'Size': size
            }
        })
        .then(res => res)
}
// 获取上传进度api
export const headUploadSliceProgress = (params) => {
    return service
        .head(params)
        .then(res => res)
}


// 分片上传对象api
export const uploadSlice = (params, data, range,onUploadProgress) => {
    return service
        .request({
            url: params,
            method: 'put',
            data: data,
            headers: {
                'range': range
            },
            onUploadProgress
        })
        .then(res => res)
}


// 删除对象api
export const deleteObj = (params) => {
    return service
        .delete('/objects/' + params)
        .then(res => res)
}

// 获取系统信息api
export const systemInfo = (params) => {
    return service
        .get('/systemInfo/' + params)
        .then(res => res)
}

// 扫描修复api
export const objectScanner = () => {
    return service
        .get('/objectScanner')
        .then(res => res)
}

// 删除无引用数据的api
export const deleteOrphan = () => {
    return service
        .get('/deleteOrphanServer')
        .then(res => res)
}

// 保留版本api
export const deleteOldMetadata = (params) => {
    return service
        .get('/deleteOldMetadata/' + params)
        .then(res => res)
}

