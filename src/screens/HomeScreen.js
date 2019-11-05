import React, { Component } from 'react'
import { View, ActivityIndicator, Image, StyleSheet, Text, FlatList } from 'react-native'
import NewsItem from '../components/NewsItem'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const apiKey = '6c0296d4bd794341aa13ec8f0fcbaa23'
const apiUri = 'https://newsapi.org/v2/everything?q=apple&apiKey='

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Home',
    headerTitleStyle: {
      width: '90%',
      textAlign: 'center',
    },
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  retrieveNews() {
    fetch(apiUri + apiKey)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.articles
        }, function () {

        })
      }).catch((error) => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.retrieveNews()
  }

  render() {
    const { navigate } = this.props.navigation
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator></ActivityIndicator>
          <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => navigate('AddCategory', { name: 'Jane' })}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        </View>
      )
    }

    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) =>
            <NewsItem
              gambar={item.urlToImage}
              judul={item.title}
              isi={item.content}
              tanggal={item.publishedAt}
            />}
          keyExtractor={({ id }, index) => id}
        />
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => navigate('AddCategory', { name: 'Jane' })}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => navigate('AddArticle', { name: 'Jane' })}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
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

export default HomeScreen