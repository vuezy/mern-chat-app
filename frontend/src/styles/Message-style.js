export default {
  messageBox: (position, latest) => {
    return {
      marginLeft: !latest && position === 'flex-start' ? '35px' : '0',
      marginRight: !latest && position === 'flex-end' ? '35px' : '0',
      marginBottom: '5px',
      alignSelf: position,
      display: 'flex',
      alignItems: 'center'
    }
  },
  userImg: (imgUrl) => {
    return {
      backgroundImage: `url("${imgUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      cursor: 'pointer',
      '&:hover': {
        border: '2.5px solid rgb(200, 150, 255)'
      }
    }
  },
  message: (position) => {
    return {
      fontWeight: '400',
      fontSize: '15px',
      margin: '0 5px',
      padding: '5px 12px',
      borderRadius: '20px',
      backgroundColor: position === 'flex-start' ? 'rgb(120, 150, 255)' : 'rgb(120, 200, 200)',
      width: 'max-content',
      maxWidth: '400px',
      overflowWrap: 'break-word'
    }
  }
}