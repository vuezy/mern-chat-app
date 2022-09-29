export default {
  badge: (isAdmin) => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '2px',
      padding: isAdmin ? '0 0 0 5px' : '5px 8px',
      borderRadius: '15px',
      backgroundColor: '#9c27b0',
      color: 'white'
    }
  },
  name: (isAdmin) => {
    return {
      fontSize: isAdmin ? '14px' : '16px',
      maxWidth: isAdmin ? '100px' : '60px',
      overflowWrap: 'break-word',
      textAlign: 'center'
    }
  }
}