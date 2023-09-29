import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import BasicTable from '../components/table/table';
import Badge from '../components/badge/Badge';
import { assignBadgeStyle, nullCheck, nullCheckKeys } from '../utils';
import BusinessPreviewModal from './business_details_modal';
import { transactionsService } from '../services/endpoints';
import { TableShimmer } from '../components/table/table-shimmer';
import ReactPaginate from 'react-paginate';

export default function Home({ tableHeader }) {
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [openBusinessDetailsModal, setOpenBusinessDetailsModal] =
    useState(false);

  useEffect(() => {
    fetchTransactionLog();
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchTransactionLog = () => {
    setLoadingTransactions(true);
    fetch(`${transactionsService.log}?limit=${limit}&page=${currentPage}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTransactions(data?.data?.records);
        setCurrentPage(data?.data?.pagination.currentPage);
        setPagination(data?.data?.pagination);
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
          <h1 className='mb-8 mont-b-20'>Business Transaction Logs</h1>
          {loadingTransactions && <TableShimmer stack={limit} />}

          {!loadingTransactions && (
            <BasicTable header={tableHeader}>
              {transactions.map((order, index) => (
                <tr className={'py-4 border-b border-grey01'} key={index}  role='button'
                onClick={e => {
                  e.stopPropagation();
                  handleTransactionClick(order);
                }}>
                  <td
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

          {true && (
            <div className='bg-white pagination-wrapper w-2/4 ml-auto h-20'>
              <ReactPaginate
                pageCount={pagination.pageCount ?? 0}
                nextLabel='Next'
                previousLabel='Previous'
                onPageChange={newPage => {
                  setCurrentPage(newPage.selected + 1);
                  console.log('newPage', newPage);
                }}
              />
            </div>
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