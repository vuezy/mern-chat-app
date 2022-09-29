import axios from 'axios'

const URL = 'http://localhost:8081/api'
let options = {
  baseURL: URL
}

export function addBearerToken(token) {
  options.headers = {
    Authorization: 'Bearer ' + token
  }
}

export function removeBearerToken() {
  options = {
    baseURL: URL
  }
}

export default () => {
  return axios.create(options)
}