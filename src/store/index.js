import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import slots from './modules/slots'
// import tables from './modules/tables'
// import vueFeathers from 'vue-feathers'
import feathersVuex from 'feathers-vuex'
import feathersClient from '../api/feathers-client'

const { service, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  plugins: [
    service('tables')
  ],
  modules: {
    auth,
    slots
    // tables
  },
  strict: debug
})
