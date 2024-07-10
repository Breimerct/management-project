import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'projects',
    },
    component: () => import('../layout/MainLayout.vue'),
    children: [
      {
        path: 'projects/:projectId?',
        name: 'projects',
        component: () => import('../pages/project-page/Project.vue'),
      },
    ],
  },
];

export default routes;
