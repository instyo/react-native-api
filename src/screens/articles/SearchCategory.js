import React, { Component } from 'react'
import { View, TextInput, ToastAndroid, TouchableOpacity, StatusBar, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native'
import themeColor from '../../components/CustomColors'
import baseUrl from '../../services/ApiService'
import Icon from "react-native-vector-icons/Ionicons";

class SearchCategory extends Component {
    static navigationOptions = {
        title: 'Choose Category',
        headerStyle: {
            backgroundColor: themeColor.appBar,
        },
        headerTintColor: themeColor.titleBar,
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    state = {
        dataSource: [],
        isLoading: true
    }

    constructor(props) {
        super(props);
    }

    getCategories(keyword) {
        this.setState({ isLoading: true })
        fetch(baseUrl + 'listCategory.php?limit=5&keyword=' + keyword, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ dataSource: responseJson, isLoading: false })
                console.log(responseJson)
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                ToastAndroid.show("An error occured" + error, 3)
            })
    }

    // handle category
    handleSearch = (text) => {
        if (this.state.isLoading == false) {
            // setTimeout(() => {
            this.getCategories(text)
            // }, 500);
        }
    }

    // handle select category
    selectCategory(data) {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onSelect({ category_id: data.id, category_name: data.category_name });
    }

    UNSAFE_componentWillMount() {
        this.getCategories('')
    }

    searchBar() {
        return (
            <View style={styles.searchSection}>
                <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000" />
                <TextInput
                    style={styles.input}
                    placeholder="Type Keyword.."
                    onChangeText={this.handleSearch}
                    // onEndEditing={this.handleSearch}
                    underlineColorAndroid="transparent"
                />
            </View>
        )
    }

    listBuilder() {
        return (
            this.state.isLoading ? <ActivityIndicator /> :

                <FlatList
                    style={{ paddingTop: 20 }}
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => this.selectCategory(item)}>
                            <Text style={{ fontSize: 16, color: "#5f6769" }}>{item.category_name}</Text>
                            <Icon.Button
                                name="ios-arrow-forward"
                                backgroundColor="transparent"
                                underlayColor="transparent" // This one
                                color="#5f6769"
                                size={20}
                            >
                                <Text style={{ fontSize: 15 }}></Text>
                            </Icon.Button>
                        </TouchableOpacity>
                    }
                    keyExtractor={({ id }, index) => id}
                />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={themeColor.statusBar} barStyle="light-content" />
                {this.searchBar()}
                {this.listBuilder()}
            </View>
        )
    }
}


const styles = StyleSheet.create(({
    'container': {
        flex: 1,
        flexDirection: "column",
        padding: 10,
        backgroundColor: themeColor.container,
    },
    'searchSection': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    'searchIcon': {
        padding: 10,
    },
    'input': {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
}))

export default SearchCategory