import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  _id: null,
  name: null,
  email: null,
  pic: null,
  isMyProfile: true
}

const userModalSlice = createSlice({
  name: 'userModal',
  initialState,
  reducers: {
    openUserModal: (state, { payload }) => {
      state.isOpen = true
      state._id = payload._id
      state.name = payload.name
      state.email = payload.email
      state.pic = payload.pic
      state.isMyProfile = payload.isMyProfile
    },
    closeUserModal: (state) => {
      state.isOpen = false
      state._id = null
      state.name = null
      state.email = null
      state.pic = null
      state.isMyProfile = true
    }
  }
})

export const { openUserModal, closeUserModal } = userModalSlice.actions
export default userModalSlice.reducer