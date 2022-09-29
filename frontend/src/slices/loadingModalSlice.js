import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false
}

const loadingModalSlice = createSlice({
  name: 'loadingModal',
  initialState,
  reducers: {
    openLoadingModal: (state) => {
      state.isOpen = true
    },
    closeLoadingModal: (state) => {
      state.isOpen = false
    }
  }
})

export const { openLoadingModal, closeLoadingModal } = loadingModalSlice.actions
export default loadingModalSlice.reducer