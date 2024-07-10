// Plugins
import vuetify from './vuetify';
import router from '../router';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

// Types
import type { App } from 'vue';
import store from '@/store';

export function registerPlugins(app: App) {
  app.use(vuetify).use(ToastPlugin).use(router).use(store);
}
