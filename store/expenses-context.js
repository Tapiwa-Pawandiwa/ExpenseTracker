import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some Bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A Book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "A book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "Some Bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e7",
    description: "A Book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e8",
    description: "A book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e9",
    description: "Some Bananas",
    amount: 5.99,
    date: new Date("2022-11-01"),
  },
  {
    id: "e10",
    description: "A Cake",
    amount: 14.99,
    date: new Date("2022-11-02"),
  },
  {
    id: "e11",
    description: 'A Shirt',
    amount: 18.59,
    date: new Date("2022-11-03"),
  },

];

export const ExpensesContext = createContext({
  //define shape of context data
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});
function expensesReducer(state, action) {
  //we checkt the type of action , and it is us that dispatches an action
  switch (action.type) {
    //if the add action is dispatched we could return a new state which could be an array - so we make a new array copying the existingstate [ usign spread operater]
    //in front of existing items i could add a new object for a new expense
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload }, ...state];
    case "UPDATE":
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updateableExpenseindex];
      const updatedItem = { ...updateableExpense, ...action.payload.data };
      updatedExpenses[updateableExpenseIndex] = updatedItem;
      return updateableExpense;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES); //used for state management //you have to define another function outside of the component

  //SECOND VAL [ USED AS INITIAL STATE]N= DUMMY EXPENSES
  //useReducer returns an array with expenses state and the dispatch function which we execute to dispatch a new action
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData }); //you can pass a value to dispatch as a second parameter
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    //we added all these functions , we need a value object 
    //which bundles our data and these functions together to expose them to all interestd components 
    //through the provider component 
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,

  }; 

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
