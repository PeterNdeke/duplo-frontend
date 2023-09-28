import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import BasicTable from '../components/table/table';
import Badge from '../components/badge/Badge';
import { assignBadgeStyle, nullCheck, nullCheckKeys } from '../utils';
import BusinessPreviewModal from './business_details_modal';
import { transactionsService } from '../services/endpoints';
import { TableShimmer } from '../components/table/table-shimmer';

export default function Home({ tableHeader }) {
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [transactions, setTransactions] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [openBusinessDetailsModal, setOpenBusinessDetailsModal] =
    useState(false);

  useEffect(() => {
    fetchTransactionLog();
  }, []);

  const fetchTransactionLog = () => {
    setLoadingTransactions(true);
    fetch(`${transactionsService.log}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTransactions(data);
        setLoadingTransactions(false);
      });
  };

  const fetchMoreTransactionDetails = id => {
    fetch(`${transactionsService.log}/${id}/business-order-details`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setOrderDetails(prevState => ({
          ...prevState,
          orderDetails: data?.data,
        }));
      });
  };

  const fetchMoreTransactionDetailsToday = id => {
    fetch(`${transactionsService.log}/${id}/business-order-details?today=true`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setOrderDetails(prevState => ({
          ...prevState,
          orderDetailsToday: data?.data,
        }));
      });
  };

  const fetchCreditScore = id => {
    fetch(`${transactionsService.creditScore}/${id}/`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setOrderDetails(prevState => ({
          ...prevState,
          creditScore: data?.data?.credit_score,
        }));
      });
  };

  const handleTransactionClick = order => {
    const { businessID } = order;
    setOrderDetails(prevState => ({
      ...prevState,
      selectedTransaction: order,
    }));
    fetchMoreTransactionDetails(businessID);
    fetchMoreTransactionDetailsToday(businessID);
    fetchCreditScore(businessID);
    setOpenBusinessDetailsModal(true);
  };

  return (
    <>
      <div className='main-80'>
        <div className={style.main_inner}>
          {loadingTransactions && <TableShimmer />}

          {!loadingTransactions && (
            <BasicTable header={tableHeader}>
              {transactions?.data?.records?.map((order, index) => (
                <tr className={'py-4 border-b border-grey01'} key={index}>
                  <td
                    role='button'
                    onClick={e => {
                      e.stopPropagation();
                      handleTransactionClick(order);
                    }}
                    className='!py-8'>
                    {order.businessID}
                  </td>
                  <td>{`₦ ${nullCheck(
                    order?.amount,
                    nullCheckKeys.amount
                  )}`}</td>
                  <td>{nullCheck(order.createdAt, nullCheckKeys.date)}</td>
                  <td>
                    {order?.status && (
                      <Badge state={assignBadgeStyle(order?.status)}>
                        {order.status.toUpperCase()}
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </BasicTable>
          )}
        </div>
      </div>
      <BusinessPreviewModal
        orderDetails={orderDetails}
        isOpen={openBusinessDetailsModal}
        onClose={() => {
          setOrderDetails({});
          setOpenBusinessDetailsModal(!openBusinessDetailsModal);
        }}
      />
    </>
  );
}
Home.defaultProps = {
  tableHeader: [
    { title: 'Business ID' },
    { title: 'Amount' },
    { title: 'Date' },
    { title: 'status' },
  ],
};
