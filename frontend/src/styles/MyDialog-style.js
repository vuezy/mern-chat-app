export default {
  title: {
    paddingBottom: '10px',
    paddingTop: '20px',
    backgroundImage: 'linear-gradient(to bottom, rgba(150, 100, 215, 0.8), rgba(190, 130, 255, 0.8) 60%, rgba(230, 150, 255, 0.8))',
    color: 'maroon'
  },
  body: {
    paddingTop: '5px !important',
    paddingBottom: '15px',
    backgroundColor: 'rgba(230, 150, 255, 0.8)',
    '& .MuiTypography-root': {
      fontWeight: 'bold',
      color: 'black'
    }
  },
  text: {
    fontSize: '17px'
  },
  action: {
    paddingBottom: '20px',
    backgroundImage: 'linear-gradient(to bottom, rgba(230, 150, 255, 0.8), rgba(190, 130, 255, 0.8) 60%, rgba(150, 100, 215, 0.8))'
  },
  button: {
    marginRight: '10px',
    backgroundColor: 'rgba(150, 100, 215, 0.3)',
    color: 'maroon',
    fontSize: '16px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'rgba(150, 100, 215, 0.6)'
    }
  }
}