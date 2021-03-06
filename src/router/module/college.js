/* Layout */
import Layout from '@/views/layout'
 const collegeRoutes = [
     
      {
        path: '/',
        redirect: '/College_Index',
        component: Layout,
        children: [{
          path: 'College_Index',
          name: 'CollegeIndex',
          component: () => import('@/views/College/College_Home/index'),
          meta: { title: '首页', icon: 'dashboard', affix: true }
        }]
      },
      { path: '*', redirect: '/404', hidden: true }
]

export default collegeRoutes