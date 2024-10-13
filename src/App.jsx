import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Drawer from './components/drawer';
import { AppContext } from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/orders';
import { ItemInfo } from './pages/itemInfo';

function App() {
  const [items, setItems] = React.useState([]);

  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  //запрос к АПИ
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://6ca41a0c78299893.mokky.dev/cart'),
          axios.get('https://6ca41a0c78299893.mokky.dev/Favorite'),
          axios.get(`https://6ca41a0c78299893.mokky.dev/Items?page=${page}&limit=12`),
        ]);
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data.items);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [page]);

  //Добавление и удаление товара из корзины при нажатии на плюс
  const onAddToCart = async (obj) => {
    console.log('obj', obj);
    try {
      if (cartItems.find((isExist) => Number(isExist.item_id) === Number(obj.id))) {
        cartItems.forEach((item) => {
          if (Number(item.item_id) === Number(obj.id)) {
            const id = item.id;
            console.log('delete');
            axios.delete(`https://6ca41a0c78299893.mokky.dev/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.item_id) !== Number(obj.id)));
          }
        });
      } else {
        obj.item_id = obj.id;
        delete obj.id;
        console.log('add');
        const res = await axios.post('https://6ca41a0c78299893.mokky.dev/cart', obj);
        // setItemData(res.data);
        setCartItems((prev) => [...prev, res.data]);
      }
    } catch (error) {
      alert(error);
    }
  };
  //добавить и удалить из избранного
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.item_id) === Number(obj.id))) {
        favorites.forEach((favItem) => {
          if (Number(favItem.item_id === Number(obj.id))) {
            const id = favItem.id;
            axios.delete(`https://6ca41a0c78299893.mokky.dev/Favorite/${id}`);
            setFavorites((prev) => prev.filter((item) => Number(item.item_id !== obj.id)));
          }
        });
      } else {
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
  //проверка при моунте
  const isItemAdded = (id) => {
    // console.log('id', id);
    // console.log('cartItems', cartItems);
    return cartItems.some((cartItm) => Number(cartItm.item_id) == Number(id));
  };
  const onOpenCart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCartOpened(true);
  };

  React.useEffect(() => {
    if (cartOpened) {
      document.body.classList.add('isCartOpened');
    } else {
      document.body.classList.remove('isCartOpened');
    }
    return () => {
      document.body.classList.remove('isCartOpened');
    };
  }, [cartOpened]);
  console.log('cartItems', cartItems);

  //переменные для Контекста
  const value = {
    items,
    cartItems,
    favorites,
    isItemAdded,
    onAddRemToFavorite,
    setCartOpened,
    setCartItems,
    page,
    setPage,
    onAddToCart,
  };
  return (
    <AppContext.Provider value={value}>
      <div className="wrapper">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
          setCartOpened={setCartOpened}
        />
        <Header onClickCart={onOpenCart} />
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
                isLoading={isLoading}
              />
            }
          />
          <Route path="/product/:id" element={<ItemInfo />} />

          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
export default App;
