import axios from 'axios'
const token = window.localStorage.getItem('token')

const defaultSettings = {
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer ' + token
  }
}

const UserAPI = axios.create({
  baseURL: 'http://localhost:3000/',
  ...defaultSettings
})

const ReservationAPI = axios.create({
  baseURL: 'http://localhost:3001/',
  ...defaultSettings
})

const TableAPI = axios.create({
  baseURL: 'http://localhost:3002/',
  ...defaultSettings
})

export {
  UserAPI,
  ReservationAPI,
  TableAPI
}
