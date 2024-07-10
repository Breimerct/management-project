import { createStore } from 'vuex'
import CommonModule, { type ICommonState } from './common-module'

export interface RootState {
  common: ICommonState
}

const store = createStore<RootState>({
  modules: {
    common: CommonModule
  }
})

export default store
