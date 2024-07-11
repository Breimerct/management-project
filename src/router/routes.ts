import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'projects',
    },
    meta: {
      requiresAuth: true,
    },
    component: () => import('../layout/MainLayout.vue'),
    children: [
      {
        path: '/projects',
        component: () => import('../pages/project-page/Project.vue'),
        children: [
          {
            path: '',
            name: 'projects',
            component: () =>
              import('../pages/project-page/components/ProjectHome.vue'),
          },
          {
            path: ':projectId',
            component: () =>
              import('../pages/project-page/components/Board.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    redirect: {
      name: 'login',
    },
    meta: {
      requiresAuth: false,
    },
    component: () => import('../layout/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../pages/auth/Login.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../pages/auth/Register.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgotPassword',
        component: () => import('../pages/auth/ForgotPassword.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/404.vue'),
  },
];

export default routes;
