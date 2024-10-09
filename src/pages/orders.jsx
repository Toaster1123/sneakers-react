import Card from '../components/Card';
import React from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://6ca41a0c78299893.mokky.dev/Orders');
      setOrders(data);
      setIsLoading(false);
    })();
  }, []);
  //   console.log(orders);
  return (
    <div className="content">
      <div className="top_body">
        <h1>Мои заказы</h1>
      </div>
      <div className="snaekers">
        {orders.map((item, index) => (
          <div className="sheakers-by-order" key={index}>
            <h2>Заказ #{item.id}</h2>
            <div className="sheakers-by-order-cards">
              {(isLoading ? [...Array(8)] : item).items.map((obj, obj_id) => {
                return <Card key={obj_id} {...obj} loading={isLoading} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
