import {useEffect} from 'react';
import { useSelector } from 'react-redux';

 const mapState = ({ user }) => ({
    currentUser: user.currentUser
 });

 //custom hook
 const useAuth = props => {
    //get that value, if the current user is null, meaning the user is not logged in 
    // if they want to access the page, they need to be redirected in a way to log in
    const { currentUser } = useSelector(mapState);

    useEffect(() => {
        //checks if the current user is null
        if(!currentUser){
            //redirect the user to the log in page
            //we have access to history because of withRoute in withAuth.js
            props.history.push('/login');
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser]); //whenever currentUser changes, it will run this code

    return currentUser;
 };

 export default useAuth;