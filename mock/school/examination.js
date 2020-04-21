import Mock from 'mockjs'

var Random = Mock.Random

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    'name|1': ['田径场-沙坑','田径场-跑道','田径场-足球场','多媒体教室','田径场-乒乓球台','演播厅'],
    'status|1':[0,1,2],
    'applicant|1':['商学院', '马克思主义学院', '教育科学学院','体育学院','文学与传媒学院','外国语学院','历史与档案学院','数学与大数据学院','物理与电子科学学院','化学与材料学院','地理与资源学院','生物科学学院','旅游文化学院','音乐舞蹈学院','美术与设计学院','创新创业学院','继续教育学院'],
    dateTime: () => Random.date('yyyy-MM-dd'),
    reason: () => Mock.mock('@cparagraph(1, 3)'),
  }]
})

export default [
  {
    url: '/zz_admin/schoolExamination/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]