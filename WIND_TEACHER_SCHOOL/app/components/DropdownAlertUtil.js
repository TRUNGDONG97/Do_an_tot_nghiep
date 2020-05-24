import { NavigationActions } from 'react-navigation';
import DropdownAlert, { DropdownAlertType } from 'react-native-dropdownalert';
import reactotron from 'reactotron-react-native';

let _dropdownAlert; // eslint-disable-line
let _tapAction = () => {
    alert('ahihi')
};
function setTopDropdownAlert(dropdownAlertRef) {
    _dropdownAlert = dropdownAlertRef;
}

function showAlert(title, message, action, type = 'info') {
    _tapAction = action
    _dropdownAlert.alertWithType(type, title, message);
}

onTap = () => {
    try {
        _tapAction()
    } catch (error) {
        reactotron.log(error)
    }
}

export default {
    setTopDropdownAlert,
    showAlert,
    onTap
};
