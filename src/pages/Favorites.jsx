import Card from '../components/Card';
import React from 'react';
import { AppContext } from '../context';

function Favorites() {
  const { favorites, onAddRemToFavorite } = React.useContext(AppContext);
  return (
    <div className="content">
      <div className="top_body">
        <h1>Мои закладки</h1>
      </div>
      <div className="snaekers">
        {favorites &&
          favorites.map((item, index) => (
            <Card key={index} favorited={true} onFavorite={onAddRemToFavorite} {...item} />
          ))}
      </div>
    </div>
  );
}

export default Favorites;
