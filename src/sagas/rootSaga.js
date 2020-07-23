import { all } from 'redux-saga/effects';
import authorization from './authorization';
import errors from './errors';
import locations from './locations';
import sessions from './sessions';
import communities from './communities';
import tips from './tips';
import auditions from './auditions';
import statistic from './statistic';
import reviews from './reviews';
import userDetails from './userDetails';
import notifications from './notifications';
import payments from './payments';
import calls from './calls';
import chat from './chat';

export default function* sagas() {
  yield all([
    errors(),
    authorization(),
    locations(),
    sessions(),
    communities(),
    tips(),
    auditions(),
    statistic(),
    reviews(),
    userDetails(),
    notifications(),
    payments(),
    calls(),
    chat(),
  ]);
}
