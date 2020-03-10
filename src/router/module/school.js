/* Layout */
import Layout from '@/layout'
 const schoolRoutes = [
      {
        path: '/',
        redirect: '/School_Index',
        component: Layout,
        children: [{
          path: 'School_Index',
          name: 'SchoolIndex',
          component: () => import('@/views/School/School_Home/index'),
          meta: { title: '首页', icon: 'dashboard' }
        }]
      },
      {
        path: '/School_Info',
        component: Layout,
        meta: { title: '信息统计', icon: 'dashboard' },
        children: [{
          path: 'School_Info_Index',
          name: 'SchoolInfoIndex',
          component: () => import('@/views/School/School_Info/index'),
          meta: { title: '信息', icon: 'dashboard' }
        },{
          path: 'School_Info_List',
          name: 'SchoolInfoList',
          component: () => import('@/views/School/School_Info/list'),
          meta: { title: '信息列表', icon: 'dashboard' }
        }]
      },
      { path: '*', redirect: '/404', hidden: true }
];

export default schoolRoutes;