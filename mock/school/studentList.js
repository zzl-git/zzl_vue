import Mock from 'mockjs'

var Random = Mock.Random

const data = Mock.mock({
  'items|30000': [{
    id: '@id',
    name:()=> Random.cname(),
    address: ()=>Mock.mock('@county(true)'),
    'age|20-23': 1,
    'college|1':['商学院', '马克思主义学院', '教育科学学院','体育学院','文学与传媒学院','外国语学院','历史与档案学院','数学与大数据学院','物理与电子科学学院','化学与材料学院','地理与资源学院','生物科学学院','旅游文化学院','音乐舞蹈学院','美术与设计学院','创新创业学院','继续教育学院'],
    'grade|1': ['2016','2017','2018','2019'],
  }]
})

export default [
  {
    url: '/zz_admin/schoolStudent/list',
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