const SESSION_VALID = 'SESSION_VALID'
const SESSION_INVALID = 'SESSION_INVALID'

/**
 * Initial state:
 */
const state = {
  isUserValid: false,
  user: {}
}

const getters = {
  authenticated: state => state.isUserValid,
  user: state => state.user
}

const actions = {
  /**
   * Action to trigger if the user is valid
   *
   * @param {String} id
   */
  userIsValid ({ commit }, user) {
    commit(SESSION_VALID, { user })
  },

  /**
   * Action to trigger if the user went invalid
   */
  userIsInvalid ({ commit }) {
    commit(SESSION_INVALID)
  }
}

const mutations = {
  [SESSION_VALID] (state, { user }) {
    state.isUserValid = true
    state.user = user
  },

  [SESSION_INVALID] (state) {
    state.isUserValid = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
