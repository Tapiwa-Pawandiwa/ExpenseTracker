import axios from "axios";
import { ExpensesContext } from "../store/expenses-context";

const BACKEND_URL = "https://expense-tracker-e14fd-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  //the "expenses.json will create a node in the firebase db"
  // we now define the value
  const id = response.data.name; //holds autogenerated firebase ID
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];
  //we go through our response keys

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  //to update data we need to send a "put" request
  return axios.put(BACKEND_URL + `/expenses.json/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}