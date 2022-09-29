import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import OutlinedInput from '@mui/material/OutlinedInput'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import Message from './Message'
import styles from '../styles/ChatBox-style'
import { useSelector, useDispatch } from 'react-redux'
import { openSidebar } from '../slices/sidebarSlice'
import { openSnackbar } from '../slices/snackbarSlice'
import { openUserModal } from '../slices/userModalSlice'
import { openGroupModal } from '../slices/groupModalSlice'
import { openLoadingModal, closeLoadingModal } from '../slices/loadingModalSlice'
import { addNewChat, removeChat, updateChat, setActiveChat } from '../slices/userSlice'
import { getChatDetails } from '../api/chatAPI'
import { getAllMessages, createMessage, markAsRead, markAsUnread } from '../api/messageAPI'
import socket from '../socketio'
import { connectSocket } from '../socketio'


export default function ChatBox() {
  const { isLoggedIn, _id, chats, activeChat } = useSelector(store => store.user)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ chatName, setChatName ] = useState('')
  const [ messageInput, setMessageInput ] = useState('')
  const [ messages, setMessages ] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    connectSocket()
    socket().emit('store-userId', _id)
    socket().on('created-chat', (chatData) => {
      dispatch(addNewChat(chatData))
    })
    socket().on('deleted-group', (chatId) => {
      socket().emit('leave-room', chatId)
      dispatch(removeChat(chatId))
    })
    socket().on('edited-group', (chatData, members) => {
      const isMember = members.find(member => member._id === _id)
      if (isMember) {
        if (isMember.isRemoved) {
          socket().emit('leave-room', chatData._id)
          dispatch(removeChat(chatData._id))
        }
        else if (isMember.isAdded) {
          dispatch(addNewChat(chatData))
        }
      }
    })
  }, [])

  useEffect(() => {
    chats.forEach(chat => socket().emit('join-room', chat._id))
  }, [chats])

  useEffect(() => {
    if (!isLoggedIn) {
      socket().disconnect()
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (activeChat) {
      (async () => {
        setIsLoading(true)
        try {
          setChatName(chats.find(chat => chat._id === activeChat).name)
          const data = (await getAllMessages(activeChat)).data.messages
          let allMessages = []
          for (let i = 0; i < data.length; i++) {
            if (i !== data.length - 1 && data[i].sender._id === data[i + 1].sender._id) {
              allMessages[i] = { ...data[i], latest: false }
            }
            else {
              allMessages[i] = { ...data[i], latest: true }
            }
          }
          setMessages(allMessages)
          await markAsRead(activeChat)
        }
        catch(err) {
          dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
        }
        setIsLoading(false)
      })()
    }
  }, [activeChat])

  useEffect(() => {
    socket().removeAllListeners('receive-message')
    socket().on('receive-message', async (chatId, newMessage) => {
      if (chatId === activeChat) {
        displayMessage(newMessage)
        try {
          await markAsRead(chatId)
        }
        catch(err) {
          dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
        }
      }
      else {
        dispatch(updateChat({
          _id: chatId,
          latestMessage: newMessage.content,
          unread: true
        }))
        try {
          await markAsUnread(chatId)
        }
        catch(err) {
          dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
        }
      }
    })
  }, [activeChat, messages])

  const showChatDetails = async () => {
    dispatch(openLoadingModal())
    try {
      const chatData = (await getChatDetails(activeChat)).data.chat
      if (chatData.isGroup) {
        dispatch(openGroupModal({
          _id: chatData._id,
          name: chatData.name,
          members: chatData.users.map(user => ({ ...user, isAdded: false, isRemoved: false })),
          isAdmin: _id === chatData.groupAdmin,
          mode: 'edit'
        }))
      }
      else {
        dispatch(openUserModal({
          _id: (chatData.users.find(user => user._id !== _id))._id,
          name: chatData.name,
          email: chatData.email,
          pic: chatData.pic,
          isMyProfile: false
        }))
      }
    }
    catch(err) {
      dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
    }
    dispatch(closeLoadingModal())
  }
  const sendMessage = async () => {
    try {
      if (messageInput) {
        const newMessage = (await createMessage(activeChat, messageInput)).data.message
        socket().emit('send-message', activeChat, newMessage)
        displayMessage(newMessage)
      }
    }
    catch(err) {
      dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
    }
    setMessageInput('')
  }
  const displayMessage = (newMessage) => {
    if (messages.length > 0 && messages[messages.length - 1].sender._id === newMessage.sender._id) {
      setMessages(prevMessages => {
        return [
          ...prevMessages.slice(0, prevMessages.length - 1),
          { ...prevMessages[prevMessages.length - 1], latest: false },
          { ...newMessage, latest: true }
        ]
      })
    }
    else {
      setMessages(prevMessages => {
        return [
          ...prevMessages,
          { ...newMessage, latest: true }
        ]
      })
    }
    dispatch(updateChat({
      _id: activeChat,
      latestMessage: newMessage.content,
      unread: false
    }))
  }

  if (!activeChat) {
    return (
      <Box sx={styles.wrapper(true)}>
        <Typography variant="h3" sx={styles.info}>
          Most People Are Nice And Just Want To Have A Chat
        </Typography>
        <Button
          variant="filled"
          onClick={() => dispatch(openSidebar())}
          sx={styles.button}
        >
          Start Chatting Now
        </Button>
      </Box>
    )
  }
  if (isLoading) {
    return (
      <Box sx={styles.wrapper(true)}>
        <CircularProgress color="secondary" size={250} />
      </Box>
    )
  }
  return (
    <Box sx={styles.wrapper()}>
      <Toolbar sx={styles.toolbar}> 
        <Box sx={styles.infoIcon}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={showChatDetails}
          >
            <InfoIcon fontSize="large" />
          </IconButton>
        </Box>
        <Typography variant="h4" component="div" title={chatName} sx={styles.title}>
          {chatName.length > 32 ? chatName.slice(0, 32) + '...' : chatName}
        </Typography>
        <Box sx={styles.closeIcon}>
          <IconButton
            size="small"
            edge="end"
            color="inherit"
            onClick={() => dispatch(setActiveChat(null))}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
      <Box sx={styles.chatBox}>
        <Box sx={styles.messagesBox}>
          {messages.map(message => <Message key={message._id} {...message} />)}
        </Box>
        <Box sx={styles.messageInput}>
          <OutlinedInput
            size="small"
            placeholder="Type your message here"
            color="secondary"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage()
              }
            }}
            sx={styles.input}
          />
          <IconButton
            size="small"
            edge="end"
            color="inherit"
            onClick={sendMessage}
          >
            <SendIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}