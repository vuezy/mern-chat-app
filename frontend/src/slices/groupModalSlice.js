import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  _id: null,
  name: '',
  members: [],
  isAdmin: false,
  search: '',
  users: [],
  isLoadingSearch: false,
  isLoadingChanges: false,
  mode: 'create'
}

const groupModalSlice = createSlice({
  name: 'groupModal',
  initialState,
  reducers: {
    openGroupModal: (state, { payload }) => {
      state.isOpen = true
      state._id = payload._id || null
      state.name = payload.name || ''
      state.members = payload.members || []
      state.isAdmin = payload.isAdmin || false
      state.mode = payload.mode
    },
    closeGroupModal: (state) => {
      if (!state.isLoadingChanges) {
        state.isOpen = false
        state._id = null
        state.name = ''
        state.members = []
        state.isAdmin = false
        state.search = ''
        state.users = []
        state.isLoadingSearch = false
        state.isLoadingChanges = false
        state.mode = 'create'
      }
    },
    setName: (state, { payload }) => {
      state.name = payload
    },
    setSearch: (state, { payload }) => {
      state.search = payload
    },
    setUsers: (state, { payload }) => {
      state.users = payload
    },
    loadingSearch: (state, { payload }) => {
      state.isLoadingSearch = payload
    },
    addMember: (state, { payload }) => {
      if (!state.isLoadingChanges) {
        if (payload.new) {
          state.members.push({ ...payload.user, isAdded: true, isRemoved: false })
        }
        else {
          state.members = state.members.map(member => {
            if (member._id === payload._id) {
              return { ...member, isRemoved: false }
            }
            return member
          })
        }
      }
    },
    removeMember: (state, { payload }) => {
      if (!state.isLoadingChanges) {
        state.members = state.members.map(member => {
          if (member._id === payload) {
            return { ...member, isRemoved: true }
          }
          return member
        })
      }
    },
    loadingChanges: (state, { payload }) => {
      state.isLoadingChanges = payload
    }
  }
})

export const {
  openGroupModal,
  closeGroupModal,
  setName,
  setSearch,
  setUsers,
  loadingSearch,
  addMember,
  removeMember,
  loadingChanges
} = groupModalSlice.actions
export default groupModalSlice.reducer