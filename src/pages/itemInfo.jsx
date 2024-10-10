import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import style from '../components/cardProduct/cardProduct.module.scss';

export const ItemInfo = (products) => {
  const [isSizeOpen, setIsSizeOpen] = React.useState(false);
  const onChangeSizeOpen = () => {
    setIsSizeOpen(!isSizeOpen);
  };
  console.log(isSizeOpen);
  const { id } = useParams();
  const [itemData, setItemData] = React.useState({});
  React.useEffect(() => {
    const fetchItems = async () => {
      const { data } = await axios.get(`https://6ca41a0c78299893.mokky.dev/Items/${id}`);
      setItemData(data);
    };
    fetchItems();
  }, []);

  console.log(itemData);
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
            <p>Размер</p>
          </div>
          <div className={style.sizes}>
            {[...Array(10)].map((_, i) => {
              return <li>{i + 36}</li>;
            })}
          </div>
        </div>
        <div className={style.descriptionMain}>
          <div>Описание</div>
          <div>Изготовление</div>
          {itemData.description}
        </div>
        <button className={style.buttonAddToCart}>В корзину</button>
      </div>
    </div>
  );
};
