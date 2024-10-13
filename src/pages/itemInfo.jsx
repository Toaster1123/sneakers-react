import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

import { AppContext } from '../context';

import style from '../components/cardProduct/cardProduct.module.scss';

export const ItemInfo = () => {
  const [loading, setLoading] = React.useState(true);
  const [itemData, setItemData] = React.useState({});
  const { isItemAdded, onAddToCart } = React.useContext(AppContext);
  const [isSizeOpen, setIsSizeOpen] = React.useState(false);
  const [desc, setDesc] = React.useState(0);
  const [chooseSize, setChooseSize] = React.useState(0);

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
      setLoading(false);
      setItemData(data);
    };
    fetchItems();
  }, []);

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
      {loading ? (
        <ContentLoader
          speed={1}
          width={880}
          height={534}
          viewBox="0 0 880 534"
          backgroundColor="#f2f2f2"
          foregroundColor="#ffffff">
          <rect x="0" y="0" rx="3" ry="3" width="266" height="224" />
          <rect x="306" y="0" rx="0" ry="0" width="566" height="42" />
          <rect x="306" y="60" rx="0" ry="0" width="100" height="24" />
          <rect x="306" y="109" rx="0" ry="0" width="100" height="42" />
          <rect x="306" y="165" rx="0" ry="0" width="380" height="30" />
          <rect x="306" y="232" rx="0" ry="0" width="380" height="35" />
          <rect x="306" y="298" rx="0" ry="0" width="560" height="120" />
          <rect x="306" y="448" rx="0" ry="0" width="222" height="45" />
        </ContentLoader>
      ) : (
        <>
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
                onAddToCart({
                  id: id,
                  title: itemData.title,
                  imageUrl: itemData.imageUrl,
                  price: itemData.price,
                });
                // id, title, imageUrl, price
              }}
              className={`${style.buttonAddToCart} ${isItemAdded(id) && style.added}`}>
              {isItemAdded(id) ? 'Убрать из корзины' : 'Добавить в корзину'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
