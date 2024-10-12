import React from 'react';
import axios from 'axios';
import { useClickAway } from 'react-use';

import { Info } from '../info';
import { useCart } from '../../hooks/useCart';

import styles from './drawer.module.scss';

function Drawer({ onRemove, onClose, opened, items = [], setCartOpened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const ref = React.useRef(null);

  const onClickOrder = async () => {
    try {
      const { data } = await axios.post('https://6ca41a0c78299893.mokky.dev/Orders', {
        items: cartItems,
      });
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://6ca41a0c78299893.mokky.dev/cart/' + item.id);
      }
      setIsLoading(true);
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useClickAway(ref, () => {
    setCartOpened(false);
  });
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ``}`}>
      <div ref={ref} className={styles.drawer}>
        <h2>
          Корзина <img src="/pic/btn-remove.svg" onClick={onClose} />
        </h2>
        {items.length > 0 ? (
          <div className={styles.drawerItems}>
            <div className={styles.items}>
              {items.map((obj) => (
                <div key={obj.id} className="cartItem">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>
                  <div className="cartDesc">
                    <p>{obj.title}</p>
                    <b>{obj.price}</b>
                  </div>
                  <img onClick={() => onRemove(obj.id)} src="/pic/btn-remove.svg" />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul className="cart-bottom">
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.floor(totalPrice * 0.05)} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/pic/arrow.svg" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            img={isOrderCompleted ? '/pic/complete-order.jpg' : '/pic/empty-cart.jpg'}
            title={isOrderCompleted ? 'Заказ оформлен' : 'Корзина пустая'}
            description={
              isOrderCompleted
                ? `Ваш заказ #${orderId} скоро будет доставлен`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
