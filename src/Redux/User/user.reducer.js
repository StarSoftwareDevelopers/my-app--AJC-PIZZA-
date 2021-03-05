import UserTypes from './user.types';

const INITIAL_STATE ={
    currentUser: null,
    resetPassSuccess: false,
    errorUser: []
};

const userReducer = (state=INITIAL_STATE, action) => {
   switch(action.type){
       case UserTypes.SIGN_IN_SUCCESS:
           return {
               ...state,
               currentUser: action.payload,
               errorUser: []
           }
        case UserTypes.RESET_PASS_SUCCESS:
            return{
                ...state,
                resetPassSuccess: action.payload
            }
        case UserTypes.ERROR_USER:
            return {
                ...state,
                errorUser: action.payload
            }
        case UserTypes.RESET_STATE_USER:
        case UserTypes.SIGN_OUT_SUCCESS:
            return{
                ...state,
                ...INITIAL_STATE
            }
       default:
        return state;
   }
};
 
export default userReducer;
