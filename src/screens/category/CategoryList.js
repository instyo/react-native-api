import React, { Component } from 'react'
import { View, Alert, ToastAndroid, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native'
import themeColor from '../../components/CustomColors'
import baseUrl from '../../services/ApiService'
import CustomItems from '../../components/CustomItems'

class CategoryList extends Component {
    static navigationOptions = {
        title: 'Categories',
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
        // this.onPress = this.deleteCategory.bind(this);
    }

    getCategories() {
        fetch(baseUrl + 'listCategory.php', {
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

    deleteChosenCategory(id) {
        this.setState({ isLoading: true })
        fetch(baseUrl + 'deleteCategory.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 1) {
                    this.getCategories()
                }
                ToastAndroid.show(responseJson.message, 3)
                this.setState({ isLoading: false })
            })
            .catch((error) => {
                console.error(error);
                this.setState({ isLoading: false })
            })
    }

    componentDidMount() {
        this.getCategories()
    }

    onCardPress = (id) => {
        this.deleteCategory(id)
    }

    deleteCategory(id) {
        Alert.alert(
            '',
            'Are you sure to delete this category?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.deleteChosenCategory(id) },
            ],
            { cancelable: false },
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator />
            )
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <CustomItems
                            onCardPress={this.onCardPress}
                            id={item.id}
                            title={item.category_name} />
                    }
                    keyExtractor={({ id }, index) => id}
                />
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
    }
}))

export default CategoryList