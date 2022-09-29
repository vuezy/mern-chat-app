import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import styles from '../styles/ChatList-style'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveChat } from '../slices/userSlice'

export default function ChatList({ _id, name, latestMessage, pic, unread }) {
  const { activeChat } = useSelector(store => store.user)
  const dispatch = useDispatch()

  return (
    <Box title={name} onClick={() => dispatch(setActiveChat(_id))} sx={styles.chat(activeChat === _id)}>
      <Box sx={styles.userImg(pic)} />
      <Box>
        <Typography component="div" sx={styles.name}>
          {name.length > 22 ? name.slice(0, 22) + '...' : name}
        </Typography>
        {latestMessage && <Typography component="div" sx={styles.message}>
          {latestMessage.length > 35 ? latestMessage.slice(0, 35) + '...' : latestMessage}
        </Typography>}
      </Box>
      {
        unread > 0 &&
        <Box sx={styles.circle}>
          {unread > 99 ? '99+' : unread}
        </Box>
      }
    </Box>
  )
}