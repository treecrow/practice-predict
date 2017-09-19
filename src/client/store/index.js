import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions
})

if (module.hot) {
  module.hot.accept(['./actions', './mutations'], () => {
    const newActions = require('./actions').default
    const newMutations = require('./mutations').default
    store.hotUpdate({
      mutations: newMutations,
      actions: newActions
    })
  })
}

export default store
