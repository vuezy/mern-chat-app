export default {
  userBox: {
    backgroundColor: 'rgb(180, 100, 255)',
    padding: '5px 10px',
    borderRadius: '20px',
    border: '1px solid lightgrey',
    marginBottom: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.5s ease',
    '&:hover': {
      backgroundColor: 'rgb(150, 60, 235)'
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
      marginRight: '10px',
      '&:hover': {
        border: '2.5px solid rgb(200, 150, 255)'
      }
    }
  },
  name: {
    fontSize: '18px',
    fontWeight: '500'
  },
  email: {
    color: 'white',
    fontSize: '14px',
    fontWeight: '300'
  }
}