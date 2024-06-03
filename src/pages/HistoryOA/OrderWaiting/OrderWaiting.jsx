import classNames from 'classnames/bind';
import React, { useEffect, useState, Suspense } from 'react';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Profile } from '~/layouts';

import styles from './OrderWaiting.module.scss';
import GetToken from '~/Token/GetToken';

const cx = classNames.bind(styles);

const OrderHistory = React.lazy(() => import('~/components/OrderHistory'));
const MenuOrder = React.lazy(() => import('~/pages/HistoryOA/MenuOrder'));

function OrderWaiting() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getApiOrderPending = async () => {
      const response = await axios.get('http://localhost:8000/api/order/status/2', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      setOrderList(response.data.result);
    };
    getApiOrderPending();
  }, []);

  return (
    <div className={cx('content')}>
      <div className={cx('sidebar')}>
        <Profile />
      </div>
      <div className={cx('main-content')}>
      <div className={cx('header-content')}>
        <Suspense fallback={<div>Loading Menu...</div>}>
          <MenuOrder />
        </Suspense>
      </div>
      <span className={cx('title-content')}>Order is prepared</span>
      <div className={cx('order-list')}>
        {orderList.map((order) => (
          <Suspense key={order.id} fallback={<div>Loading...</div>}>
            <OrderHistory key={order.id} data={order} icon={faBoxOpen}></OrderHistory>
          </Suspense>
        ))}
      </div>
      </div>
    </div>
  );
}

export default OrderWaiting;
