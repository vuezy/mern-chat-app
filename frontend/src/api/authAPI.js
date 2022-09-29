import api from './api'

export function getImageId() {
  return api().get('/auth')
}

export function register(user) {
  return api().post('/auth/register', user)
}

export function login(user) {
  return api().post('/auth/login', user)
}