import { TableAPI } from '../../services'

const ALL_SLOTS = 'ALL_SLOTS'
const ALL_SLOTS_SUCCESS = 'ALL_SLOTS_SUCCESS'

const state = {
  slots: []
}

const getters = {
  availableSlots: (state, getters) => {
    return state.slots
  }
}

const mutations = {
  [ALL_SLOTS] (state) {
  },
  [ALL_SLOTS_SUCCESS] (state, payload) {
    state.slots = payload
  }
}

const actions = {
  allSlots ({commit}) {
    commit(ALL_SLOTS)
    TableAPI.get(`/table/slots`).then(response => {
      console.log('response via store: ', response.data)
      commit(ALL_SLOTS_SUCCESS, response.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
