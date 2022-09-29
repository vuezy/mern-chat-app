import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from './slices/snackbarSlice'
import dialogReducer from './slices/dialogSlice'
import sidebarReducer from './slices/sidebarSlice'
import userModalReducer from './slices/userModalSlice'
import groupModalReducer from './slices/groupModalSlice'
import loadingModalReducer from './slices/loadingModalSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    dialog: dialogReducer,
    sidebar: sidebarReducer,
    userModal: userModalReducer,
    groupModal: groupModalReducer,
    loadingModal: loadingModalReducer,
    user: userReducer
  }
})