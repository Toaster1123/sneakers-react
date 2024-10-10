import React from 'react';
import { AppContext } from '../context';

export const Info = ({ img, title, description }) => {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="emptyCart">
      <img width={120} src={img} />
      <h2>{title}</h2>
      <p>{description}</p>
      <button
        onClick={() => {
          setCartOpened(false);
        }}
        className="greenButton">
        <img src="pic/arrow.svg" />
        Вернуться назад
      </button>
    </div>
  );
};
