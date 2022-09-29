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
  leave: {
    position: 'absolute',
    top: '5px',
    left: '5px'
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
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      marginBottom: '5px'
    }
  },
  name: {
    marginBottom: '5px',
    fontSize: '27px',
    fontWeight: '700',
    textAlign: 'center',
    overflowWrap: 'break-word'
  },
  editName: {
    width: '320px',
    border: '1px solid black',
    borderRadius: '10px',
    margin: '5px 0',
    padding: '5px 15px'
  },
  nameInput: {
    width: '100%'
  },
  members: {
    width: '80%',
    height: '60px',
    overflowY: 'auto',
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  searchBox: {
    width: '240px',
    border: '1px solid black',
    borderRadius: '10px',
    margin: '5px 0',
    padding: '5px 10px 5px 0',
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    flex: '1',
    marginRight: '5px'
  },
  notFound: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#333'
  },
  button: {
    marginTop: '10px',
    fontWeight: '500',
    fontSize: '18px',
    width: '180px'
  },
  loading: {
    marginTop: '10px',
    width: '180px',
    cursor: 'default'
  }
}