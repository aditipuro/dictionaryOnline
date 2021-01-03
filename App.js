import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {Header} from 'react-native-elements';

export default class App extends React.Component {
getWord=(word)=>{
  var searchKeyWord=word.toLowerCase()
  var url = "https://rupinwhitehatjr.github.io/dictionary/%22"+searchKeyword+"%22.json"
  return fetch(url)
  .then((data)=>{
    if(data.status===200)
    {
      return data.json()
    }
    else
    {
      return null
    }
  })
  .then((response)=>{
    var responseObject = response

    if(responseObject)
    {
      var wordData = responseObject.definitions[0]
      var definition = wordData.description
      var lexicalCategory = wordData.wordtype
      
      this.setState({
        "word" : this.state.text,
        "definition": definition,
        "lexicalCategory" : lexicalCategory,

      })
    }
    else
    {
      this.setState({
        "word" : this.state.text,
        "definition" : "Not Found",
      })
    }
  })
}
  render() {
    return (
      <View style = {styles.detailsContainer}>
        <Text style={styles.detailsTitle}>
          word : {" "}
          </Text>
      <TextInput
        style = {styles.inputBox}
      onChangeText = {text=> {
        this.setState({
          text: inputText,
          isSearchedPressed: false,
          word: "Loading...",
          lexicalCategory:'',
          examples: [],
          definition: ""
        });
      }}
      value = {this.state.text}
    />

<Text style={{fontSize:18}}>
            {this.state.lexicalCategory}
        </Text>

<TouchableOpacity 
  style={styles.searchButton}
  onPress = {()=> {
    this.setState({isSearchedPressed: true});
    this.getWord(this.state.text)
  }}>
</TouchableOpacity>

</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
});