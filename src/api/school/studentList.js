import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/zz_admin/schoolStudent/list',
    method: 'get',
    params
  })
}
