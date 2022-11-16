import { View, Text ,ActivityIndicator,StyleSheet} from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles';
import Button from './Button';

//renders a loading spinner
function ErrorOverlay ({message ,onConfirm}) {
  return (
    <View style={styles.container}>
     <Text style={[styles.text,styles.title]}>An error occured !</Text>
     <Text style={styles.text}>{message}</Text>
     <Button>Okay button but it does nothing - just to show it works mate </Button>
    </View>
  )
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  }, 
  text:{
     color: 'white',
    textAlign: 'center' ,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
  }
})