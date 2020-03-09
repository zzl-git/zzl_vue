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
          component: () => import('@/views/home/index'),
          meta: { title: '学校首页', icon: 'dashboard' }
        }]
      },
      { path: '*', redirect: '/404', hidden: true }
];

export default schoolRoutes;