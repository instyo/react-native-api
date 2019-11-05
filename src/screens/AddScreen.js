import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native'
import Reinput from 'reinput'

class AddScreen extends Component {

    static navigationOptions = {
        title: 'Add News'
    };

    state = {
        email: '',
        password: '',
        language: ''
    }

    handleEmail = (text) => {
        this.setState({ email: text })
    }

    handlePassword = (text) => {
        this.setState({ password: text })
    }

    login = (email, pass) => {
        alert('email: ' + email + ' password: ' + pass)
    }

    render() {
        return (
            <View style={styles.container}>
                <Reinput
                    label='email'
                    autoCapitalize="none"
                    onChangeText={this.handleEmail} />

                <Reinput
                    label='email'
                    autoCapitalize="none"
                    onChangeText={this.handlePassword} />

                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ language: itemValue })
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>


                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.login(this.state.email, this.state.password)
                    }>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23,
        paddingLeft: 10,
        paddingRight: 10
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
})

export default AddScreen