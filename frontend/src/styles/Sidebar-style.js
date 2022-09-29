export default {
  drawer: {
    '& .MuiDrawer-paper': {
      width: '20%',
      backgroundImage: 'linear-gradient(to bottom, rgb(220, 150, 255), rgb(150, 100, 255) 60%)',
      padding: '20px 15px'
    }
  },
  searchBox: {
    border: '1px solid black',
    borderRadius: '10px',
    marginBottom: '20px',
    padding: '5px 15px 5px 0',
    display: 'flex',
    alignItems: 'center'
  },
  notFound: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#333'
  },
  spinner: {
    margin: '0 auto'
  }
}