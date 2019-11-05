import React, { Component } from 'react'
import { View, ActivityIndicator, ScrollView, ToastAndroid, Image, StyleSheet, StatusBar, Text } from 'react-native'
import themeColor from '../../components/CustomColors'
import baseUrl from '../../services/ApiService';
import Moment from 'moment';
import Icon from "react-native-vector-icons/Ionicons";

class ArticleDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'Read Post',
            headerStyle: {
                backgroundColor: themeColor.appBar,
            },
            headerRight: () => (
                <Icon.Button
                    name="ios-trash"
                    backgroundColor="transparent"
                    underlayColor="transparent" // This one
                    color={themeColor.buttonTitleColor}
                    size={25}
                    onPress={() => params.handleRemove()}
                >
                    <Text style={{ fontSize: 15 }}></Text>
                </Icon.Button>
            ),
            headerTintColor: themeColor.titleBar,
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
    }

    fetchArticleDetail() {
        const { navigation } = this.props
        var id = navigation.getParam('id', '1')
        this.setState({ isLoading: true })
        fetch(baseUrl + 'articleDetail.php?id=' + id, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson))
                this.setState({ data: responseJson, isLoading: false })
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                ToastAndroid.show("An error occured" + error, 3)
            })
    }

    deleteArticle = () => {
        this.setState({ isLoading: true })
        fetch(baseUrl + 'deleteArticle.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.data.id
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 1) {
                    const { goBack } = this.props.navigation
                    goBack()
                }
                ToastAndroid.show(responseJson.message, 3)
                this.setState({ isLoading: false })
            })
            .catch((error) => {
                console.error(error);
                ToastAndroid.show(error, 3)
                this.setState({ isLoading: false })
            })
    }

    componentDidMount() {
        this.fetchArticleDetail()
        this.props.navigation.setParams({ handleRemove: this.deleteArticle })
    }

    state = {
        data: null,
        isLoading: true
    }

    render() {
        Moment.locale('en')
        if (this.state.isLoading) {
            return (
                <ActivityIndicator />
            )
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={themeColor.statusBar} barStyle="light-content" />
                <ScrollView>
                    <Image style={styles.imageContainer}
                        resizeMode='cover'
                        source={{ uri: this.state.data.picture }} />
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {this.state.data.title} </Text>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: '100%'
                        }}
                    />
                    <View style={{ padding: 10, flex: 1, flexDirection: 'column' }}>
                        <Text style={{ paddingTop: 5, color: 'grey', fontSize: 12 }}> Tag : {this.state.data.category_name} </Text>
                        <Text style={{ paddingTop: 2, paddingBottom: 5, color: 'grey', fontSize: 11 }}> Published at : {Moment(this.state.data.created_at).format('DD MMMM YYYY')}</Text>
                        <Text style={{ paddingTop: 10 }}> {this.state.data.content} </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    'container': {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: themeColor.container
    },
    'imageContainer': {
        flex: 1,
        width: '100%',
        height: 250
    }
})

export default ArticleDetail