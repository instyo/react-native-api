import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'
import Reinput from 'reinput'
import themeColor from '../../components/CustomColors'
import baseUrl from '../../services/ApiService'
import Icon from "react-native-vector-icons/Ionicons";

class AddCategory extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Add Category',
            headerStyle: {
                backgroundColor: themeColor.appBar,
            },
            headerRight: () => (
                <Icon.Button
                    name="ios-list"
                    backgroundColor="transparent"
                    underlayColor="transparent" // This one
                    color={themeColor.buttonTitleColor}
                    size={25}
                    onPress={() => navigation.navigate('Categories')}
                >
                    <Text style={{ fontSize: 15 }}></Text>
                </Icon.Button>
            ),
            headerTintColor: themeColor.titleBar,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

    state = {
        categoryId: '',
        categoryName: '',
        isLoading: false
    }

    handleCategoryName = (text) => {
        this.setState({ categoryName: text })
    }

    handleSubmitCategory = () => {
        if (this.state.categoryName.length < 1) {
            ToastAndroid.show("Please fill category name", 3)
        } else {
            this.setState({ isLoading: true })
            fetch(baseUrl + 'addCategory.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categoryName: this.state.categoryName
                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status == 1) {
                        this.setState({ categoryName: '' })
                    }
                    ToastAndroid.show(responseJson.message, 3)
                    this.setState({ isLoading: false })
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({ isLoading: false })
                })
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator />
            )
        }

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={themeColor.statusBar} barStyle="light-content" />
                <Reinput
                    label='Category Name'
                    activeColor={themeColor.activeInput}
                    defaultValue={this.state.categoryName}
                    onChangeText={this.handleCategoryName} />

                <TouchableOpacity
                    style={styles.SubmitButtonStyle}
                    activeOpacity={.5}
                    onPress={this.handleSubmitCategory}>
                    <Text style={styles.TextStyle}> SUBMIT </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create(({
    'container': {
        flex: 1,
        flexDirection: "column",
        padding: 15,
        backgroundColor: themeColor.container,
    },
    'SubmitButtonStyle': {
        marginTop: 10,
        paddingTop: 15,
        width: '100%',
        paddingBottom: 15,
        backgroundColor: themeColor.buttonColor,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20
    },
    'TextStyle': {
        color: themeColor.buttonTitleColor,
        textAlign: 'center',
        fontSize: 16
    }
}))

export default AddCategory