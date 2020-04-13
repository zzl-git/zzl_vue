/* Layout */
import Layout from '@/views/layout'
 const schoolRoutes = [
      {
        path: '/',
        redirect: '/School_Index',
        component: Layout,
        children: [{
          path: 'School_Index',
          name: 'SchoolIndex',
          component: () => import('@/views/School/School_Home/index'),
          meta: { title: '首页', icon: 'dashboard', affix: true }
        }]
      },
      {
        path: '/School_Info',
        component: Layout,
        alwaysShow: true,
        meta: { title: '信息统计', icon: 'dashboard' },
        children: [{
          path: 'School_Info_Index',
          name: 'SchoolInfoIndex',
          component: () => import('@/views/School/School_Info/index'),
          meta: { title: '信息', icon: 'dashboard'}
        }]
      },
      {
        path: '/School_Introduce',
        component: Layout,
        alwaysShow: true,
        meta: { title: '学校信息', icon: 'dashboard' },
        children: [{
          path: 'Introduce_Index',
          name: 'IntroduceIndex',
          component: () => import('@/views/School/School_Introduce/index'),
          meta: { title: '介绍', icon: 'dashboard'}
        }]
      },
      { path: '*', redirect: '/404', hidden: true }
];

export default schoolRoutes;