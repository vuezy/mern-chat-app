import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import AddIcon from '@mui/icons-material/Add'
import CircularProgress from '@mui/material/CircularProgress'
import ChatList from './ChatList'
import styles from '../styles/ChatListBox-style'
import { useSelector, useDispatch } from 'react-redux'
import { openSidebar } from '../slices/sidebarSlice'
import { openGroupModal } from '../slices/groupModalSlice'

export default function ChatListBox() {
  const { chats, isLoadingChats } = useSelector(store => store.user)
  const dispatch = useDispatch()

  return (
    <Box sx={styles.wrapper}>
      <Toolbar sx={styles.toolbar}> 
        <Box title="Create Group" sx={styles.groupAdd}>
          <IconButton
            size="medium"
            edge="end"
            color="inherit"
            onClick={() => dispatch(openGroupModal({ isAdmin: true, mode: 'create' }))}
          >
            <GroupAddIcon fontSize="large" />
          </IconButton>
        </Box>
        <Typography variant="h4" component="div" sx={styles.title}>
          CHATS
        </Typography>
        <Box sx={styles.add}>
          <IconButton
            size="small"
            edge="end"
            color="inherit"
            onClick={() => dispatch(openSidebar())}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
      <Box sx={styles.chatList}>
        {!isLoadingChats && chats.map(chat => {
          return (
            <ChatList
              key={chat._id}
              {...chat}
            />
          )
        })}
        {isLoadingChats && <Box sx={styles.spinner}>
          <CircularProgress color="secondary" size={200} />
        </Box>}
      </Box>
    </Box>
  )
}