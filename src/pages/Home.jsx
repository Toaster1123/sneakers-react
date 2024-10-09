import Card from '../components/Card';
import React from 'react';
import { AppContext } from '../context';

function Home({
  items,
  favorites,
  searchValue,
  setSearchValue,
  onChangeSearchinput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        favorited={favorites.some((cartItm) => cartItm.item_id === item.id)}
        {...item}
      />
    ));
  };
  return (
    <div className="content">
      <div className="top_body">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кросовки'}</h1>
        <div className="search-block">
          <img src="/pic/search.svg" />
          <input
            onChange={onChangeSearchinput}
            value={searchValue}
            placeholder="Поиск..."
            type="text"
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="removeInput"
              src="/pic/btn-remove.svg"
            />
          )}
        </div>
      </div>
      <div className="snaekers">{renderItems()}</div>
    </div>
  );
}

export default Home;
