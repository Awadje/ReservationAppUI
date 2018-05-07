import 'babel-polyfill'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
// import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'

const socket = io('ws://localhost:3030', {transports: ['websocket']})

const feathersClient = feathers().configure(socketio(socket))

export default feathersClient
