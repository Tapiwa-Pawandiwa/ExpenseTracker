import { View, Text } from "react-native";
import React from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpenseOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered Expenses found"
    />
  );
}

export default AllExpenses;
