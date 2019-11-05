import React, { Component } from 'react'
import { View, Text, Image, ScrollView, PixelRatio, Picker, TouchableOpacity, ToastAndroid, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'
import Reinput from 'reinput'
import themeColor from '../../components/CustomColors'
import baseUrl from '../../services/ApiService'
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const initState = {
    title: '',
    category_id: '',
    category_name: '',
    content: '',
    ImageSource: null,
    data: null,
    Image_TAG: ''
}

class AddArticle extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Add Post',
            headerStyle: {
                backgroundColor: themeColor.appBar,
            },
            headerTintColor: themeColor.titleBar,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

    constructor(props) {
        super(props)
        this.state = initState
    }

    onSelectCategory = data => {
        this.setState(data);
    };

    onPressCategory = () => {
        // () => navigate('SearchCategory', { name: 'Jane' })
        const { navigate } = this.props.navigation
        navigate("SearchCategory", { onSelect: this.onSelectCategory });
    };

    // handle title
    handleTitle = (text) => {
        this.setState({ title: text })
    }

    // handle content
    handleContent = (text) => {
        this.setState({ content: text })
    }

    // handle category
    handleCategory = (text) => {
        this.setState({ category: text })
    }

    // handle image
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                this.setState({
                    ImageSource: source,
                    data: response.data
                });
            }
        });
    }

    // handle add article
    postNewArticle = () => {
        if (this.state.title.length < 1) {
            ToastAndroid.show("Please fill title field!", 3)
        } else if (this.state.category_id.length < 1) {
            ToastAndroid.show("Please select category!", 3)
        } else if (this.state.content.length < 1) {
            ToastAndroid.show("Please fill content field!", 3)
        } else if (this.state.data == null) {
            ToastAndroid.show("Please select an image!", 3)
        } else {
            this.setState({ isLoading: true })
            RNFetchBlob.fetch('POST', baseUrl + 'addArticle.php', {
                // Authorization: "Bea rer access-token", // no needed
                // otherHeader: "foo", // no needed
                'Content-Type': 'multipart/form-data',
            }, [
                { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
                { name: 'title', data: this.state.title },
                { name: 'category', data: this.state.category_id },
                { name: 'content', data: this.state.content }
            ]).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status == 1) {
                        this.setState(initState)
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
                <ScrollView>
                    <StatusBar backgroundColor={themeColor.statusBar} barStyle="light-content" />

                    <Reinput
                        label='Title'
                        activeColor={themeColor.activeInput}
                        defaultValue={this.state.title}
                        onChangeText={this.handleTitle} />

                    <TouchableOpacity onPress={this.onPressCategory}>
                        <Reinput
                            label='Category'
                            editable={false}
                            activeColor={themeColor.activeInput}
                            value={this.state.category_name} />
                    </TouchableOpacity>

                    <Reinput
                        label='Content'
                        multiline={true}
                        numberOfLines={5}
                        activeColor={themeColor.activeInput}
                        defaultValue={this.state.content}
                        onChangeText={this.handleContent} />

                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={styles.ImageContainer}>
                            {this.state.ImageSource === null ? <Icon name="ios-camera" size={25}></Icon> :
                                <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                            }
                        </View>
                    </TouchableOpacity>

                </ScrollView>

                <TouchableOpacity
                    style={styles.SubmitButtonStyle}
                    activeOpacity={.5}
                    onPress={this.postNewArticle}>
                    <Text style={styles.TextStyle}> SUBMIT </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    'container': {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: themeColor.container,
        padding: 15
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
    },
    'ImageContainer': {
        borderRadius: 10,
        width: '100%',
        height: 200,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
})

export default AddArticle