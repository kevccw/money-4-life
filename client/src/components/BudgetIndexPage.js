import React, { useState, useEffect, useContext } from 'react';
import NewBudgetForm from './NewBudgetForm';
import { Budget, Transaction } from '../requests';
import AuthContext from '../context/auth-context';
import { Flex, Box, Heading } from '@chakra-ui/layout';
import BudgetDetails from './BudgetDetails';

const BudgetIndexPage = (props) => {
  // const { currentUser } = props;
  const ctx = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [expensesThisMonth, setExpensesThisMonth] = useState({});

  const round = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  useEffect(() => {
    Budget.index().then((data) => {
      data = data.filter((b) => b.user_id === ctx.user.id);
      setBudgets(data);
      Transaction.index().then((transactions) => {
        transactions = transactions.filter((t) => t.user_id === ctx.user.id);
        const expenses = {};
        transactions.forEach((transaction) => {
          if (expenses[transaction.category]) {
            expenses[transaction.category] += round(transaction.amount / 100);
          } else {
            expenses[transaction.category] = round(transaction.amount / 100);
          }
        });
        setExpensesThisMonth(expenses);
      });
    });
  }, []);

  const handleNewBudget = (params) => {
    Budget.create(params).then((data) => {
      console.log(data);
      window.location.reload();
    });
  };

  return (
    <div>
      {!ctx.user ? (
        <h1>You haven't made a Budget yet</h1>
      ) : (
        <>
          <Flex justifyContent='center' mt={10}>
            <Heading as='h1'>
              Your Total Monthly Budget is ${ctx.user.total_budget / 100}
            </Heading>
          </Flex>
          <Flex
            flexDir='row'
            flexWrap='wrap'
            alignItems='center'
            justifyContent='center'
          >
            {budgets.map((budget) => {
              return (
                // <h3 key={budget.id}>
                //   ${budget.amount / 100} - {budget.category} - {budget.user_id}
                // </h3>
                <BudgetDetails
                  amount={budget.amount / 100}
                  category={budget.category}
                  expenses={expensesThisMonth[budget.category]}
                />
              );
            })}
          </Flex>
          <NewBudgetForm createBudget={handleNewBudget} />
        </>
      )}
    </div>
  );
};

export default BudgetIndexPage;
