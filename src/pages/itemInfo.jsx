import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const ItemInfo = (products) => {
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
    <div className="product">
      <div className="productMainPicture">
        <img src={itemData.imageUrl} />
      </div>
      <div className="productDesc">
        <div className="titleAndPrice">
          <div>Title</div>
          <div className="PriceProduct">price</div>
        </div>
        <div className="chooseSizeProduct">
          <p>Размер</p>
          стрелка вниз
          <img src="" />
          {[...Array(10)].map(() => {
            return <li>1</li>;
          })}
        </div>
        <div className="descriptionMain">
          <div>Описание</div>
          <div>Изготовление</div>
          {itemData.description}
        </div>
      </div>
    </div>
  );
};
