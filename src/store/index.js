import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import slots from './modules/slots'
import feathersVuex from 'feathers-vuex'
import feathersClient from '../api/feathers-client'

Vue.use(Vuex)

const { service } = feathersVuex(feathersClient, { idField: '_id' })
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  plugins: [
    service('tables')
  ],
  modules: {
    auth,
    slots
  },
  strict: debug
})
