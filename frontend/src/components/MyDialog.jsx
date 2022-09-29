import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import styles from '../styles/MyDialog-style'
import { useSelector, useDispatch } from 'react-redux'
import { resetDialog, confirmDialog } from '../slices/dialogSlice'

export default function MyDialog() {
  const { isOpen, title, message } = useSelector(store => store.dialog)
  const dispatch = useDispatch()

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(resetDialog())}
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title" sx={styles.title}>
        {title}
      </DialogTitle>
      <DialogContent sx={styles.body}>
        <DialogContentText id="dialog-description" sx={styles.text}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={styles.action}>
        <Button onClick={() => dispatch(resetDialog())} sx={styles.button}>No</Button>
        <Button onClick={() => dispatch(confirmDialog())} sx={styles.button}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}