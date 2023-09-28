const base = 'http://52.87.206.98/';

const transactionServiceBase = `${base}logs-service/v1/transaction-logs`;
export const transactionsService = {
  log: `${transactionServiceBase}`,
  creditScore: `${transactionServiceBase}/credit-score`,
};
