import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, StatusBar, FlatList } from 'react-native'
import NewsItem from '../../components/NewsItem'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import themeColor from '../../components/CustomColors'
import baseUrl from '../../services/ApiService';

class ArticleList extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
            headerTitleStyle: {
                width: '90%',
                textAlign: 'center',
                fontWeight: 'bold',
            },
            headerStyle: {
                backgroundColor: themeColor.appBar,
            },
            headerTintColor: themeColor.titleBar
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: []
        }
    }

    retrieveArticles() {
        fetch(baseUrl + 'listArticle.php')
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson))
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function () {

                })
            }).catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.retrieveArticles()
        this.props.navigation.addListener('willFocus', this._handleStateChange)
    }

    _handleStateChange = state => {
        this.retrieveArticles()
    };

    listBuilder() {
        return (
            this.state.isLoading ? <ActivityIndicator /> :
                this.state.dataSource.length > 0 ?
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('ArticleDetail', {
                                        id: item.id
                                    });
                                }}>
                                <NewsItem
                                    tag={item.category_name}
                                    gambar={item.picture}
                                    judul={item.title}
                                    isi={item.content}
                                    tanggal={item.created_at}
                                />
                            </TouchableOpacity>
                        }
                        keyExtractor={({ id }, index) => id}
                    />
                    : <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                        <Text style={{color : 'grey'}}>No data available, create new post now!</Text>
                    </View>
        )
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ flex: 1, paddingTop: 10 }}>
                <StatusBar backgroundColor={themeColor.statusBar} barStyle="light-content" />
                {this.listBuilder()}
                <ActionButton buttonColor={themeColor.buttonColor}>
                    <ActionButton.Item buttonColor='#1abc9c' title="New Post" onPress={() => navigate('AddArticle')}>
                        <Icon name="ios-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="New Category" onPress={() => navigate('AddCategory')}>
                        <Icon name="ios-pricetag" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default ArticleList