import 'babel-polyfill'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
// import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'

const socket = io('ws://localhost:3030', {transports: ['websocket']})

const feathersClient = feathers()
  .configure(socketio(socket))
  /* .configure(feathersVuex(store, {
    idField: '_id',
    auth: {
      userService: '/users'
    }
  })) */

// feathersClient.service('/users')
// feathersClient.service('/tables')
// feathersClient.service('/todos').vuex({idField: '_id'})
// feathersClient.service('/deeply/nested/names')
// feathersClient.service('/some/explicit/namespace').vuex({name: '/explicit/namespace'})

export default feathersClient
