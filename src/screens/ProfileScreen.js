import React, {Component} from 'react'
import {View, Text} from 'react-native'

class ProfileScreen extends Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigation } = this.props;
      return (
        <View>
          <Text>
          {navigation.getParam('name', 'gak ada')}
          </Text>
        </View>
      );
    }
  }

  export default ProfileScreen