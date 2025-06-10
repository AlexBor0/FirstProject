

const ShowBrgMenu = (fix) => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 350) {
        return true;
      }
      else if (screenWidth >= 350 && screenWidth < 420 ) {
        return !fix;
      }
      else {
        return false;
      }
    };

export default ShowBrgMenu;