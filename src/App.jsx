import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { AppContext } from './context';
import Orders from './pages/orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  //запрос к АПИ
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://6ca41a0c78299893.mokky.dev/cart'),
          axios.get('https://6ca41a0c78299893.mokky.dev/Favorite'),
          axios.get('https://6ca41a0c78299893.mokky.dev/Items'),
        ]);
        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  //Добавление и удаление товара из корзины при нажатии на плюс
  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((isExist) => Number(isExist.item_id) === Number(obj.id))) {
        cartItems.forEach((item) => {
          if (Number(item.item_id) === Number(obj.id)) {
            const id = item.id;
            axios.delete(`https://6ca41a0c78299893.mokky.dev/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.item_id) !== Number(obj.id)));
          }
        });
      } else {
        obj.item_id = obj.id;
        delete obj.id;
        const res = await axios.post('https://6ca41a0c78299893.mokky.dev/cart', obj);
        setCartItems((prev) => [...prev, res.data]);
      }
    } catch (error) {
      alert('');
    }
  };
  //добавить и удалить из избранного
  const onAddToFavorite = async (obj) => {
    console.log('obj', obj);
    try {
      if (favorites.find((favObj) => Number(favObj.item_id) === Number(obj.id))) {
        console.log('delete');
        favorites.forEach((favItem) => {
          if (Number(favItem.item_id === Number(obj.id))) {
            const id = favItem.id;
            axios.delete(`https://6ca41a0c78299893.mokky.dev/Favorite/${id}`);
            setFavorites((prev) => prev.filter((item) => Number(item.item_id !== obj.id)));
          }
        });
      } else {
        console.log('add');

        obj.item_id = obj.id;
        delete obj.id;
        const { data } = await axios.post('https://6ca41a0c78299893.mokky.dev/Favorite', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };
  //добавить и удалить из избранного на странице избраного
  const onAddRemToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id == obj.id)) {
        axios.delete(`https://6ca41a0c78299893.mokky.dev/Favorite/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id != obj.id));
      } else {
        const { data } = await axios.post('https://6ca41a0c78299893.mokky.dev/Favorite', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };
  //убрать элемент из корзины
  const onRemoveItem = (id) => {
    axios.delete(`https://6ca41a0c78299893.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id != id));
  };
  //проверка для поиска
  const onChangeSearchinput = (event) => {
    setSearchValue(event.target.value);
  };
  const isItemAdded = (id) => {
    return cartItems.some((cartItm) => cartItm.item_id === id);
  };
  const value = {
    items,
    cartItems,
    favorites,
    isItemAdded,
    onAddRemToFavorite,
    setCartOpened,
    setCartItems,
  };
  return (
    <AppContext.Provider value={value}>
      <div className="wrapper">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                items={items} //пропсы
                cartItems={cartItems}
                searchValue={searchValue} //пропсы
                setSearchValue={setSearchValue} //пропсы
                onChangeSearchinput={onChangeSearchinput} //пропсы
                onAddToFavorite={onAddToFavorite} //пропсы
                onAddToCart={onAddToCart} //пропсы
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
export default App;
