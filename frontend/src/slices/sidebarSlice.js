import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  search: '',
  users: [],
  isLoading: false
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isOpen = !state.isOpen
    },
    closeSidebar: (state) => {
      if (!state.isLoading) {
        state.isOpen = false
        state.search = ''
        state.users = []
        state.isLoading = false
      }
    },
    setSearch: (state, { payload }) => {
      state.search = payload
    },
    setUsers: (state, { payload }) => {
      state.users = payload
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload
    }
  }
})

export const { openSidebar, closeSidebar, setSearch, setUsers, setIsLoading } = sidebarSlice.actions
export default sidebarSlice.reducer