import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

const initialState = {
  isLoggedIn: false,
  _id: null,
  name: null,
  email: null,
  pic: null,
  token: null,
  chats: [],
  totalUnreadChats: 0,
  isLoadingChats: false,
  activeChat: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, { payload }) => {
      state.isLoggedIn = true
      state._id = payload.user._id
      state.name = payload.user.name
      state.email = payload.user.email
      state.pic = payload.user.pic
      state.token = payload.token
    },
    loggedOut: (state) => {
      state.isLoggedIn = false
      state._id = null
      state.name = null
      state.email = null
      state.pic = null
      state.token = null
      state.chats = []
      state.totalUnreadChats = 0
      state.isLoadingChats = false
      state.activeChat = null
    },
    setChats: (state, { payload }) => {
      state.chats = payload
      payload.forEach(chat => {
        if (chat.unread > 0) {
          state.totalUnreadChats += 1
        }
      })
    },
    loadingChats: (state, { payload }) => {
      state.isLoadingChats = payload
    },
    addNewChat: (state, { payload }) => {
      state.chats.unshift(payload)
    },
    removeChat: (state, { payload }) => {
      state.chats = state.chats.filter(chat => chat._id !== payload)
    },
    updateChat: (state, { payload }) => {
      const updatedChat = state.chats.find(chat => chat._id === payload._id)
      updatedChat.latestMessage = payload.latestMessage
      if (payload.unread) {
        updatedChat.unread += 1
        if (updatedChat.unread === 1) {
          state.totalUnreadChats += 1
        }
      }
      state.chats = state.chats.filter(chat => chat._id !== payload._id)
      state.chats.unshift(updatedChat)
    },
    setActiveChat: (state, { payload }) => {
      state.activeChat = payload
      state.chats = state.chats.map(chat => {
        if (chat._id === payload && chat.unread > 0) {
          state.totalUnreadChats = Math.max(0, state.totalUnreadChats - 1)
          return { ...chat, unread: 0 }
        }
        return chat
      })
    }
  }
})

export const {
  loggedIn,
  loggedOut,
  setChats,
  loadingChats,
  addNewChat,
  removeChat,
  updateChat,
  setActiveChat
} = userSlice.actions
export default userSlice.reducer