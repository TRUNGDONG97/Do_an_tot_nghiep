import { NavigationActions } from 'react-navigation';

let _navigator; // eslint-disable-line

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}
function goBack() {
  // _navigator.goBack();
  _navigator.dispatch(
    NavigationActions.back()
    );
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
};
