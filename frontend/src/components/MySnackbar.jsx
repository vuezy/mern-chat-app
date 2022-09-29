import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import styles from '../styles/MySnackbar-style'
import { useSelector, useDispatch } from 'react-redux'
import { closeSnackbar } from '../slices/snackbarSlice'

export default function MySnackbar() {
  const { isOpen, mode, message } = useSelector(store => store.snackbar)
  const dispatch = useDispatch()

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
      open={isOpen}
      onClose={(e, reason) => dispatch(closeSnackbar(reason))}
      sx={styles.snackbar}
    >
      <Alert
        variant="filled"
        onClose={(e, reason) => dispatch(closeSnackbar(reason))}
        severity={mode}
        sx={styles.alert}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}