import axios from 'axios'
const token = window.localStorage.getItem('token')

const defaultSettings = {
  timeout: 1000,
  headers: {
    'Authorization': 'Bearer ' + token
  }
}

const UserAPI = axios.create({
  baseURL: 'http://localhost:3000',
  ...defaultSettings
})

export {
  UserAPI
}
