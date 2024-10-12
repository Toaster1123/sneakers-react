import React from 'react';
import ContentLoader from 'react-content-loader';
import { Link } from 'react-router-dom';

import styles from './Card.module.scss';

import { AppContext } from '../../context';

function Card({
  onFavorite,
  title,
  id,
  imageUrl,
  price,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorire] = React.useState(favorited);
  const handlePlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorire(!isFavorite);
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={1.8}
          width={158}
          height={250}
          viewBox="0 0 159 265"
          backgroundColor="#f2f2f2"
          foregroundColor="#ffffff">
          <rect x="0" y="0" rx="10" ry="10" width="159" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="159" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="9" ry="9" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            {onFavorite && (
              <img
                src={isFavorite ? 'pic/liked.svg' : 'pic/unliked.svg'}
                onClick={onClickFavorite}
              />
            )}
          </div>
          <Link to={`/product/${id}`}>
            <img src={imageUrl} height={127} width="100%" />
          </Link>
          <h5>{title}</h5>
          <div className={styles.cardBottom}>
            <div className={styles.cardContent}>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={handlePlus}
                src={isItemAdded(id) ? 'pic/btn-checked.svg' : 'pic/btn-plus.svg'}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
