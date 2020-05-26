import R from '@R'
import theme from '@theme'
import Toast from 'react-native-root-toast'

show = (message, background) => {
    Toast.show(message || 'Thành công', {
        position: 90,
        backgroundColor: !!background && background || BACKGROUND_TOAST.SUCCESS,
        containerStyle: {
            width: '90%'
        },
        animation: true
    })
}

const BACKGROUND_TOAST = {
    SUCCESS: theme.colors.blue,
    FAIL: theme.colors.red
}

const POSITION_TOAST = {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    CENTER: 'CENTER',
}

export { BACKGROUND_TOAST, POSITION_TOAST }

export default { show }