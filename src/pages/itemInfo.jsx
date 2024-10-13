import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { AppContext } from '../context';

import style from '../components/cardProduct/cardProduct.module.scss';

export const ItemInfo = () => {
  const [itemData, setItemData] = React.useState({});
  const { isItemAdded, cartItems, setCartItems } = React.useContext(AppContext);
  const [isSizeOpen, setIsSizeOpen] = React.useState(false);
  const [desc, setDesc] = React.useState(0);
  const [chooseSize, setChooseSize] = React.useState(0);

  //  const onAddToCart = async (obj) => {
  //    try {
  //      if (cartItems.find((isExist) => Number(isExist.item_id) === Number(obj.id))) {
  //        cartItems.forEach((item) => {
  //          if (Number(item.item_id) === Number(obj.id)) {
  //            const id = item.id;
  //            console.log('delete');
  //            axios.delete(`https://6ca41a0c78299893.mokky.dev/cart/${id}`);
  //            setCartItems((prev) => prev.filter((item) => Number(item.item_id) !== Number(obj.id)));
  //          }
  //        });
  //      } else {
  //        obj.item_id = obj.id;
  //        delete obj.id;
  //        console.log('add');
  //        const res = await axios.post('https://6ca41a0c78299893.mokky.dev/cart', obj);
  //        // setItemData(res.data);
  //        setCartItems((prev) => [...prev, res.data]);
  //      }
  //    } catch (error) {
  //      alert(error);
  //    }
  //  };

  const onChangeSizeOpen = () => {
    setIsSizeOpen(!isSizeOpen);
  };
  const onChangeSize = (id) => {
    setChooseSize(id);
  };
  const { id } = useParams();

  React.useEffect(() => {
    const fetchItems = async () => {
      const { data } = await axios.get(`https://6ca41a0c78299893.mokky.dev/Items/${id}`);

      setItemData(data);
    };
    fetchItems();
  }, []);
  const addToCartOnPage = async () => {
    try {
      if (cartItems.find((isExist) => Number(isExist.item_id) === Number(id))) {
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
    } catch (error) {}
  };
  // console.log('itemData', itemData);
  // console.log(isItemAdded(itemData.id));

  const renderCharacter = (data) => {
    if (data == undefined) {
      return null;
    }
    return (
      <div>
        <div className={style.rowChars}>
          <div className={style.typeChars}>Материал:</div> <div>{data.material}</div>
        </div>
        <div className={style.rowChars}>
          <div className={style.typeChars}>Тип шнуровки:</div> <div>{data.lace_type}</div>
        </div>
        <div className={style.rowChars}>
          <div className={style.typeChars}>Цвет:</div> <div>{data.color}</div>
        </div>
        <div className={style.rowChars}>
          <div className={style.typeChars}>Страна Изготовления:</div>{' '}
          <div>{data.country_of_origin}</div>
        </div>
        <div className={style.rowChars}>
          <div className={style.typeChars}>Гарантия:</div> <div>{data.warranty}</div>
        </div>
      </div>
    );
  };
  return (
    <div className={style.product}>
      <div className={style.productMainPicture}>
        <img src={itemData.imageUrl} />
      </div>
      <div className={style.productDesc}>
        <div>
          <div className={style.TitleProduct}>{itemData.title}</div>
          <div className={style.PriceProduct}>{itemData.price} руб.</div>
        </div>
        <div>
          <div
            className={style.chooseSizeProductMain}
            onClick={() => {
              onChangeSizeOpen();
            }}>
            Размер
          </div>
          <div className={style.sizes}>
            {[...Array(10)].map((_, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    onChangeSize(i + 36);
                  }}
                  className={chooseSize == i + 36 ? style.active : ''}>
                  {i + 36}
                </li>
              );
            })}
          </div>
        </div>
        <div className={style.descriptionMain}>
          <div className={style.descriptionMainChoose}>
            {['Описание', 'Хактеристики'].map((name, id) => {
              return (
                <div
                  key={id}
                  className={desc == id ? style.select : ''}
                  onClick={() => {
                    setDesc(id);
                  }}>
                  {name}
                </div>
              );
            })}
          </div>
          <div className={style.descriptionContent}>
            <div className={`${style.descriptionContentText} ${desc == 1 ? style.cho : ''}`}>
              {itemData.description}
            </div>
            <div className={`${style.descriptionContentText} ${desc == 1 ? style.cho : ''}`}>
              {renderCharacter(itemData.characteristics)}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCartOnPage();
          }}
          className={`${style.buttonAddToCart} ${isItemAdded(id) && style.added}`}>
          {isItemAdded(id) ? 'Убрать из корзины' : 'Добавить в корзину'}
        </button>
      </div>
    </div>
  );
};
