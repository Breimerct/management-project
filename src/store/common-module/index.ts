import { type Module } from 'vuex'
import { type RootState } from '..'
import state, { type ICommonState } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
export { type ICommonState } from './state'

const CommonModule: Module<ICommonState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default CommonModule
