export default {
  navbar: {
    backgroundColor: 'rgb(200, 100, 255)',
    paddingLeft: '75px',
    paddingRight: '15px'
  },
  title: {
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center'
  },
  chatIcon: {
    marginRight: '10px'
  },
  paddingBox: {
    flex: '1'
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center'
  },
  iconButton: {
    flex: '1'
  },
  notificationMenu: {
    padding: '0 15px',
    color: '#555',
    width: '300px',
    whiteSpace: 'normal'
  },
  accountCircle: (imgUrl) => {
    return {
      backgroundImage: `url("${imgUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '40px',
      height: '40px',
      borderRadius: '50%'
    }
  },
  accountMenu: (fontColor, fontWeight) => {
    return {
      padding: '0 15px',
      color: fontColor,
      fontWeight: fontWeight
    }
  },
  icon: {
    marginRight: '5px'
  }
}