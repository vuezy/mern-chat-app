import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import styles from '../styles/UserBox-style'
import { useDispatch } from 'react-redux'
import { openUserModal } from '../slices/userModalSlice'

export default function UserBox({ _id, name, email, pic, handleClick }) {
  const dispatch = useDispatch()

  const checkProfile = (event) => {
    event.stopPropagation()
    dispatch(openUserModal({
      _id: _id,
      name: name,
      email: email,
      pic: pic,
      isMyProfile: false
    }))
  }

  return (
    <Box onClick={handleClick} sx={styles.userBox}>
      <Box
        title="Check Profile"
        onClick={checkProfile}
        sx={styles.userImg(pic)}
      />
      <Box>
        <Typography variant="h4" sx={styles.name}>
          {name.length > 13 ? name.slice(0, 13) + '...' : name}
        </Typography>
        <Typography variant="h6" sx={styles.email}>
          {email.length > 16 ? email.slice(0, 16) + '...' : email}
        </Typography>
      </Box>
    </Box>
  )
}
