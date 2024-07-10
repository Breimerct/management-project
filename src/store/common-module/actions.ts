import { type ActionTree } from 'vuex'
import { type ICommonState } from './state'
import { type RootState } from '..'

export const actions: ActionTree<ICommonState, RootState> = {
  increment() {
    console.log('increment')
  }
}
