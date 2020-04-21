import request from '@/utils/request'


export function getExaminationList(params) {
  return request({
    url: '/zz_admin/schoolExamination/list',
    method: 'get',
    params
  })
}
