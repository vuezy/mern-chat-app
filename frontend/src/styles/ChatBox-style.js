export default {
  wrapper: (isEmpty=false) => {
    return {
      width: '70%',
      height: '100%',
      marginLeft: '20px',
      borderRadius: '10px',
      boxShadow: '-2px 0 5px 0 #555',
      backgroundImage: 'linear-gradient(to bottom, rgb(230, 150, 255), rgb(150, 100, 255) 60%)',
      display: isEmpty ? 'flex' : 'block',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  info: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.6)',
    margin: '10px 50px'
  },
  button: {
    fontSize: '22px',
    fontWeight: '600',
    color: 'rgb(255, 180, 230)',
    transition: 'all 0.5s ease',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  toolbar: {
    paddingLeft: '10px !important',
    paddingRight: '10px !important',
    borderRadius: '10px',
    boxShadow: '0 2px 5px 0 #555',
    backgroundImage: 'linear-gradient(to bottom, rgb(230, 150, 255), rgb(150, 100, 255) 60%)',
    alignItems: 'center',
    color: 'white'
  },
  infoIcon: {
    marginRight: '10px'
  },
  title: {
    flex: '6'
  },
  closeIcon: {
    flex: '1',
    textAlign: 'right'
  },
  chatBox: {
    height: '88.7%',
    borderLeft: '32px solid rgba(180, 180, 255, 0.3)',
    borderRadius: '10px'
  },
  messagesBox: {
    width: '100%',
    height: '85%',
    padding: '15px 10px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll'
  },
  messageInput: {
    height: '15%',
    backgroundColor: 'rgba(180, 180, 255, 0.6)',
    color: 'rgb(200, 0, 200)',
    paddingLeft: '20px',
    paddingRight: '20px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    flex: '1',
    marginRight: '10px'
  }
}