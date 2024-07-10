import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authorization = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = JSON.parse(sessionStorage.getItem('user') || 'null');

  if (authorization && !currentUser) return next({ name: 'login' });

  if (!authorization && currentUser) return next({ name: 'projects' });

  next();
});

export default router;
