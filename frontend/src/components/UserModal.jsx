import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import styles from '../styles/UserModal-style'
import { useSelector, useDispatch } from 'react-redux'
import { closeUserModal } from '../slices/userModalSlice'
import { closeGroupModal } from '../slices/groupModalSlice'
import { loadingChats, addNewChat, setActiveChat } from '../slices/userSlice'
import { closeSidebar } from '../slices/sidebarSlice'
import { openSnackbar } from '../slices/snackbarSlice'
import { createChat } from '../api/chatAPI'
import socket from '../socketio'

export default function UserModal() {
  const { isOpen, _id, name, email, pic, isMyProfile } = useSelector(store => store.userModal)
  const { name: currentUserName, chats } = useSelector(store => store.user)
  const dispatch = useDispatch()

  const startChat = async () => {
    dispatch(closeUserModal())
    dispatch(closeGroupModal())
    dispatch(closeSidebar())
    dispatch(loadingChats(true))
    try {
      const data = (await createChat({ users: [_id] })).data
      if (!chats.find(chat => chat._id === data.chat._id)) {
        socket().emit('create-chat', { ...data.chat, name: currentUserName }, _id)
        dispatch(addNewChat(data.chat))
      }
      dispatch(setActiveChat(data.chat._id))
    }
    catch(err) {
      dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
    }
    dispatch(loadingChats(false))
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeUserModal())}
    >
      <Box sx={styles.modal}>
        <IconButton onClick={() => dispatch(closeUserModal())} sx={styles.close}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <Box sx={styles.userImg(pic)} />
        <Typography sx={styles.name}>{name}</Typography>
        <Typography sx={styles.email}>{email}</Typography>
        {
          !isMyProfile && 
          <Button
            variant="contained"
            color="secondary"
            onClick={startChat}
            sx={styles.button}
          >
            Start A Chat
          </Button>
        }
      </Box>
    </Modal>
  )
}