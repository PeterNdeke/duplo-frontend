const base = "https://ndekepeter.tech/";

const transactionServiceBase = `${base}logs-service/v1/transaction-logs`;
export const transactionsService = {
  log: `${transactionServiceBase}`,
  creditScore: `${transactionServiceBase}/credit-score`,
};
