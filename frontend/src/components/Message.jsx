import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import styles from '../styles/Message-style'
import { useSelector, useDispatch } from 'react-redux'
import { openUserModal } from '../slices/userModalSlice'

export default function Message({ content, sender, latest }) {
  const { _id } = useSelector(store => store.user)
  const dispatch = useDispatch()

  const position = sender._id === _id ? 'flex-end' : 'flex-start'

  const checkProfile = () => {
    if (sender._id !== _id) {
      dispatch(openUserModal({
        _id: sender._id,
        name: sender.name,
        email: sender.email,
        pic: sender.pic,
        isMyProfile: false
      }))
    }
  }

  return (
    <Box sx={styles.messageBox(position, latest)}>
      {latest && position === 'flex-start' && 
        <Box title={sender.name} onClick={checkProfile} sx={styles.userImg(sender.pic)} />
      }
      <Typography component="div" sx={styles.message(position)}>{content}</Typography>
      {latest && position === 'flex-end' && 
        <Box title={sender.name} onClick={checkProfile} sx={styles.userImg(sender.pic)} />
      }
    </Box>
  )
}