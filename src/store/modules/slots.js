import { ReservationAPI } from '../../services'

const ALL_SLOTS = 'ALL_SLOTS'
const ALL_SLOTS_SUCCESS = 'ALL_SLOTS_SUCCESS'

const state = {
  slots: []
}

const getters = {
  allSlots: (state, getters) => {
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
    ReservationAPI.get(`/reservation/slots`).then(response => {
      console.log('response via store: ', response.data)
      commit(ALL_SLOTS_SUCCESS, response.data)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
