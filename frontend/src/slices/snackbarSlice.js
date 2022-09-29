import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  mode: 'success',
  message: ''
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, { payload }) => {
      state.isOpen = true
      state.mode = payload.mode
      state.message = payload.message
    },
    closeSnackbar: (state, { payload }) => {
      if (payload === 'clickaway') {
        return
      }
      state.isOpen = false
    }
  }
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions
export default snackbarSlice.reducer