import React, { useState, useEffect, useContext } from 'react';
import { Transaction } from '../requests';
import AuthContext from '../context/auth-context';

const TransactionIndexPage = () => {
  const [transactions, setTransactions] = useState([]);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    // Transaction.index().then((transactions) => {
    //   setTransactions(transactions);
    //   console.log(transactions);
    // });
    if (ctx.user) {
      setTransactions(ctx.user.transactions);
    }
  }, [ctx.user]);

  return (
    <div>
      {transactions.map((transaction) => {
        return (
          <h3>
            {transaction.transaction_date} - ${transaction.amount / 100} -{' '}
            {transaction.description} - {transaction.account}
          </h3>
        );
      })}
    </div>
  );
};

export default TransactionIndexPage;
