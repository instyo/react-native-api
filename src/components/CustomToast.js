import { ToastAndroid } from 'react-native'

export function showToast(message, duration) {
    ToastAndroid.show(message, duration)
}