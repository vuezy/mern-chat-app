export default {
  chat: (active) => {
    return {
      position: 'relative',
      height: '70px',
      padding: '10px',
      backgroundColor: active ? 'rgba(220, 0, 200, 0.5)' : 'rgba(220, 120, 255, 0.5)',
      boxShadow: '0 3px 3px 0 #555',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: active ? 'rgba(220, 0, 220, 0.5)' : 'rgba(200, 80, 235, 0.5)'
      }
    }
  },
  userImg: (imgUrl) => {
    return {
      backgroundImage: `url("${imgUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      marginRight: '10px',
    }
  },
  name: {
    fontSize: '21px',
    fontWeight: '600'
  },
  message: {
    paddingLeft: '3px',
    fontSize: '16px',
    fontWeight: '400',
    color: 'grey'
  },
  circle: {
    position: 'absolute',
    right: '5px',
    top: '0',
    bottom: '0',
    margin: 'auto',
    padding: '5px',
    width: '27px',
    height: '27px',
    borderRadius: '50%',
    backgroundColor: '#ed6c02',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}