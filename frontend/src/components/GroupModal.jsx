import { useEffect } from 'react'
import _ from 'lodash'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import UserBox from './UserBox'
import UserBadge from './UserBadge'
import styles from '../styles/GroupModal-style'
import { useSelector, useDispatch } from 'react-redux'
import {
  closeGroupModal,
  setName,
  setSearch,
  setUsers,
  loadingSearch,
  addMember,
  loadingChanges
} from '../slices/groupModalSlice'
import { openSnackbar } from '../slices/snackbarSlice'
import { loadingChats, addNewChat, removeChat, setActiveChat } from '../slices/userSlice'
import { openLoadingModal, closeLoadingModal } from '../slices/loadingModalSlice'
import { openDialog, resetDialog } from '../slices/dialogSlice'
import { searchUserInGroupModal } from '../api/userAPI'
import { createChat, editGroupMembers, leaveGroup, deleteGroup } from '../api/chatAPI'
import socket from '../socketio'


export default function GroupModal() {
  const {
    isOpen,
    _id,
    name,
    members,
    isAdmin,
    search,
    users,
    isLoadingSearch,
    isLoadingChanges,
    mode
  } = useSelector(store => store.groupModal)
  const { chats } = useSelector(store => store.user)
  const { caller, isConfirmed } = useSelector(store => store.dialog)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (search) {
      (async () => {
        try {
          let data
          if (mode === 'create') {
            data = (await searchUserInGroupModal(search)).data
          }
          else {
            data = (await searchUserInGroupModal(search, _id)).data
          }
          dispatch(setUsers(data.users))
        }
        catch(err) {
          dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
        }
        dispatch(loadingSearch(false))
      })()
    }
    else {
      dispatch(setUsers([]))
      dispatch(loadingSearch(false))
    }
  }, [search])

  useEffect(() => {
    if (caller === 'GroupModal' && isConfirmed) {
      (async () => {
        dispatch(openLoadingModal())
        try {
          if (isAdmin) {
            await deleteGroup(_id)
            socket().emit('delete-group', _id)
            dispatch(openSnackbar({ mode: 'success', message: 'The group chat has been deleted!' }))
          }
          else {
            await leaveGroup(_id)
            socket().emit('leave-room', _id)
            dispatch(removeChat(_id))
            dispatch(openSnackbar({ mode: 'success', message: "You've left the group!" }))
          }
          dispatch(setActiveChat(null))
          dispatch(closeGroupModal())
        }
        catch(err) {
          dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
        }
        dispatch(closeLoadingModal())
      })()
      dispatch(resetDialog())
    }
  }, [caller, isConfirmed])

  const showSearchBox = mode === 'create' || (mode === 'edit' && isAdmin)

  const handleChange = (event) => {
    if (!isLoadingChanges) {
      if (event.target.name === 'name') {
        dispatch(setName(event.target.value))
      }
      else {
        dispatch(loadingSearch(true))
        const handleSearch = _.debounce(() => dispatch(setSearch(event.target.value)), 700)
        handleSearch()
      }
    }
  }
  const addAsMember = (user) => {
    const memberExists = members.find(member => {
      if (member._id === user._id) {
        if (!member.isRemoved) {
          dispatch(openSnackbar({ mode: 'error', message: 'This user is already added!' }))
        }
        else {
          dispatch(addMember({ new: false, _id: user._id }))
        }
        return true
      }
    })
    if (!memberExists) {
      dispatch(addMember({ new: true, user }))
    }
  }
  const createGroup = async () => {
    dispatch(closeGroupModal())
    dispatch(loadingChats(true))
    try {
      let newMembers = members.reduce((result, member) => {    
        if (!member.isRemoved) {
          result.push({ ...member, isAdded: false, isRemoved: false })
        }
        return result
      }, [])
      newMembers = newMembers.map(member => member._id)

      const data = (await createChat(
        {
          name: name,
          users: newMembers
        }
      )).data
      socket().emit('create-group', data.chat, newMembers)
      dispatch(addNewChat(data.chat))
      dispatch(setActiveChat(data.chat._id))
    }
    catch(err) {
      dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
    }
    dispatch(loadingChats(false))
  }
  const editGroup = async () => {
    dispatch(loadingChanges(true))
    try {
      const prevMembers = [...members]
      const newMembers = members.reduce((result, member) => {    
        if (!member.isRemoved) {
          result.push({ ...member, isAdded: false, isRemoved: false })
        }
        return result
      }, [])
      
      await editGroupMembers(_id, newMembers.map(member => member._id))
      socket().emit('edit-group', chats.find(chat => chat._id === _id), prevMembers)
      dispatch(openSnackbar({ mode: 'success', message: 'Successfully saved the changes!' }))
    }
    catch(err) {
      dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
    }
    dispatch(loadingChanges(false))
    dispatch(closeGroupModal())
  }
  
  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeGroupModal())}
    >
      <Box sx={styles.modal}>
        {
          mode === 'edit' && !isAdmin && 
          <IconButton 
            title="Leave Group"
            onClick={() => dispatch(openDialog({
              title: 'Leave Group',
              message: 'Are you sure you want to leave this group?',
              caller: 'GroupModal'
            }))}
            sx={styles.leave}
          >
            <ExitToAppIcon fontSize="large" />
          </IconButton>
        }
        {
          mode === 'edit' && isAdmin && 
          <IconButton
            title="Leave and Delete Group"
            onClick={() => dispatch(openDialog({
              title: 'Leave and Delete Group',
              message: 'Are you sure you want to delete this group?',
              caller: 'GroupModal'
            }))}
            sx={styles.leave}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
        }
        <IconButton onClick={() => dispatch(closeGroupModal())} sx={styles.close}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <Box sx={styles.userImg('https://firebasestorage.googleapis.com/v0/b/mern-chat-app-d7304.appspot.com/o/images%2Fgroup.jpg?alt=media&token=0f208170-b84d-4673-992d-83f90ad90d06')} />
        {
          mode === 'create' ? 
          <Box sx={styles.editName}>
            <InputBase
              placeholder="Type a name for the group"
              name="name"
              value={name}
              onChange={handleChange}
              sx={styles.nameInput}
            />
          </Box> : 
          <Typography sx={styles.name}>{name}</Typography>
        }
        {
          members.length > 0 && 
          <Box sx={styles.members}>
            {members.map(member => {
              if (!member.isRemoved) {
                return (
                  <UserBadge key={member._id} _id={member._id} name={member.name} />
                )
              }
            })}
          </Box>
        }
        {
          showSearchBox && 
          <Box sx={styles.searchBox}>
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Add someone to the group"
              name="search"
              onChange={handleChange}
              sx={styles.search}
            />
            {isLoadingSearch && <CircularProgress color="secondary" size={20} />}
          </Box>
        }
        {
          !isLoadingSearch && users.length > 0 && 
          users.map(user => {
            return (
              <UserBox
                key={user._id}
                {...user}
                handleClick={() => addAsMember({ _id: user._id, name: user.name })}
              />
            )
          })
        }
        {
          !isLoadingSearch && users.length === 0 && search && 
          <Typography variant="h6" sx={styles.notFound}>
            Cannot find user with that name or email.
          </Typography>
        }
        {
          mode === 'create' && 
          <Button
            variant="contained"
            color="secondary"
            onClick={createGroup}
            sx={styles.button}
          >
            CREATE GROUP
          </Button>
        }
        {
          mode === 'edit' && isAdmin && !isLoadingChanges && 
          <Button
            variant="contained"
            color="secondary"
            onClick={editGroup}
            sx={styles.button}
          >
            SAVE CHANGES
          </Button>
        }
        {
          mode === 'edit' && isAdmin && isLoadingChanges && 
          <Button variant="contained" color="secondary" size="small" sx={styles.loading}>
            <CircularProgress color="inherit" size={35} />
          </Button>
        }
      </Box>
    </Modal>
  )
}