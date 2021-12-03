import React, { useState } from 'react';
// import { Budget } from '../requests';

const NewBudgetForm = ({ createBudget }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      amount,
      category,
    };
    createBudget(params);
    setAmount('');
    setCategory('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='amount'>Amount</label>
        <input
          type='number'
          step='0.01'
          name='amount'
          id='amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label htmlFor='category'>Category</label>
        <input
          type='text'
          name='category'
          id='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input type='submit' value='Add' />
      </div>
    </form>
  );
};

export default NewBudgetForm;