//all redux actions 
import UserTypes from './user.types';

//naming conventions in redux saga
export const emailSignInStart = userCredentials => ({
    type: UserTypes.EMAIL_SIGN_IN_START,
    payload: userCredentials
});

export const signInSuccess = user => ({
    type: UserTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const userAuthSession = () => ({
    type: UserTypes.USER_AUTH_SESSION
});

export const signOutUserStart = () => ({
    type: UserTypes.SIGN_OUT_USER_START
});

export const signOutSuccess = () => ({
    type: UserTypes.SIGN_OUT_SUCCESS
});

export const signUpStart = userCredentials => ({
    type: UserTypes.SIGN_UP_USER_START,
    payload: userCredentials
});

export const errorUser = err => ({
    type: UserTypes.ERROR_USER,
    payload: err
});

export const resetPassStart = userCredentials => ({
    type: UserTypes.RESET_PASS_START,
    payload: userCredentials
});

export const resetPassSuccess = () => ({
    type: UserTypes.RESET_PASS_SUCCESS,
    payload: true
});

export const resetStateUser = () => ({
    type: UserTypes.RESET_STATE_USER
});

export const googleSignInStart = () => ({
    type: UserTypes.GOOGLE_SIGN_IN_START
});

export const facebookSignInStart = () => ({
    type: UserTypes.FACEBOOK_SIGN_IN_START
});
