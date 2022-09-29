import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  title: '',
  message: '',
  isConfirmed: false,
  caller: null
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, { payload }) => {
      state.isOpen = true
      state.title = payload.title
      state.message = payload.message
      state.caller = payload.caller
    },
    resetDialog: (state) => {
      state.isOpen = false
      state.title = ''
      state.message = ''
      state.isConfirmed = false
      state.caller = null
    },
    confirmDialog: (state) => {
      state.isOpen = false
      state.isConfirmed = true
    }
  }
})

export const { openDialog, resetDialog, confirmDialog } = dialogSlice.actions
export default dialogSlice.reducer