import api from './api'

export function searchUser(search) {
  return api().get(`/user?search=${search}`)
}

export function searchUserInGroupModal(search, chatId) {
  if (chatId) {
    return api().get(`/user/group?search=${search}&chatId=${chatId}`)
  }
  return api().get(`/user/group?search=${search}`)
}