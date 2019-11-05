import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

class CustomItems extends Component {
    onClick = () => {
        const { onCardPress, id } = this.props;
        onCardPress(id);
    };
    render() {
        const { title } = this.props;
        return (
            <View style={styles.items}>
                <Text style={{ fontSize: 16, color: "#5f6769" }}>{title}</Text>
                <Icon.Button
                    name="ios-trash"
                    backgroundColor="transparent"
                    underlayColor="transparent" // This one
                    color="red"
                    size={20}
                    onPress={this.onClick}
                >
                    <Text style={{ fontSize: 15 }}></Text>
                </Icon.Button>
            </View>
        )
    }
}

const styles = StyleSheet.create(({
    'items': {
        padding: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}))

export default CustomItems