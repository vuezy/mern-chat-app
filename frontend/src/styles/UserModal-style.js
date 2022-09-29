export default {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundImage: 'linear-gradient(to bottom, rgb(220, 150, 255), rgb(150, 100, 255))',
    boxShadow: '0 0 3px 3px rgba(150, 100, 255, 0.5)',
    padding: '30px 10px 35px 10px',
    borderRadius: '20px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  close: {
    position: 'absolute',
    top: '5px',
    right: '5px'
  },
  userImg: (imgUrl) => {
    return {
      backgroundImage: `url("${imgUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      marginBottom: '5px'
    }
  },
  name: {
    fontSize: '25px',
    fontWeight: '700',
    textAlign: 'center',
    overflowWrap: 'break-word'
  },
  email: {
    fontSize: '18px',
    color: 'lightgrey',
    fontWeight: '500',
    textAlign: 'center',
    overflowWrap: 'break-word'
  },
  button: {
    marginTop: '10px',
    fontWeight: '500',
    fontSize: '18px',
    width: '180px'
  }
}