import React, { Component } from 'react'
import { Image, View, StyleSheet, Text } from 'react-native'
import Moment from 'moment';

class NewsItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.newsImage}
                    resizeMode='cover'
                    source={{ uri: this.props.gambar }} />
                <View style={styles.containerPanel}>
                    <Text style={styles.title} numberOfLines={2}>{this.props.judul}</Text>
                    <Text style={styles.subtitle} numberOfLines={2}>{this.props.isi}</Text>
                    <Text style={styles.date}> {this.props.tag} / {Moment(this.props.tanggal).format('DD MMMM YYYY')}</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    newsImage: {
        width: 80,
        height: 80,
        margin: 2,
        backgroundColor: 'gray'
    },
    containerPanel: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 8
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    subtitle: {
        fontSize: 14
    },
    date: {
        fontSize: 11,
        fontWeight: 'bold',
        color: 'orange'
    }
});

export default NewsItem