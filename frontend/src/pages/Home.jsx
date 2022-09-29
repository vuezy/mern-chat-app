import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Navbar from '../components/Navbar'
import ChatListBox from '../components/ChatListBox'
import ChatBox from '../components/ChatBox'
import Sidebar from '../components/Sidebar'
import UserModal from '../components/UserModal'
import GroupModal from '../components/GroupModal'
import LoadingModal from '../components/LoadingModal'
import styles from '../styles/Home-style'
import { useDispatch } from 'react-redux'
import { setChats, loadingChats } from '../slices/userSlice'
import { openSnackbar } from '../slices/snackbarSlice'
import { getAllChats } from '../api/chatAPI'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      dispatch(loadingChats(true))
      try {
        const { chats } = (await getAllChats()).data
        dispatch(setChats(chats))
      }
      catch(err) {
        dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
      }
      dispatch(loadingChats(false))
    })()
  }, [])

  return (
    <>
      <Navbar />
      <Box sx={styles.chat}>
        <ChatListBox />
        <ChatBox />
      </Box>
      <Sidebar />
      <UserModal />
      <GroupModal />
      <LoadingModal />
    </>
  )
}
