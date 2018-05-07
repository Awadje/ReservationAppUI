// import Vue from 'vue'
// import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '../../api/feathers-client'

const ADD_TABLE = 'ADD_TABLE'
const FETCH_TABLES = 'FETCH_TABLES'

const { service } = feathersVuex(feathersClient)

export default {
  plugins: [
    service('tables', {
      state: {
        tables: []
      },
      getters: {
        getTables: (state, getters) => {
          return state.tables
        }
      },
      mutations: {
        [FETCH_TABLES] (state, tables) {
          state.tables = tables
        },

        [ADD_TABLE] (state, table) {
          state.tables.push(table)
        }
      },
      actions: {
        fetchTables ({commit}) {
          // Call the messages service on the server via websocket
          service('tables').find({}).then(result => {
            commit(FETCH_TABLES, result.data)
          })
        },

        addTable ({ commit }, text) {
          service('tables').create({ text }).then(result => {
            commit(ADD_TABLE, result)
          })
        }
      }
    })
  ]
}
