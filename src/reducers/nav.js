import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../routes/routes';
import { locale } from '../constants/textConstants';

const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export default (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case 'SIGN_OUT_SUCCESS':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
        routeName: 'Login',
      }), state);
      break;
    case 'MOVE_TO_SCHEDULE':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
        routeName: 'Schedule',
      }), state);
      break;
    case 'MOVE_TO_CHECK_IN_OUT':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
        routeName: 'CheckInOut',
      }), state);
      break;
    case 'SET_LOCATION':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
        routeName: 'Practitioners',
      }), state);
      break;
    case 'SET_PRACTITIONER':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
        routeName: 'Book',
        params: {
          backScreen: 'Practitioners',
        },
      }), state);
      break;
    case 'SET_BOOK_AGAIN_DATA':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
        routeName: 'Book',
        params: {
          backScreen: 'ConfirmedSession',
        },
      }), state);
      break;
    case 'CREATE_SESSIONS_SUCCESS':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
        routeName: 'Awaiting',
      }), state);
      break;
    case 'SET_CONFIGURED_SUCCESS':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
        routeName: 'Dashboard',
      }), state);
      break;
    case 'SET_CONFIGURED_USER_SUCCESS':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
        routeName: 'Home',
      }), state);
      break;
    case 'MOVE_TO_SESSION_INFO_SUCCESS':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
        routeName: 'ConfirmedSession',
        params: { backScreen: action.data.backScreen },
      }), state);
      break;
    case 'CREATE_OR_GET_CHAT_ATTEMPT':
      if (state.index !== 2) {
        nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
          routeName: 'UsersChat',
          params: { username: action.data.profile.username || locale.chat },
        }), state);
      }
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
};
