import { createContext, useReducer } from "react";


export const ExpensesContext = createContext({
  //define shape of context data
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExepnses: (expenses)=>{},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});
function expensesReducer(state, action) {
  //we checkt the type of action , and it is us that dispatches an action
  switch (action.type) {
    //if the add action is dispatched we could return a new state which could be an array - so we make a new array copying the existingstate [ usign spread operater]
    //in front of existing items i could add a new object for a new expense
    case "ADD":
      return [action.payload.id, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted; //put in proper order
    case "UPDATE":
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updateableExpenseIndex];
      const updatedItem = { ...updateableExpense, ...action.payload.data };
       const updatedExpenses= [...state];
       updatedExpenses[updateableExpenseIndex]=updatedItem;
      return updateableExpense;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []); //used for state management //you have to define another function outside of the component

  //SECOND VAL [ USED AS INITIAL STATE]N= DUMMY EXPENSES
  //useReducer returns an array with expenses state and the dispatch function which we execute to dispatch a new action
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData }); //you can pass a value to dispatch as a second parameter
  }
  function setExpenses(expenses){
    dispatch({type: 'SET',payload: expenses});
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
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,

  }; 

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
