import { transactionsService } from './endpoints';

export const fetchMoreTransactionDetails = id => {
  let response;
  fetch(
    `${transactionsService.logDetails}/${id}/business-order-details?today=true`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      response = data;
    });
  return response;
};

export const fetchTransactionLog = () => {
  fetch(`${transactionsService.log}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
};
