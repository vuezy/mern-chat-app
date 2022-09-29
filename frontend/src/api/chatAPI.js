import api from './api'

export function getAllChats() {
  return api().get('/chat')
}

export function createChat(chatData) {
  return api().post('/chat', chatData)
}

export function getChatDetails(chatId) {
  return api().get(`/chat/${chatId}`)
}

export function leaveGroup(chatId) {
  return api().patch(`/chat/group/${chatId}`, {})
}

export function deleteGroup(chatId) {
  return api().delete(`/chat/group/${chatId}`)
}

export function editGroupMembers(chatId, users) {
  return api().patch(`/chat/group/edit/${chatId}`, { users })
}