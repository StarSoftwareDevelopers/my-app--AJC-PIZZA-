//takeLatest - 
import { takeLatest, call, all, put} from 'redux-saga/effects';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider, FacebookProvider } from './../../firebase/utils';
import UserTypes from './user.types';
import {signInSuccess, signOutSuccess, resetPassSuccess ,errorUser} from './user.actions';
import { resetPasswordAPI } from './user.help';

//helper generator function that others can use
export function* snapshotFromUserAuth(user, additionalData = {}) {
    try {
    //to know that they are signed in or logged out
        const userRef = yield call(handleUserProfile, { userAuth : user, additionalData });
        const snapshot = yield userRef.get(); //effectively handle updating the redux store with the user's info
         yield put (
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        );
            
    } catch(err){
        console.log(err);
    }
}

export function* emailSignIn({ payload: {email,password} }) {
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email,password);
        yield snapshotFromUserAuth(user) 
       

    }catch(err){
        console.log(err);
    }
}

//generator function
export function* onEmailSignInStart(){
    //takes two things, the 1st one is the action we're listening for
    //2nd is the nmame of the generator function that will handle this event when it is called
    yield takeLatest(UserTypes.EMAIL_SIGN_IN_START, emailSignIn )
}

//if the user is currently signed in
//if the user does not exist
//if they are signed in - restore the redux store with current user's info
export function* isUserAuthenticated() {
    try {
       const userAuth = yield getCurrentUser();
       if(!userAuth) return; 
        yield snapshotFromUserAuth(userAuth);


    } catch(err){
        console.log(err);
    }
}

export function* userAuthSession() {
    yield takeLatest(UserTypes.USER_AUTH_SESSION, isUserAuthenticated);
}

//generator function for signout
export function* signOutUser() {
    try {
       yield auth.signOut();
       yield put(
           signOutSuccess()
       )  

    } catch(err) {
        console.log(err);
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(UserTypes.SIGN_OUT_USER_START, signOutUser);
}

//generator function for signup
export function* signUp({ payload: {
    displayName, email, password, confirmPassword
}}) {
    //validation for password and confirmPassword
    if( password !== confirmPassword) {
        const err =['Password does not match'];
        yield put (
            errorUser(err)
        )
        return;
      }
 
      try{
 
       const { user } = yield auth.createUserWithEmailAndPassword(email,password);
       const additionalData = { displayName};
       yield snapshotFromUserAuth(user, additionalData);
       // await user.sendEmailVerification();

      }catch(err){
        alert(err);
      }
}

//signup
export function* onSignUpStart() {
   yield takeLatest(UserTypes.SIGN_UP_USER_START, signUp);
}

//generator function to handle this asychronous code for reset password
export function* resetPass({ payload : {email}}) {
    try{
        yield call(resetPasswordAPI, email);  //allow us to await the promise to resolve in user.help.js     
        yield put (
            resetPassSuccess()
        );

    }catch(err){
        yield put(
            errorUser(err)
        );
    }
}

//reset password
export function* onResetPassStart() {
    yield takeLatest(UserTypes.RESET_PASS_START, resetPass );
}

//google signIn
export function* googleSignIn() {
    try {
        const { user } = yield auth.signInWithPopup(GoogleProvider);
        yield snapshotFromUserAuth(user); 
        
    }catch(err) {
        console.log(err);
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

//faceook
export function* facebookSignIn() {
    try {
        const {user} = yield auth.signInWithPopup(FacebookProvider);
        yield snapshotFromUserAuth(user);

    }catch(err){
        console.log(err);
    }
}

export function* onFacebookSignInStart(){
    yield takeLatest(UserTypes.FACEBOOK_SIGN_IN_START, facebookSignIn);
}

export default function* userSaga(){
    yield all([
        call(onEmailSignInStart), 
        call(userAuthSession), 
        call(onSignOutUserStart),
        call(onSignUpStart),
        call(onResetPassStart),
        call(onGoogleSignInStart),
        call(onFacebookSignInStart),
    ])
}