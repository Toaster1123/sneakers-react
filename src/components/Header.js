import { Link } from 'react-router-dom';
import React from 'react';
import { useCart } from '../hooks/useCart';

function Header(props) {
  const { totalPrice } = useCart();
  return (
    <header>
      <div className="headerLeft">
        <Link to="/">
          <img src="/pic/lev-logo.jpg" alt="logo" height={40} width={40} />
        </Link>
        <div className="header_left_name">
          <h3>React sneakers</h3>
          <p>Магазин крутых кросовок</p>
        </div>
      </div>
      <ul className="headerRight">
        <li onClick={props.onClickCart}>
          <img src="/pic/cart.svg" height={20} width={20} />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img src="/pic/heart.svg" height={20} width={20} />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img src="pic/user.svg" height={20} width={20} />
          </Link>
        </li>
      </ul>
    </header>
  );
}
export default Header;
