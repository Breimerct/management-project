import { createStore } from 'vuex';
import CommonModule, { type ICommonState } from './common-module';
import AuthModule, { IAuthState } from './auth-module';

export interface RootState {
  common: ICommonState;
  auth: IAuthState;
}

const store = createStore<RootState>({
  modules: {
    common: CommonModule,
    auth: AuthModule,
  },
});

export default store;
