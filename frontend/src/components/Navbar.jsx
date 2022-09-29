import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import ChatIcon from '@mui/icons-material/Chat'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/PersonOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import styles from '../styles/Navbar-style'
import { useSelector, useDispatch } from 'react-redux'
import { loggedOut, setActiveChat } from '../slices/userSlice'
import { openUserModal } from '../slices/userModalSlice'
import { openSnackbar } from '../slices/snackbarSlice'


export default function Navbar() {
  const { _id, name, email, pic, chats, totalUnreadChats } = useSelector(store => store.user)
  const [ accountAnchorEl, setAccountAnchorEl ] = useState(null)
  const [ notificationAnchorEl, setNotificationAnchorEl ] = useState(null)
  const [ openAccountMenu, setOpenAccountMenu ] = useState(false)
  const [ openNotificationMenu, setOpenNotificationMenu ] = useState(false)
  const dispatch = useDispatch()

  const clickAccount = (event) => {
    setAccountAnchorEl(event.target)
    setOpenAccountMenu(true)
  }
  const closeAccountMenu = () => {
    setAccountAnchorEl(null)
    setOpenAccountMenu(false)
  }
  const clickNotification = (event) => {
    if (totalUnreadChats > 0) {
      setNotificationAnchorEl(event.target)
      setOpenNotificationMenu(true)
    } 
  }
  const closeNotificationMenu = () => {
    setNotificationAnchorEl(null)
    setOpenNotificationMenu(false)
  }
  const logout = () => {
    dispatch(loggedOut())
    dispatch(openSnackbar({ mode: 'success', message: 'You are logged out!' }))
  }

  return (
    <Box>
      <AppBar position="static" sx={styles.navbar}>
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={styles.title}
          >
            <ChatIcon fontSize="large" sx={styles.chatIcon}/> CHIT-CHAT
          </Typography>    
          <Box sx={styles.paddingBox} />
          <Box sx={styles.iconBox}>
            <IconButton
              size="large"
              color="inherit"
              sx={styles.iconButton}
              onClick={clickNotification}
            >
              <Badge badgeContent={totalUnreadChats > 99 ? '99+' : totalUnreadChats} color="warning">
                <NotificationsIcon fontSize="45" />
              </Badge>
            </IconButton>
            {_id && <IconButton
              size="large"
              color="inherit"
              sx={styles.iconButton}
              onClick={clickAccount}
            >
              <Box sx={styles.accountCircle(pic)} />
            </IconButton>}
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={notificationAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openNotificationMenu}
        onClose={closeNotificationMenu}
      >
        {chats.map(chat => {
          if (chat.unread > 0) {
            return (
              <MenuItem
                key={chat._id}
                onClick={() => {
                  closeNotificationMenu()
                  dispatch(setActiveChat(chat._id))
                }}
                sx={styles.notificationMenu}
              >
                {chat.unread > 99 ? '99+' : chat.unread} new message(s) from {chat.name}
              </MenuItem>
            )
          }
        })}
      </Menu>
      <Menu
        anchorEl={accountAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openAccountMenu}
        onClose={closeAccountMenu}
      >
        <MenuItem 
          onClick={
            () => dispatch(openUserModal(
              {
                _id: _id,
                name: name,
                email: email,
                pic: pic,
                isMyProfile: true
              }
            ))
          }
          sx={styles.accountMenu('black', '500')}
        >
          <PersonIcon fontSize="small" sx={styles.icon} /> My Profile
        </MenuItem>
        <MenuItem onClick={logout} sx={styles.accountMenu('gray', '300')}>
          <LogoutIcon fontSize="small" sx={styles.icon} /> Log Out
        </MenuItem>
      </Menu>
    </Box>
  )
}
