import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import ExpenseOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { useContext } from 'react';
const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  //we only want to froward our recent expenses here 
  const recentExpense = expensesCtx.expenses.filter((expense)=>{
    const today = new Date();
    //i want to find out all the expenses in the last 7 days
    const date7daysago = getDateMinusDays(today,7);
    
    return (expense.date >= date7daysago) && (expense.date<=today);

  })
  return (
      <ExpenseOutput expenses={recentExpense} expensesPeriod="Last 7 days" fallbackText="No expenses in last 7 days"/>

  );
}

export default RecentExpenses;

