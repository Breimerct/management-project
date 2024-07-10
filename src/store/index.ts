import { createStore } from 'vuex';
import CommonModule, { type ICommonState } from './common-module';
import AuthModule, { IAuthState } from './auth-module';
import ProjectModule, { IProjectState } from './project-module';

export interface RootState {
  common: ICommonState;
  auth: IAuthState;
  project: IProjectState;
}

const store = createStore<RootState>({
  modules: {
    common: CommonModule,
    auth: AuthModule,
    project: ProjectModule,
  },
});

export default store;
