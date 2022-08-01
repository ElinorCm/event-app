import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { changeFavoritesActiveItem } from '../store/actions';
import "../styles/favnav.scss";

function FavNav() {

  const dispatch = useDispatch();
  const activeItem = useSelector((state) => state.user.favorites.activeItem);
  
  return (
    <div className="fav-nav">
      <Menu className='fav-nav__menu' inverted pointing secondary
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          backgroundColor: 'black',
          widht: '100%',
          height: '6vh',
        }}
      >
        <Menu.Item
          name='Tous mes favoris'
          active={activeItem === 'Tous mes favoris'}
          onClick={()=> {
            dispatch(changeFavoritesActiveItem('Tous mes favoris'));
          }}
        />
        <Menu.Item
          name="Aujourd'hui"
          active={activeItem === "Aujourd'hui"}
          onClick={()=> dispatch(changeFavoritesActiveItem("Aujourd'hui"))}
        />
        <Menu.Item
          name='Cette semaine'
          active={activeItem === 'Cette semaine'}
          onClick={()=> dispatch(changeFavoritesActiveItem('Cette semaine'))}
        />
      </Menu>
    </div>
  );
}

export default FavNav;