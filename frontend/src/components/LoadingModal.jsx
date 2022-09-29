import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import styles from '../styles/LoadingModal-style'
import { useSelector, useDispatch } from 'react-redux'
import { closeLoadingModal } from '../slices/loadingModalSlice'

export default function LoadingModal() {
  const { isOpen } = useSelector(store => store.loadingModal)
  const dispatch = useDispatch()

  return (
    <Modal open={isOpen}>
      <Box sx={styles.modal}>
        <CircularProgress color="info" size={280} />
      </Box>
    </Modal>
  )
}