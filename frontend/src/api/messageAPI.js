import api from './api'

export function createMessage(chatId, content) {
  return api().post('/message', { chatId, content })
}

export function getAllMessages(chatId) {
  return api().get(`/message/${chatId}`)
}

export function markAsRead(chatId) {
  return api().patch(`/message/${chatId}`, {})
}

export function markAsUnread(chatId) {
  return api().patch(`/message/unread/${chatId}`, {})
}