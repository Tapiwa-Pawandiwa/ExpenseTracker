import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { useContext } from "react";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
const RecentExpenses = () => {
  //manage whether we should put LOADING DATA IN COMPONENT  OR NOT
  const [isFetching, setIsFetching] = useState(true);
  //we need a state tot tell us if theres an error
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);
  //const [fetchedExpenses, setFetchedExpenses] = useState([]);
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses !')
      }
      setIsFetching(false); //not fetching anymore
    }
    getExpenses();
  }, []);

  function errorHandler(){
    setError(null);
  
  }
  if(error && !isFetching){
      return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  //we only want to froward our recent expenses here
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    //i want to find out all the expenses in the last 7 days
    const date7daysago = getDateMinusDays(today, 7);

    return expense.date >= date7daysago && expense.date <= today;
  });

  return (
    <ExpenseOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses in last 7 days"
    />
  );
};

export default RecentExpenses;
