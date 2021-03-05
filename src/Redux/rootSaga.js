//all will resolve all the effects similar to promise call
// call allows us to call functions
import { all, call } from 'redux-saga/effects';

import userSaga from './User/user.saga';

//generator function
export default function* rootSaga() {
    //to pass our sagas
    yield all([call(userSaga)])
}