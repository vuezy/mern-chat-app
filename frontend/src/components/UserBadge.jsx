import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import styles from '../styles/UserBadge-style'
import { useSelector, useDispatch } from 'react-redux'
import { removeMember } from '../slices/groupModalSlice'

export default function UserBadge({ _id, name }) {
  const { _id: userId } = useSelector(store => store.user)
  const { isAdmin } = useSelector(store => store.groupModal)
  const dispatch = useDispatch()

  return (
    <Box sx={styles.badge(isAdmin)}>
      <Typography component="div" sx={styles.name(isAdmin)}>{name}</Typography>
      {
        isAdmin && userId !== _id && 
        <IconButton size="small" color="inherit" onClick={() => dispatch(removeMember(_id))}>
          <CloseIcon fontSize="5px" />
        </IconButton>
      }
      {
        isAdmin && userId === _id && 
        <IconButton size="small" color="inherit">
          <CheckCircleIcon fontSize="5px" />
        </IconButton>
      }
    </Box>
  )
}
