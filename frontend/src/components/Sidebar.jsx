import { useEffect } from 'react'
import _ from 'lodash'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import UserBox from './UserBox'
import styles from '../styles/Sidebar-style'
import { useSelector, useDispatch } from 'react-redux'
import { closeSidebar, setSearch, setUsers, setIsLoading } from '../slices/sidebarSlice'
import { openSnackbar } from '../slices/snackbarSlice'
import { loadingChats, addNewChat, setActiveChat } from '../slices/userSlice'
import { searchUser } from '../api/userAPI'
import { createChat } from '../api/chatAPI'
import socket from '../socketio'

export default function Sidebar() {
  const { isOpen, search, users, isLoading } = useSelector(store => store.sidebar)
  const { name, chats } = useSelector(store => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (search) {
      (async () => {
        try {
          const data = (await searchUser(search)).data
          dispatch(setUsers(data.users))
        }
        catch(err) {
          dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
        }
        dispatch(setIsLoading(false))
      })()
    }
    else {
      dispatch(setUsers([]))
      dispatch(setIsLoading(false))
    }
  }, [search])

  const handleChange = (event) => {
    dispatch(setIsLoading(true))
    const handleSearch = _.debounce(() => dispatch(setSearch(event.target.value)), 700)
    handleSearch()
  }
  const startChat = async (_id) => {
    dispatch(closeSidebar())
    dispatch(loadingChats(true))
    try {
      const data = (await createChat({ users: [_id] })).data
      if (!chats.find(chat => chat._id === data.chat._id)) {
        socket().emit('create-chat', { ...data.chat, name }, _id)
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
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={() => dispatch(closeSidebar())}
      sx={styles.drawer}
    >
      <Box sx={styles.searchBox}>
        <IconButton size="small">
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search someone..."
          onChange={handleChange}
        />
      </Box>
      {
        !isLoading && users.length > 0 && 
        users.map(user => {
          return (
            <UserBox
              key={user._id}
              {...user}
              handleClick={() => startChat(user._id)}
            />
          )
        })
      }
      {
        !isLoading && users.length === 0 && search && 
        <Typography variant="h6" sx={styles.notFound}>
          Cannot find user with that name or email.
        </Typography>
      }
      {isLoading && <CircularProgress color="secondary" size={60} sx={styles.spinner} />}
    </Drawer>
  )
}
