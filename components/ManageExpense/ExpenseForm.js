import { useState, setState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import IconButton from "../UI/IconButton";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true, //this converts a truthy value into a real boolean - if we have no def values it will be false and true if theres def val
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    }, //this converts the date object to string format by only fetching what we need
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      //if you update sta
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
      //this allows us to dynamically target and set property names = we have a generic inputchangedhandler function
      // and we have one state object that manages all inputValues
    });
  }
  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value, //THE PLUS CONVERTS IT TO A NUMBER
      date: new Date(inputs.date.value), //CONVERTS STRING TO DATE TYPE
      description: inputs.description.value,
    };

    //we do validation here
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0; //check if greater than 0
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0; //check if not empty

    //----------
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //show some feedback
      //Alert.alert('Invalid Inputs', 'Please check your input values');
      //we want to highlight the incorrect inputs directly in the forms
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
    
    setInputs((curInputs)=>{
     console.log('RESETTING INPUTS')
    return  {
      amount: {value: curInputs.amount.value="",isValid: true},
      date: {value: curInputs.date.value="",isValid: true},
      description: {value:curInputs.description.value="",isValid: true},
    }
     
    })
  }
  //helper check for inputs
  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  //if one of these inputs isnt valid then one of the inputs isnt valid

  //function onSubmitEdit(){
  //setInputs((curInputs)=>{
  //console.log('RESETTING INPUTS')
  // return {
  //   amount: {value: curInputs.amount.value="",isValid: true},
  //  date: {value: curInputs.date.value="YYYY-MM-DD",isValid: true},
  //    description: {value:curInputs.description.value= "",isValid: true},
  //   }
  //  })

return (
  <View style={styles.form}>
    <Text style={styles.title}>Your Expense</Text>
    <View style={styles.inputsRow}>
      <Input
        label="Amount"
        invalid={!inputs.amount.isValid}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangedHandler.bind(this, "amount"),
          value: inputs.amount.value,
        }}
        style={styles.rowInput}
      />
      <Input
        label="Date"
        invalid={!inputs.date.isValid}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, "date"),
          value: inputs.date.value,
        }}
        style={styles.rowInput}
      />
    </View>

    <Input
      label="Description"
      invalid={!inputs.description.isValid}
      textInputConfig={{
        multiline: true,
        autoCorrect: false,
        // autoCapitalize: 'none'
        onChangeText: inputChangedHandler.bind(this, "description"),
        value: inputs.description.value,
      }}
    />
    {formIsInvalid && (
      <View style={styles.errorTextContainer}>
        <Text style={styles.errorText}>
          Invalid Input values - please check your entered data !
        </Text>
      </View>
    )}

    <View style={styles.buttons}>
      <Button mode="flat" onPress={onCancel} style={styles.buttonStyle}>
        Cancel
      </Button>
      <Button style={styles.buttonStyle} onPress={submitHandler}>
        {submitButtonLabel}
      </Button>
    </View>
  </View>
);
   }
export default ExpenseForm;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  form: {
    marginTop: 20,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  errorTextContainer: {
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
    margin: 12,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: GlobalStyles.colors.primary50,
  },
});
