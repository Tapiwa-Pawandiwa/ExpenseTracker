import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
  //edit or add
  //we need to cast to this screen the id of the expense
  //we have an expenseID / if theres no expense Id we are adding not editing
  const editedExpenseId = route.params?.expenseId; // the qeustion mark checks if params is an object or if its defined . if its defined we go into expenseId
  const isEditing = !!editedExpenseId; // the double excalamation mark converts a value into a boolean value
  const expensesCtx = useContext(ExpensesContext);

  //we can set the options of a screen from within a screen using the navigation prop
  //we shouldnt use setOptions like this if youre setting options - useEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    //triggerd when confirm happens - call add or update dpendding on mode
    if (isEditing) {
      expensesCtx.updateExpense(
        editedExpenseId,{
        description: "Test",
        amount: 19.99,
        date: new Date("2022-11-04"),
        
      });
    } else {
      expensesCtx.addExpense();
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm/>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.buttonStyle}>
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      <View style={styles.deleteContainer}>
        {isEditing && (
          <IconButton
            iconName="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        )}
      </View>
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  container: {
    flex: 1, //take up all space
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
